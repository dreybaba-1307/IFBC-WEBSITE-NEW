"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { Star } from "@/components/ui";
import { SplitText } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

function RotatingSeal({ text }: { text: string }) {
  return (
    <div className="relative grid h-28 w-28 place-items-center md:h-36 md:w-36">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-ivory/55 font-mono text-[6.4px] uppercase tracking-[0.32em]">
          <textPath href="#seal-path" startOffset="0%">
            {text} · {text} ·
          </textPath>
        </text>
      </svg>
      <Star className="h-5 w-5 text-gold" />
    </div>
  );
}

export function Hero({ content }: { content: SiteContent }) {
  const { hero, site, services } = content;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain grain-dark relative min-h-[100svh] overflow-hidden bg-ink text-ivory"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={hero.image}
          alt="The congregation at Ifako First Baptist Church in worship"
          fill
          priority
          sizes="100vw"
          className="img-warm object-cover object-center"
        />
      </motion.div>
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-beams absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(194,160,90,0.20),transparent_38%)]" />

      <motion.div
        style={{ opacity: fade }}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-28 md:pb-10 md:pt-32"
      >
        <div className="flex items-start justify-between gap-6">
          <p className="eyebrow flex items-center gap-3 text-ivory/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {hero.eyebrow}
          </p>
          <p className="hidden font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/45 sm:block">
            Est. 1850 heritage · Ifako-Agege
          </p>
        </div>

        <div className="mt-16 max-w-5xl md:mt-0">
          <h1 className="text-[clamp(3rem,11.2vw,10rem)] font-normal leading-[0.86] tracking-[-0.04em]">
            <SplitText
              lines={hero.titleLines}
              trigger="mount"
              delay={350}
              accent={hero.accentLine}
              accentClassName="block italic text-gold-soft"
            />
          </h1>

          <div className="mt-9 grid gap-8 md:mt-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div className="max-w-lg">
              <p className="text-[0.95rem] leading-relaxed text-ivory/65 md:text-base">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={hero.ctaPrimary.href} className="btn btn-gold">
                  {hero.ctaPrimary.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href={hero.ctaSecondary.href} className="btn btn-outline-light">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {hero.ctaSecondary.label}
                </Link>
              </div>
            </div>

            <div className="relative hidden justify-self-end md:block">
              <div className="absolute -left-8 -top-8 hidden lg:block">
                <RotatingSeal text={site.tagline} />
              </div>
              <blockquote className="max-w-sm border border-ivory/15 bg-ink/25 p-7 backdrop-blur-md">
                <Star className="mb-5 h-4 w-4 text-gold" />
                <p className="font-display text-xl italic leading-snug text-ivory/90 lg:text-[1.45rem]">
                  “{hero.scripture}”
                </p>
                <footer className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-gold-soft/80">
                  {hero.scriptureRef}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/15 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/55">
            {services.slice(0, 3).map((s, i) => (
              <span key={s.name} className="flex items-center gap-2">
                {i > 0 ? <span className="text-gold/50">/</span> : null}
                {s.name} <span className="text-gold-soft">{s.time}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-ivory/45">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em]">
              Scroll to enter
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
              <span className="absolute inset-x-0 top-0 h-3 animate-[bob_2.4s_ease-in-out_infinite] bg-gold" />
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
