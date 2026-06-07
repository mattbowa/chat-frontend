import type { MetadataRoute } from "next";

const siteUrl = "https://zebboy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/analytics",
          "/chat",
          "/conversations",
          "/documents",
          "/settings",
          "/snippet",
          "/widget/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
