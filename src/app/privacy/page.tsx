import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | SocialQX",
  description: "How SocialQX collects and protects your data. GDPR and CCPA compliant.",
  alternates: { canonical: "https://socialqx.com/privacy" },
};




const SECTIONS = [
  { title: "Information We Collect", body: "We collect information you provide directly: name, email, payment information (handled entirely by Stripe), account listings, and communication with other users. We also collect usage data including pages visited, search queries, and browser/device information." },
  { title: "How We Use Your Information", body: "We use your information to: operate the marketplace and process transactions; verify seller identities via Stripe KYC; send transactional emails (payment received, dispute updates, etc.); improve our platform through aggregate analytics; prevent fraud and enforce our Terms of Service." },
  { title: "Stripe & Payment Data", body: "Payment processing is handled entirely by Stripe. SocialQX never stores full credit card numbers or banking details. Stripe's privacy policy applies to all payment data. Stripe Connect is used for seller payouts and Stripe's KYC process handles identity verification." },
  { title: "Data Sharing", body: "We do not sell your personal information. We share data with: Stripe (payment processing); Supabase (database infrastructure, processing data on our behalf); and law enforcement when required by law. The sales ledger shows anonymized transaction data only." },
  { title: "Data Retention", body: "We retain account information for the life of your account plus 7 years for legal compliance. Transaction records are retained for 7 years. You may request deletion of non-transactional data at any time." },
  { title: "Your Rights", body: "Depending on your location, you may have rights to access, correct, delete, or port your personal data. EU/UK residents have additional rights under GDPR. California residents have rights under CCPA. Contact privacy@socialqx.com to exercise your rights." },
  { title: "Cookies", body: "We use strictly necessary cookies for authentication and session management. We use analytics cookies (opt-out available) to understand usage. We do not use advertising cookies or sell data to ad networks. Our products are ad-free." },
  { title: "Contact", body: "Privacy inquiries: privacy@socialqx.com. Data Protection Officer: dpo@socialqx.com." },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: January 1, 2025</p>
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
