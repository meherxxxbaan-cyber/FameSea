import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatPrice, formatNumber, PLATFORM_GRADIENTS, PLATFORM_EMOJIS } from "@/lib/utils";
import type { Platform } from "@/lib/utils";
import {
  LayoutDashboard, Users, Tag, DollarSign, ShieldCheck,
  TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye,
  Settings, BarChart3, MessageSquare,
} from "lucide-react";

const PENDING_VERIFICATIONS = SEED_LISTINGS.slice(0, 5).map((l) => ({
  ...l,
  submitted_at: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
}));

const DISPUTES = [
  { id: "D-001", buyer: "Buyer4821", seller: "SocialPro", amount: 12000, reason: "Followers dropped 40% after transfer", status: "open", opened: "2h ago" },
  { id: "D-002", buyer: "Buyer2193", seller: "AccountKing", amount: 4500, reason: "Monthly income lower than stated", status: "investigating", opened: "1d ago" },
  { id: "D-003", buyer: "Buyer7742", seller: "GrowthLabs", amount: 31000, reason: "Account had undisclosed strikes", status: "resolved_refund", opened: "3d ago" },
];

const PLATFORM_STATS = ["TikTok", "Instagram", "YouTube", "X", "Telegram"].map((p) => {
  const listings = SEED_LISTINGS.filter((l) => l.platform === p);
  return {
    platform: p as Platform,
    count: listings.length,
    volume: listings.reduce((s, l) => s + l.price, 0),
    avgPrice: Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length),
  };
});

function timeAgo(dateStr: string) {
  const h = Math.floor((Date.now() - new Date(dateStr).getTime()) / 3600000);
  return h < 1 ? "< 1h ago" : `${h}h ago`;
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Admin navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">SocialQX</span>
          <span className="text-slate-500 text-sm">·</span>
          <span className="text-sm text-slate-400">Admin Console</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400">admin@socialqx.com</span>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">Sign out</Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-52 bg-slate-900 min-h-[calc(100vh-56px)] border-r border-slate-800 p-4 hidden md:block">
          <nav className="space-y-1">
            {[
              { icon: <LayoutDashboard className="h-4 w-4" />, label: "Overview", active: true },
              { icon: <Tag className="h-4 w-4" />, label: "Listings" },
              { icon: <Users className="h-4 w-4" />, label: "Users" },
              { icon: <DollarSign className="h-4 w-4" />, label: "Transactions" },
              { icon: <AlertTriangle className="h-4 w-4" />, label: "Disputes", badge: "3" },
              { icon: <ShieldCheck className="h-4 w-4" />, label: "Verifications", badge: "5" },
              { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
              { icon: <MessageSquare className="h-4 w-4" />, label: "Support" },
              { icon: <Settings className="h-4 w-4" />, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  item.active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">Overview</h1>
            <p className="text-slate-400 text-sm mt-0.5">Platform health at a glance</p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Volume",       value: "$14.2M",  change: "+12.4%", icon: <DollarSign className="h-5 w-5" />, color: "text-emerald-400" },
              { label: "Active Listings",    value: "5,214",   change: "+8.1%",  icon: <Tag className="h-5 w-5" />,        color: "text-indigo-400" },
              { label: "Registered Users",   value: "50,182",  change: "+23.7%", icon: <Users className="h-5 w-5" />,      color: "text-blue-400" },
              { label: "Avg Rating",         value: "4.98★",   change: "stable", icon: <TrendingUp className="h-5 w-5" />, color: "text-amber-400" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                <div className={`mb-3 ${kpi.color}`}>{kpi.icon}</div>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="text-xs text-slate-400 mt-1">{kpi.label}</div>
                <div className={`text-xs mt-1 font-medium ${kpi.change.startsWith("+") ? "text-emerald-400" : "text-slate-400"}`}>
                  {kpi.change} this month
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Active disputes */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" /> Active Disputes
                </h2>
                <Badge className="bg-red-500/20 text-red-400 text-xs border border-red-500/30">{DISPUTES.length}</Badge>
              </div>
              <div className="divide-y divide-slate-700">
                {DISPUTES.map((d) => (
                  <div key={d.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-xs font-mono text-slate-400">{d.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        d.status === "open" ? "bg-red-500/20 text-red-400"
                        : d.status === "investigating" ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {d.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-white mb-1">{d.reason}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{d.buyer} → {d.seller}</span>
                      <span className="text-emerald-400 font-medium">{formatPrice(d.amount)}</span>
                      <span className="ml-auto">{d.opened}</span>
                    </div>
                    {d.status === "open" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="destructive" className="text-xs h-7 px-2.5 bg-red-600 hover:bg-red-700">Refund Buyer</Button>
                        <Button size="sm" className="text-xs h-7 px-2.5 bg-indigo-600 hover:bg-indigo-700">Release to Seller</Button>
                        <Button size="sm" variant="ghost" className="text-xs h-7 px-2.5 text-slate-400">Investigate</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending verifications */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-400" /> Pending Verifications
                </h2>
                <Badge className="bg-indigo-500/20 text-indigo-400 text-xs border border-indigo-500/30">5</Badge>
              </div>
              <div className="divide-y divide-slate-700">
                {PENDING_VERIFICATIONS.map((l) => (
                  <div key={l.id} className="px-5 py-3 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: PLATFORM_GRADIENTS[l.platform as Platform] }}
                    >
                      {PLATFORM_EMOJIS[l.platform as Platform]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{l.username}</div>
                      <div className="text-xs text-slate-400">{l.platform} · {formatPrice(l.monthly_income)}/mo · {timeAgo(l.submitted_at)}</div>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors">
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 flex items-center justify-center transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-700">
              <h2 className="font-semibold text-white text-sm">Platform Breakdown</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
                    <th className="text-left py-3 px-5">Platform</th>
                    <th className="text-right py-3 px-4">Listings</th>
                    <th className="text-right py-3 px-4">Total Value</th>
                    <th className="text-right py-3 px-4">Avg Price</th>
                    <th className="text-right py-3 px-4">Market Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {PLATFORM_STATS.map((p) => {
                    const totalValue = PLATFORM_STATS.reduce((s, x) => s + x.volume, 0);
                    const pct = Math.round((p.volume / totalValue) * 100);
                    return (
                      <tr key={p.platform} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                              style={{ background: PLATFORM_GRADIENTS[p.platform] }}>
                              <PlatformIcon platform={p.platform} size={14} />
                            </div>
                            <span className="text-sm text-white font-medium">{p.platform}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right text-sm text-slate-300">{p.count}</td>
                        <td className="py-3.5 px-4 text-right text-sm text-emerald-400 font-medium">{formatPrice(p.volume)}</td>
                        <td className="py-3.5 px-4 text-right text-sm text-slate-300">{formatPrice(p.avgPrice)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
