import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal, Tilt, SplitText } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the pastoral team and deaconate of Ifako First Baptist Church — servant leaders shepherding the church with humility and joy.",
  alternates: { canonical: "/leadership" },
};

export default async function LeadershipPage() {
  const content = await getContent();
  const { lead, team } = content.leadership;

  return (
    <>
      <PageHero
        eyebrow="Leadership · Servants of the family"
        title={
          <>
            Shepherded with
            <br />
            <span className="italic text-gold-soft">humility &amp; joy.</span>
          </>
        }
        copy="Our leaders are not above the family — they are part of it. They carry the responsibility of teaching, caring, and pointing us to Christ."
        image="/images/pastor-alt.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Kicker>01 / Lead pastor</Kicker>
            <h2 className="mt-6 max-w-md text-[clamp(2.3rem,4.8vw,4rem)] leading-[0.96]">
              <SplitText lines={["A word in season.", "A shepherd in reach."]} />
            </h2>
            <p className="mt-6 max-w-md text-[0.93rem] leading-relaxed text-muted">
              {lead.bio}
            </p>
            <blockquote className="mt-9 border-l-2 border-gold pl-6">
              <p className="font-display text-xl italic leading-snug text-ink/80">
                “We are a community of believers in Jesus Christ that exists to live
                and teach God’s truth.”
              </p>
              <footer className="mt-4 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted">
                The mission of IFBC
              </footer>
            </blockquote>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-ink">
                Contact the pastorate
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/sermons" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                Listen to a sermon
              </Link>
            </div>
          </div>

          <Tilt className="relative">
            <Reveal variant="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[16rem] bg-bone">
                <Image
                  src={lead.image}
                  alt={`${lead.name}, ${lead.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="img-warm object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <p className="font-display text-3xl text-ivory md:text-4xl">{lead.name}</p>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">
                    {lead.role}
                  </p>
                </div>
                <div className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full border border-ivory/25 bg-ink/20 backdrop-blur">
                  <Star className="h-4 w-4 text-gold" />
                </div>
              </div>
            </Reveal>
            <div className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold/50 lg:block" />
            <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-gold/50 lg:block" />
          </Tilt>
        </div>
      </section>

      <section className="section grain relative overflow-hidden bg-paper">
        <div className="container-x relative z-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Kicker>02 / The deaconate</Kicker>
              <h2 className="mt-6 max-w-lg text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[0.97]">
                Servants of the
                <br />
                <span className="italic text-clay">household of faith.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:justify-self-end">
              Our deacons and deaconesses give themselves to pastoral care, member
              welfare, and the quiet work of building up the body of Christ.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <article className="group grid overflow-hidden border border-ink/10 bg-ivory sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="relative aspect-square overflow-hidden bg-bone sm:aspect-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="img-warm object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-7">
                    <div>
                      <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold-deep">
                        {member.role}
                      </p>
                      <h3 className="mt-3 font-display text-2xl leading-tight">{member.name}</h3>
                      <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{member.bio}</p>
                    </div>
                    <Star className="mt-6 h-3.5 w-3.5 text-gold/70" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border border-dashed border-ink/20 p-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15">
                <Star className="h-4 w-4 text-gold-deep" />
              </span>
              <div>
                <p className="font-display text-xl leading-tight">
                  Ministry is shared, not solo.
                </p>
                <p className="mt-1 max-w-md text-[0.8rem] leading-relaxed text-muted">
                  Every department of the church is led by members who serve
                  faithfully — often unseen, always essential.
                </p>
              </div>
            </div>
            <Link href="/ministries" className="btn btn-outline shrink-0">
              Explore ministries
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Kicker light>03 / A word from the pastorate</Kicker>
            <h2 className="mt-6 max-w-sm text-[clamp(2rem,4.2vw,3.2rem)] leading-[0.98]">
              “Come and
              <br />
              <span className="italic text-gold-soft">see.”</span>
            </h2>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-ivory/55">
              Words are good. Presence is better. We would love to meet you in
              person this Sunday.
            </p>
          </div>
          <div className="space-y-6">
            <Quote className="h-10 w-10 text-gold/40" strokeWidth={1} />
            <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3] text-ivory/90">
              Whether you are returning to church after years away, or walking in
              for the very first time, there is a seat for you here. You do not
              have to have it all together to belong.
            </p>
            <footer className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <div>
                <p className="font-display text-lg">{lead.name}</p>
                <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold-soft/70">
                  {lead.role}
                </p>
              </div>
            </footer>
          </div>
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Meet us in person"
        title={
          <>
            A shepherd knows
            <br />
            the <span className="italic text-gold-soft">sheep.</span>
          </>
        }
        copy="Come and meet the family this Sunday. Our leaders would be glad to pray with you and help you find your place."
      />
    </>
  );
}
