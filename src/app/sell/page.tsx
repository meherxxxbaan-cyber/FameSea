"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS, PLATFORM_GRADIENTS, PLATFORM_EMOJIS, NICHES, formatPrice } from "@/lib/utils";
import { PlatformIcon } from "@/components/platform-icons";
import type { Platform } from "@/lib/utils";
import {
  CheckCircle, Upload, DollarSign, ArrowRight, ArrowLeft,
  Sparkles, X, TrendingUp, Users, Zap, ShieldCheck, Tag
} from "lucide-react";

const STEPS = [
  { n: 1, label: "Platform" },
  { n: 2, label: "Details" },
  { n: 3, label: "Images" },
  { n: 4, label: "Pricing" },
  { n: 5, label: "Review" },
];

// Realistic valuation: follower-based with audience quality multiplier
// Base: $10 per 1K followers for Western/US, $4-6 for Asian/Latin American
// Cap at realistic market prices ($250-7000 range)
const PLATFORM_BASE_CPF: Record<string, number> = {
  // $ per 1K followers (Western audience baseline)
  TikTok: 8, Instagram: 14, YouTube: 18, X: 6, Telegram: 20,
  Facebook: 5, Twitch: 10, Pinterest: 8,
  Snapchat: 6, Threads: 4,
};

const LOCATION_MULTIPLIER: Record<string, number> = {
  // Western/high-income markets
  "United States": 1.0, "United Kingdom": 0.95, "Canada": 0.9,
  "Australia": 0.9, "Germany": 0.85, "France": 0.85, "Italy": 0.8,
  "Netherlands": 0.85, "Switzerland": 0.9, "UAE": 0.85, "Saudi Arabia": 0.8,
  // Asian markets
  "Japan": 0.7, "South Korea": 0.65, "Singapore": 0.75, "Hong Kong": 0.7,
  "China": 0.5, "India": 0.35, "Indonesia": 0.3, "Philippines": 0.3,
  // Latin American markets
  "Brazil": 0.35, "Mexico": 0.35, "Colombia": 0.3, "Argentina": 0.3,
  // African markets
  "Nigeria": 0.25, "Ghana": 0.25, "South Africa": 0.4, "Senegal": 0.2,
  // Eastern European
  "Russia": 0.3, "Ukraine": 0.3, "Poland": 0.45,
};

function estimateValue(platform: string, followers: number, monthlyIncome: number, location: string): number {
  const baseCPF = PLATFORM_BASE_CPF[platform] || 8;
  const locMult = LOCATION_MULTIPLIER[location] || 0.5;
  const followersK = followers / 1000;
  
  // Follower-based value (diminishing returns above 100K)
  let followerValue = 0;
  if (followersK <= 100) {
    followerValue = followersK * baseCPF * locMult;
  } else {
    // First 100K at full rate, rest at 40% rate (diminishing returns)
    followerValue = (100 * baseCPF * locMult) + ((followersK - 100) * baseCPF * locMult * 0.4);
  }
  
  // Income multiple (12-24x monthly income depending on platform)
  const incomeMultipliers: Record<string, number> = {
    YouTube: 22, LinkedIn: 28, Telegram: 18, TikTok: 16,
    Instagram: 20, X: 14, Facebook: 12,
    Pinterest: 18, Twitch: 14, Snapchat: 10, Threads: 10,
  };
  const incMult = incomeMultipliers[platform] || 15;
  const incomeValue = monthlyIncome * incMult * locMult;
  
  // Take higher of follower-based or income-based, blended
  const blended = monthlyIncome > 0
    ? (followerValue * 0.4) + (incomeValue * 0.6)
    : followerValue;
  
  // Clamp to realistic market range $250 - $8000
  return Math.max(250, Math.min(8000, Math.round(blended / 50) * 50));
}

