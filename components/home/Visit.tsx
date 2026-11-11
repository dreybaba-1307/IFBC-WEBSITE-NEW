import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

export function Visit({ content }: { content: SiteContent }) {
  const { contact, visit } = content;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery,
  )}&z=15&output=embed`;

  return (
    <section className="section relative overflow-hidden bg-bone">
      <div className="container-x relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <div>
            <Kicker>10 / Visit</Kicker>
            <h2 className="mt-6 max-w-lg text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.96]">
              Your first Sunday,
              <br />
              <span className="italic text-clay">made simple.</span>
            </h2>
            <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-muted">
              {visit.intro}
            </p>

            <div className="mt-9 space-y-5 border-t border-ink/10 pt-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div>
                  <p className="label">Find us</p>
                  <p className="mt-1 max-w-sm text-[0.9rem] leading-relaxed text-ink/80">
                    {contact.address}
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <div>
                    <p className="label">Office hours</p>
                    {contact.officeHours.map((h) => (
                      <p key={h.day} className="mt-1 text-[0.8rem] text-ink/70">
                        {h.day} · {h.time}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex flex-col gap-3">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-[0.82rem] text-ink/70 hover:text-clay"
                    >
                      <Phone className="h-3.5 w-3.5" /> {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-[0.82rem] text-ink/70 hover:text-clay"
                    >
                      <Mail className="h-3.5 w-3.5" /> {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/visit" className="btn btn-ink">
                Plan your visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                Send a message
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <Reveal variant="right" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[10rem] border border-ink/10 bg-ink">
              <iframe
                title={`Map to ${content.site.name}`}
                src={mapSrc}
                className="h-full w-full opacity-90 grayscale-[0.35]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 border border-ink/10 bg-ivory px-5 py-3 shadow-[0_20px_40px_-24px_rgba(14,20,16,0.5)]">
              <Star className="h-3.5 w-3.5 text-gold-deep" />
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ink/60">
                Ifako-Agege · Lagos
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-8 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {visit.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="group">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.56rem] text-clay">0{i + 1}</span>
                  <span className="h-px flex-1 bg-ink/15 transition-colors group-hover:bg-gold" />
                </div>
                <h3 className="mt-4 font-display text-xl leading-tight">{step.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
