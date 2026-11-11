import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for may have moved or no longer exists.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const content = await getContent();

  return (
    <>
      <Header
        name={content.site.name}
        tagline={content.site.tagline}
        logo={content.site.logo}
        serviceTime={content.site.serviceTime}
        socials={content.site.socials}
      />
      <main id="main">
        <section className="grain grain-dark relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-ivory">
          <Image
            src="/images/cathedral-light.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
          <div className="container-x relative z-10 py-32">
            <Kicker light>404 · Page not found</Kicker>
            <p className="mt-8 font-display text-[clamp(6rem,22vw,20rem)] leading-[0.7] tracking-[-0.05em] text-ivory/20">
              404
            </p>
            <h1 className="-mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96] md:-mt-10">
              This page has wandered,
              <br />
              <span className="italic text-gold-soft">but you are still welcome.</span>
            </h1>
            <p className="mt-6 max-w-md text-[0.93rem] leading-relaxed text-ivory/55">
              The page you are looking for may have moved or no longer exists. Let us
              help you find your way back home.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/" className="btn btn-gold">
                Back to home
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/visit" className="btn btn-outline-light">
                Plan a visit
              </Link>
            </div>
            <div className="mt-14 flex items-center gap-3 text-ivory/30">
              <Star className="h-3 w-3 text-gold/60" />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.26em]">
                Sanctuary of truth &amp; joy
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer content={content} />
    </>
  );
}
