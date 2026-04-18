"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { CompareModal } from "@/components/compare-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEED_LISTINGS } from "@/lib/seed-data";
import type { Listing } from "@/lib/seed-data";
import { PlatformIcon } from "@/components/platform-icons";
import { PLATFORMS, NICHES, PLATFORM_GRADIENTS, PLATFORM_EMOJIS } from "@/lib/utils";
import type { Platform } from "@/lib/utils";
import { Search, SlidersHorizontal, X, GitCompare, ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest",          label: "Newest First" },
  { value: "price_asc",       label: "Price: Low to High" },
  { value: "price_desc",      label: "Price: High to Low" },
  { value: "followers_desc",  label: "Most Followers" },
  { value: "income_desc",     label: "Highest Income" },
  { value: "engagement_desc", label: "Best Engagement" },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [monetizedOnly, setMonetizedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<Listing[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const togglePlatform = (p: string) =>
    setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const toggleCompare = (listing: Listing) => {
    setCompareList((prev) => {
      if (prev.find((l) => l.id === listing.id)) return prev.filter((l) => l.id !== listing.id);
      if (prev.length >= 4) return prev;
      return [...prev, listing];
    });
  };

  const filtered = useMemo(() => {
    let list = [...SEED_LISTINGS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        l.username.toLowerCase().includes(q) ||
        l.niche.toLowerCase().includes(q) ||
        l.platform.toLowerCase().includes(q)
      );
    }
    if (selectedPlatforms.length > 0) list = list.filter((l) => selectedPlatforms.includes(l.platform));
    if (selectedNiche && selectedNiche !== "all") list = list.filter((l) => l.niche === selectedNiche);
    if (minPrice) list = list.filter((l) => l.price >= Number(minPrice));
    if (maxPrice) list = list.filter((l) => l.price <= Number(maxPrice));
    if (minFollowers) list = list.filter((l) => l.followers >= Number(minFollowers));
    if (verifiedOnly) list = list.filter((l) => l.verified_income);
    if (monetizedOnly) list = list.filter((l) => l.monetized);
    list.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":       return a.price - b.price;
        case "price_desc":      return b.price - a.price;
        case "followers_desc":  return b.followers - a.followers;
        case "income_desc":     return b.monthly_income - a.monthly_income;
        case "engagement_desc": return b.engagement_rate - a.engagement_rate;
        default:                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    return list;
  }, [search, selectedPlatforms, selectedNiche, minPrice, maxPrice, minFollowers, sortBy, verifiedOnly, monetizedOnly]);

  const clearFilters = () => {
    setSearch(""); setSelectedPlatforms([]); setSelectedNiche("all");
    setMinPrice(""); setMaxPrice(""); setMinFollowers("");
    setVerifiedOnly(false); setMonetizedOnly(false);
  };

  const hasFilters = search || selectedPlatforms.length > 0 || (selectedNiche && selectedNiche !== "all") ||
    minPrice || maxPrice || minFollowers || verifiedOnly || monetizedOnly;

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Platform quick pills */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Platform</h3>
        <div className="space-y-1.5">
          {PLATFORMS.map((p) => {
            const checked = selectedPlatforms.includes(p);
            return (
              <label key={p} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={checked} onChange={() => togglePlatform(p)}
                  className="w-4 h-4 rounded accent-indigo-600" />
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: PLATFORM_GRADIENTS[p as Platform] }}>
                  <PlatformIcon platform={p} size={11} />
                </div>
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{p}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Niche</h3>
        <Select value={selectedNiche} onValueChange={setSelectedNiche}>
          <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="All niches" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All niches</SelectItem>
            {NICHES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Price Range ($)</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Min" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-9 text-sm" />
          <Input placeholder="Max" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-9 text-sm" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Min. Followers</h3>
        <Input placeholder="e.g. 100000" type="number" value={minFollowers}
          onChange={(e) => setMinFollowers(e.target.value)} className="h-9 text-sm" />
      </div>

      <div className="h-px bg-slate-100" />

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Features</h3>
        <div className="space-y-2">
          {[
            { label: "Verified Income", value: verifiedOnly, set: setVerifiedOnly },
            { label: "Monetized",       value: monetizedOnly, set: setMonetizedOnly },
          ].map((t) => (
            <label key={t.label} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={t.value} onChange={(e) => t.set(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm text-slate-700">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full text-slate-400 text-xs gap-1 hover:text-slate-700">
          <X className="h-3.5 w-3.5" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Marketplace</h1>
          <p className="text-slate-500 mt-1">{filtered.length} accounts available</p>
        </div>

        {/* Search + controls */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search username, platform, niche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="secondary" className="gap-2 md:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] hidden sm:flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile filters panel */}
        {showFilters && (
          <div className="md:hidden mb-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <FilterPanel />
          </div>
        )}

        {/* Compare bar */}
        {compareList.length > 0 && (
          <div className="mb-5 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap">
            <GitCompare className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            <span className="text-sm font-medium text-indigo-800">
              {compareList.length} account{compareList.length > 1 ? "s" : ""} selected for comparison
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {compareList.map((l) => (
                <span key={l.id} className="inline-flex items-center gap-1 bg-white border border-indigo-200 text-indigo-700 text-xs px-2 py-1 rounded-full">
                  {l.emoji} {l.username}
                  <button onClick={() => toggleCompare(l)} className="text-indigo-400 hover:text-indigo-700">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              {compareList.length >= 2 && (
                <Button size="sm" onClick={() => setShowCompare(true)} className="gap-1 text-xs">
                  <GitCompare className="h-3.5 w-3.5" /> Compare
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setCompareList([])} className="text-xs text-indigo-600">
                Clear
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900 text-sm">Filters</h2>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline">Clear all</button>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-5">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No listings found</h3>
                <p className="text-slate-500 mb-6 text-sm">Try adjusting your search or filters</p>
                <Button variant="secondary" onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      showCompare
                      compareSelected={!!compareList.find((l) => l.id === listing.id)}
                      onCompareToggle={toggleCompare}
                    />
                  ))}
                </div>
                {filtered.length === 50 && (
                  <div className="mt-10 text-center text-sm text-slate-400">
                    Showing all {filtered.length} listings
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {showCompare && compareList.length >= 2 && (
        <CompareModal
          listings={compareList}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => setCompareList((prev) => prev.filter((l) => l.id !== id))}
        />
      )}
    </div>
  );
}

// Note: metadata must be in a server component. This page is client-side.
// Metadata is exported from a separate server wrapper in production.
