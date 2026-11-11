import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Play, Youtube } from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { NextService } from "@/components/site/NextService";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Listen to messages from Ifako First Baptist Church. Watch on YouTube and be encouraged by the Word of God.",
  alternates: { canonical: "/sermons" },
};

export default async function SermonsPage() {
  const content = await getContent();
  const [featured, ...rest] = content.sermons;

  return (
    <>
      <PageHero
        eyebrow="Sermons · The Word preached"
        title={
          <>
            Words that
            <br />
            <span className="italic text-gold-soft">stay with you.</span>
          </>
        }
        copy="Faith comes by hearing. Catch up on recent messages, or watch along with us live on YouTube."
        image="/images/bible-hands.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Kicker>01 / Latest message</Kicker>
            <a
              href={content.site.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="link-line text-[0.68rem] uppercase tracking-[0.16em] text-ink/70 hover:text-ink"
            >
              <Youtube className="h-4 w-4" /> Open our YouTube channel
            </a>
          </div>

          {featured ? (
            <Reveal className="mt-8 grid overflow-hidden border border-ink/10 bg-ink text-ivory lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative flex min-h-[20rem] flex-col justify-between gap-8 bg-[radial-gradient(circle_at_30%_20%,rgba(194,160,90,0.24),transparent_60%)] p-8 md:p-12">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-gold/35 px-3.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-gold-soft">
                    Latest
                  </span>
                  <Star className="h-3.5 w-3.5 text-gold" />
                </div>
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-gold-soft/80">
                    {featured.date} · {featured.scripture}
                  </p>
                  <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-ivory/60">
                    {featured.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={featured.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-gold"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" /> Watch message
                  </a>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-ivory/45">
                    {featured.speaker}
                  </span>
                </div>
              </div>
              <div className="relative hidden items-center justify-center border-l border-ivory/10 bg-ink-2 lg:flex">
                <div className="relative grid h-40 w-40 place-items-center rounded-full border border-gold/25">
                  <span className="absolute inset-3 rounded-full border border-gold/15" />
                  <Play className="h-12 w-12 text-gold" strokeWidth={1} />
                </div>
                <p className="absolute bottom-8 left-8 right-8 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ivory/30">
                  Available on our YouTube channel
                </p>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-16 border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>02 / The archive</Kicker>
                <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] leading-[0.98]">
                  More from <span className="italic text-clay">the pulpit.</span>
                </h2>
              </div>
            </div>

            <div className="mt-8 divide-y divide-ink/10">
              {rest.map((sermon, i) => (
                <Reveal key={sermon.title} delay={i * 80}>
                  <a
                    href={sermon.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid items-start gap-5 py-7 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                  >
                    <span className="font-mono text-[0.6rem] tabular-nums text-ink/65">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-gold-deep">
                        {sermon.date} · {sermon.scripture}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight transition-colors group-hover:text-clay">
                        {sermon.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[0.82rem] leading-relaxed text-muted">
                        {sermon.description}
                      </p>
                      <p className="mt-2 text-[0.72rem] text-ink/65">{sermon.speaker}</p>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/50 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(194,160,90,0.18),transparent_55%)]" />
        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Kicker light>03 / Watch live</Kicker>
            <h2 className="mt-6 max-w-md text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.97]">
              Join us from
              <br />
              <span className="italic text-gold-soft">wherever you are.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.9rem] leading-relaxed text-ivory/55">
              We stream our Sunday worship service on YouTube. If you cannot make it
              in person, worship with us online — and let us know you joined.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={content.site.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
              >
                <Youtube className="h-4 w-4" /> Watch on YouTube
              </a>
              <Link
                href="/live"
                className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ivory/60"
              >
                Live details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <Reveal variant="right">
            <NextService />
          </Reveal>
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Hear in person"
        title={
          <>
            There is nothing like
            <br />
            being <span className="italic text-gold-soft">together.</span>
          </>
        }
        copy="A screen can carry a sermon, but a family carries you. Come and worship with us this Sunday."
      />
    </>
  );
}
