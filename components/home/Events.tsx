import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { SectionHead, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function Events({ content }: { content: SiteContent }) {
  const [featured, ...rest] = content.events;

  return (
    <section className="section grain relative overflow-hidden bg-ivory">
      <div className="container-x relative z-10">
        <SectionHead
          index="06"
          eyebrow="Gather with us"
          title={
            <>
              Moments that make
              <br />a <span className="italic text-clay">family.</span>
            </>
          }
          link={{ label: "View all events", href: "/events" }}
          copy="From Sunday worship to the annual love feast, our calendar is shaped by gratitude, generosity, and the joy of being together."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {featured ? (
            <Reveal>
              <Link
                href={`/events/${featured.slug}`}
                className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-[9rem] bg-ink p-7 text-ivory md:min-h-[34rem] md:p-10"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="img-warm object-cover opacity-80 transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-ink/25 px-3.5 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] backdrop-blur">
                    <Star className="h-2.5 w-2.5 text-gold" />
                    {featured.date}
                  </span>
                  <h3 className="mt-5 max-w-xl font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.02]">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[0.85rem] leading-relaxed text-ivory/65 line-clamp-2">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold-soft">
                      <MapPin className="h-3.5 w-3.5" /> {featured.location}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="flex flex-col gap-6">
            {rest.map((event, i) => (
              <Reveal key={event.id} delay={i * 120} className="flex-1">
                <Link
                  href={`/events/${event.slug}`}
                  className="group flex h-full min-h-[12.5rem] overflow-hidden border border-ink/10 bg-paper transition-colors duration-500 hover:border-gold/60"
                >
                  <div className="relative w-[38%] shrink-0 overflow-hidden bg-bone">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <span className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-gold-deep">
                        {event.date}
                      </span>
                      <h3 className="mt-2 font-display text-xl leading-tight">
                        {event.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.75rem] leading-relaxed text-muted">
                        {event.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink/65 transition-colors group-hover:text-clay">
                      Details <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={240}>
              <div className="flex items-center gap-4 border border-dashed border-ink/20 p-5">
                <CalendarDays className="h-8 w-8 shrink-0 text-clay" strokeWidth={1.2} />
                <div>
                  <p className="font-display text-lg leading-tight">Every Sunday is an open door.</p>
                  <p className="mt-1 text-[0.75rem] text-muted">
                    No ticket, no dress code — just come.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
