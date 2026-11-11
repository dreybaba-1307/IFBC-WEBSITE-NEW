import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Play, Youtube } from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { NextService } from "@/components/site/NextService";
import { MessageForm } from "@/components/site/MessageForm";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Watch live",
  description:
    "Worship with Ifako First Baptist Church online. Watch our Sunday service live on YouTube at 10:00 AM WAT.",
  alternates: { canonical: "/live" },
};

export default async function LivePage() {
  const content = await getContent();
  const { site, services, theme } = content;

  return (
    <>
      <section className="grain grain-dark relative min-h-[80vh] overflow-hidden bg-ink pb-16 pt-40 text-ivory">
        <Image
          src="/images/choir-altar.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(194,160,90,0.18),transparent_55%)]" />

        <div className="container-x relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Kicker light>Live · Sunday worship</Kicker>
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/[0.04] px-3.5 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/65">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
              </span>
              Streams Sundays · 10:00 AM WAT
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,6rem)] leading-[0.94]">
                Worship with us,
                <br />
                <span className="italic text-gold-soft">from anywhere.</span>
              </h1>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ivory/60">
                Our Sunday service is streamed live on YouTube. Wherever you are in
                the world, you can join the family in praise, prayer, and the Word.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold"
                >
                  <Youtube className="h-4 w-4" /> Watch on YouTube
                </a>
                <Link href="/sermons" className="btn btn-outline-light">
                  Recent messages
                </Link>
              </div>
            </div>
            <div className="hidden justify-self-end lg:block">
              <div className="relative grid h-52 w-52 place-items-center rounded-full border border-gold/25">
                <span className="absolute inset-4 rounded-full border border-gold/15" />
                <span className="absolute inset-8 rounded-full bg-gold/5" />
                <Play className="relative h-14 w-14 text-gold" strokeWidth={0.9} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Kicker>01 / This Sunday</Kicker>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[0.97]">
              {theme.year} ·{" "}
              <span className="italic text-clay">{theme.title}.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.93rem] leading-relaxed text-muted">
              {theme.description} Our theme verse is {theme.verse}. Join us in person
              or online as we worship together.
            </p>

            <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
              {services.map((service) => (
                <div key={service.name} className="flex items-baseline justify-between gap-4 py-5">
                  <div>
                    <p className="font-display text-xl leading-tight">{service.name}</p>
                    <p className="mt-1 text-[0.78rem] text-muted">{service.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-clay">
                      {service.day}
                    </p>
                    <p className="mt-1 font-mono text-[0.75rem] text-ink/70">{service.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Star className="h-3 w-3 text-gold-deep" />
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted">
                All times West Africa Time (WAT / GMT+1)
              </p>
            </div>
          </div>

          <div>
            <Reveal variant="right">
              <div className="bg-ink p-8 text-ivory">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.24em] text-gold-soft/80">
                  Next service begins in
                </p>
                <div className="mt-6">
                  <NextService />
                </div>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold mt-7 w-full"
                >
                  <Youtube className="h-4 w-4" /> Open YouTube
                </a>
              </div>
            </Reveal>

            <Reveal variant="right" delay={100} className="mt-6 border border-ink/10 bg-paper p-7">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-deep">
                A note for online worshippers
              </p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                If the stream has not started yet, the latest service will be available
                on our channel. Say hello in the chat — a member of our media team will
                be glad to pray with you.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="link-line mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.16em] text-ink/70"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Send a prayer request
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain relative bg-bone py-24 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Kicker>02 / Let us know</Kicker>
            <h2 className="mt-6 max-w-sm text-[clamp(2rem,4.2vw,3.2rem)] leading-[0.98]">
              Watching
              <br />
              <span className="italic text-clay">online?</span>
            </h2>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-muted">
              Tell us where you are joining from. We would love to follow up, pray
              with you, and help you take a next step.
            </p>
            <Link href="/visit" className="btn btn-outline mt-8">
              Plan an in-person visit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <MessageForm type="contact" />
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Beyond the screen"
        title={
          <>
            Online is a bridge.
            <br />
            <span className="italic text-gold-soft">Home is here.</span>
          </>
        }
        copy="We would love to meet you face to face. There is a seat saved for you this Sunday."
        image="/images/congregation.jpg"
      />
    </>
  );
}
