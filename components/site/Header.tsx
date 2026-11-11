"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Instagram, Menu, X, Youtube, Facebook } from "lucide-react";
import { Logo, ArrowUpRight } from "@/components/ui";

const nav = [
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Gallery", href: "/gallery" },
];

export function Header({
  name,
  tagline,
  logo,
  serviceTime,
  socials,
}: {
  name: string;
  tagline: string;
  logo: string;
  serviceTime: string;
  socials: { youtube: string; instagram: string; facebook: string };
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = !isHome || scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          solid
            ? "border-b border-ink/10 bg-ivory/90 backdrop-blur-xl"
            : "border-b border-ivory/10 bg-transparent"
        }`}
      >
        <div className="container-x flex h-[5.25rem] items-center justify-between gap-6">
          <Logo src={logo} name={name} tagline={tagline} light={!solid} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors ${
                    solid
                      ? active
                        ? "text-ink"
                        : "text-ink/55 hover:text-ink"
                      : active
                        ? "text-ivory"
                        : "text-ivory/65 hover:text-ivory"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/give"
              className={`hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors sm:block ${
                solid ? "text-ink/55 hover:text-ink" : "text-ivory/70 hover:text-ivory"
              }`}
            >
              Give
            </Link>
            <Link
              href="/visit"
              className={`btn hidden !px-5 !py-3 sm:inline-flex ${
                solid ? "btn-ink" : "btn-outline-light"
              }`}
            >
              Plan a visit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                solid
                  ? "border-ink/15 text-ink hover:border-gold"
                  : "border-ivory/25 text-ivory hover:border-gold"
              }`}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / overlay menu */}
      <div
        className={`fixed inset-0 z-[80] bg-ink text-ivory transition-[clip-path] duration-700 ease-[cubic-bezier(.83,0,.17,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="container-x flex h-[5.25rem] items-center justify-between">
          <Logo src={logo} name={name} tagline={tagline} light />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <div className="container-x grid h-[calc(100%-5.25rem)] grid-rows-[1fr_auto] gap-10 pb-10">
          <nav className="flex flex-col justify-center" aria-label="Mobile">
            {[...nav, { label: "Give", href: "/give" }, { label: "Visit", href: "/visit" }].map(
              (item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-baseline justify-between border-b border-ivory/10 py-3.5 transition-colors hover:text-gold"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(24px)",
                    opacity: open ? 1 : 0,
                    transition: `transform .8s cubic-bezier(.16,1,.3,1) ${i * 55 + 150}ms, opacity .6s ease ${i * 55 + 150}ms, color .3s ease`,
                  }}
                >
                  <span className="font-display text-[clamp(2rem,9vw,3.4rem)] leading-none">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.6rem] text-ivory/30">
                    0{i + 1}
                  </span>
                </Link>
              ),
            )}
          </nav>

          <div className="space-y-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-gold">
              {serviceTime}
            </p>
            <div className="flex items-center gap-5 text-ivory/50">
              <a href={socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-gold">
                <Youtube className="h-5 w-5" strokeWidth={1.4} />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">
                <Instagram className="h-5 w-5" strokeWidth={1.4} />
              </a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold">
                <Facebook className="h-5 w-5" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
