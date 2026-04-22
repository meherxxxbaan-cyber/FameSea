import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { BuyNowButton } from "@/components/buy-now-button";
import { RevenueCalculator } from "@/components/revenue-calculator";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatNumber, formatPrice } from "@/lib/utils";
import {
  CheckCircle, Users, DollarSign, TrendingUp, ShoppingBag,
  Zap, MapPin, Star, Shield, Clock, ChevronRight, Eye,
  ImageIcon, AlertCircle,
} from "lucide-react";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = SEED_LISTINGS.find((x) => x.id === id);
  if (!l) return {};
  return {
    title: `${l.username} — ${l.platform} ${formatNumber(l.followers)} followers | FameSea`,
    description: `Buy ${l.username}. ${formatNumber(l.followers)} followers, ${l.engagement_rate}% engagement. Asking ${formatPrice(l.price)}. Escrow protected.`,
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = SEED_LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  const similar = SEED_LISTINGS.filter((l) => l.id !== id && l.platform === listing.platform).slice(0, 4);
  const platformFee = Math.round(listing.price * 0.05);
  const totalCost = listing.price + platformFee;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-5 flex-wrap">
          <Link href="/marketplace" className="hover:text-slate-900">Marketplace</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/platform/${listing.platform.toLowerCase()}`} className="hover:text-slate-900">{listing.platform}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900 font-medium">{listing.username}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-5">

            {/* Header card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="h-[100px] flex items-center px-6 gap-4 relative" style={{ background: listing.gradient }}>
                <div className="absolute inset-0 bg-black/25" />
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 flex-shrink-0">
                  <PlatformIcon platform={listing.platform} size={28} />
                </div>
                <div className="relative z-10">
                  <h1 className="text-2xl font-extrabold text-white">{listing.username}</h1>
                  <div className="text-white/70 text-sm">{listing.platform} · {listing.niche} · {listing.location}</div>
                </div>
              </div>

              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <Users className="h-5 w-5 text-indigo-500" />,   val: formatNumber(listing.followers),       label: "Followers",  green: false },
                  { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, val: formatPrice(listing.monthly_income), label: "Mo. Income", green: true  },
                  { icon: <TrendingUp className="h-5 w-5 text-blue-500" />, val: `${listing.engagement_rate}%`,         label: "Engagement", green: false },
                  { icon: <Eye className="h-5 w-5 text-slate-400" />,       val: `${((parseInt(id.replace("listing-","")) * 7) % 200) + 50}`, label: "Views today", green: false },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="flex justify-center mb-1.5">{s.icon}</div>
                    <div className={`font-bold text-lg ${s.green ? "text-emerald-600" : "text-slate-900"}`}>{s.val}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image gallery */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Screenshots & Proof</h2>
                {listing.verified_income && (
                  <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle className="h-3 w-3" /> Income Verified
                  </span>
                )}
              </div>

              {/* Main image */}
              <div className="bg-slate-100 rounded-xl aspect-video flex flex-col items-center justify-center mb-3 border border-slate-200">
                <ImageIcon className="h-12 w-12 text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm font-medium">Channel Analytics</p>
                <p className="text-slate-300 text-xs">Seller uploads screenshots after listing approval</p>
              </div>

              {/* Thumbnail row */}
              <div className="grid grid-cols-4 gap-2">
                {["Analytics", "Audience", "Revenue", "Content"].map((label) => (
                  <div key={label} className="bg-slate-100 rounded-lg aspect-square flex flex-col items-center justify-center border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
                    <ImageIcon className="h-5 w-5 text-slate-300 mb-1" />
                    <span className="text-[10px] text-slate-400">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                Sellers must upload real analytics screenshots before their listing goes live. Listings without verified screenshots are not published.
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {listing.verified_income && (
                <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <CheckCircle className="h-4 w-4" /> Verified Income
                </span>
              )}
              {listing.monetized && (
                <span className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Zap className="h-4 w-4" /> Monetized
                </span>
              )}
              {listing.tiktok_shop_eligible && (
                <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <ShoppingBag className="h-4 w-4" /> TikTok Shop Eligible
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-3">About This Account</h2>
              <p className="text-slate-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* ROI Calculator */}
            <RevenueCalculator monthlyIncome={listing.monthly_income} price={listing.price} />

            {/* Seller */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-4">Seller</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg flex-shrink-0">
                  {listing.seller_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{listing.seller_name}</div>
                  <div className="flex items-center gap-1.5 text-sm mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(listing.seller_rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-slate-600 font-medium">{listing.seller_rating}</span>
                    <span className="text-slate-400">· {listing.seller_sales} sales</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              </div>
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div>
                <h2 className="font-bold text-slate-900 mb-4">Similar {listing.platform} Accounts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similar.slice(0, 2).map((l) => <ListingCard key={l.id} listing={l} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right sticky */}
          <div>
            <div className="sticky top-20 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="text-3xl font-extrabold text-slate-900 mb-0.5">{formatPrice(listing.price)}</div>
                <div className="text-sm text-slate-400 mb-5">
                  Min offer: <span className="font-medium text-slate-600">{formatPrice(listing.minimum_offer)}</span>
                </div>
                <BuyNowButton listing={listing} />

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Account price</span><span>{formatPrice(listing.price)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Platform fee (5%)</span><span>{formatPrice(platformFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-100">
                    <span>Total</span><span className="text-emerald-600">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              </div>

              {/* Buyer protection */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-indigo-600" /> Buyer Protection
                </h3>
                <ul className="space-y-2">
                  {[
                    "Funds held in Stripe escrow",
                    "7-day full inspection period",
                    "100% refund if misrepresented",
                    "24/7 dispute resolution",
                    "All sellers KYC verified",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Viewers */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                <p className="text-sm text-amber-800 font-medium">
                  {((parseInt(id.replace("listing-","")) * 7) % 15) + 4} people viewing now
                </p>
                <Clock className="h-4 w-4 text-amber-400 ml-auto flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return SEED_LISTINGS.map((l) => ({ id: l.id }));
}
