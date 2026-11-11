import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, MapPin, Share2 } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const event = content.events.find((e) => e.slug === slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.title} · Ifako First Baptist Church`,
      description: event.description,
      images: [{ url: event.image }],
    },
  };
}

function calendarLink(event: Awaited<ReturnType<typeof getContent>>["events"][number]) {
  const start = new Date(event.isoDate);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location: `${event.location}, Ifako First Baptist Church, Lagos`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const content = await getContent();
  const event = content.events.find((e) => e.slug === slug);
  if (!event) notFound();

  const others = content.events.filter((e) => e.slug !== event.slug).slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink pb-14 pt-40 text-ivory md:min-h-[84vh] md:pb-20">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="img-warm object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(194,160,90,0.16),transparent_55%)]" />
        <div className="container-x relative z-10">
          <Link
            href="/events"
            className="link-line inline-flex font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All events
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/25 px-4 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-gold-soft backdrop-blur">
              <Star className="h-2.5 w-2.5" /> {event.date}
            </span>
            {event.featured ? (
              <span className="rounded-full border border-ivory/25 px-4 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/70 backdrop-blur">
                Featured
              </span>
            ) : null}
          </div>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6.6vw,6rem)] leading-[0.95]">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <Kicker>About this gathering</Kicker>
            <p className="mt-8 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.4] text-ink">
              {event.description}
            </p>

            <div className="mt-10 space-y-4 text-[0.93rem] leading-relaxed text-muted">
              <p>
                You are warmly invited to join the Ifako First Baptist Church family
                for this gathering. Come expectant — we will worship together, pray
                together, and open the Scriptures together.
              </p>
              <p>
                Doors open thirty minutes before the service. Our ushers will be at
                the gate to welcome you, help you find a seat, and answer any
                questions. Children are welcome, and our children’s church team will
                care for the little ones.
              </p>
              <p>
                If you would like to know more, or if you are planning to attend for
                the first time, send us a message and we will look out for you.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border border-ink/10 bg-paper p-6">
                <CalendarDays className="h-5 w-5 text-clay" strokeWidth={1.3} />
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  Date
                </p>
                <p className="mt-1 font-display text-lg leading-tight">{event.date}</p>
              </div>
              <div className="border border-ink/10 bg-paper p-6">
                <Clock className="h-5 w-5 text-clay" strokeWidth={1.3} />
                <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  Time
                </p>
                <p className="mt-1 font-display text-lg leading-tight">{event.time} WAT</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={calendarLink(event)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ink"
              >
                Add to calendar
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/visit" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                Plan your visit
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <Reveal variant="right" className="border border-ink/10 bg-paper p-7">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-gold-deep">
                Event details
              </p>
              <dl className="mt-6 space-y-5">
                <dt className="label flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-clay" aria-hidden />
                  Location
                </dt>
                <dd className="pl-6 text-[0.88rem] leading-relaxed text-ink/80">
                  {event.location}
                  <br />
                  23 Coker Street, Ifako-Agege, Lagos
                </dd>
                <dt className="label flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-clay" aria-hidden />
                  Time
                </dt>
                <dd className="pl-6 text-[0.88rem] text-ink/80">{event.time} WAT</dd>
              </dl>            </Reveal>

            <div className="border border-ink/10 bg-bone p-7">
              <Share2 className="h-5 w-5 text-ink/60" strokeWidth={1.3} />
              <p className="mt-4 font-display text-xl leading-tight">Bring a friend.</p>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                Some of the best moments are shared. Invite someone to come with you.
              </p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${event.title} — ${event.date} at Ifako First Baptist Church. ${event.description}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="link-line mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.16em] text-ink/70"
              >
                Share on WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="bg-ink p-7 text-ivory">
              <Star className="h-3.5 w-3.5 text-gold" />
              <p className="mt-4 font-display text-xl leading-tight">
                “Let us not neglect our meeting together.”
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold-soft/70">
                Hebrews 10:25
              </p>
            </div>
          </aside>
        </div>
      </section>

      {others.length ? (
        <section className="border-t border-ink/10 bg-paper py-20">
          <div className="container-x">
            <h2>
              <Kicker>More moments</Kicker>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/events/${other.slug}`}
                  className="group grid overflow-hidden border border-ink/10 bg-ivory sm:grid-cols-[0.8fr_1.2fr]"
                >
                  <div className="relative min-h-[11rem] overflow-hidden bg-bone">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-gold-deep">
                        {other.date}
                      </p>
                      <h3 className="mt-2 font-display text-xl leading-tight">{other.title}</h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink/65 group-hover:text-clay">
                      View event <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageCTA content={content} />
    </>
  );
}
