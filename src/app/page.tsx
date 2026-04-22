import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { PLATFORM_GRADIENTS, formatNumber } from "@/lib/utils";
import {
  ShieldCheck, TrendingUp, Star, DollarSign, Lock,
  Search, CheckCircle, ArrowRight, Clock, Zap,
} from "lucide-react";

const PLATFORMS: { name: string; slug: string }[] = [
  { name: "TikTok",    slug: "tiktok"    },
  { name: "Instagram", slug: "instagram" },
  { name: "YouTube",   slug: "youtube"   },
  { name: "X",         slug: "x"         },
  { name: "Telegram",  slug: "telegram"  },
  { name: "Pinterest", slug: "pinterest" },
  { name: "LinkedIn",  slug: "linkedin"  },
  { name: "WeChat",    slug: "wechat"    },
  { name: "Discord",   slug: "discord"   },
  { name: "Snapchat",  slug: "snapchat"  },
  { name: "Threads",   slug: "threads"   },
  { name: "Facebook",  slug: "facebook"  },
  { name: "Twitch",    slug: "twitch"    },
];

const FEATURED    = SEED_LISTINGS.filter((l) => l.featured).slice(0, 6);
const RECENT      = SEED_LISTINGS.slice(0, 8);
const TOTAL_VALUE = SEED_LISTINGS.reduce((s, l) => s + l.price, 0);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F9FB" }}>
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-12">
          {/* Trust pill */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-semibold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              New marketplace · Zero fees for early sellers · Launching now
            </div>
          </div>

          <h1 className="text-center text-4xl sm:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
            Skip the grind.<br />
            <span className="text-indigo-600">Buy an audience today.</span>
          </h1>
          <p className="text-center text-[17px] text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Browse verified TikTok, Instagram, YouTube, X and Telegram accounts.
            Every transaction is protected by Stripe escrow.
          </p>

          {/* Search hero */}
          <Link href="/marketplace" className="block max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl px-5 py-3.5 cursor-pointer transition-all shadow-sm hover:shadow-lg group">
              <Search className="h-5 w-5 text-slate-400 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
              <span className="text-[15px] text-slate-400 flex-1 text-left">
                Search by platform, niche, username, location…
              </span>
              <span className="bg-indigo-600 text-white text-[13px] font-bold px-4 py-1.5 rounded-xl flex-shrink-0 group-hover:bg-indigo-700 transition-colors">
                Search →
              </span>
            </div>
          </Link>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
            {[
              { icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />, text: "Stripe Escrow Protected"  },
              { icon: <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />, text: "Lowest Fees in Market" },
              { icon: <Clock className="h-3.5 w-3.5 text-indigo-500" />, text: "7-Day Buyer Inspection"     },
              { icon: <CheckCircle className="h-3.5 w-3.5 text-blue-500" />, text: "All Sellers KYC Verified" },
            ].map((s) => (
              <div key={s.text} className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                {s.icon}{s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM TABS ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-2.5">
            <Link href="/marketplace"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[13px] font-semibold flex-shrink-0 hover:bg-indigo-700 transition-colors">
              <Zap className="h-3.5 w-3.5" /> All Accounts
            </Link>
            {PLATFORMS.map((p) => (
              <Link key={p.name} href={`/platform/${p.slug}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-medium flex-shrink-0 transition-colors group">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: PLATFORM_GRADIENTS[p.name] }}>
                  <PlatformIcon platform={p.name} size={12} />
                </span>
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-10">

        {/* ─── STATS ROW ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, bg: "bg-emerald-50", val: "0%",     label: "Seller Fees",         sub: "Free to list forever"     },
            { icon: <TrendingUp className="h-5 w-5 text-indigo-500" />,  bg: "bg-indigo-50",  val: "3%",     label: "Buyer Fee Only",      sub: "Lowest in the market"       },
            { icon: <Star className="h-5 w-5 text-amber-400" />,         bg: "bg-amber-50",   val: "7-Day",  label: "Buyer Protection",    sub: "Full refund guarantee"    },
            { icon: <Lock className="h-5 w-5 text-slate-500" />,         bg: "bg-slate-50",   val: "100%",   label: "Escrow Protected",    sub: "Every transaction"      },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
              <div className="text-xl font-extrabold text-slate-900">{s.val}</div>
              <div className="text-[12px] font-semibold text-slate-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ─── FEATURED ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-bold text-slate-900">⭐ Featured Accounts</h2>
              <p className="text-[13px] text-slate-400 mt-0.5">Hand-picked and verified by our team</p>
            </div>
            <Link href="/marketplace?featured=true"
              className="flex items-center gap-1 text-[13px] text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { n: "1", icon: "🔍", title: "Browse & Filter",   desc: "Search by platform, niche, followers, price and location" },
              { n: "2", icon: "🔒", title: "Secure Checkout",   desc: "Pay via Stripe. Funds are held in escrow — never released until you confirm" },
              { n: "3", icon: "🔑", title: "Receive Access",    desc: "Seller transfers credentials within 24 hours of payment" },
              { n: "4", icon: "✅", title: "Confirm & Done",    desc: "7 days to verify. Release funds when satisfied. Full refund if issues" },
            ].map((s) => (
              <div key={s.n} className="p-5 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <div className="font-bold text-[14px] text-slate-900">{s.title}</div>
                <div className="text-[12.5px] text-slate-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── RECENT ────────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-slate-900">🆕 Just Listed</h2>
            <Link href="/marketplace?sort=newest"
              className="flex items-center gap-1 text-[13px] text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Browse all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RECENT.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* ─── SELL CTA ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl bg-indigo-600 p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Have an account to sell?</h2>
              <p className="text-indigo-200 text-[15px]">Free to list · 3% only on sale · Escrow protected</p>
            </div>
            <Link href="/sell"
              className="flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors flex-shrink-0 text-[15px]">
              List Your Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
