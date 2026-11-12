import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultContent, normalizeContent, type Message, type SiteContent } from "./content";

/**
 * Local JSON file store — the zero-setup default.
 * Used whenever DATABASE_URL is not configured.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

export type MessageInput = Omit<Message, "id" | "createdAt" | "read">;

/** A validated image handed to the store by the upload route. */
export type UploadInput = { name: string; ext: string; mime: string; bytes: Buffer };
export type StoredMedia = { url: string };
export type MediaFile = { filename: string; mime: string; bytes: Buffer };

/** Local development writes straight into public/uploads, served statically. */
export async function saveUpload(input: UploadInput): Promise<StoredMedia> {
  const filename = `${input.name || "image"}-${Date.now().toString(36)}.${input.ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), input.bytes);
  return { url: `/uploads/${filename}` };
}

/** Files live on disk here, so the media route has nothing to serve. */
export async function readMedia(_id: string): Promise<MediaFile | null> {
  return null;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return normalizeContent(JSON.parse(raw) as SiteContent);
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const merged = normalizeContent(content);
  const tmp = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(merged, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
  return merged;
}

export async function updateContent(patch: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getContent();
  return saveContent({ ...current, ...patch });
}

export async function addMessage(input: MessageInput): Promise<void> {
  const current = await getContent();
  const entry: Message = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  await saveContent({ ...current, messages: [entry, ...current.messages].slice(0, 500) });
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  const current = await getContent();
  await saveContent({
    ...current,
    messages: current.messages.map((m) => (m.id === id ? { ...m, read } : m)),
  });
}

export async function deleteMessage(id: string): Promise<void> {
  const current = await getContent();
  await saveContent({
    ...current,
    messages: current.messages.filter((m) => m.id !== id),
  });
}
