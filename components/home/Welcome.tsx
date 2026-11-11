import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { CountUp, LitParagraph, Reveal, SplitText } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function Welcome({ content }: { content: SiteContent }) {
  const { about, site } = content;

  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute -left-24 top-24 hidden font-display text-[22rem] leading-none text-ink/[0.03] lg:block">
        1850
      </div>

      <div className="container-x relative z-10 grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
        <div>
          <Kicker>01 / Welcome home</Kicker>

          <h2 className="mt-7 max-w-xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96]">
            <SplitText lines={["Rooted in faith.", "Committed to community."]} />
          </h2>

          <LitParagraph
            text={about.paragraphs[0]}
            className="mt-9 max-w-xl font-display text-[clamp(1.25rem,2.1vw,1.7rem)] leading-[1.5] text-ink"
          />

          <div className="mt-6 max-w-xl space-y-4 text-[0.92rem] leading-relaxed text-muted">
            <p>{about.paragraphs[1]}</p>
            <p>{about.paragraphs[2]}</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/about" className="btn btn-ink">
              Read our story
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              <Star className="h-3 w-3 text-gold-deep" />
              {site.footerNote}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8 sm:grid-cols-4">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div>
                  <p className="font-display text-4xl leading-none text-ink md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 max-w-[10rem] text-[0.68rem] leading-snug text-muted">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="right" className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[15rem]">
            <Image
              src={about.image}
              alt="The Ifako First Baptist Church building"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="img-warm object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/80">
                Our sanctuary · Ifako-Agege
              </p>
              <Star className="h-3.5 w-3.5 text-gold" />
            </div>
          </div>

          <div className="absolute -bottom-10 -left-6 hidden w-44 overflow-hidden rounded-t-[7rem] border-[6px] border-ivory shadow-[0_30px_60px_-30px_rgba(14,20,16,0.5)] sm:block lg:-left-12 lg:w-56">
            <div className="relative aspect-[3/4]">
              <Image
                src={about.image2}
                alt="Light falling through the sanctuary windows"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -right-3 top-8 hidden flex-col items-center gap-3 rounded-full border border-ink/10 bg-paper/90 px-3 py-5 backdrop-blur sm:flex lg:-right-6">
            <Star className="h-3 w-3 text-gold-deep" />
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-ink/60 [writing-mode:vertical-rl]">
              Sanctuary of truth &amp; joy
            </span>
            <span className="h-10 w-px bg-ink/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
