"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatNumber, formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/seed-data";
import { OfferModal } from "@/components/offer-modal";
import { PlatformIcon } from "@/components/platform-icons";
import { useWatchlist } from "@/hooks/useWatchlist";
import { CheckCircle, TrendingUp, Users, DollarSign, ShoppingBag, Zap, Star, GitCompare, Heart, BarChart2 } from "lucide-react";

interface Props {
  listing: Listing;
  compareSelected?: boolean;
  onCompareToggle?: (l: Listing) => void;
  showCompare?: boolean;
}

export function ListingCard({ listing, compareSelected, onCompareToggle, showCompare }: Props) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const { toggle, has, hydrated } = useWatchlist();
  const router = useRouter();
  const saved = hydrated && has(listing.id);
  const multipleOfIncome = listing.monthly_income > 0
    ? (listing.price / listing.monthly_income).toFixed(1) + "×"
    : null;

  const goToListing = () => router.push(`/listing/${listing.id}`);

  return (
    <>
      <div
        onClick={goToListing}
        className={`group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 ${
          compareSelected
            ? "ring-2 ring-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
            : "shadow-[0_1px_4px_rgba(0,0,0,0.08)] border border-slate-200"
        }`}
      >
        {/* Platform header */}
        <div className="relative h-20 flex items-center px-4 gap-3 overflow-hidden flex-shrink-0"
          style={{ background: listing.gradient }}>
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/25 flex-shrink-0">
            <PlatformIcon platform={listing.platform} size={20} />
          </div>

          <div className="relative z-10 flex-1 min-w-0">
            <div className="text-white font-bold text-sm leading-tight truncate">{listing.username}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-white/65 text-[11px]">{listing.platform}</span>
              <span className="text-white/40 text-[11px]">·</span>
              <span className="text-white/65 text-[11px]">{listing.niche}</span>
            </div>
          </div>

          {/* Action buttons - stop propagation so card click doesn't fire */}
          <div className="relative z-10 flex items-center gap-1 flex-shrink-0">
            <span className="text-base" title={listing.seller_country}>{listing.seller_flag}</span>
            {listing.featured && (
              <span className="bg-amber-400 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">TOP</span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); toggle(listing.id); }}
              className={`ml-1 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                saved ? "bg-red-500 text-white" : "bg-white/20 text-white/80 hover:bg-white/30"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
            </button>
            {showCompare && (
              <button
                onClick={(e) => { e.stopPropagation(); onCompareToggle?.(listing); }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  compareSelected ? "bg-indigo-500 text-white" : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
              >
                <GitCompare className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <Users className="h-3 w-3" />,     val: formatNumber(listing.followers),     label: "Followers",  green: false },
              { icon: <DollarSign className="h-3 w-3" />, val: formatPrice(listing.monthly_income), label: "Mo. Income", green: true  },
              { icon: <TrendingUp className="h-3 w-3" />, val: `${listing.engagement_rate}%`,       label: "Engagement", green: false },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center">
                <div className={`flex justify-center mb-1 ${s.green ? "text-emerald-400" : "text-slate-400"}`}>{s.icon}</div>
                <div className={`text-sm font-bold ${s.green ? "text-emerald-600" : "text-slate-900"}`}>{s.val}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {listing.verified_income && (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle className="h-2.5 w-2.5" /> Verified
              </span>
            )}
            {listing.monetized && (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                <Zap className="h-2.5 w-2.5" /> Monetized
              </span>
            )}
            {listing.tiktok_shop_eligible && (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full border border-violet-200">
                <ShoppingBag className="h-2.5 w-2.5" /> Shop
              </span>
            )}
            {listing.age_years >= 3 && (
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                ⏱ {listing.age_years}yr account
              </span>
            )}
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-auto">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-500">{listing.seller_rating}</span>
            <span>·</span>
            <span>{listing.seller_sales} sales</span>
            <span>·</span>
            <span className="font-medium text-slate-500 truncate max-w-[80px]">{listing.seller_name}</span>
            <span className="ml-auto">{listing.seller_flag}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="px-4 pb-4">
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between mb-3">
            <div>
              <div className="text-xl font-extrabold text-slate-900">{formatPrice(listing.price)}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Min {formatPrice(listing.minimum_offer)}
                {multipleOfIncome && <span className="ml-1 text-indigo-500 font-medium">· {multipleOfIncome} income</span>}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <BarChart2 className="h-3 w-3" />
              {formatNumber(listing.avg_views)} avg
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Buy Now — navigates to listing */}
            <Link
              href={`/listing/${listing.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold py-2.5 rounded-xl transition-colors"
            >
              Buy Now
            </Link>

            {/* Make Offer — opens modal */}
            <button
              onClick={(e) => { e.stopPropagation(); setOfferOpen(true); }}
              disabled={offerSent}
              className="flex items-center justify-center border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-[13px] font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60"
            >
              {offerSent ? "✓ Sent" : "Make Offer"}
            </button>
          </div>
        </div>
      </div>

      {offerOpen && (
        <OfferModal
          listing={listing}
          onClose={() => setOfferOpen(false)}
          onSubmit={() => { setOfferSent(true); setOfferOpen(false); }}
        />
      )}
    </>
  );
}
