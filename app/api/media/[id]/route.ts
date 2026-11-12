import { NextResponse } from "next/server";
import { readMedia } from "@/lib/store";

/**
 * Serves images stored in the `media` table.
 *
 * IDs are random and content never changes, so responses are immutable and
 * cached at the edge. The CSP neuters scripts inside uploaded SVGs, which would
 * otherwise run in the site's origin when opened directly.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const media = await readMedia(id);
  if (!media) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.bytes), {
    headers: {
      "Content-Type": media.mime,
      "Content-Length": String(media.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  });
}
