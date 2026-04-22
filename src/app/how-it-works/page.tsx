import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Search, CreditCard, Zap, CheckCircle, ShieldCheck,
  ArrowRight, Clock, AlertTriangle, DollarSign, Tag,
  Users, Star, Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — Escrow-Protected Account Trading | FameSea",
  description: "Learn how FameSea's Stripe escrow protects buyers and sellers. 7-day inspection period and 4.98-star trust rating.",
  alternates: { canonical: "https://socialqx.com/how-it-works" },
};

const BUYER_STEPS = [
  { step: "01", icon: <Search className="h-6 w-6" />, color: "bg-indigo-50 text-indigo-600", title: "Browse & Compare", desc: "Search thousands of verified accounts by platform, niche, followers, and price. Use the compare tool to evaluate up to 4 accounts side-by-side." },
  { step: "02", icon: <CreditCard className="h-6 w-6" />, color: "bg-violet-50 text-violet-600", title: "Pay into Escrow", desc: "Click Buy Now and pay via Stripe Checkout. Your funds are held securely in escrow — never released until you confirm the transfer." },
  { step: "03", icon: <Zap className="h-6 w-6" />, color: "bg-amber-50 text-amber-600", title: "Receive Credentials", desc: "The seller has 24 hours to provide login credentials. You communicate securely through your dashboard." },
  { step: "04", icon: <CheckCircle className="h-6 w-6" />, color: "bg-emerald-50 text-emerald-600", title: "Inspect & Confirm", desc: "You have a full 7-day inspection period to verify everything. Confirm receipt and funds release to the seller." },
];

const SELLER_STEPS = [
  { step: "01", icon: <Tag className="h-6 w-6" />, color: "bg-indigo-50 text-indigo-600", title: "Create Your Listing", desc: "Fill out our 5-step wizard. Add account details, upload analytics screenshots, and set your price. Always 100% free to list." },
  { step: "02", icon: <Users className="h-6 w-6" />, color: "bg-violet-50 text-violet-600", title: "Reach 50,000+ Buyers", desc: "Your listing goes live instantly. Featured listings get 5x more views." },
  { step: "03", icon: <DollarSign className="h-6 w-6" />, color: "bg-amber-50 text-amber-600", title: "Buyer Pays Escrow", desc: "When a buyer purchases, Stripe captures the funds. You transfer account credentials within 24 hours." },
  { step: "04", icon: <DollarSign className="h-6 w-6" />, color: "bg-emerald-50 text-emerald-600", title: "Get Paid", desc: "Once the buyer confirms (or after 7 days with no dispute), 97% of the sale price lands in your Stripe account." },
];

const FAQS = [
  { q: "What if the account doesn't match the listing?", a: "Open a dispute within 7 days. Our Trust & Safety team investigates and, if valid, issues a full refund." },
  { q: "How long does escrow hold last?", a: "Funds are held until you confirm receipt or for 7 days auto-release if no dispute is filed." },
  { q: "What is the platform fee?", a: "FameSea charges buyers a 5% fee on top of the listing price. Listing is free for sellers. No monthly fees." },
  { q: "How do sellers get paid?", a: "Sellers connect a Stripe account from their dashboard. Payouts (97% of sale) transfer directly to their bank." },
  { q: "Are sellers verified?", a: "All sellers are KYC-verified via Stripe Connect before listing. Verified Income badges mean we've confirmed stated earnings." },
  { q: "Can I make an offer below asking price?", a: "Yes. Every listing has a minimum offer floor set by the seller. Submit any offer above that floor." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" /> Stripe Escrow Protection
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            How <span className="text-indigo-600">FameSea</span> Works
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every transaction is protected by Stripe escrow. Buyers get a 7-day inspection period. Sellers are KYC-verified. The safest way to trade social media accounts.
          </p>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />, v: "100%", label: "Escrow Protected" },
            { icon: <Clock className="h-5 w-5 text-amber-500" />, v: "7 Days", label: "Inspection Period" },
            { icon: <Star className="h-5 w-5 fill-amber-400 text-amber-400" />, v: "New", label: "Safe & Secure" },
            { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, v: "Escrow", label: "Every Transaction" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              {s.icon}
              <span className="text-2xl font-extrabold text-slate-900">{s.v}</span>
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20 w-full">
        <section>
          <div className="text-center mb-10">
            <span className="inline-block mb-3 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">For Buyers</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Buy an Account in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BUYER_STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1">STEP {s.step}</div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button size="lg" asChild><Link href="/marketplace" className="gap-2">Browse Listings <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </section>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center"><span className="bg-[#fafafa] px-4 text-slate-400 text-sm">or</span></div>
        </div>

        <section>
          <div className="text-center mb-10">
            <span className="inline-block mb-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">For Sellers</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Sell Your Account in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SELLER_STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1">STEP {s.step}</div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button size="lg" variant="secondary" asChild><Link href="/sell" className="gap-2">List for Free <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            <Lock className="inline h-6 w-6 text-indigo-600 mr-2 -mt-1" />How Escrow Protects You
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {[
              { label: "Buyer pays", icon: "💳", sub: "Stripe Checkout" },
              { label: "Funds held", icon: "🔒", sub: "Escrow (FameSea)" },
              { label: "Account transferred", icon: "🔑", sub: "Seller → Buyer" },
              { label: "Buyer confirms", icon: "✅", sub: "7-day window" },
              { label: "Seller paid", icon: "💸", sub: "97% of sale" },
            ].map((node, i) => (
              <div key={node.label} className="flex sm:flex-col items-center gap-3 sm:gap-2">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0">{node.icon}</div>
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-900">{node.label}</div>
                  <div className="text-[10px] text-slate-400">{node.sub}</div>
                </div>
                {i < 4 && <ArrowRight className="h-4 w-4 text-slate-300 hidden sm:block flex-shrink-0" />}
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>If a buyer opens a dispute within 7 days, funds are frozen until our team investigates. Valid disputes result in a full refund.</span>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-600 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to get started?</h2>
          <p className="text-indigo-200 mb-8">Join buyers and sellers on the safest social media account marketplace.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="xl" className="bg-white text-indigo-700 hover:bg-indigo-50" asChild><Link href="/marketplace">Browse Accounts</Link></Button>
            <Button size="xl" className="bg-indigo-500 text-white hover:bg-indigo-400 border border-indigo-400" asChild><Link href="/sell">Sell an Account</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
