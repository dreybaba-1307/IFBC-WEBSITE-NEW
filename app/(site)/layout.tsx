import type { ReactNode } from "react";
import { Cursor, Preloader, ScrollProgress, SmoothScroll } from "@/components/motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const content = await getContent();

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Preloader label={content.site.name} tagline={content.site.tagline} />
      <Header
        name={content.site.name}
        tagline={content.site.tagline}
        logo={content.site.logo}
        serviceTime={content.site.serviceTime}
        socials={content.site.socials}
      />
      <main id="main">{children}</main>
      <Footer content={content} />
    </>
  );
}
