import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { Newsletter } from "./Newsletter";
import { Star } from "@/components/ui";
import type { SiteContent } from "@/lib/content";

const explore = [
  { label: "Our story", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const gather = [
  { label: "Plan your visit", href: "/visit" },
  { label: "Watch live", href: "/live" },
  { label: "Sermons", href: "/sermons" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ content }: { content: SiteContent }) {
  const { site, services } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="grain grain-dark relative overflow-hidden bg-ink text-ivory">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -right-56 -top-56 h-[46rem] w-[46rem] rounded-full border border-gold/5" />

      <div className="container-x relative z-10 pt-20 md:pt-28">
        <div className="grid gap-12 border-b border-ivory/10 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow text-gold">Come and see</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.98] text-ivory">
              There is a place
              <br />
              for you <span className="italic text-gold-soft">here.</span>
            </h2>
            <Link href="/visit" className="link-line mt-8 inline-flex text-sm text-ivory/70 hover:text-ivory">
              Plan your first Sunday
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col justify-end gap-7 lg:items-end">
            <div className="lg:text-right">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/35">
                Weekly gatherings
              </p>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.name} className="flex items-baseline gap-3 text-sm text-ivory/70 lg:justify-end">
                    <span className="font-display text-base text-ivory">{s.name}</span>
                    <span className="text-ivory/25">·</span>
                    <span className="font-mono text-[0.65rem] text-gold-soft/80">
                      {s.day} {s.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl text-ivory">{site.name}</p>
            <p className="mt-2 text-sm italic text-ivory/50">{site.tagline}</p>
            <address className="mt-6 flex items-start gap-3 text-sm not-italic leading-relaxed text-ivory/55">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" strokeWidth={1.4} />
              {site.address}
            </address>
            <div className="mt-5 flex flex-col gap-2 text-sm text-ivory/55">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4 text-gold/80" strokeWidth={1.4} /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
                <Mail className="h-4 w-4 text-gold/80" strokeWidth={1.4} /> {site.email}
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/35">Explore</p>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/35">Gather</p>
            <ul className="mt-5 space-y-3">
              {gather.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ivory/35">Stay close</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50">
              Monthly news, service changes, and words of encouragement — straight to your inbox.
            </p>
            <div className="mt-5">
              <Newsletter />
            </div>
            <div className="mt-7 flex items-center gap-3">
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
                  className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative select-none pt-4">
          <div className="flex items-end justify-between gap-4 overflow-hidden">
            <span className="text-stroke whitespace-nowrap font-display text-[clamp(5rem,21vw,19rem)] leading-[0.72] tracking-[-0.04em] text-ivory/25">
              IFBC
            </span>
            <Star className="mb-6 hidden h-8 w-8 shrink-0 text-gold/60 sm:block float-y" />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/10 py-7 text-[0.7rem] text-ivory/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. {site.footerNote}.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.ifbclagos.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gold"
            >
              <Clock className="h-3.5 w-3.5" /> Previous site
            </a>
            <Link href="/admin" className="hover:text-gold">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
