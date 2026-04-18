import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, ArrowRight, DollarSign, ShieldCheck } from "lucide-react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fees & Pricing — 3% Platform Fee, Free to List | SocialQX",
  description: "SocialQX charges just 3% on completed sales. Listing is always free.",
  alternates: { canonical: "https://socialqx.com/fees" },
};




export default function FeesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Simple, Transparent Fees</h1>
          <p className="text-xl text-slate-600">No hidden costs. No monthly subscriptions. You only pay when a sale completes.</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full space-y-10">

        {/* Fee cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "📋", title: "Listing Fee", price: "Free", desc: "Always free to list your account. No upfront costs, no monthly fees.",
              highlight: false,
            },
            {
              icon: "💳", title: "Platform Fee", price: "3%", desc: "Charged to the buyer on top of the listing price. Covers escrow, Stripe processing, and support.",
              highlight: true,
            },
            {
              icon: "🤝", title: "Affiliate Commission", price: "1%", desc: "When a referred user completes a sale, the referrer earns 1% of the transaction value.",
              highlight: false,
            },
          ].map((f) => (
            <div key={f.title} className={`rounded-xl border p-6 ${f.highlight ? "border-indigo-300 bg-indigo-50 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-white"}`}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{f.title}</div>
              <div className={`text-4xl font-extrabold mb-3 ${f.highlight ? "text-indigo-600" : "text-slate-900"}`}>{f.price}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              {f.highlight && (
                <div className="mt-3 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">Platform fee</div>
              )}
            </div>
          ))}
        </div>

        {/* Example breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="font-bold text-slate-900 mb-5 text-lg">Example Transaction</h2>
          <div className="max-w-sm space-y-3 text-sm">
            {[
              { label: "Account listing price", value: "$100", bold: false, green: false },
              { label: "Platform fee (3%)",     value: "+$3",    bold: false, green: false },
              { label: "Buyer pays total",       value: "$103",  bold: true,  green: false, border: true },
              { label: "",                       value: "",         bold: false, green: false },
              { label: "Platform fee (3%)",      value: "-$3",    bold: false, green: false },
              { label: "Stripe processing (~2%)", value: "-$2",   bold: false, green: false },
              { label: "Seller receives",         value: "$95+", bold: true,  green: true,  border: true },
            ].filter(r => r.label).map((row) => (
              <div key={row.label} className={`flex justify-between py-2 ${row.border ? "border-t border-slate-200 mt-1 pt-3" : ""}`}>
                <span className={row.bold ? "font-semibold text-slate-900" : "text-slate-500"}>{row.label}</span>
                <span className={`font-semibold ${row.green ? "text-emerald-600" : "text-slate-900"}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">* Stripe processing fees vary by country and payment method (typically 1.4–2.9% + fixed fee).</p>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">SocialQX vs. Competitors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="text-left py-3 px-6">Feature</th>
                  <th className="text-center py-3 px-4 text-indigo-600">SocialQX</th>
                  <th className="text-center py-3 px-4">Fameswap</th>
                  <th className="text-center py-3 px-4">Accs Market</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Listing fee",          us: "Free",   a: "$19/mo", b: "Free" },
                  { feature: "Platform fee",          us: "3%",     a: "15%",   b: "5-10%" },
                  { feature: "Escrow protection",     us: true,     a: false,   b: false },
                  { feature: "Stripe Connect payouts",us: true,     a: false,   b: false },
                  { feature: "Inspection period",     us: "7 days", a: "None",  b: "3 days" },
                  { feature: "Verified income badge", us: true,     a: false,   b: false },
                  { feature: "Compare tool",          us: true,     a: false,   b: false },
                  { feature: "Affiliate program",     us: "1%",     a: "None",  b: "None" },
                ].map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 1 ? "bg-slate-50/40" : ""}>
                    <td className="py-3 px-6 font-medium text-slate-700">{row.feature}</td>
                    {[row.us, row.a, row.b].map((val, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {typeof val === "boolean" ? (
                          val
                            ? <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
                            : <X className="h-4 w-4 text-slate-300 mx-auto" />
                        ) : (
                          <span className={j === 0 ? "font-bold text-indigo-600" : "text-slate-500"}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-center">
          <ShieldCheck className="h-10 w-10 text-indigo-200 mx-auto mb-3" />
          <h2 className="text-2xl font-extrabold text-white mb-2">List your account for free today</h2>
          <p className="text-indigo-200 mb-6 text-sm">3% fee only applies when your account sells. Zero risk, zero upfront cost.</p>
          <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 gap-2" asChild>
            <Link href="/sell">Start Selling <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
