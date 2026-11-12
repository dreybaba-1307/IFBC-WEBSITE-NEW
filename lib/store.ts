import "server-only";
import { cache } from "react";
import type { Message, SiteContent } from "./content";
import type { MediaFile, StoredMedia, UploadInput } from "./store-file";
import { databaseEnabled } from "./db";
import * as fileStore from "./store-file";
import * as dbStore from "./store-db";

/**
 * Storage facade.
 *
 * - DATABASE_URL set  -> TiDB Cloud (MySQL)
 * - DATABASE_URL unset -> data/content.json on disk (zero-setup local dev)
 *
 * Both backends expose the same six operations, so routes and pages never
 * need to know which one is active.
 */

export type MessageInput = Omit<Message, "id" | "createdAt" | "read">;
export type { MediaFile, StoredMedia, UploadInput } from "./store-file";

export function storageBackend(): "tidb" | "file" {
  return databaseEnabled() ? "tidb" : "file";
}

function backend() {
  return databaseEnabled() ? dbStore : fileStore;
}

export function getContent(): Promise<SiteContent> {
  return cachedGetContent();
}

// The root layout and the page both read content during one render. React's
// per-request cache keeps that to a single read, and the short module-level
// cache below means a burst of visitors shares one database round trip.
const cachedGetContent = cache((): Promise<SiteContent> => readCached());

/**
 * How long a content document may be reused before it is read again.
 * Admin writes clear the cache immediately, so edits still appear at once on
 * the instance that saved them. Set CONTENT_CACHE_TTL_MS=0 to always read fresh.
 */
const CACHE_TTL_MS = (() => {
  const raw = process.env.CONTENT_CACHE_TTL_MS;
  if (raw === undefined) return 5_000;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : 5_000;
})();

let cached: { value: SiteContent; at: number } | null = null;
let inflight: Promise<SiteContent> | null = null;

function readCached(): Promise<SiteContent> {
  if (CACHE_TTL_MS === 0) return backend().getContent();

  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Promise.resolve(cached.value);
  }
  if (!inflight) {
    inflight = backend()
      .getContent()
      .then((value) => {
        cached = { value, at: Date.now() };
        return value;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

function invalidate(): void {
  cached = null;
}

/** Bypasses the cache — used by the admin, which must never show stale data. */
export function getContentFresh(): Promise<SiteContent> {
  const promise = backend().getContent();
  cached = null;
  return promise.then((value) => {
    cached = { value, at: Date.now() };
    return value;
  });
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const saved = await backend().saveContent(content);
  cached = { value: saved, at: Date.now() };
  return saved;
}

export async function updateContent(patch: Partial<SiteContent>): Promise<SiteContent> {
  const saved = await backend().updateContent(patch);
  cached = { value: saved, at: Date.now() };
  return saved;
}

export async function addMessage(input: MessageInput): Promise<void> {
  invalidate();
  await backend().addMessage(input);
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  invalidate();
  await backend().setMessageRead(id, read);
}

export async function deleteMessage(id: string): Promise<void> {
  invalidate();
  await backend().deleteMessage(id);
}

export function saveUpload(input: UploadInput): Promise<StoredMedia> {
  return backend().saveUpload(input);
}

export function readMedia(id: string): Promise<MediaFile | null> {
  return backend().readMedia(id);
}
