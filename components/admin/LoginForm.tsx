"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { Star } from "@/components/ui";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Incorrect password.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Sign in failed.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="admin-card p-8 md:p-10">
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/10">
            <Lock className="h-4 w-4 text-gold" />
          </span>
          <Star className="h-4 w-4 text-gold/60" />
        </div>
        <h1 className="mt-7 font-display text-3xl leading-tight text-ivory">Church office</h1>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-ivory/45">
          Sign in to update the website — services, events, images, and messages.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="admin-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="admin-input"
            />
          </div>
          {error ? (
            <p className="rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-[0.75rem] text-gold-soft">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-gold w-full disabled:opacity-60"
          >
            {state === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in
              </>
            ) : (
              "Enter the dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-ivory/10 pt-5">
          <p className="text-[0.68rem] leading-relaxed text-ivory/30">
            Access is limited to authorised church staff. Sessions expire after 12
            hours.
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/40 transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to the website
      </Link>
    </div>
  );
}
