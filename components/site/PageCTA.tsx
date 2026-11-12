import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Star } from "@/components/ui";
import type { SiteContent } from "@/lib/content";

export function PageCTA({
  content,
  eyebrow = "Come and see",
  title = (
    <>
      There is a place
      <br />
      for you <span className="italic text-gold-soft">here.</span>
    </>
  ),
  copy = "No perfect story required. Come as you are, and find a family that will walk with you.",
  image = "/images/church_building_enhanced.jpg",
}: {
  content: SiteContent;
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  image?: string;
}) {
  const sunday = content.services.filter((s) => s.day.toLowerCase() === "sunday");
  const sundayTimes = sunday.length
    ? sunday.map((s) => s.time).join(" & ")
    : content.site.serviceTime;
  const sundayNames = sunday.length
    ? sunday.map((s) => s.name.replace(/\s*service$/i, "")).join(" · ")
    : "Sunday School · Worship";

  return (
    <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-gold-soft">
            <Star className="h-3 w-3" /> {eyebrow}
          </span>
          <h2 className="mt-6 max-w-2xl text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.96]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-[0.94rem] leading-relaxed text-ivory/60">{copy}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/visit" className="btn btn-gold">
              Plan a visit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline-light">
              Talk to us
            </Link>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div className="grid gap-6 border-t border-ivory/15 pt-8 sm:grid-cols-2 lg:justify-items-end">
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-soft/80">
                <Clock className="h-3.5 w-3.5" /> Sundays
              </p>
              <p className="mt-2 font-display text-xl">{sundayTimes}</p>
              <p className="mt-1 text-[0.75rem] text-ivory/45">{sundayNames}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-soft/80">
                <MapPin className="h-3.5 w-3.5" /> Find us
              </p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ivory/70">
                {content.contact.address}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-soft/80">
                <Phone className="h-3.5 w-3.5" /> Call the church
              </p>
              <a
                href={`tel:${content.site.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-block text-[0.9rem] text-ivory/70 hover:text-gold"
              >
                {content.site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
