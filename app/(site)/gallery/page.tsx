import type { Metadata } from "next";
import { PageHero, Kicker, Star } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { PageCTA } from "@/components/site/PageCTA";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Life at Ifako First Baptist Church — worship, fellowship, outreach, and the moments in between.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Gallery · Life at Ifako"
        title={
          <>
            Faith looks like
            <br />a <span className="italic text-gold-soft">family.</span>
          </>
        }
        copy="A few frames from the life of our church — Sunday mornings, shared meals, serving hands, and the joy of being together."
        image="/images/choir.jpg"
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Kicker>01 / Moments</Kicker>
              <h2 className="mt-6 max-w-xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96]">
                Ordinary days,
                <br />
                <span className="italic text-clay">holy ground.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
              Click any frame to view it larger. Use the arrow keys to move through
              the gallery.
            </p>
          </div>

          <div className="mt-12">
            <GalleryGrid items={content.gallery} />
          </div>

          <Reveal className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-ink/10 pt-10 text-center">
            <Star className="h-4 w-4 text-gold-deep" />
            <p className="max-w-lg font-display text-2xl italic leading-snug text-ink/80 md:text-3xl">
              “Let everything that has breath praise the LORD.”
            </p>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-muted">
              Psalm 150:6
            </p>
          </Reveal>
        </div>
      </section>

      <PageCTA
        content={content}
        eyebrow="Be part of the picture"
        title={
          <>
            Your story belongs
            <br />
            in <span className="italic text-gold-soft">this frame.</span>
          </>
        }
        copy="The best photos are yet to be taken — the ones with you in them. Join us this Sunday."
        image="/images/fellowship.jpg"
      />
    </>
  );
}
