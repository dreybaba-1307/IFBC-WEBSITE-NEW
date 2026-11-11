import { NextResponse } from "next/server";
import { getContentFresh, saveContent } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";
import type { SiteContent } from "@/lib/content";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContentFresh();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as SiteContent;
    if (!body?.site?.name || !Array.isArray(body?.services)) {
      return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
    }
    const saved = await saveContent(body);
    return NextResponse.json({ ok: true, content: saved });
  } catch {
    return NextResponse.json({ error: "Could not save content." }, { status: 500 });
  }
}
