"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/content";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, [open, items.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full overflow-hidden bg-bone text-left focus-visible:outline-offset-4"
            style={{ breakInside: "avoid" }}
            aria-label={`Open image: ${item.alt}`}
          >
            <div className="relative overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={900}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i === 0}
                className={`h-auto w-full object-cover grayscale-[0.25] transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0 ${
                  item.span === "tall" ? "aspect-[3/4]" : item.span === "wide" ? "aspect-[4/3]" : ""
                }`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ivory/85">
                {item.caption}
              </span>
              <span className="font-mono text-[0.52rem] text-gold-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={items[open].alt}
          onClick={() => setOpen(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold md:left-8"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[open].src}
              alt={items[open].alt}
              width={1600}
              height={1100}
              sizes="90vw"
              className="mx-auto max-h-[78vh] w-auto object-contain"
              priority
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ivory/60">
              <span>{items[open].caption}</span>
              <span className="text-gold-soft">
                {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? i : (i + 1) % items.length));
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold md:right-8"
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
