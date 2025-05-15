import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/private/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/*", "/private/*"],
      },
    ],
    sitemap: "https://workingtuner.com/sitemap.xml",
    host: "https://workingtuner.com",
  }
}
