import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function Leadership({ content }: { content: SiteContent }) {
  const { lead, team } = content.leadership;

  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Kicker>04 / Leadership</Kicker>
            <h2 className="mt-7 max-w-md text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.97]">
              Shepherded with
              <br />
              <span className="italic text-clay">humility &amp; joy.</span>
            </h2>
            <p className="mt-7 max-w-md text-[0.93rem] leading-relaxed text-muted">
              Under the pastoral care of Revd. Tunde Oyaleke, our leadership team
              serves the church through spiritual oversight, practical ministry,
              and a deep love for the people of Ifako-Ijaiye.
            </p>

            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display text-xl italic leading-snug text-ink/80">
                “{lead.bio}”
              </p>
              <footer className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted">
                {lead.name} · {lead.role}
              </footer>
            </blockquote>

            <Link href="/leadership" className="btn btn-outline mt-10">
              Meet the leadership
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="mt-12 flex items-center gap-3">
              <Star className="h-3 w-3 text-gold-deep" />
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted">
                Serving the Nigerian Baptist Convention
              </p>
            </div>
          </div>

          <div>
            <Tilt className="relative">
              <Reveal variant="right">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[16rem] bg-bone">
                  <Image
                    src={lead.image}
                    alt={`${lead.name}, ${lead.role}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="img-warm object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <p className="font-display text-2xl text-ivory md:text-3xl">{lead.name}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-gold-soft">
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

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 120} variant="up">
                  <article className="group flex items-center gap-4 border border-ink/10 bg-paper p-4 transition-colors duration-500 hover:border-gold/60">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-t-[3rem] bg-bone">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg leading-tight">{member.name}</p>
                      <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-gold-deep">
                        {member.role}
                      </p>
                      <p className="mt-2 line-clamp-2 text-[0.72rem] leading-snug text-muted">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
