"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatPrice, formatNumber } from "@/lib/utils";
import {
  ShoppingCart, Tag, Bell, Users, Copy, CheckCircle,
  Clock, AlertTriangle, DollarSign, TrendingUp, ExternalLink,
  ChevronRight, Zap
} from "lucide-react";

const MY_LISTINGS = SEED_LISTINGS.slice(0, 4);
const MY_PURCHASES = SEED_LISTINGS.slice(4, 7);
const NOTIFICATIONS = [
  { id: 1, type: "offer", icon: "💰", title: "New offer on @fitnessdaily", body: "Buyer offered $12,500 (asking $15,000)", time: "2m ago", read: false },
  { id: 2, type: "sale", icon: "🎉", title: "Your listing sold!", body: "@gamingpro2024 sold for $8,400. Payout pending.", time: "1h ago", read: false },
  { id: 3, type: "review", icon: "⭐", title: "New 5-star review", body: "Buyer left you a 5-star review.", time: "3h ago", read: true },
  { id: 4, type: "system", icon: "🔔", title: "Inspection period ending soon", body: "You have 24h left to confirm your purchase.", time: "1d ago", read: true },
];

type Tab = "buying" | "selling" | "notifications" | "referrals";

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("selling");
  const [copied, setCopied] = useState(false);

  const copyReferral = () => {
    navigator.clipboard.writeText("https://69swap.com?ref=USER123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NAV_TABS = [
    { id: "selling" as Tab, label: "Selling", icon: <Tag className="h-4 w-4" /> },
    { id: "buying" as Tab, label: "Buying", icon: <ShoppingCart className="h-4 w-4" /> },
    { id: "notifications" as Tab, label: "Notifications", icon: <Bell className="h-4 w-4" />, badge: 2 },
    { id: "referrals" as Tab, label: "Referrals", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, Seller123 👋</p>
          </div>
          <Button asChild>
            <Link href="/sell" className="gap-2"><Zap className="h-4 w-4" /> New Listing</Link>
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: "$24,800", icon: <DollarSign className="h-5 w-5 text-emerald-500" />, color: "text-emerald-600" },
            { label: "Active Listings", value: "4", icon: <Tag className="h-5 w-5 text-indigo-500" />, color: "text-indigo-600" },
            { label: "Completed Sales", value: "12", icon: <CheckCircle className="h-5 w-5 text-blue-500" />, color: "text-blue-600" },
            { label: "Avg Rating", value: "4.9★", icon: <TrendingUp className="h-5 w-5 text-amber-500" />, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-slate-500">{s.label}</span></div>
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Stripe connect banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-indigo-900">Connect Stripe to receive payouts</div>
              <div className="text-sm text-indigo-600">Set up Stripe Connect to withdraw your earnings directly to your bank account.</div>
            </div>
          </div>
          <Button size="sm" className="flex-shrink-0 gap-1">
            Connect Stripe <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          {NAV_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                tab === t.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.icon}{t.label}
              {t.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selling tab */}
        {tab === "selling" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Your Listings</h2>
              <Badge variant="indigo">{MY_LISTINGS.length} active</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="text-left py-3 px-6">Account</th>
                    <th className="text-left py-3 px-4">Followers</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Views</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {MY_LISTINGS.map((l, i) => (
                    <tr key={l.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: l.gradient }}>
                            <PlatformIcon platform={l.platform} size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{l.username}</div>
                            <div className="text-xs text-slate-400">{l.platform} · {l.niche}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-700">{formatNumber(l.followers)}</td>
                      <td className="py-4 px-4 text-sm font-bold text-emerald-600">{formatPrice(l.price)}</td>
                      <td className="py-4 px-4 text-sm text-slate-500">{Math.floor(Math.random() * 500 + 50)}</td>
                      <td className="py-4 px-4"><Badge variant="success" className="text-xs">Active</Badge></td>
                      <td className="py-4 px-4">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/listing/${l.id}`}><ExternalLink className="h-4 w-4" /></Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Buying tab */}
        {tab === "buying" && (
          <div className="space-y-4">
            {MY_PURCHASES.map((l) => (
              <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: l.gradient }}>
                  <PlatformIcon platform={l.platform} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">{l.username}</span>
                    <Badge variant="warning" className="text-xs gap-1"><Clock className="h-3 w-3" /> Inspection Period</Badge>
                  </div>
                  <div className="text-sm text-slate-500">{l.platform} · {formatPrice(l.price)}</div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                    <Clock className="h-3 w-3" /> 5 days left to confirm
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="success" className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Confirm
                  </Button>
                  <Button size="sm" variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> Dispute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notifications tab */}
        {tab === "notifications" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {NOTIFICATIONS.map((n, i) => (
              <div key={n.id} className={`flex items-start gap-4 px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.read ? "bg-indigo-50/40" : ""}`}>
                <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{n.title}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{n.body}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Referrals tab */}
        {tab === "referrals" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Your Referral Link</h3>
              <p className="text-sm text-slate-500 mb-4">Earn 1% of every sale made by users you refer.</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 font-mono truncate">
                  https://69swap.com?ref=USER123
                </div>
                <Button variant="secondary" size="sm" onClick={copyReferral} className="gap-1 flex-shrink-0">
                  {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Referral Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Total referrals", value: "7" },
                  { label: "Transactions from referrals", value: "3" },
                  { label: "Total earned", value: "$248" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="font-bold text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
