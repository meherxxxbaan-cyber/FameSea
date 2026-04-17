"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/user-menu";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { href: "/marketplace",  label: "Browse"       },
  { href: "/sell",         label: "Sell"          },
  { href: "/how-it-works", label: "How It Works"  },
  { href: "/fees",         label: "Fees"          },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, hydrated } = useWatchlist();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200" style={{ boxShadow: "0 1px 0 0 #E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4" style={{ height: 60 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          {/* Custom SVG logo */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
            <rect width="32" height="32" rx="8" fill="#4F46E5"/>
            <path d="M10 11C10 9.34 11.34 8 13 8C14.66 8 16 9.34 16 11C16 12.66 14.66 14 13 14H10V11Z" fill="white" opacity="0.9"/>
            <path d="M22 21C22 22.66 20.66 24 19 24C17.34 24 16 22.66 16 21C16 19.34 17.34 18 19 18H22V21Z" fill="white" opacity="0.9"/>
            <path d="M16 14L10 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <path d="M16 18L22 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          </svg>
          <span className="text-[18px] font-extrabold text-slate-900 tracking-tight">
            69<span className="text-indigo-600">Swap</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors ${
                pathname === l.href
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          <Link href="/watchlist"
            className={`relative p-2 rounded-lg transition-colors ${
              pathname === "/watchlist" ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-red-500 hover:bg-red-50"
            }`}>
            <Heart className={`h-[18px] w-[18px] ${pathname === "/watchlist" ? "fill-red-500" : ""}`} />
            {hydrated && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <UserMenu />
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-0.5">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2 border-t border-slate-100 mt-2">
            <Link href="/login" className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700">Log In</Link>
            <Link href="/register" className="flex-1 text-center py-2.5 rounded-xl bg-indigo-600 text-sm font-medium text-white">Sign Up Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
