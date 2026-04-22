import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

export const PLATFORMS = ["TikTok", "Instagram", "YouTube", "X", "Telegram", "Facebook", "Twitch", "Pinterest", "Snapchat", "Threads"] as const;
export type Platform = typeof PLATFORMS[number];

export const NICHES = ["Fitness", "Finance", "Beauty", "Gaming", "Travel", "Food", "Tech", "Lifestyle", "Business", "Crypto", "Sports", "Music"] as const;
export type Niche = typeof NICHES[number];

export const PLATFORM_GRADIENTS: Record<string, string> = {
  TikTok:    "linear-gradient(135deg, #010101 0%, #69C9D0 100%)",
  Instagram: "linear-gradient(135deg, #405DE6 0%, #E1306C 60%, #FFDC80 100%)",
  YouTube:   "linear-gradient(135deg, #1a1a1a 0%, #FF0000 100%)",
  X:         "linear-gradient(135deg, #000000 0%, #14171A 100%)",
  Telegram:  "linear-gradient(135deg, #0055aa 0%, #2AABEE 100%)",
  Discord:   "linear-gradient(135deg, #5865F2 0%, #7289DA 100%)",
  Facebook:  "linear-gradient(135deg, #1877F2 0%, #0C4A9E 100%)",
  Twitch:    "linear-gradient(135deg, #6441A4 0%, #9146FF 100%)",
  Pinterest: "linear-gradient(135deg, #E60023 0%, #B8001A 100%)",
  WeChat:    "linear-gradient(135deg, #07C160 0%, #05A34F 100%)",
  LinkedIn:  "linear-gradient(135deg, #0A66C2 0%, #004C8C 100%)",
  Snapchat:  "linear-gradient(135deg, #FFFC00 0%, #FFC400 100%)",
  Threads:   "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
};

export const PLATFORM_EMOJIS: Record<string, string> = {
  TikTok: "🎵", Instagram: "📸", YouTube: "▶️",
  X: "𝕏", Telegram: "✈️", Discord: "🎮",
  Facebook: "👥", Twitch: "📺",
};

export const NICHE_EMOJIS: Record<string, string> = {
  Fitness: "💪", Finance: "💰", Beauty: "💄", Gaming: "🎮",
  Travel: "✈️", Food: "🍕", Tech: "💻", Lifestyle: "✨",
  Business: "📊", Crypto: "₿", Sports: "⚽", Music: "🎸",
};
