import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sahityaniketan.org";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/catalogue",
    "/events",
    "/gallery",
    "/contact",
    "/membership",
    "/news",
    "/library",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/catalogue" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
