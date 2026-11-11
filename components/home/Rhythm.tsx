"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function Rhythm({ content }: { content: SiteContent }) {
  const [active, setActive] = useState(1);
  const service = content.services[active];

  return (
    <section className="section grain relative overflow-hidden bg-bone">
      <div className="container-x relative z-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker>02 / The rhythm</Kicker>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[0.96]">
              A week shaped
              <br />
              by <span className="italic text-clay">worship.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every gathering is an open door — for the curious, the weary, the
            lifelong believer, and the first-timer. Come as you are.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="hidden grid-cols-[3rem_1fr_auto_2rem] gap-6 border-b border-ink/15 pb-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted md:grid">
              <span>No.</span>
              <span>Gathering</span>
              <span>Time</span>
              <span />
            </div>
            {content.services.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-ink/10 py-6 text-left transition-colors duration-500 md:grid-cols-[3rem_1fr_auto_2rem] md:gap-6 md:py-7 ${
                    isActive ? "text-ink" : "text-ink/65 hover:text-ink/80"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="font-mono text-[0.6rem] tabular-nums">0{i + 1}</span>
                  <span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-none">
                        {item.name}
                      </span>
                      <span
                        className={`hidden font-mono text-[0.55rem] uppercase tracking-[0.18em] text-clay transition-opacity sm:inline ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.day}
                      </span>
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-2 block max-w-md text-[0.83rem] leading-relaxed text-muted">
                          {item.note}
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="text-right font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink/70">
                    {item.time}
                  </span>
                  <span
                    className={`hidden h-8 w-8 place-items-center rounded-full border transition-all duration-500 md:grid ${
                      isActive
                        ? "border-ink bg-ink text-ivory"
                        : "border-ink/15 text-ink/40"
                    }`}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 text-clay" />
                23 Coker Street, Ifako-Agege, Lagos
              </p>
              <Link href="/visit" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                What to expect
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <Reveal variant="scale" className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] bg-ink">
                {content.services.map((item, i) => (
                  <Image
                    key={item.image + i}
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={`object-cover transition-all duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                      i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <Star className="mb-3 h-3.5 w-3.5 text-gold" />
                  <p className="font-display text-2xl text-ivory">{service.name}</p>
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-gold-soft/80">
                    {service.day} · {service.time} WAT
                  </p>
                </div>
                <span className="absolute right-6 top-6 rounded-full border border-ivory/25 bg-ink/25 px-3 py-1 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-ivory/80 backdrop-blur">
                  In person
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
