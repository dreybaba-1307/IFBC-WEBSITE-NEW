import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Clock } from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { Newsletter } from "@/components/site/Newsletter";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gather with Ifako First Baptist Church. Upcoming events, special Sundays, and the annual family calendar.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const content = await getContent();
  const [featured, ...rest] = content.events;
  const sunday = content.services.filter((s) => s.day.toLowerCase() === "sunday");
  const sundayLine = sunday.length
    ? sunday.map((s) => `${s.name} at ${s.time}`).join(", ")
    : content.site.serviceTime;

  return (
    <>
      <PageHero
        eyebrow="Events · Gather with us"
        title={
          <>
            Moments that make
            <br />a <span className="italic text-gold-soft">family.</span>
          </>
        }
        copy="From Sunday worship to the annual love feast, our calendar is shaped by gratitude, generosity, and the joy of being together."
        image="/images/feast.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <Kicker>01 / Next up</Kicker>
            <p className="hidden font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted sm:block">
              {String(content.events.length).padStart(2, "0")} moments on the calendar
            </p>
          </div>

          {featured ? (
            <Reveal className="mt-8">
              <Link
                href={`/events/${featured.slug}`}
                className="group relative grid min-h-[30rem] overflow-hidden rounded-t-[10rem] bg-ink text-ivory md:min-h-[36rem] md:grid-cols-2"
              >
                <div className="relative order-2 min-h-[16rem] md:order-1">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="order-1 flex flex-col justify-between gap-10 p-7 md:order-2 md:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 px-3.5 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-gold-soft">
                      <Star className="h-2.5 w-2.5" /> Featured
                    </span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/40">
                      {content.theme.year}
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-gold-soft/80">
                      {featured.date} · {featured.time}
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02]">
                      {featured.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[0.88rem] leading-relaxed text-ivory/60">
                      {featured.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-ivory/15 pt-5">
                    <span className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/55">
                      <MapPin className="h-3.5 w-3.5 text-gold" /> {featured.location}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="mt-16 flex items-end justify-between gap-6 border-t border-ink/10 pt-10">
            <div>
              <Kicker>02 / Also coming</Kicker>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.2rem)] leading-[0.98]">
                More to <span className="italic text-clay">look forward to.</span>
              </h2>
            </div>
            <Link
              href="/visit"
              className="link-line hidden shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-ink/70 sm:inline-flex"
            >
              Every Sunday
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((event, i) => (
              <Reveal key={event.id} delay={i * 100}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group grid h-full overflow-hidden border border-ink/10 bg-paper transition-colors duration-500 hover:border-gold/60 sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative min-h-[13rem] overflow-hidden bg-bone">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="img-warm object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-gold-deep">
                        {event.date}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight">{event.title}</h3>
                      <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-muted">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="flex items-center gap-1.5 text-[0.7rem] text-ink/65">
                        <Clock className="h-3 w-3" /> {event.time}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink/30 transition-colors group-hover:text-clay" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 grid gap-6 border border-ink/10 bg-bone p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 bg-ivory">
                <CalendarDays className="h-5 w-5 text-clay" strokeWidth={1.3} />
              </span>
              <div>
                <p className="font-display text-xl leading-tight">
                  Every Sunday is an open door.
                </p>
                <p className="mt-1 max-w-lg text-[0.82rem] leading-relaxed text-muted">
                  {sundayLine}. No ticket, no dress code — just come. Want event
                  reminders? Join our mailing list below.
                </p>
              </div>
            </div>
            <div className="sm:justify-self-end">
              <Newsletter light={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA content={content} image="/images/thanksgiving.jpg" />
    </>
  );
}
