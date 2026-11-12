import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Landmark, Mail, Sparkles } from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { GivingCards } from "@/components/site/GivingCards";
import { Accordion } from "@/components/site/Accordion";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give with joy. Support the ministry of Ifako First Baptist Church through tithes, offerings, and missions partnership.",
  alternates: { canonical: "/give" },
};

const faqs = (givingEmail: string) => [
  {
    q: "How are my gifts used?",
    a: "Your tithes and offerings support the daily ministry of the church — worship, discipleship, pastoral care, outreach, facilities, and the support of our ministers and missionaries. Our finance team manages resources with integrity and transparency.",
  },
  {
    q: "Will I receive a receipt?",
    a: `Yes. Please send your transfer confirmation to ${givingEmail} and our finance team will issue a receipt. Include your name and the purpose of the gift.`,
  },
  {
    q: "Can I give in person?",
    a: "Absolutely. Offerings are received during our Sunday worship service. You can also visit the church office during office hours to give directly.",
  },
  {
    q: "What is the difference between the two accounts?",
    a: "The Tithes & Offerings account supports the general ministry of the church. The Missions & Partnership account is set apart for missions, outreach, and partnership work beyond our walls.",
  },
];

export default async function GivePage() {
  const content = await getContent();
  const { giving, site } = content;

  return (
    <>
      <PageHero
        eyebrow="Giving · A cheerful giver"
        title={
          <>
            Give with
            <br />
            <span className="italic text-gold-soft">joy.</span>
          </>
        }
        copy={giving.intro}
        image="/images/thanksgiving.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <Kicker>01 / Ways to give</Kicker>
              <h2 className="mt-6 max-w-lg text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96]">
                Every gift
                <br />
                <span className="italic text-clay">builds something.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:justify-self-end">
              Transfer directly to either of our church accounts below, or give in
              person during our Sunday worship service. Thank you for partnering
              with the work of the Gospel.
            </p>
          </div>

          <div className="mt-12">
            <GivingCards giving={giving} />
          </div>

          <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border border-ink/10 bg-bone p-7 sm:flex-row sm:items-center">
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 bg-ivory">
                <Mail className="h-5 w-5 text-clay" strokeWidth={1.3} />
              </span>
              <div>
                <p className="font-display text-xl leading-tight">Send your confirmation</p>
                <p className="mt-1 max-w-xl text-[0.82rem] leading-relaxed text-muted">
                  {giving.note}
                </p>
              </div>
            </div>
            <a href={`mailto:${site.givingEmail}`} className="btn btn-ink shrink-0">
              {site.givingEmail}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Landmark,
                title: "Bank transfer",
                text: "Give directly to the Tithes & Offerings or Missions & Partnership account at any time.",
              },
              {
                icon: HeartHandshake,
                title: "In person",
                text: "Offerings are received during our Sunday worship service. Our ushers will guide you.",
              },
              {
                icon: Sparkles,
                title: "Missions partnership",
                text: "Set apart a gift for missions and outreach beyond the walls of our church.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="h-full border border-ink/10 bg-paper p-7 transition-colors duration-500 hover:border-gold/60">
                  <item.icon className="h-6 w-6 text-clay" strokeWidth={1.2} />
                  <h3 className="mt-5 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-[0.83rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(194,160,90,0.18),transparent_55%)]" />
        <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Kicker light>02 / Why we give</Kicker>
            <h2 className="mt-6 max-w-md text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.97]">
              Giving is
              <br />
              <span className="italic text-gold-soft">worship.</span>
            </h2>
            <div className="mt-9 border-l border-gold/40 pl-6">
              <p className="font-display text-2xl italic leading-snug text-ivory/85">
                “Each of you should give what you have decided in your heart to give,
                not reluctantly or under compulsion, for God loves a cheerful giver.”
              </p>
              <p className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-gold-soft/70">
                2 Corinthians 9:7
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-[0.93rem] leading-relaxed text-ivory/60">
              Everything we have is a gift from God. Giving is our response of
              gratitude — an act of trust that says his kingdom matters more than our
              comfort. It is not a fee for services; it is participation in the
              mission.
            </p>
            <p className="text-[0.93rem] leading-relaxed text-ivory/60">
              Your generosity keeps the sanctuary open, the Gospel going out, and the
              work of ministry moving forward. It supports teaching, pastoral care,
              children and youth, outreach, and the practical needs of our church
              family.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Star className="h-3 w-3 text-gold" />
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/40">
                Handled with integrity · Receipted with gratitude
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-narrow">
          <div className="text-center">
            <Kicker className="justify-center">03 / Questions</Kicker>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] leading-[0.98]">
              A few things you may{" "}
              <span className="italic text-clay">want to know.</span>
            </h2>
          </div>
          <div className="mt-10">
            <Accordion items={faqs(site.givingEmail)} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn btn-outline">
              Ask the finance team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Thank you"
        title={
          <>
            Generosity
            <br />
            <span className="italic text-gold-soft">changes lives.</span>
          </>
        }
        copy="Thank you for giving with joy. Your partnership makes the ministry of this house possible."
        image="/images/feast.jpg"
      />
    </>
  );
}
