import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sahityaniketan.org";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*", "/api/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
