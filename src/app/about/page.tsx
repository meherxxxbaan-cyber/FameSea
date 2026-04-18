import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, TrendingUp, Users, DollarSign, Zap, Heart, Globe, ArrowRight } from "lucide-react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About SocialQX — Mission, Team & Story | SocialQX",
  description: "SocialQX: $14M+ volume, 50,000+ users. Founded to make social media account trading safe.",
  alternates: { canonical: "https://socialqx.com/about" },
};




const TEAM = [
  { name: "Marcus Chen", role: "Co-founder & CEO", bg: "bg-indigo-100 text-indigo-700", initial: "M", bio: "Former Stripe engineer. Built payment escrow systems for 5 years before starting SocialQX." },
  { name: "Aisha Patel", role: "Co-founder & CTO", bg: "bg-violet-100 text-violet-700", initial: "A", bio: "Ex-Meta infrastructure engineer. Scaled platforms to 100M+ users. Obsessed with trust and safety." },
  { name: "Ryan Torres", role: "Head of Trust & Safety", bg: "bg-emerald-100 text-emerald-700", initial: "R", bio: "Former fraud investigator at PayPal. Reviews every dispute personally." },
  { name: "Lea Müller", role: "Head of Growth", bg: "bg-pink-100 text-pink-700", initial: "L", bio: "Built Fameswap to $2M ARR before joining us. Knows this space inside-out." },
];

const VALUES = [
  { icon: <ShieldCheck className="h-6 w-6" />, color: "text-indigo-600 bg-indigo-50", title: "Safety First", desc: "Every cent is escrowed. Every seller is KYC-verified. We will never compromise on buyer protection." },
  { icon: <Heart className="h-6 w-6" />, color: "text-pink-600 bg-pink-50", title: "Community-Driven", desc: "We listen to buyers and sellers. Our roadmap is 80% user-requested features." },
  { icon: <Globe className="h-6 w-6" />, color: "text-emerald-600 bg-emerald-50", title: "Globally Accessible", desc: "Stripe Connect covers 40+ countries. We're building for a global creator economy." },
  { icon: <Zap className="h-6 w-6" />, color: "text-amber-600 bg-amber-50", title: "Speed & Simplicity", desc: "Listing takes 5 minutes. Buying takes 2 clicks. We remove friction, not features." },
];

const MILESTONES = [
  { year: "2022", event: "SocialQX founded. First 10 listings go live.", color: "bg-slate-200" },
  { year: "2023 Q1", event: "Reached 1,000 completed transfers and $1M in volume.", color: "bg-indigo-200" },
  { year: "2023 Q3", event: "Launched Stripe Connect payouts. Dispute resolution team hired.", color: "bg-violet-200" },
  { year: "2024 Q1", event: "$5M volume milestone. 10,000 registered users.", color: "bg-blue-200" },
  { year: "2024 Q3", event: "Verified Income badge program launched. Compare tool shipped.", color: "bg-emerald-200" },
  { year: "2025", event: "$14M+ volume. 50,000+ users. 5 platforms. Growing every day.", color: "bg-amber-200" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white">69<span className="text-indigo-400">Swap</span></span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight">
            We&apos;re building the world&apos;s most trusted social media account marketplace.
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Founded in 2022, SocialQX has facilitated $14M+ in account transfers with a 4.98-star average rating. We exist to make buying and selling social accounts safe, fast, and fair.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { icon: <DollarSign className="h-5 w-5 text-emerald-500" />, value: "$14M+", label: "Total volume" },
            { icon: <TrendingUp className="h-5 w-5 text-indigo-500" />, value: "3,842", label: "Transfers completed" },
            { icon: <Users className="h-5 w-5 text-blue-500" />, value: "50,000+", label: "Registered users" },
            { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, value: "4.98★", label: "Avg review score" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">{s.icon}</div>
              <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full space-y-16">

        {/* Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">Our Mission</div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Making the creator economy liquid</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Millions of creators build valuable social media accounts, but the market to buy and sell them has always been risky — full of scams, disputes, and no protection. We changed that.
            </p>
            <p className="text-slate-600 leading-relaxed">
              SocialQX is the infrastructure layer for the social media account market. Stripe-powered escrow means buyers are protected, verified KYC means sellers are accountable, and our 7-day inspection window means every transaction is fair.
            </p>
          </div>
          <div className="space-y-3">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${v.color}`}>{v.icon}</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{v.title}</div>
                  <div className="text-slate-500 text-sm mt-0.5">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-6">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 pl-2">
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600 border-2 border-white shadow-sm z-10 mt-1 ${m.color}`} />
                  <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1">
                    <div className="text-xs font-bold text-indigo-600 mb-1">{m.year}</div>
                    <div className="text-slate-700 text-sm">{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Meet the Team</h2>
          <p className="text-slate-500 mb-8">A small, scrappy team obsessed with trust and creator economics.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEAM.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${t.bg}`}>
                  {t.initial}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-indigo-600 font-medium mb-1.5">{t.role}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{t.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Press */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">As Featured In</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["TechCrunch", "Forbes", "Entrepreneur", "The Verge", "Business Insider"].map((pub) => (
              <div key={pub} className="text-slate-300 font-black text-lg tracking-tight select-none">{pub}</div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-indigo-600 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Join the community</h2>
          <p className="text-indigo-200 mb-6">50,000+ creators trust SocialQX. Ready to buy or sell?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50" asChild>
              <Link href="/marketplace">Browse Accounts <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button size="lg" className="bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
