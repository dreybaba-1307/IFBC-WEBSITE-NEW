import type { MetadataRoute } from "next";
import { getContent } from "@/lib/store";

const base = "https://www.ifbclagos.org";

// Read at request time so newly added events appear without a redeploy.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const staticRoutes = [
    "",
    "/about",
    "/leadership",
    "/ministries",
    "/events",
    "/gallery",
    "/sermons",
    "/give",
    "/contact",
    "/visit",
    "/live",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const eventRoutes = content.events.map((event) => ({
    url: `${base}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
