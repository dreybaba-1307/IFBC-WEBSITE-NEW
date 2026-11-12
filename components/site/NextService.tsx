"use client";

import { useEffect, useState } from "react";

function parseTime(value: string) {
  const match = value.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return { hours: 10, minutes: 0 };
  let hours = Number(match[1]) % 12;
  if (/pm/i.test(match[3] ?? "")) hours += 12;
  return { hours, minutes: Number(match[2] ?? 0) };
}

function nextSunday(hours: number, minutes: number) {
  const now = new Date();
  const d = new Date(now);
  const day = d.getDay();
  const delta = (7 - day) % 7;
  d.setDate(d.getDate() + delta);
  d.setHours(hours, minutes, 0, 0);
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7);
  return d;
}

const labels = ["Days", "Hours", "Minutes", "Seconds"];

export function NextService({ time = "10:00 AM" }: { time?: string }) {
  const [target, setTarget] = useState<Date | null>(null);
  const [left, setLeft] = useState(0);
  const label = time.replace(/\s*\(?WAT\)?/i, "").trim();

  useEffect(() => {
    const { hours, minutes } = parseTime(time);
    const next = nextSunday(hours, minutes);
    setTarget(next);
    setLeft(Math.max(0, next.getTime() - Date.now()));
    const t = window.setInterval(() => {
      setLeft(Math.max(0, next.getTime() - Date.now()));
    }, 1000);
    return () => window.clearInterval(t);
  }, [time]);

  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor((left % 86_400_000) / 3_600_000);
  const minutes = Math.floor((left % 3_600_000) / 60_000);
  const seconds = Math.floor((left % 60_000) / 1000);
  const values = [days, hours, minutes, seconds];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {labels.map((label, i) => (
          <div
            key={label}
            className="border border-ivory/15 bg-ivory/[0.03] px-2 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5"
          >
            <span className="block font-display text-3xl tabular-nums text-ivory sm:text-4xl">
              {target ? String(values[i]).padStart(2, "0") : "—"}
            </span>
            <span className="mt-2 block font-mono text-[0.5rem] uppercase tracking-[0.22em] text-gold-soft/70">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 min-h-[1em] font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/40">
        {target
          ? `Next Sunday worship · ${target.toLocaleDateString("en-NG", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })} · ${label} WAT`
          : `Next Sunday worship · ${label} WAT`}
      </p>
    </div>
  );
}
