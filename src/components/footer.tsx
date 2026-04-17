import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#4F46E5"/>
                <path d="M10 11C10 9.34 11.34 8 13 8C14.66 8 16 9.34 16 11C16 12.66 14.66 14 13 14H10V11Z" fill="white" opacity="0.9"/>
                <path d="M22 21C22 22.66 20.66 24 19 24C17.34 24 16 22.66 16 21C16 19.34 17.34 18 19 18H22V21Z" fill="white" opacity="0.9"/>
                <path d="M16 14L10 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                <path d="M16 18L22 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              </svg>
              <span className="font-extrabold text-slate-900">69<span className="text-indigo-600">Swap</span></span>
            </div>
            <p className="text-[12.5px] text-slate-500 leading-relaxed">The safest marketplace to buy and sell social media accounts.</p>
            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All systems operational
            </div>
          </div>
          {[
            { title: "Marketplace", links: [
              { href: "/marketplace",        l: "Browse All" },
              { href: "/platform/tiktok",    l: "TikTok" },
              { href: "/platform/instagram", l: "Instagram" },
              { href: "/platform/youtube",   l: "YouTube" },
              { href: "/platform/telegram",  l: "Telegram" },
            ]},
            { title: "Sellers", links: [
              { href: "/sell",         l: "List an Account" },
              { href: "/fees",         l: "Fees & Pricing" },
              { href: "/dashboard",    l: "Seller Dashboard" },
              { href: "/sales-ledger", l: "Sales Ledger" },
            ]},
            { title: "Company", links: [
              { href: "/how-it-works", l: "How It Works" },
              { href: "/about",        l: "About" },
              { href: "/contact",      l: "Contact" },
              { href: "/terms",        l: "Terms" },
              { href: "/privacy",      l: "Privacy" },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.l}>
                    <Link href={l.href} className="text-[12.5px] text-slate-500 hover:text-slate-900 transition-colors">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">© 2025 69Swap.com · All rights reserved</p>
          <p className="text-[11px] text-slate-400">3% fee on completed sales · Free to list · Stripe Escrow</p>
        </div>
      </div>
    </footer>
  );
}
