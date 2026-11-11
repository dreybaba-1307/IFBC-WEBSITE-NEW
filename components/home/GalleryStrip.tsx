import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Marquee, Reveal } from "@/components/motion";
import type { SiteContent } from "@/lib/content";

function Strip({ items, reverse, speed }: { items: SiteContent["gallery"]; reverse?: boolean; speed: number }) {
  return (
    <Marquee speed={speed} reverse={reverse} className="py-2">
      {items.map((item, i) => (
        <Link
          href="/gallery"
          key={`${item.src}-${i}`}
          className="group relative mx-2 block h-[15rem] w-[11rem] shrink-0 overflow-hidden md:mx-3 md:h-[21rem] md:w-[16rem]"
          aria-label={`View gallery — ${item.caption}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="260px"
            className="img-warm object-cover grayscale-[0.55] transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ivory/75">
              {item.caption}
            </span>
            <Star className="h-2.5 w-2.5 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </Link>
      ))}
    </Marquee>
  );
}

export function GalleryStrip({ content }: { content: SiteContent }) {
  const first = content.gallery.slice(0, 6);
  const second = content.gallery.slice(6);

  return (
    <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker light>07 / Life at Ifako</Kicker>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.96]">
              Faith looks like
              <br />
              <span className="italic text-gold-soft">a family.</span>
            </h2>
          </div>
          <Link href="/gallery" className="link-line text-[0.7rem] uppercase tracking-[0.16em] text-ivory/70 hover:text-ivory">
            Open the gallery
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <Reveal variant="fade" className="mt-14">
        <Strip items={first} speed={52} />
        {second.length > 0 ? <Strip items={second} reverse speed={62} /> : null}
      </Reveal>

      <div className="container-x mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-6">
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ivory/35">
          Moments from the sanctuary &amp; beyond
        </p>
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-gold-soft/70">
          {content.gallery.length} frames · one story
        </p>
      </div>
    </section>
  );
}
