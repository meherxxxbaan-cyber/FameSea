import { MetadataRoute } from "next";
import { SEED_LISTINGS } from "@/lib/seed-data";

const BASE = "https://socialqx.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/marketplace`,        lastModified: new Date(), changeFrequency: "hourly",  priority: 0.9 },
    { url: `${BASE}/sell`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fees`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/sales-ledger`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.6 },
    { url: `${BASE}/login`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/register`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/terms`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/privacy`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  const platform_pages: MetadataRoute.Sitemap = ["tiktok", "instagram", "youtube", "x", "telegram"].map((slug) => ({
    url: `${BASE}/platform/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const niche_pages: MetadataRoute.Sitemap = [
    "fitness", "finance", "beauty", "gaming", "travel", "food", "tech", "lifestyle",
    "business", "crypto", "sports", "music",
  ].map((slug) => ({
    url: `${BASE}/niche/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const listing_pages: MetadataRoute.Sitemap = SEED_LISTINGS.map((l) => ({
    url: `${BASE}/listing/${l.id}`,
    lastModified: new Date(l.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...static_pages, ...platform_pages, ...niche_pages, ...listing_pages];
}
