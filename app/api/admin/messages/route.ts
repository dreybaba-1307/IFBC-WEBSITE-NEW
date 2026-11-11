import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, read } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const content = await getContent();
    const messages = content.messages.map((m) =>
      m.id === id ? { ...m, read: Boolean(read) } : m,
    );
    await saveContent({ ...content, messages });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not update message." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const content = await getContent();
    await saveContent({
      ...content,
      messages: content.messages.filter((m) => m.id !== id),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete message." }, { status: 500 });
  }
}
