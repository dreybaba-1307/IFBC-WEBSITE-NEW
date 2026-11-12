import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { saveUpload } from "@/lib/store";

const MAX_BYTES = 8 * 1024 * 1024;
const allowed = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/svg+xml", "svg"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is larger than 8MB." }, { status: 413 });
    }
    const ext = allowed.get(file.type);
    if (!ext) {
      return NextResponse.json({ error: "Unsupported image type." }, { status: 415 });
    }
    const name = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48);

    // The store decides where bytes live: public/uploads locally, the `media`
    // table when TiDB is configured (Vercel's filesystem is read-only).
    const { url } = await saveUpload({
      name,
      ext,
      mime: file.type,
      bytes: Buffer.from(await file.arrayBuffer()),
    });
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
