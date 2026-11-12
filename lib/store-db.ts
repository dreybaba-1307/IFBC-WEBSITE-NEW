import "server-only";
import type { RowDataPacket } from "mysql2/promise";
import { defaultContent, normalizeContent, type Message, type SiteContent } from "./content";
import { ensureSchema, getPool } from "./db";
import type { MessageInput } from "./store-file";

/**
 * TiDB Cloud store. The site content is kept as a single JSON document in
 * `site_content` (mirroring the admin's "save everything at once" flow) while
 * form submissions live in a proper `messages` table with indexes.
 */

const MAX_MESSAGES = 500;

let lastErrorLog = 0;
let buildWarned = false;

const BUILDING = (process.env.NEXT_PHASE ?? "").includes("phase-production-build");

function logDbError(error: unknown) {
  if (BUILDING) {
    // A build must never fail because the database is briefly unreachable, and
    // a stack trace per prerendered page just buries the real build output.
    if (buildWarned) return;
    buildWarned = true;
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `[db] TiDB unreachable during build (${message}). Prerendered pages will use built-in content.`,
    );
    return;
  }

  // One line per minute is enough to spot a misconfiguration without
  // flooding the logs on every page view.
  const now = Date.now();
  if (now - lastErrorLog < 60_000) return;
  lastErrorLog = now;
  console.error("[db] TiDB read failed, serving built-in content:", error);
}

function toMessage(row: RowDataPacket): Message {
  return {
    id: String(row.id),
    type: (row.type as Message["type"]) ?? "contact",
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    message: String(row.body ?? ""),
    createdAt: new Date(row.created_at as Date).toISOString(),
    read: Boolean(row.is_read),
  };
}

async function listMessages(): Promise<Message[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT id, type, name, email, phone, body, is_read, created_at
       FROM messages
      ORDER BY created_at DESC, id DESC
      LIMIT ${MAX_MESSAGES}`,
  );
  return rows.map(toMessage);
}

function parseJson(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

function parseDoc(value: unknown): Partial<SiteContent> {
  const parsed = parseJson(value);
  return parsed && typeof parsed === "object" ? (parsed as Partial<SiteContent>) : {};
}

function parseMessages(value: unknown): Message[] {
  const parsed = parseJson(value);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as Record<string, unknown>;
      const createdMs = Number(row.created_ms);
      return {
        id: String(row.id ?? ""),
        type: (row.type as Message["type"]) ?? "contact",
        name: String(row.name ?? ""),
        email: String(row.email ?? ""),
        phone: String(row.phone ?? ""),
        message: String(row.body ?? ""),
        createdAt: Number.isFinite(createdMs)
          ? new Date(createdMs).toISOString()
          : new Date(String(row.created_at ?? Date.now())).toISOString(),
        read: Number(row.is_read) === 1 || row.is_read === true,
      } satisfies Message;
    })
    .filter((entry): entry is Message => entry !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Content document + inbox in a single round trip.
 *
 * Every query to TiDB costs one network round trip (~240 ms from Lagos to
 * us-west-2), so fetching the document and the messages separately doubled the
 * time every page took to render.
 */
const READ_QUERY = `
  SELECT
    (SELECT doc FROM site_content WHERE id = 1) AS doc,
    (SELECT COALESCE(
        JSON_ARRAYAGG(JSON_OBJECT(
          'id', id,
          'type', type,
          'name', name,
          'email', email,
          'phone', phone,
          'body', body,
          'is_read', is_read,
          'created_ms', CAST(UNIX_TIMESTAMP(created_at) * 1000 AS UNSIGNED)
        )),
        JSON_ARRAY()
      )
       FROM (
         SELECT id, type, name, email, phone, body, is_read, created_at
           FROM messages
          ORDER BY created_at DESC, id DESC
          LIMIT ${MAX_MESSAGES}
       ) AS recent
    ) AS messages
`;

export async function getContent(): Promise<SiteContent> {
  try {
    await ensureSchema();
    const [rows] = await getPool().query<RowDataPacket[]>(READ_QUERY);
    const doc = parseDoc(rows[0]?.doc);
    const messages = parseMessages(rows[0]?.messages);
    return normalizeContent({ ...doc, messages });
  } catch (error) {
    // Keep the public site online if TiDB is briefly unreachable
    // (serverless auto-pause, network blip, bad credentials in dev).
    logDbError(error);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const merged = normalizeContent(content);
  // Messages are owned by the messages table, never the document.
  const { messages: _messages, ...doc } = merged;
  const payload = JSON.stringify(doc);

  await ensureSchema();
  await getPool().execute(
    `INSERT INTO site_content (id, doc) VALUES (1, ?)
       ON DUPLICATE KEY UPDATE doc = ?`,
    [payload, payload],
  );

  return { ...merged, messages: await listMessages() };
}

export async function updateContent(patch: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getContent();
  return saveContent({ ...current, ...patch });
}

export async function addMessage(input: MessageInput): Promise<void> {
  await ensureSchema();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await getPool().execute(
    `INSERT INTO messages (id, type, name, email, phone, body, is_read, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
    [id, input.type, input.name, input.email, input.phone, input.message, new Date()],
  );

  // Keep the inbox bounded without losing the newest entries.
  await getPool().query(
    `DELETE FROM messages
      WHERE id NOT IN (
        SELECT id FROM (
          SELECT id FROM messages ORDER BY created_at DESC, id DESC LIMIT ${MAX_MESSAGES}
        ) AS keep
      )`,
  );
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  await ensureSchema();
  await getPool().execute("UPDATE messages SET is_read = ? WHERE id = ?", [read ? 1 : 0, id]);
}

export async function deleteMessage(id: string): Promise<void> {
  await ensureSchema();
  await getPool().execute("DELETE FROM messages WHERE id = ?", [id]);
}
