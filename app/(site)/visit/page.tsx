import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone, Shirt, Baby, Car } from "lucide-react";
import { PageHero, Kicker, Star, ArchImage } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MessageForm } from "@/components/site/MessageForm";
import { Accordion } from "@/components/site/Accordion";
import { NextService } from "@/components/site/NextService";
import { worshipStartTime } from "@/lib/content";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plan your visit",
  description:
    "Planning your first visit to Ifako First Baptist Church? Here is everything you need to know — service times, location, what to wear, children, and parking.",
  alternates: { canonical: "/visit" },
};

const faqs = [
  {
    q: "What should I wear?",
    a: "Come as you are. Some of our members dress formally, others come in smart casual or traditional attire. There is no dress code — we are simply glad you are here.",
  },
  {
    q: "Where do I park?",
    a: "Street parking is available around Coker Street and the adjoining roads. Our ushers will be glad to direct you to a safe place to park.",
  },
  {
    q: "Is there something for my children?",
    a: "Yes. Children are welcome in the main service, and we also have children’s church where trained teachers care for and teach our youngest members in an age-appropriate way.",
  },
  {
    q: "How long is the service?",
    a: "Our Sunday worship service typically lasts about two hours, including praise, prayer, the reading and preaching of the Word, and announcements.",
  },
  {
    q: "Will I be asked to give money?",
    a: "An offering is received during the service, but you are not under any obligation to give. Giving is a joyful response of our members, not a requirement for guests.",
  },
  {
    q: "How do I become a member?",
    a: "Speak with one of our pastors after the service or send us a message. We will walk you through what we believe, believer’s baptism, and the membership process.",
  },
];

export default async function VisitPage() {
  const content = await getContent();
  const { visit, contact, services, site } = content;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery,
  )}&z=15&output=embed`;

  const sunday = services.filter((s) => s.day.toLowerCase() === "sunday");
  const essentials = [
    {
      icon: Clock,
      title: "Service times",
      text: sunday.length
        ? sunday.map((s) => `${s.name} ${s.time}`).join(" · ")
        : site.serviceTime,
    },
    { icon: MapPin, title: "Location", text: contact.address },
    { icon: Shirt, title: "What to wear", text: "Come as you are — no dress code" },
    { icon: Baby, title: "Children", text: "Children’s church available during worship" },
    { icon: Car, title: "Parking", text: "Street parking with usher guidance" },
    { icon: Phone, title: "Questions", text: site.phone },
  ];

  return (
    <>
      <PageHero
        eyebrow="Plan a visit · Your first Sunday"
        title={
          <>
            Come as you are.
            <br />
            <span className="italic text-gold-soft">You belong here.</span>
          </>
        }
        copy={visit.intro}
        image="/images/hero-worship.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Kicker>01 / What to expect</Kicker>
            <h2 className="mt-6 max-w-lg text-[clamp(2.2rem,5vw,4rem)] leading-[0.96]">
              Simple, warm,
              <br />
              <span className="italic text-clay">and unhurried.</span>
            </h2>

            <div className="mt-10 space-y-0 border-t border-ink/10">
              {visit.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <div className="grid gap-3 border-b border-ink/10 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-[0.6rem] text-clay">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-tight">{step.title}</h3>
                      <p className="mt-2 max-w-lg text-[0.88rem] leading-relaxed text-muted">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {essentials.map((item) => (
                <div key={item.title} className="flex items-start gap-4 border border-ink/10 bg-paper p-5">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-clay" strokeWidth={1.4} />
                  <div>
                    <p className="font-display text-base leading-tight">{item.title}</p>
                    <p className="mt-1 text-[0.76rem] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Reveal variant="right">
              <div className="bg-ink p-7 text-ivory md:p-9">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.24em] text-gold-soft/80">
                    Countdown to Sunday
                  </p>
                  <Star className="h-3.5 w-3.5 text-gold" />
                </div>
                <div className="mt-7">
                  <NextService time={worshipStartTime(content)} />
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={100} className="mt-6">
              <div className="border border-ink/10 bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                  <Image
                    src="/images/church_building_enhanced.jpg"
                    alt="Ifako First Baptist Church building"
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="img-warm object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-deep">
                    Our address
                  </p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/80">
                    {contact.address}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(contact.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline !px-5 !py-2.5 !text-[0.62rem]"
                    >
                      Open in maps
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="link-line self-center text-[0.62rem] uppercase tracking-[0.16em] text-ink/55"
                    >
                      Call us
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-28">
        <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Kicker light>02 / Your first Sunday</Kicker>
            <h2 className="mt-6 max-w-sm text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[0.97]">
              Tell us
              <br />
              <span className="italic text-gold-soft">you’re coming.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-ivory/55">
              Let us know you are planning to visit so an usher can look out for you,
              and so we can answer any questions before you arrive.
            </p>
            <div className="mt-8 space-y-3">
              {services.map((service) => (
                <div key={service.name} className="flex items-baseline justify-between gap-4 border-b border-ivory/10 pb-2.5">
                  <span className="font-display text-base text-ivory/85">{service.name}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-gold-soft/75">
                    {service.day} · {service.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Reveal variant="right">
            <MessageForm type="visit" light />
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Kicker>03 / Good to know</Kicker>
            <h2 className="mt-6 max-w-sm text-[clamp(2rem,4.2vw,3.2rem)] leading-[0.98]">
              Questions,
              <br />
              <span className="italic text-clay">answered.</span>
            </h2>
            <ArchImage
              src="/images/worship-hands.jpg"
              alt="Hands raised in worship"
              className="mt-9 hidden aspect-[4/5] lg:block"
              sizes="30vw"
              overlay
              caption="Sunday worship"
            />
          </div>
          <div className="lg:pt-2">
            <Accordion items={faqs} />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-ink">
                Still have a question?
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/leadership" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                Meet the leaders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-ink/10 bg-bone">
        <div className="relative aspect-[16/9] md:aspect-[21/8]">
          <iframe
            title={`Map to ${site.name}`}
            src={mapSrc}
            className="h-full w-full opacity-90 grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="container-x flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ink/70">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-clay" /> {contact.address}
          </p>
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ink/65">
            See you Sunday
          </p>
        </div>
      </section>
    </>
  );
}
