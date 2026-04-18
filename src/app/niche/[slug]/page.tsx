import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { NICHES, NICHE_EMOJIS, formatPrice, formatNumber } from "@/lib/utils";
import type { Niche } from "@/lib/utils";
import { ArrowRight, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const NICHE_DESCRIPTIONS: Record<string, string> = {
  Fitness:   "Fitness accounts command premium brand deals with supplement, apparel, and equipment companies. High-income 25–40 demographic.",
  Finance:   "Finance and investing content has the highest CPM on every platform. Audiences are high-net-worth and respond well to premium offers.",
  Beauty:    "Beauty accounts have the most active brand deal market. Cosmetics brands pay $500–$50K per post to well-matched audiences.",
  Gaming:    "Gaming audiences skew young and highly engaged. Console makers, peripheral brands, and energy drinks pay top rates.",
  Travel:    "Travel accounts attract hotel, airline, and luggage brand partnerships. Post-pandemic demand for travel content is surging.",
  Food:      "Food accounts drive massive affiliate revenue through restaurant bookings, delivery apps, and kitchen equipment sales.",
  Tech:      "Tech review channels have the highest purchase intent traffic. Amazon Associates rates are 4–10% on big-ticket items.",
  Lifestyle: "Lifestyle is the broadest and most brand-friendly niche. Wide demographic appeal means diverse monetization options.",
  Business:  "Business and entrepreneur accounts attract B2B sponsors with high ticket values. Course sales convert extremely well.",
  Crypto:    "Crypto content has volatile but extremely high CPM. Project partnerships can pay $5K–$100K per sponsored post.",
  Sports:    "Sports accounts peak during seasons and events. Sportsbook, apparel, and equipment sponsors are always active.",
  Music:     "Music creators can monetize via streaming platform deals, merchandise, and live event promotions.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const niche = NICHES.find((n) => n.toLowerCase() === slug.toLowerCase());
  if (!niche) return {};
  return {
    title: `${niche} Social Media Accounts for Sale | SocialQX`,
    description: `Browse verified ${niche} accounts on TikTok, Instagram, YouTube, X, and Telegram. Escrow-protected. ${NICHE_DESCRIPTIONS[niche]}`,
    alternates: { canonical: `https://socialqx.com/niche/${slug}` },
  };
}

export default async function NichePage({ params }: Props) {
  const { slug } = await params;
  const niche = NICHES.find((n) => n.toLowerCase() === slug.toLowerCase()) as Niche | undefined;
  if (!niche) notFound();

  const listings = SEED_LISTINGS.filter((l) => l.niche === niche);
  const emoji = NICHE_EMOJIS[niche];
  const desc = NICHE_DESCRIPTIONS[niche];
  const avgPrice = listings.length ? Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length) : 0;
  const avgFollowers = listings.length ? Math.round(listings.reduce((s, l) => s + l.followers, 0) / listings.length) : 0;
  const platforms = [...new Set(listings.map((l) => l.platform))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/marketplace" className="hover:text-slate-900">Marketplace</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-900 font-medium">{niche}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-4xl flex-shrink-0">
              {emoji}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
                {niche} Accounts for Sale
              </h1>
              <p className="text-slate-600 max-w-2xl leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {platforms.map((p) => (
                  <Link key={p} href={`/marketplace?platform=${p}&niche=${niche}`}
                    className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors font-medium">
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            {[
              { icon: <TrendingUp className="h-4 w-4 text-indigo-500" />, value: `${listings.length}`, label: "Available" },
              { icon: <Users className="h-4 w-4 text-blue-500" />, value: formatNumber(avgFollowers), label: "Avg followers" },
              { icon: <DollarSign className="h-4 w-4 text-emerald-500" />, value: formatPrice(avgPrice), label: "Avg price" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-2">{s.icon}{s.label}</div>
                <div className="text-xl font-bold text-slate-900">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Other niches */}
        <div className="flex gap-2 flex-wrap mb-8">
          <span className="text-sm text-slate-500 mr-1 self-center">Other niches:</span>
          {NICHES.filter((n) => n !== niche).slice(0, 8).map((n) => (
            <Link key={n} href={`/niche/${n.toLowerCase()}`}
              className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-colors">
              {NICHE_EMOJIS[n]} {n}
            </Link>
          ))}
        </div>

        {listings.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">{listings.length} {niche} accounts</h2>
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/marketplace?niche=${niche}`}>Filter & sort</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">{emoji}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No {niche} listings right now</h3>
            <p className="text-slate-500 mb-6">Be the first to sell a {niche} account!</p>
            <Button asChild><Link href="/sell" className="gap-2">List Your Account <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return NICHES.map((n) => ({ slug: n.toLowerCase() }));
}