interface FormState {
  platform: string;
  username: string;
  niche: string;
  followers: string;
  monthly_income: string;
  engagement_rate: string;
  location: string;
  description: string;
  price: string;
  minimum_offer: string;
  monetized: boolean;
  verified_income: boolean;
  tiktok_shop_eligible: boolean;
  images: string[];
}

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState<FormState>({
    platform: "", username: "", niche: "", followers: "",
    monthly_income: "", engagement_rate: "", location: "", description: "",
    price: "", minimum_offer: "", monetized: false, verified_income: false,
    tiktok_shop_eligible: false, images: [],
  });

  const set = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const income = Number(form.monthly_income) || 0;
  const followers = Number(form.followers) || 0;
  const aiEstimate = (followers > 0 || income > 0) && form.platform
    ? estimateValue(form.platform, followers, income, form.location || "United States")
    : null;
  const multiplier = 0; // unused but kept for type safety
  const canStep1 = !!form.platform;
  const canStep2 = form.username && form.niche && form.followers && form.monthly_income;
  const canStep4 = !!form.price;

  const DEMO_IMAGES = ["📊 Analytics Chart", "📈 Growth Stats", "💰 Income Dashboard", "👥 Audience Data"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Tag className="h-4 w-4" /> Always free to list
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">List Your Account</h1>
              <p className="text-slate-500 mt-2">Reach 50,000+ verified buyers · 5% fee only on sale</p>
            </div>

            {/* Stepper */}
            <div className="mb-10">
              <div className="relative flex items-center justify-between">
                <div className="absolute top-4 left-0 right-0 h-px bg-slate-200 z-0" />
                {STEPS.map((s) => (
                  <div key={s.n} className="flex flex-col items-center gap-2 z-10">
                    <button
                      onClick={() => step > s.n && setStep(s.n)}
                      className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all duration-200 ${
                        s.n < step ? "bg-emerald-500 text-white shadow-sm cursor-pointer" :
                        s.n === step ? "bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md" :
                        "bg-white border-2 border-slate-200 text-slate-400 cursor-default"
                      }`}
                    >
                      {s.n < step ? <CheckCircle className="h-4 w-4" /> : s.n}
                    </button>
                    <span className={`text-xs font-medium hidden sm:block ${s.n === step ? "text-indigo-600" : "text-slate-400"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Step 1 */}
              {step === 1 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Select Platform</h2>
                  <p className="text-slate-500 text-sm mb-6">Which platform is your account on?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        onClick={() => { set("platform", p); setStep(2); }}
                        className={`relative rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-md active:scale-[0.99] ${
                          form.platform === p ? "border-indigo-500 ring-2 ring-indigo-100" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="h-16 flex items-center px-4 gap-3" style={{ background: PLATFORM_GRADIENTS[p] }}>
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 flex-shrink-0">
                          <PlatformIcon platform={p} size={22} />
                        </div>
                          <div className="text-left">
                            <div className="text-white font-bold">{p}</div>
                            <div className="text-white/60 text-xs">
                              {({TikTok: "Shop eligible", Instagram: "Brand deals", YouTube: "AdSense", X: "Subscriptions", Telegram: "Channels", Facebook: "Pages/Groups", Twitch: "Live streaming", Pinterest: "Affiliate", Snapchat: "Gen Z reach", Threads: "Fast growing"} as Record<string,string>)[p]}
                            </div>
                          </div>
                          <div className="ml-auto">
                            {form.platform === p && (
                              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-indigo-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: form.platform ? PLATFORM_GRADIENTS[form.platform] : "#6366f1" }}>
                      {form.platform ? <PlatformIcon platform={form.platform} size={20} /> : null}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Account Details</h2>
                      <p className="text-slate-500 text-sm">{form.platform || "Select platform"} account</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Username <span className="text-red-400">*</span></Label>
                        <Input placeholder="@username" value={form.username} onChange={(e) => set("username", e.target.value)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label>Niche <span className="text-red-400">*</span></Label>
                        <select value={form.niche} onChange={(e) => set("niche", e.target.value)}
                          className="mt-1.5 w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900">
                          <option value="">Select niche</option>
                          {NICHES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Followers <span className="text-red-400">*</span></Label>
                        <Input type="number" placeholder="500000" value={form.followers} onChange={(e) => set("followers", e.target.value)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label>Monthly Income ($) <span className="text-red-400">*</span></Label>
                        <Input type="number" placeholder="2500" value={form.monthly_income} onChange={(e) => set("monthly_income", e.target.value)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label>Engagement (%)</Label>
                        <Input type="number" placeholder="5.2" step="0.1" value={form.engagement_rate} onChange={(e) => set("engagement_rate", e.target.value)} className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input placeholder="United States" value={form.location} onChange={(e) => set("location", e.target.value)} className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px] resize-none transition-all"
                        placeholder="Describe your account: audience demographics, content type, revenue sources, brand deal history..."
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                      />
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-700 mb-3">Account features</p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { key: "monetized", label: "Monetized", icon: <Zap className="h-3.5 w-3.5" /> },
                          { key: "verified_income", label: "Verified Income", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
                          ...(form.platform === "TikTok" ? [{ key: "tiktok_shop_eligible", label: "TikTok Shop", icon: <Tag className="h-3.5 w-3.5" /> }] : []),
                        ].map((f) => {
                          const active = form[f.key as keyof FormState] as boolean;
                          return (
                            <button key={f.key} type="button"
                              onClick={() => set(f.key as keyof FormState, !active)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                active ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}>
                              {f.icon}{f.label}
                              {active && <CheckCircle className="h-3 w-3 text-indigo-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Upload Proof Images</h2>
                  <p className="text-slate-500 text-sm mb-6">Screenshots of analytics, income dashboards, and audience data. Listings with images get 3× more views.</p>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); set("images", [...form.images, `Image ${form.images.length + 1}`]); }}
                    className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
                      dragOver ? "border-indigo-400 bg-indigo-50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                    onClick={() => set("images", [...form.images, `Screenshot ${form.images.length + 1}`])}
                  >
                    <Upload className={`h-10 w-10 mx-auto mb-3 transition-colors ${dragOver ? "text-indigo-400" : "text-slate-300"}`} />
                    <p className="font-semibold text-slate-700 mb-1">Drag & drop images here</p>
                    <p className="text-sm text-slate-400 mb-3">PNG, JPG, PDF up to 10MB each</p>
                    <Button variant="secondary" size="sm" type="button">Browse Files</Button>
                  </div>

                  {form.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative bg-slate-100 rounded-xl aspect-video flex items-center justify-center group">
                          <span className="text-xs text-slate-400">{img}</span>
                          <button
                            onClick={() => set("images", form.images.filter((_, j) => j !== i))}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex text-[10px]"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Recommended screenshots:</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {DEMO_IMAGES.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />{d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Set Your Price</h2>
                  <p className="text-slate-500 text-sm mb-6">Choose a competitive price based on the AI estimate below.</p>

                  {aiEstimate && (
                    <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-5 mb-6">
                      <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
                        <Sparkles className="h-4 w-4 text-indigo-500" /> AI Valuation Estimate
                      </div>
                      <div className="text-3xl font-extrabold text-indigo-900">{formatPrice(aiEstimate)}</div>
                      <div className="flex gap-4 mt-3 text-xs text-indigo-600">
                        <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" />Based on followers, income & audience location</div>
                        <div className="flex items-center gap-1"><Users className="h-3 w-3" />Market data from 5,000+ sales</div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg font-medium">Conservative: {formatPrice(Math.floor(aiEstimate * 0.75))}</span>
                        <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded-lg font-bold">Suggested: {formatPrice(aiEstimate)}</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-lg font-medium">Optimistic: {formatPrice(Math.floor(aiEstimate * 1.25))}</span>
                      </div>
                      <Button size="sm" variant="outline" className="mt-3 text-xs h-7"
                        onClick={() => set("price", String(aiEstimate))}>
                        Use AI estimate
                      </Button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Asking Price ($) <span className="text-red-400">*</span></Label>
                      <div className="relative mt-1.5">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" placeholder="Enter your price" value={form.price}
                          onChange={(e) => { set("price", e.target.value); if (!form.minimum_offer) set("minimum_offer", String(Math.floor(Number(e.target.value) * 0.7))); }}
                          className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <Label>Minimum Offer ($)</Label>
                      <div className="relative mt-1.5">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" placeholder="Minimum you'll accept" value={form.minimum_offer}
                          onChange={(e) => set("minimum_offer", e.target.value)} className="pl-9" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Auto-set to 70% of asking price</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Listing fee</span>
                        <span className="font-semibold text-emerald-600">FREE</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Platform fee (on sale)</span>
                        <span>3%</span>
                      </div>
                      {form.price && (
                        <>
                          <div className="h-px bg-slate-200 my-1" />
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>You receive</span>
                            <span className="text-emerald-600">{formatPrice(Number(form.price) * 0.97)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Review & Submit</h2>
                  <p className="text-slate-500 text-sm mb-6">Double-check before your listing goes live.</p>

                  {form.platform && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 mb-5">
                      <div className="h-14 flex items-center px-4 gap-3" style={{ background: PLATFORM_GRADIENTS[form.platform] }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: PLATFORM_GRADIENTS[form.platform] }}>
                        <PlatformIcon platform={form.platform} size={22} />
                      </div>
                        <div>
                          <div className="text-white font-bold">{form.username || "No username"}</div>
                          <div className="text-white/70 text-xs">{form.platform} · {form.niche}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-0 border border-slate-200 rounded-xl overflow-hidden">
                    {[
                      { label: "Platform",       value: form.platform || "—" },
                      { label: "Username",        value: form.username || "—" },
                      { label: "Niche",           value: form.niche || "—" },
                      { label: "Followers",       value: form.followers ? Number(form.followers).toLocaleString() : "—" },
                      { label: "Monthly Income",  value: form.monthly_income ? formatPrice(Number(form.monthly_income)) : "—" },
                      { label: "Engagement",      value: form.engagement_rate ? `${form.engagement_rate}%` : "—" },
                      { label: "Asking Price",    value: form.price ? formatPrice(Number(form.price)) : "—" },
                      { label: "Min. Offer",      value: form.minimum_offer ? formatPrice(Number(form.minimum_offer)) : "—" },
                      { label: "Images",          value: `${form.images.length} uploaded` },
                    ].map((row, i) => (
                      <div key={row.label} className={`flex justify-between py-3 px-4 text-sm ${i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}`}>
                        <span className="text-slate-500">{row.label}</span>
                        <span className="font-semibold text-slate-900">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {form.monetized && <Badge variant="indigo" className="gap-1 text-xs"><Zap className="h-3 w-3" /> Monetized</Badge>}
                    {form.verified_income && <Badge variant="success" className="gap-1 text-xs"><ShieldCheck className="h-3 w-3" /> Verified Income</Badge>}
                    {form.tiktok_shop_eligible && <Badge variant="warning" className="gap-1 text-xs"><Tag className="h-3 w-3" /> TikTok Shop</Badge>}
                  </div>

                  <div className="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-emerald-900">Ready to publish</div>
                      <div className="text-xs text-emerald-600">Your listing will be reviewed and live within 2 hours</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex justify-between mt-5">
              <Button variant="secondary" onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < 5 ? (
                <Button onClick={() => setStep((s) => Math.min(5, s + 1))}
                  disabled={(step === 1 && !canStep1) || (step === 2 && !canStep2)} className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="success" size="lg" onClick={() => setSubmitted(true)} className="gap-2">
                  <CheckCircle className="h-5 w-5" /> Publish Listing
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Listing Submitted! 🎉</h2>
            <p className="text-slate-500 mb-2">Your <strong>{form.platform}</strong> account <strong>{form.username}</strong> has been submitted for review.</p>
            <p className="text-slate-400 text-sm mb-8">We&apos;ll notify you by email once it&apos;s live (usually within 2 hours).</p>
            <div className="flex gap-3 justify-center">
              <Button asChild><a href="/dashboard">View Dashboard</a></Button>
              <Button variant="secondary" onClick={() => { setSubmitted(false); setStep(1); setForm({ platform: "", username: "", niche: "", followers: "", monthly_income: "", engagement_rate: "", location: "", description: "", price: "", minimum_offer: "", monetized: false, verified_income: false, tiktok_shop_eligible: false, images: [] }); }}>
                List Another
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
