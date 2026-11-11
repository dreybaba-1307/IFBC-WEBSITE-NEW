import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 0c.6 6.7 4.7 10.8 12 12-7.3 1.2-11.4 5.3-12 12-.6-6.7-4.7-10.8-12-12C7.3 10.8 11.4 6.7 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" fill="none" className={className} aria-hidden>
      <path d="M12 0v40M2 12h20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M5 15 15 5M6.5 5H15v8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 3v14M4.5 11.5 10 17l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Kicker({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-3 ${
        light ? "text-gold-soft" : "text-gold-deep"
      } ${className}`}
    >
      <span
        className={`h-px w-7 ${light ? "bg-gold/60" : "bg-gold-deep/50"}`}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function Logo({
  src,
  name,
  tagline,
  light = false,
  className = "",
}: {
  src: string;
  name: string;
  tagline: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
    >
      <span
        className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border ${
          light ? "border-ivory/25 bg-ivory/10" : "border-ink/10 bg-paper"
        } transition-colors duration-500 group-hover:border-gold`}
      >
        <Image
          src={src}
          alt=""
          width={44}
          height={46}
          className="h-8 w-auto object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.02rem] font-medium tracking-tight sm:text-[1.12rem] ${
            light ? "text-ivory" : "text-ink"
          }`}
        >
          Ifako First Baptist
        </span>
        <span
          className={`mt-1 font-mono text-[0.52rem] uppercase tracking-[0.28em] ${
            light ? "text-gold-soft/80" : "text-gold-deep"
          }`}
        >
          {tagline}
        </span>
      </span>
    </Link>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  copy,
  link,
  light = false,
  align = "left",
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  link?: { label: string; href: string };
  light?: boolean;
  align?: "left" | "between";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-6">
        <Kicker light={light}>
          {index ? <span className="opacity-50">{index} / </span> : null}
          {eyebrow}
        </Kicker>
        {link ? (
          <Link
            href={link.href}
            className={`link-line hidden shrink-0 text-[0.7rem] uppercase tracking-[0.16em] sm:inline-flex ${
              light ? "text-ivory/70 hover:text-ivory" : "text-ink/60 hover:text-ink"
            }`}
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
      <div
        className={`mt-7 ${
          align === "between"
            ? "grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-end"
            : ""
        }`}
      >
        <h2
          className={`max-w-4xl text-[clamp(2.1rem,5vw,4.4rem)] leading-[0.98] ${
            light ? "text-ivory" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {copy ? (
          <p
            className={`max-w-md text-[0.95rem] leading-relaxed md:justify-self-end ${
              light ? "text-ivory/60" : "text-muted"
            }`}
          >
            {copy}
          </p>
        ) : null}
      </div>
      {link ? (
        <Link
          href={link.href}
          className={`link-line mt-8 inline-flex text-[0.7rem] uppercase tracking-[0.16em] sm:hidden ${
            light ? "text-ivory/70" : "text-ink/60"
          }`}
        >
          {link.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

export function ArchImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlay = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className="arch relative h-full w-full bg-bone">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`img-warm object-cover ${imgClassName}`}
        />
        {overlay ? (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        ) : null}
        {caption ? (
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ivory/80">
            <span>{caption}</span>
            <Star className="h-2.5 w-2.5 text-gold" />
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  align = "bottom",
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  image: string;
  align?: "bottom" | "center";
}) {
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-ink pb-14 pt-40 text-ivory md:min-h-[74vh] md:pb-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="img-warm object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(194,160,90,0.16),transparent_55%)]" />
      <div className="container-x relative z-10">
        <Kicker light>{eyebrow}</Kicker>
        <h1
          className={`mt-7 max-w-5xl text-[clamp(2.7rem,7.5vw,7rem)] leading-[0.95] ${
            align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {title}
        </h1>
        {copy ? (
          <p
            className={`mt-7 max-w-xl text-[0.98rem] leading-relaxed text-ivory/65 ${
              align === "center" ? "mx-auto text-center" : ""
            }`}
          >
            {copy}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 60 80" fill="none" className="h-full w-auto" aria-hidden>
        <path
          d="M30 2C13.5 2 4 14 4 30v48h52V30C56 14 46.5 2 30 2Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M30 22v34M20 32h20" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </span>
  );
}
