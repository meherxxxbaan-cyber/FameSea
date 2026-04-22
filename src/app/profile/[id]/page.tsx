import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import {
  Star, CheckCircle, ShieldCheck, TrendingUp,
  DollarSign, Tag, Calendar, MessageSquare,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const MOCK_USERS = [
  { id: "user-1", name: "SocialPro",   rating: 4.9, sales: 12, joined: "Jan 2023", verified: true,  bio: "Professional account trader. 12 successful transfers. Specializing in fitness and lifestyle.",     color: "bg-indigo-100 text-indigo-700", initial: "S" },
  { id: "user-2", name: "AccountKing", rating: 4.8, sales: 8,  joined: "Mar 2023", verified: true,  bio: "TikTok and Instagram seller. All accounts come with full 30-day analytics access.",             color: "bg-violet-100 text-violet-700", initial: "A" },
  { id: "user-3", name: "InfluenceHQ", rating: 5.0, sales: 23, joined: "Aug 2022", verified: true,  bio: "Top-rated seller with 23 completed sales. Crypto, finance, and tech niches. Fast responder.", color: "bg-emerald-100 text-emerald-700", initial: "I" },
  { id: "user-4", name: "MediaFlip",   rating: 4.7, sales: 6,  joined: "Jun 2023", verified: false, bio: "New seller. Building reputation. All listings are accurately described.",                       color: "bg-amber-100 text-amber-700",   initial: "M" },
  { id: "user-5", name: "GrowthLabs",  rating: 4.9, sales: 15, joined: "Nov 2022", verified: true,  bio: "Agency selling client accounts. Specializes in monetized YouTube channels and Telegram.",      color: "bg-pink-100 text-pink-700",     initial: "G" },
];

const MOCK_REVIEWS = [
  { reviewer: "Buyer4821", rating: 5, text: "Incredibly smooth transaction. Seller transferred everything within 6 hours. Metrics were exactly as described.", date: "2 days ago" },
  { reviewer: "Buyer1193", rating: 5, text: "Professional and responsive. Would absolutely buy from this seller again. Income was spot on.", date: "1 week ago" },
  { reviewer: "Buyer8834", rating: 4, text: "Good seller, slight delay in transfer but communicated well throughout. Account was as described.", date: "2 weeks ago" },
  { reviewer: "Buyer2291", rating: 5, text: "Best seller on FameSea. Provided extra analytics I didn't even ask for. Highly recommend.", date: "1 month ago" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = MOCK_USERS.find((u) => u.id === id);
  if (!user) return {};
  return {
    title: `${user.name} — Seller Profile | FameSea`,
    description: `${user.name} has completed ${user.sales} sales with a ${user.rating}★ rating on FameSea.`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const user = MOCK_USERS.find((u) => u.id === id);
  if (!user) notFound();

  const userListings = SEED_LISTINGS.filter((_, i) => i % 5 === MOCK_USERS.indexOf(user)).slice(0, 4);
  const totalRevenue = userListings.reduce((s, l) => s + l.price, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Profile sidebar */}
          <aside className="space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 ${user.color}`}>
                {user.initial}
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h1 className="text-xl font-extrabold text-slate-900">{user.name}</h1>
                  {user.verified && <ShieldCheck className="h-5 w-5 text-emerald-500" />}
                </div>
                {user.verified && (
                  <Badge variant="success" className="gap-1 mb-3">
                    <CheckCircle className="h-3 w-3" /> Verified Seller
                  </Badge>
                )}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(user.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{user.rating}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{user.bio}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-4">Seller Stats</h3>
              <div className="space-y-3">
                {[
                  { icon: <Tag className="h-4 w-4 text-indigo-500" />, label: "Completed sales", value: user.sales.toString() },
                  { icon: <Star className="h-4 w-4 text-amber-400" />, label: "Average rating", value: `${user.rating}★` },
                  { icon: <DollarSign className="h-4 w-4 text-emerald-500" />, label: "Est. volume", value: formatPrice(user.sales * 12000) },
                  { icon: <Calendar className="h-4 w-4 text-slate-400" />, label: "Member since", value: user.joined },
                  { icon: <TrendingUp className="h-4 w-4 text-blue-500" />, label: "Active listings", value: userListings.length.toString() },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">{s.icon}{s.label}</div>
                    <span className="font-semibold text-slate-900 text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <p className="text-sm text-indigo-700 font-medium mb-3">
                Interested in a listing? Make an offer or message the seller.
              </p>
              <Button size="sm" variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" /> Contact Seller
              </Button>
            </div>
          </aside>

          {/* Listings + Reviews */}
          <div className="md:col-span-2 space-y-8">
            {/* Active listings */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 text-lg">Active Listings ({userListings.length})</h2>
                <Link href={`/marketplace?seller=${user.id}`} className="text-sm text-indigo-600 hover:underline">
                  View all
                </Link>
              </div>
              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userListings.map((l) => <ListingCard key={l.id} listing={l} />)}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400">No active listings</div>
              )}
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-bold text-slate-900 text-lg">Reviews ({MOCK_REVIEWS.length})</h2>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{user.rating}</span>
                </div>
              </div>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {r.reviewer.slice(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{r.reviewer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(r.rating)].map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                      <CheckCircle className="h-3 w-3" /> Verified purchase
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return MOCK_USERS.map((u) => ({ id: u.id }));
}
