import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  ClipboardList,
  Flower2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  Megaphone,
  Music4,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Fifteen departments, one body. Find your place of service at Ifako First Baptist Church — music, children, youth, evangelism, welfare, media, and more.",
  alternates: { canonical: "/ministries" },
};

const icons: Record<string, LucideIcon> = {
  Music4,
  HeartHandshake,
  HandHeart,
  GraduationCap,
  Megaphone,
  Baby,
  Sparkles,
  Radio,
  Users,
  LifeBuoy,
  Landmark,
  ClipboardList,
  ShieldCheck,
  Wrench,
  Flower2,
};

const steps = [
  {
    title: "Come and worship",
    text: "The first step is presence. Worship with us for a few Sundays and get a feel for the family.",
  },
  {
    title: "Tell us your gift",
    text: "Speak to a leader, or send a message telling us what you love to do and how you would like to serve.",
  },
  {
    title: "Serve with a team",
    text: "We will connect you with a department leader who will walk with you as you begin.",
  },
];

export default async function MinistriesPage() {
  const content = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Ministries · Fifteen departments"
        title={
          <>
            There is a place
            <br />
            for <span className="italic text-gold-soft">your gift.</span>
          </>
        }
        copy="One body, many members. Every department exists so that the church can worship, grow, and serve the community with excellence and love."
        image="/images/community.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Kicker>01 / Serve the family</Kicker>
              <h2 className="mt-6 max-w-lg text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96]">
                Find your place.
                <br />
                <span className="italic text-clay">Bring your gift.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:justify-self-end">
              You do not need a title to serve. You need willingness. These are the
              departments that keep the life of the church moving — and each one
              has room for you.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.ministries.map((ministry, i) => {
              const Icon = icons[ministry.icon] ?? Sparkles;
              return (
                <Reveal key={ministry.name} delay={(i % 3) * 80}>
                  <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-ink/10 bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-45px_rgba(14,20,16,0.6)]">
                    <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[6rem] leading-none text-ink/[0.035]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-5 w-5" strokeWidth={1.3} />
                      </span>
                      <h3 className="mt-6 font-display text-2xl leading-tight">{ministry.name}</h3>
                      <p className="mt-3 text-[0.84rem] leading-relaxed text-muted">
                        {ministry.description}
                      </p>
                    </div>
                    <div className="relative mt-7 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-ink/65">
                        Department
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink/30 transition-colors group-hover:text-clay" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <Image
          src="/images/outreach.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Kicker light>02 / Begin serving</Kicker>
            <h2 className="mt-6 max-w-sm text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.97]">
              Three steps
              <br />
              to <span className="italic text-gold-soft">belonging.</span>
            </h2>
            <div className="mt-9 flex items-center gap-3">
              <Star className="h-3 w-3 text-gold" />
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/40">
                No experience required
              </p>
            </div>
          </div>
          <div className="space-y-0 border-t border-ivory/15">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="grid gap-4 border-b border-ivory/15 py-7 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-[0.6rem] text-gold-soft/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{step.title}</h3>
                    <p className="mt-2 max-w-lg text-[0.86rem] leading-relaxed text-ivory/55">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="flex flex-wrap items-center gap-4 pt-8">
              <Link href="/contact" className="btn btn-gold">
                I want to serve
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/visit"
                className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ivory/70"
              >
                Visit first
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Every member a minister"
        title={
          <>
            The church is
            <br />
            <span className="italic text-gold-soft">its people.</span>
          </>
        }
        copy="Your hands, your voice, your patience, your skill — all of it matters. Come and build with us."
        image="/images/community.jpg"
      />
    </>
  );
}
