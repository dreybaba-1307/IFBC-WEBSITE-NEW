import { NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

const validTypes = new Set(["contact", "testimony", "visit"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = validTypes.has(body.type) ? body.type : "contact";
    const name = String(body.name ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().slice(0, 200);
    const phone = String(body.phone ?? "").trim().slice(0, 60);
    const message = String(body.message ?? "").trim().slice(0, 4000);

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }
    if (message.length < 3) {
      return NextResponse.json({ error: "Please write a little more." }, { status: 400 });
    }

    await addMessage({ type, name, email, phone, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send your message." }, { status: 500 });
  }
}
