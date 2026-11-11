import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/store";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ifbclagos.org"),
  title: {
    default: "Ifako First Baptist Church — Sanctuary of Truth & Joy",
    template: "%s · Ifako First Baptist Church",
  },
  description:
    "A Baptist family in the heart of Ifako-Agege, Lagos. Rooted in faith, committed to community. Join us Sundays: Sunday School 9:00 AM, Worship 10:00 AM.",
  keywords: [
    "Ifako First Baptist Church",
    "Baptist church Lagos",
    "Ifako Agege church",
    "Nigerian Baptist Convention",
    "Sunday worship Lagos",
  ],
  openGraph: {
    title: "Ifako First Baptist Church — Sanctuary of Truth & Joy",
    description:
      "Rooted in faith. Committed to community. A Baptist family in the heart of Ifako-Agege, Lagos.",
    images: [{ url: "/images/hero-worship.jpg", width: 1800, height: 1200, alt: "Worship at Ifako First Baptist Church" }],
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifako First Baptist Church",
    description: "Sanctuary of Truth & Joy — Ifako-Agege, Lagos.",
    images: ["/images/hero-worship.jpg"],
  },
  icons: {
    icon: [{ url: "/images/logo_v3.png", type: "image/png" }],
    apple: "/images/logo_v3.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1410",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: content.site.name,
    alternateName: content.site.tagline,
    description: content.site.description,
    url: "https://www.ifbclagos.org",
    logo: "https://www.ifbclagos.org/images/logo_v3.png",
    image: "https://www.ifbclagos.org/images/hero-worship.jpg",
    telephone: content.site.phone,
    email: content.site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "23, Coker Street, off College Road, Ifako Agege",
      addressLocality: "Agege",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [
      content.site.socials.youtube,
      content.site.socials.instagram,
      content.site.socials.facebook,
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
