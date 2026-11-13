import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Keep this list complete. Every public route belongs here — including
 * /history and /trustees, which were previously missing.
 */
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/catalogue", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/history", changeFrequency: "monthly", priority: 0.8 },
  { path: "/trustees", changeFrequency: "yearly", priority: 0.7 },
  { path: "/library", changeFrequency: "monthly", priority: 0.8 },
  { path: "/membership", changeFrequency: "monthly", priority: 0.8 },
  { path: "/events", changeFrequency: "weekly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/news", changeFrequency: "weekly", priority: 0.7 },
  { path: "/stories", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ambajogai-smruti", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

/** Static story pages that currently ship in the repo's fallback content. */
const STORY_SLUGS = [
  "ambajogai-literary-heritage-mukundraj-dasopant",
  "80-years-of-sahitya-niketan-ambajogai",
  "vivekasindhu-modi-manuscripts-preservation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable build-time timestamp instead of a new Date() on every request.
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const storyEntries: MetadataRoute.Sitemap = STORY_SLUGS.map((slug) => ({
    url: absoluteUrl(`/stories/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...storyEntries];
}
