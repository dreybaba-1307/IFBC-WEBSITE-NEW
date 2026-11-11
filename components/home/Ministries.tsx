"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Baby,
  ClipboardList,
  Flower2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  Megaphone,
  Music4,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Music4,
  HeartHandshake,
  HandHeart,
  GraduationCap,
  Megaphone,
  Baby,
  Sparkles,
  Radio,
  Users,
  LifeBuoy,
  Landmark,
  ClipboardList,
  ShieldCheck,
  Wrench,
  Flower2,
};

export function Ministries({ content }: { content: SiteContent }) {
  const [active, setActive] = useState(0);
  const current = content.ministries[active];
  const Icon = icons[current.icon] ?? Sparkles;
  const shown = content.ministries.slice(0, 8);

  return (
    <section className="section relative overflow-hidden bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker>05 / Ministries</Kicker>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.96]">
              There is a place
              <br />
              for <span className="italic text-clay">your gift.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-muted">
              {content.ministries.length} departments, one body. Whether you sing,
              serve, teach, organize, pray, or simply show up — there is work here
              that fits the way God made you.
            </p>
            <Link href="/ministries" className="link-line mt-5 inline-flex text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
              Explore every ministry
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="border-t border-ink/10">
            {shown.map((ministry, i) => {
              const isActive = i === active;
              return (
                <button
                  key={ministry.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-start gap-5 border-b border-ink/10 py-5 text-left transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink/65 hover:text-ink/80"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="w-7 shrink-0 pt-1 font-mono text-[0.58rem] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="font-display text-[clamp(1.35rem,2.8vw,2.05rem)] leading-tight">
                      {ministry.name}
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-1.5 block max-w-lg text-[0.8rem] leading-relaxed text-muted">
                          {ministry.description}
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                      isActive
                        ? "rotate-45 border-ink bg-ink text-ivory"
                        : "border-ink/15 text-ink/40"
                    }`}
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden>
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </button>
              );
            })}
            <Link
              href="/ministries"
              className="mt-7 inline-flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-clay transition-colors hover:text-ink"
            >
              + {content.ministries.length - shown.length} more ways to serve
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Reveal variant="scale" className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-t-[12rem] bg-ink p-8 text-ivory">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(194,160,90,0.22),transparent_60%)]" />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/45">
                    Ministry
                  </span>
                  <Star className="h-3.5 w-3.5 text-gold" />
                </div>
                <div className="relative flex flex-1 items-center justify-center">
                  <span className="grid h-28 w-28 place-items-center rounded-full border border-gold/30 bg-gold/10">
                    <Icon className="h-11 w-11 text-gold" strokeWidth={1.1} />
                  </span>
                </div>
                <div className="relative">
                  <p className="font-display text-3xl leading-tight">{current.name}</p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-ivory/60">
                    {current.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-soft hover:text-gold"
                  >
                    Express interest
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
