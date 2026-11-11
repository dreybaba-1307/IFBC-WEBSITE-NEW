"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

type FormType = "contact" | "testimony" | "visit";

const copy: Record<
  FormType,
  { subject: string; placeholder: string; cta: string; done: string }
> = {
  contact: {
    subject: "Send a message",
    placeholder: "How can we pray with you, or what would you like to know?",
    cta: "Send message",
    done: "Thank you — your message is with us. Someone from the church will be in touch soon.",
  },
  testimony: {
    subject: "Share your story",
    placeholder: "Tell us what God has done. Your story may encourage someone else.",
    cta: "Share testimony",
    done: "Thank you for sharing. Your testimony is a gift to this family — we will review it and celebrate with you.",
  },
  visit: {
    subject: "Plan your visit",
    placeholder:
      "Tell us the Sunday you plan to attend, how many are coming, and anything we can do to make you comfortable.",
    cta: "Plan my visit",
    done: "We can’t wait to meet you. An usher will look out for you at the gate this Sunday.",
  },
};

export function MessageForm({
  type = "contact",
  light = false,
  compact = false,
}: {
  type?: FormType;
  light?: boolean;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const meta = copy[type];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setState("done");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div
        className={`flex flex-col items-start gap-4 border p-8 ${
          light ? "border-ivory/20 bg-ivory/[0.04] text-ivory" : "border-ink/10 bg-paper"
        }`}
      >
        <span
          className={`grid h-11 w-11 place-items-center rounded-full ${
            light ? "bg-gold text-ink" : "bg-ink text-ivory"
          }`}
        >
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-2xl leading-tight">Received with thanks.</p>
          <p
            className={`mt-2 max-w-md text-sm leading-relaxed ${
              light ? "text-ivory/60" : "text-muted"
            }`}
          >
            {meta.done}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] underline underline-offset-4 ${
            light ? "text-gold-soft" : "text-clay"
          }`}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-5" : "space-y-6"}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={`${type}-name`}>
            Your name
          </label>
          <input
            id={`${type}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            className={`field ${light ? "field-light" : ""}`}
          />
        </div>
        <div>
          <label className="label" htmlFor={`${type}-email`}>
            Email
          </label>
          <input
            id={`${type}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`field ${light ? "field-light" : ""}`}
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor={`${type}-phone`}>
          Phone <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input
          id={`${type}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="080 0000 0000"
          className={`field ${light ? "field-light" : ""}`}
        />
      </div>
      <div>
        <label className="label" htmlFor={`${type}-message`}>
          {meta.subject}
        </label>
        <textarea
          id={`${type}-message`}
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder={meta.placeholder}
          className={`field resize-none ${light ? "field-light" : ""}`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className={`btn ${light ? "btn-gold" : "btn-ink"} disabled:opacity-60`}
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              {meta.cta}
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
        {state === "error" ? (
          <p className={`text-xs ${light ? "text-gold-soft" : "text-clay"}`}>{error}</p>
        ) : (
          <p className={`text-[0.7rem] ${light ? "text-ivory/40" : "text-muted"}`}>
            We treat every message with care.
          </p>
        )}
      </div>
    </form>
  );
}
