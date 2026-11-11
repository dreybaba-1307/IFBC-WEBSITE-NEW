import type { Metadata } from "next";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MessageForm } from "@/components/site/MessageForm";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ifako First Baptist Church — address, phone, email, office hours, and a contact form.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const content = await getContent();
  const { contact, site, leadership } = content;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery,
  )}&z=15&output=embed`;

  const details = [
    {
      icon: MapPin,
      label: "Visit us",
      value: contact.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact.mapQuery)}`,
      external: true,
    },
    {
      icon: Phone,
      label: "Call the church",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      external: false,
    },
    {
      icon: Mail,
      label: "Email us",
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact · We would love to hear from you"
        title={
          <>
            Come and see.
            <br />
            <span className="italic text-gold-soft">Or just say hello.</span>
          </>
        }
        copy="Whether you have a question, a prayer request, or you are planning your first visit, our doors and our inbox are open."
        image="/images/church_building_enhanced.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Kicker>01 / Reach us</Kicker>
            <h2 className="mt-6 max-w-md text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.97]">
              A real person
              <br />
              will <span className="italic text-clay">answer.</span>
            </h2>

            <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
              {details.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group flex items-start gap-5 py-6"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-clay transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <item.icon className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="label block">{item.label}</span>
                    <span className="mt-1 block max-w-sm text-[0.92rem] leading-relaxed text-ink/80 group-hover:text-ink">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <p className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted">
                <Clock className="h-3.5 w-3.5 text-clay" /> Office hours
              </p>
              <ul className="mt-3 space-y-2">
                {contact.officeHours.map((h) => (
                  <li key={h.day} className="flex items-baseline justify-between gap-4 border-b border-ink/5 pb-2 text-[0.85rem]">
                    <span className="text-ink/70">{h.day}</span>
                    <span className="font-mono text-[0.7rem] text-ink/70">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Youtube, href: site.socials.youtube, label: "YouTube" },
                { icon: Instagram, href: site.socials.instagram, label: "Instagram" },
                { icon: Facebook, href: site.socials.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          <Reveal variant="right">
            <div className="border border-ink/10 bg-paper p-7 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Kicker>02 / Send a message</Kicker>
                  <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.02]">
                    How can we <span className="italic text-clay">pray for you?</span>
                  </h2>
                </div>
                <Star className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
              </div>
              <p className="mt-4 max-w-md text-[0.88rem] leading-relaxed text-muted">
                Fill in the form and someone from the pastorate or church office will
                respond as soon as possible. For urgent pastoral care, please call{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ink underline decoration-gold underline-offset-4">
                  {site.phone}
                </a>
                .
              </p>
              <div className="mt-8">
                <MessageForm type="contact" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-16">
          <Reveal className="relative overflow-hidden rounded-t-[10rem] border border-ink/10 bg-ink">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                title={`Map to ${site.name}`}
                src={mapSrc}
                className="h-full w-full opacity-90 grayscale-[0.35]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 bg-ink p-6 text-ivory sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Star className="h-3.5 w-3.5 text-gold" />
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/55">
                  Ifako-Agege · Lagos · Nigeria
                </p>
              </div>
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-gold-soft/70">
                Lead Pastor · {leadership.lead.name}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
