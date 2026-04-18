import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service | SocialQX",
  description: "SocialQX Terms of Service covering escrow, buyer protection, and dispute resolution.",
  alternates: { canonical: "https://socialqx.com/terms" },
};




const SECTIONS = [
  { title: "1. Acceptance of Terms", body: "By accessing or using SocialQX (\"the Platform\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform. We reserve the right to modify these terms at any time." },
  { title: "2. Account Registration", body: "You must register an account to buy or sell on SocialQX. You agree to provide accurate, complete information and to keep your account credentials secure. You are responsible for all activity under your account." },
  { title: "3. Listing Rules", body: "Sellers warrant that they are the legitimate owner of any account listed for sale. Listings must accurately describe the account, including metrics, monetization status, and income figures. False or misleading listings may result in immediate removal and account suspension." },
  { title: "4. Escrow & Payment", body: "All transactions are processed through Stripe. Payment is held in escrow by SocialQX and only released to the seller when the buyer confirms receipt, or after a 7-day inspection period with no dispute filed. SocialQX charges a 3% platform fee applied to the buyer's total." },
  { title: "5. Inspection Period & Disputes", body: "Buyers have 7 calendar days after account credentials are delivered to verify the purchase. If the account materially differs from the listing, buyers may open a dispute. SocialQX's Trust & Safety team will investigate and make a binding decision. Funds remain frozen during active disputes." },
  { title: "6. Prohibited Conduct", body: "You may not use the Platform to: (a) list accounts you do not own or control; (b) engage in fraud, impersonation, or market manipulation; (c) circumvent the escrow process by transacting off-platform; (d) list accounts for platforms not supported by SocialQX." },
  { title: "7. Seller Payouts", body: "Sellers must connect a Stripe account to receive payouts. Upon escrow release, 97% of the sale price is transferred to the seller's Stripe account. Stripe's standard processing fees apply. SocialQX is not responsible for delays caused by Stripe or the seller's banking institution." },
  { title: "8. Limitation of Liability", body: "SocialQX is a marketplace facilitator and is not a party to transactions between buyers and sellers. To the maximum extent permitted by law, SocialQX's liability is limited to the platform fees collected on the transaction in dispute." },
  { title: "9. Governing Law", body: "These Terms are governed by the laws of the State of Delaware, United States. Any disputes arising under these Terms shall be resolved exclusively through binding arbitration in accordance with AAA Commercial Arbitration Rules." },
  { title: "10. Contact", body: "For questions about these Terms, contact us at legal@socialqx.com or through our contact page." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: January 1, 2025</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <strong>TL;DR:</strong> Use SocialQX only for legitimate account transfers. All payments go through Stripe escrow. Buyers get 7 days to inspect. Sellers get paid after confirmation. 3% platform fee on all sales.
        </div>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
