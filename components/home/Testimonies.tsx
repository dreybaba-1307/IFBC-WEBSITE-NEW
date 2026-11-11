"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import type { SiteContent } from "@/lib/content";

export function Testimonies({ content }: { content: SiteContent }) {
  const items = content.testimonies;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      8000,
    );
    return () => window.clearInterval(t);
  }, [items.length, paused]);

  if (!items.length) return null;
  const current = items[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="grain relative overflow-hidden bg-clay py-24 text-ivory md:py-32">
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-ivory/10" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full border border-ivory/10" />

      <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
        <div>
          <Kicker light>08 / Voices</Kicker>
          <h2 className="mt-6 text-[clamp(2rem,3.8vw,3.2rem)] leading-[0.98]">
            Stories from
            <br />
            the family.
          </h2>
          <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-ivory/65">
            What God has done in the lives of our people — in their own words.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-ivory hover:bg-ivory hover:text-clay"
              aria-label="Previous testimony"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-ivory hover:bg-ivory hover:text-clay"
              aria-label="Next testimony"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="ml-2 font-mono text-[0.6rem] tabular-nums text-ivory/45">
              0{index + 1} / 0{items.length}
            </span>
          </div>
        </div>

        <div
          className="relative flex min-h-[19rem] flex-col justify-between"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="h-14 w-14 text-ivory/20" strokeWidth={1} />
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.18]">
                  “{current.quote}”
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-ivory/40" />
                  <div>
                    <p className="font-display text-lg">{current.name}</p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ivory/55">
                      {current.role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.name + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimony from ${item.name}`}
                className="group relative h-[2px] flex-1 overflow-hidden bg-ivory/20"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-gold transition-all duration-700 ${
                    i === index ? "w-full" : "w-0 group-hover:w-1/3"
                  }`}
                />
              </button>
            ))}
          </div>

          <Star className="absolute right-0 top-0 h-4 w-4 text-gold-soft/60" />
        </div>
      </div>
    </section>
  );
}
