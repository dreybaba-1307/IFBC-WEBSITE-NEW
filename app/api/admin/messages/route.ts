import { NextResponse } from "next/server";
import { deleteMessage, setMessageRead } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, read } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    await setMessageRead(String(id), Boolean(read));
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
    await deleteMessage(String(id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete message." }, { status: 500 });
  }
}
