import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { PageHero, Kicker, Star, ArchImage } from "@/components/ui";
import { CountUp, LitParagraph, Reveal, SplitText } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Rooted in faith, committed to community. The story, vision, mission, values and anthem of Ifako First Baptist Church, Ifako-Agege, Lagos.",
  alternates: { canonical: "/about" },
};

const timeline = (tagline: string) => [
  {
    year: "1850",
    title: "A seed in Ijaye",
    text: "Rev. Thomas Jefferson Bowen begins Baptist work in Nigeria at Ijaye Orile — the root from which our family grew.",
  },
  {
    year: "Heritage",
    title: "A Baptist family",
    text: "We take our place within the Nigerian Baptist Convention, the largest Baptist denomination in Africa.",
  },
  {
    year: "Today",
    title: "A sanctuary in Ifako",
    text: `In Ifako-Ijaiye, we gather weekly to worship, disciple, and serve — a ${tagline} for our community.`,
  },
  {
    year: "Tomorrow",
    title: "A city reached",
    text: "We are building a church that sends — into homes, schools, businesses, and the streets of Lagos.",
  },
];

export default async function AboutPage() {
  const content = await getContent();
  const { about, identity, site } = content;
  const [taglineHead, ...taglineRest] = site.tagline.split(/\s+of\s+/i);
  const taglineTail = taglineRest.join(" of ");

  return (
    <>
      <PageHero
        eyebrow="Our story · Est. 1850 heritage"
        title={
          <>
            {taglineTail ? `${taglineHead} of` : taglineHead}
            <br />
            <span className="italic text-gold-soft">
              {taglineTail || "truth & joy"}.
            </span>
          </>
        }
        copy={about.quote}
        image="/images/church_building_enhanced.jpg"
      />

      <section className="section relative overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute -right-24 top-24 hidden font-display text-[20rem] leading-none text-ink/[0.03] lg:block">
          IFBC
        </div>
        <div className="container-x relative z-10 grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <Kicker>01 / Rooted in faith</Kicker>
            <h2 className="mt-7 max-w-xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              <SplitText lines={["More than a building.", "A people becoming home."]} />
            </h2>
            <LitParagraph
              text={about.paragraphs[0]}
              className="mt-9 max-w-xl font-display text-[clamp(1.2rem,2vw,1.55rem)] leading-[1.5] text-ink"
            />
            <div className="mt-6 max-w-xl space-y-4 text-[0.93rem] leading-relaxed text-muted">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-4">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <p className="font-display text-4xl leading-none text-ink md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 max-w-[10rem] text-[0.68rem] leading-snug text-muted">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative">
            <Reveal variant="right">
              <ArchImage
                src={about.image}
                alt="The Ifako First Baptist Church sanctuary"
                className="aspect-[4/5]"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
                overlay
                caption="Our sanctuary · Ifako-Agege"
              />
            </Reveal>
            <Reveal
              variant="up"
              delay={160}
              className="absolute -bottom-12 -left-4 w-40 sm:w-52 lg:-left-12"
            >
              <div className="border-[6px] border-ivory shadow-[0_30px_60px_-30px_rgba(14,20,16,0.5)]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[6rem]">
                  <Image
                    src={about.image2}
                    alt="Light falling through the sanctuary windows"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="absolute -right-3 top-6 hidden items-center gap-3 rounded-full border border-ink/10 bg-paper/90 px-3 py-5 backdrop-blur sm:flex lg:-right-6">
              <Star className="h-3 w-3 text-gold-deep" />
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-ink/60 [writing-mode:vertical-rl]">
                Nigerian Baptist Convention
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section grain relative overflow-hidden bg-bone">
        <div className="container-x relative z-10">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <Kicker>02 / Our journey</Kicker>
              <h2 className="mt-6 text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96]">
                From a seed
                <br />
                to a <span className="italic text-clay">sanctuary.</span>
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-muted md:justify-self-end">
              Our story is older than our address. It begins with missionaries who
              carried the Gospel inland, and continues with a family in Ifako who
              carries it still.
            </p>
          </div>

          <div className="mt-16 grid gap-0 border-t border-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {timeline(site.tagline).map((item, i) => (
              <Reveal key={item.year} delay={i * 90}>
                <div className="group h-full border-b border-ink/15 px-0 py-8 md:border-r md:px-8 md:first:pl-0 lg:border-b-0">
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.24em] text-clay">
                    0{i + 1}
                  </span>
                  <p className="mt-5 font-display text-4xl leading-none text-ink">{item.year}</p>
                  <h3 className="mt-4 font-display text-xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="identity" className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(194,160,90,0.16),transparent_55%)]" />
        <div className="container-x relative z-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Kicker light>03 / Vision &amp; values</Kicker>
              <h2 className="mt-6 max-w-md text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.96]">
                What we are
                <br />
                <span className="italic text-gold-soft">becoming.</span>
              </h2>
              <p className="mt-6 max-w-md text-[0.93rem] leading-relaxed text-ivory/60">
                Vision tells us where we are going. Mission tells us why we exist.
                Values tell us how we travel together.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <Star className="h-3 w-3 text-gold" />
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/40">
                  {site.footerNote}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Reveal className="border border-ivory/12 bg-ivory/[0.03] p-7 md:p-9">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-gold-soft/80">
                  Our vision
                </p>
                <p className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-snug">
                  {identity.vision}
                </p>
              </Reveal>

              <Reveal delay={100} className="border border-ivory/12 bg-ivory/[0.03] p-7 md:p-9">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-gold-soft/80">
                  Our mission
                </p>
                <p className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-snug">
                  {identity.mission}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-gold-soft/80">
                  Our values
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {identity.values.map((value, i) => (
                    <span
                      key={value}
                      className="group flex items-center gap-3 border border-ivory/15 px-4 py-2.5 font-display text-lg transition-colors hover:border-gold/60"
                    >
                      <span className="font-mono text-[0.5rem] text-gold/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {value}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-20 border-t border-ivory/10 pt-14">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <Quote className="h-10 w-10 text-gold/40" strokeWidth={1} />
                <p className="mt-5 font-mono text-[0.56rem] uppercase tracking-[0.24em] text-gold-soft/70">
                  Our anthem
                </p>
                <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed text-ivory/50">
                  {identity.anthemNote}
                </p>
              </div>
              <div className="space-y-2.5">
                {identity.anthem.map((line, i) => (
                  <p
                    key={line}
                    className={`font-display leading-[1.35] ${
                      i === 0
                        ? "text-[clamp(1.6rem,3.2vw,2.6rem)] text-ivory"
                        : "text-[clamp(1.2rem,2.4vw,1.9rem)] text-ivory/55"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal variant="left">
            <ArchImage
              src="/images/cathedral-light.jpg"
              alt="Light through the arches of a sanctuary"
              className="aspect-[4/3]"
              sizes="(max-width: 1024px) 90vw, 45vw"
              overlay
              caption="Light through the arch"
            />
          </Reveal>
          <Reveal variant="right">
            <Kicker>04 / What we believe</Kicker>
            <h2 className="mt-6 max-w-lg text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.98]">
              The Gospel is
              <br />
              <span className="italic text-clay">our centre.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[0.93rem] leading-relaxed text-muted">
              We believe in one God — Father, Son, and Holy Spirit. We believe the
              Bible is God’s trustworthy word, that Jesus died and rose again, and
              that new life is found in him. As Baptists, we hold to believer’s
              baptism, the priesthood of all believers, and the freedom of every
              conscience before God.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Scripture", "Grace", "Believer’s baptism", "The local church", "Mission"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink/60"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
            <Link href="/contact" className="btn btn-outline mt-9">
              Ask a question
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <PageCTA content={content} />
    </>
  );
}
