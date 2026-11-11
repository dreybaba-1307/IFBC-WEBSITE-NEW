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
