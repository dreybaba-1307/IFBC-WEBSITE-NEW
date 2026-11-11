import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { Rhythm } from "@/components/home/Rhythm";
import { ThemeYear } from "@/components/home/ThemeYear";
import { Leadership } from "@/components/home/Leadership";
import { Ministries } from "@/components/home/Ministries";
import { Events } from "@/components/home/Events";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { Testimonies } from "@/components/home/Testimonies";
import { Give } from "@/components/home/Give";
import { Visit } from "@/components/home/Visit";
import { Marquee } from "@/components/motion";
import { Star } from "@/components/ui";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sanctuary of Truth & Joy",
  description:
    "Ifako First Baptist Church — a Baptist family in Ifako-Agege, Lagos. Sunday worship 10:00 AM. Rooted in faith, committed to community.",
  alternates: { canonical: "/" },
};

const band = [
  "My year of Glorious Comeback",
  "Judges 11:6–9",
  "Sanctuary of Truth & Joy",
  "Ifako First Baptist Church",
  "Est. 1850 heritage",
];

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Hero content={content} />

      <div className="grain relative overflow-hidden border-y border-ink/10 bg-gold py-4 text-ink">
        <Marquee speed={54}>
          {band.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 pr-8 font-mono text-[0.66rem] uppercase tracking-[0.26em]"
            >
              {item}
              <Star className="h-3 w-3 opacity-45" />
            </span>
          ))}
        </Marquee>
      </div>

      <Welcome content={content} />
      <Rhythm content={content} />
      <ThemeYear content={content} />
      <Leadership content={content} />
      <Ministries content={content} />
      <Events content={content} />
      <GalleryStrip content={content} />
      <Testimonies content={content} />
      <Give content={content} />
      <Visit content={content} />
    </>
  );
}
