"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function Accordion({
  items,
  light = false,
}: {
  items: { q: string; a: string }[];
  light?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`divide-y ${light ? "divide-ivory/15" : "divide-ink/10"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-start justify-between gap-6 py-5 text-left transition-colors ${
                light ? "hover:text-gold-soft" : "hover:text-clay"
              }`}
            >
              <span className="font-display text-lg leading-snug md:text-xl">{item.q}</span>
              <span
                className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                  light
                    ? isOpen
                      ? "rotate-180 border-gold bg-gold text-ink"
                      : "border-ivory/25 text-ivory/60"
                    : isOpen
                      ? "rotate-180 border-ink bg-ink text-ivory"
                      : "border-ink/15 text-ink/50"
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl pb-6 text-[0.9rem] leading-relaxed ${
                    light ? "text-ivory/60" : "text-muted"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
