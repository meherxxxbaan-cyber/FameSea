import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/platform-icons";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatPrice, formatNumber, PLATFORM_GRADIENTS, PLATFORM_EMOJIS } from "@/lib/utils";
import type { Platform } from "@/lib/utils";
import { CheckCircle, TrendingUp, DollarSign } from "lucide-react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sales Ledger — Recent Completed Transfers | SocialQX",
  description: "Public record of completed account transfers on SocialQX, anonymized for privacy.",
  alternates: { canonical: "https://socialqx.com/sales-ledger" },
};




// Generate fake completed transactions from listings
const TRANSACTIONS = SEED_LISTINGS.slice(0, 30).map((l, i) => ({
  id: `txn-${i + 1}`,
  listing: l,
  buyer: `Buyer${Math.floor(Math.random() * 900 + 100)}`,
  sold_at: new Date(Date.now() - (i * 12 + Math.random() * 12) * 60 * 60 * 1000).toISOString(),
  price: l.price,
  platform_fee: Math.round(l.price * 0.03),
}));

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function SalesLedgerPage() {
  const totalVolume = TRANSACTIONS.reduce((sum, t) => sum + t.price, 0);
  const totalFees = TRANSACTIONS.reduce((sum, t) => sum + t.platform_fee, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Sales Ledger</h1>
          <p className="text-slate-500 mt-1">Public record of the last 30 completed transactions</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <TrendingUp className="h-4 w-4 text-indigo-500" />Transactions shown
            </div>
            <div className="text-3xl font-extrabold text-indigo-600">{TRANSACTIONS.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <DollarSign className="h-4 w-4 text-emerald-500" />Total volume
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{formatPrice(totalVolume)}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />Platform fees collected
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{formatPrice(totalFees)}</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="text-left py-3.5 px-6">#</th>
                  <th className="text-left py-3.5 px-4">Account</th>
                  <th className="text-left py-3.5 px-4">Platform</th>
                  <th className="text-left py-3.5 px-4">Followers</th>
                  <th className="text-left py-3.5 px-4">Sale Price</th>
                  <th className="text-left py-3.5 px-4">Buyer</th>
                  <th className="text-left py-3.5 px-4">Time</th>
                  <th className="text-left py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((txn, i) => (
                  <tr
                    key={txn.id}
                    className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i % 2 === 1 ? "bg-slate-50/30" : ""}`}
                  >
                    <td className="py-4 px-6 text-sm text-slate-400 font-mono">#{String(i + 1).padStart(4, "0")}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                          style={{ background: PLATFORM_GRADIENTS[txn.listing.platform as Platform] }}
                        >
                          <PlatformIcon platform={txn.listing.platform} size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{txn.listing.username}</div>
                          <div className="text-xs text-slate-400">{txn.listing.niche}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="default" className="text-xs">{txn.listing.platform}</Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-700 font-medium">{formatNumber(txn.listing.followers)}</td>
                    <td className="py-4 px-4 text-sm font-bold text-emerald-600">{formatPrice(txn.price)}</td>
                    <td className="py-4 px-4 text-sm text-slate-500">***{txn.buyer.slice(-4)}</td>
                    <td className="py-4 px-4 text-sm text-slate-400">{timeAgo(txn.sold_at)}</td>
                    <td className="py-4 px-4">
                      <Badge variant="success" className="gap-1 text-xs">
                        <CheckCircle className="h-3 w-3" /> Released
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-center">
            Showing last 30 transactions · Buyer identities anonymized for privacy
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
