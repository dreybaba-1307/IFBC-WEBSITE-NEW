import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Parallax, Reveal, SplitText } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function ThemeYear({ content }: { content: SiteContent }) {
  const { theme } = content;
  const words = theme.title.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")].filter(Boolean);

  return (
    <section className="grain grain-dark relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
      <Parallax className="absolute inset-0" distance={60} scale>
        <div className="relative h-[120%] w-full">
          <Image
            src={theme.image}
            alt="Dramatic sky over Ifako"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(194,160,90,0.22),transparent_58%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
        <span className="text-stroke font-display text-[clamp(12rem,40vw,38rem)] leading-none text-ivory/20">
          {theme.year}
        </span>
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <Kicker light>03 / The word for our year</Kicker>

        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.34em] text-gold-soft">
            {theme.year} Theme
          </span>
          <span className="h-px w-10 bg-gold/50" />
        </div>

        <h2 className="mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.94]">
          <SplitText lines={lines} />
        </h2>

        <Reveal delay={180} className="mt-8">
          <p className="font-display text-xl italic text-gold-soft md:text-2xl">
            “{theme.description}”
          </p>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ivory/55">
            {theme.verse}
          </p>
        </Reveal>

        <Reveal delay={280} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/sermons" className="btn btn-gold">
            Hear the word
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/about#identity" className="btn btn-outline-light">
            Our vision &amp; values
          </Link>
        </Reveal>

        <div className="mt-16 flex items-center gap-4 text-ivory/25">
          <span className="h-px w-16 bg-current" />
          <Star className="h-3.5 w-3.5 text-gold/70" />
          <span className="h-px w-16 bg-current" />
        </div>
      </div>

      <p className="absolute bottom-8 left-0 right-0 z-10 text-center font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ivory/30">
        Expect testimonies · Stay rooted in praise
      </p>
    </section>
  );
}
