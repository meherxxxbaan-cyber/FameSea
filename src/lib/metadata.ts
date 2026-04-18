import type { Metadata } from "next";

const BASE_URL = "https://socialqx.com";
const SITE_NAME = "SocialQX";
const DEFAULT_DESCRIPTION = "The safest marketplace to buy and sell TikTok, Instagram, YouTube, X, and Telegram accounts. Stripe escrow on every transaction. 4.98★ average rating.";

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}/og-default.png`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: "@SocialQX",
    },
    keywords: [
      "buy social media accounts",
      "sell instagram account",
      "tiktok account marketplace",
      "youtube channel for sale",
      "social media account escrow",
      "buy tiktok followers accounts",
    ],
  };
}
