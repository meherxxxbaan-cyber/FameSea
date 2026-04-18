import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api/", "/checkout/"],
      },
    ],
    sitemap: "https://socialqx.com/sitemap.xml",
    host: "https://socialqx.com",
  };
}
