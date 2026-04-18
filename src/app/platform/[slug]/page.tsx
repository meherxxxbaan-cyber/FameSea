import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { PLATFORM_GRADIENTS, formatNumber, formatPrice } from "@/lib/utils";
import { ArrowRight, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react";

interface Props { params: Promise<{ slug: string }> }

const PLATFORM_MAP: Record<string, string> = {
  tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube",
  x: "X", telegram: "Telegram", discord: "Discord",
  facebook: "Facebook", twitch: "Twitch", pinterest: "Pinterest",
  wechat: "WeChat", linkedin: "LinkedIn", snapchat: "Snapchat", threads: "Threads",
};

const PLATFORM_INFO: Record<string, { tagline: string; description: string; why: string[] }> = {
  TikTok:    { tagline: "The fastest-growing platform", description: "TikTok accounts offer explosive growth potential, viral reach, and some of the highest engagement rates in social media. TikTok Shop-eligible accounts generate passive income.", why: ["Avg engagement 8–15%", "TikTok Shop monetization", "Viral algorithm favors new owners", "Young 18–34 premium audience"] },
  Instagram: { tagline: "The brand deal gold standard", description: "Instagram remains the top platform for influencer marketing. Established accounts command premium brand deals with Fashion, Beauty, and Fitness brands.", why: ["Brand deal rates $500–$10K/post", "Reels & Stories monetization", "Shoppable posts built-in", "Premium 25–45 demographic"] },
  YouTube:   { tagline: "Evergreen content, recurring revenue", description: "YouTube channels provide stable recurring AdSense income. Evergreen content generates revenue for years after publishing.", why: ["AdSense CPM $5–$25+", "Revenue compounds over time", "Highest sponsorship rates per view", "YouTube Premium revenue share"] },
  X:         { tagline: "High-value audiences, direct reach", description: "X accounts in Finance, Crypto and Tech niches have uniquely valuable high-income audiences. X Premium subscription revenue available.", why: ["Finance/Crypto CPM — highest on any platform", "X Premium subscription revenue", "Direct newsletter integration", "High-trust authority positioning"] },
  Telegram:  { tagline: "The subscription revenue machine", description: "Telegram channels with subscription models are pure cash-flow businesses. Crypto signals and finance channels generate $2K–$15K/month in recurring subscriptions.", why: ["Fully recurring subscription revenue", "No algorithm — guaranteed reach", "Premium channel monetization", "Global audience, zero censorship risk"] },
  Discord:   { tagline: "Community ownership at scale", description: "Discord servers with active communities are valuable assets for gaming brands, crypto projects, and online businesses seeking direct audience access.", why: ["Direct community access", "Subscription server monetization", "Bot and integration revenue", "High daily active user rate"] },
  Facebook:  { tagline: "The largest audience in the world", description: "Facebook pages and groups with established audiences offer access to the world's largest social network, especially valuable for the 30+ demographic.", why: ["3 billion+ user platform", "Strong 30–55 demographic", "Facebook Marketplace integration", "Highest local business reach"] },
  Pinterest: { tagline: "Visual discovery with purchase intent", description: "Pinterest users have 87% purchase intent — the highest of any social platform. Fashion, food, home decor and wedding accounts generate consistent affiliate revenue with evergreen pins that rank on Google for years.", why: ["87% purchase intent — highest on any platform", "Pins rank on Google for years", "Amazon affiliate earns $300-800/mo", "Female 25-45 premium shopping audience"] },
  WeChat:    { tagline: "The gateway to 1.3 billion Chinese consumers", description: "WeChat Official Accounts are the primary marketing channel for reaching Chinese consumers. Monetization through Mini Programs, brand deals, and subscriptions can generate $1K-5K/month for established accounts.", why: ["1.3 billion user ecosystem", "Mini-program store integration", "Brand deal rates $500-2000/post", "Highest CPM of any Asian platform"] },
  LinkedIn:  { tagline: "The highest-value B2B audience on earth", description: "LinkedIn audiences are professionals, executives, and decision-makers. CPM rates are 3-5x higher than any other platform. B2B SaaS, finance, and career content accounts generate significant sponsor and course revenue.", why: ["CPM $15-50+ (vs $2-5 on Instagram)", "C-suite and VP audience", "B2B sponsor deals $1K-5K/post", "Newsletter revenue potential"] },
  Snapchat:  { tagline: "Gen Z's daily habit — 4 billion snaps per day", description: "Snapchat reaches 90%+ of 13-24 year olds in developed markets. Snap Star accounts with established audiences access the Snap Creator Fund and brand partnerships targeting the hardest-to-reach demographic.", why: ["90%+ reach of 13-24 year olds", "Snap Star monetization program", "Brand deal rates growing fast", "Discover show partnership potential"] },
  Threads:   { tagline: "The fastest-growing platform — get in early", description: "Threads hit 300 million users in record time and is still in explosive growth. Early accounts are building massive followings with very low competition. Meta integration means Instagram cross-posting is built in.", why: ["Fastest-growing platform 2024-2025", "Meta ecosystem — Instagram integration", "Algorithm favoring early accounts", "Very low competition right now"] },
  Twitch:    { tagline: "Live streaming community ownership", description: "Twitch channels with established audiences and affiliate/partner status generate recurring revenue from subscriptions, bits, and brand sponsorships.", why: ["Subscription + bits revenue", "Affiliate/Partner program income", "Very loyal live community", "Gaming brand deal potential"] },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const platform = PLATFORM_MAP[slug.toLowerCase()];
  if (!platform) return {};
  return {
    title: `${platform} Accounts for Sale | SocialQX`,
    description: `Buy verified ${platform} accounts. Stripe escrow on every transaction. Browse listings by niche, followers, and price.`,
  };
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params;
  const platform = PLATFORM_MAP[slug.toLowerCase()];
  if (!platform) notFound();

  const listings = SEED_LISTINGS.filter((l) => l.platform === platform);
  const info = PLATFORM_INFO[platform] || { tagline: "", description: "", why: [] };
  const avgPrice = listings.length ? Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length) : 0;
  const avgFollowers = listings.length ? Math.round(listings.reduce((s, l) => s + l.followers, 0) / listings.length) : 0;
  const avgEngagement = listings.length ? (listings.reduce((s, l) => s + l.engagement_rate, 0) / listings.length).toFixed(1) : "0";
  const gradient = PLATFORM_GRADIENTS[platform] || "#6366f1";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-14" style={{ background: gradient }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{platform}</span>
          </nav>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/25 flex-shrink-0">
              <PlatformIcon platform={platform} size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">{platform} Accounts for Sale</h1>
              <p className="text-white/70 mt-1">{info.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { icon: <TrendingUp className="h-4 w-4" />, value: `${listings.length}`, label: "Available now" },
              { icon: <Users className="h-4 w-4" />, value: formatNumber(avgFollowers), label: "Avg followers" },
              { icon: <DollarSign className="h-4 w-4" />, value: formatPrice(avgPrice), label: "Avg price" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">{s.icon}{s.label}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Why {platform}?</h3>
              <ul className="space-y-2.5">
                {info.why.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Market Stats</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { l: "Listings", v: listings.length.toString() },
                  { l: "Avg engagement", v: `${avgEngagement}%` },
                  { l: "Avg price", v: formatPrice(avgPrice) },
                  { l: "Avg followers", v: formatNumber(avgFollowers) },
                ].map((s) => (
                  <div key={s.l} className="flex justify-between">
                    <span className="text-slate-500">{s.l}</span>
                    <span className="font-semibold text-slate-900">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5">
              <h3 className="font-bold text-indigo-900 mb-1 text-sm">Selling a {platform} account?</h3>
              <p className="text-xs text-indigo-600 mb-3">Free to list. Reach 50,000+ buyers today.</p>
              <Link href="/sell" className="flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                List for Free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{listings.length} {platform} accounts</h2>
              <Link href={`/marketplace?platform=${platform}`} className="text-sm text-indigo-600 font-medium hover:underline">
                Filter & sort →
              </Link>
            </div>
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-3">
                  <PlatformIcon platform={platform} size={48} />
                </div>
                <p className="text-slate-500">No {platform} listings right now. Check back soon!</p>
                <Link href="/sell" className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
                  Be the first to list <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(PLATFORM_MAP).map((slug) => ({ slug }));
}
