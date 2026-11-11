import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultContent, type SiteContent } from "./content";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

function mergeContent(saved: Partial<SiteContent> | null): SiteContent {
  if (!saved) return defaultContent;
  return {
    ...defaultContent,
    ...saved,
    site: { ...defaultContent.site, ...(saved.site ?? {}), socials: { ...defaultContent.site.socials, ...(saved.site?.socials ?? {}) } },
    hero: { ...defaultContent.hero, ...(saved.hero ?? {}) },
    theme: { ...defaultContent.theme, ...(saved.theme ?? {}) },
    about: { ...defaultContent.about, ...(saved.about ?? {}) },
    identity: { ...defaultContent.identity, ...(saved.identity ?? {}) },
    leadership: { ...defaultContent.leadership, ...(saved.leadership ?? {}) },
    giving: { ...defaultContent.giving, ...(saved.giving ?? {}) },
    contact: { ...defaultContent.contact, ...(saved.contact ?? {}) },
    visit: { ...defaultContent.visit, ...(saved.visit ?? {}) },
    messages: saved.messages ?? [],
  };
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return mergeContent(JSON.parse(raw) as SiteContent);
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const merged = mergeContent(content);
  const tmp = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(merged, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
  return merged;
}

export async function updateContent(
  patch: Partial<SiteContent>,
): Promise<SiteContent> {
  const current = await getContent();
  return saveContent({ ...current, ...patch });
}

export async function addMessage(
  message: Omit<SiteContent["messages"][number], "id" | "createdAt" | "read">,
): Promise<void> {
  const current = await getContent();
  const entry = {
    ...message,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  await saveContent({ ...current, messages: [entry, ...current.messages].slice(0, 500) });
}
