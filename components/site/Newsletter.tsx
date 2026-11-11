"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, Check } from "lucide-react";

export function Newsletter({ light = true }: { light?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: "Newsletter subscriber",
          email,
          message: "Please add me to the IFBC newsletter list.",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className={`flex items-center gap-2 text-sm ${light ? "text-gold-soft" : "text-gold-deep"}`}>
        <Check className="h-4 w-4" /> You’re on the list. Welcome home.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-3">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={`field !py-2.5 text-sm ${light ? "field-light" : ""}`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${
          light
            ? "border-ivory/25 text-ivory hover:border-gold hover:bg-gold hover:text-ink"
            : "border-ink/20 text-ink hover:border-gold hover:bg-gold"
        } disabled:opacity-50`}
        aria-label="Subscribe to newsletter"
      >
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowUpRight className="h-4 w-4" />
        )}
      </button>
      {state === "error" ? (
        <span className="sr-only">Something went wrong. Try again.</span>
      ) : null}
    </form>
  );
}
