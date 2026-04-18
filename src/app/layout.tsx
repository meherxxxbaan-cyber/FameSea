import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/toast";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SocialQX — Buy & Sell Social Media Accounts Safely", template: "%s | SocialQX" },
  description: "The safest marketplace for TikTok, Instagram, YouTube, X, and Telegram accounts. Stripe escrow on every transaction. 4.98★ rating.",
  metadataBase: new URL("https://socialqx.com"),
  keywords: ["buy social media accounts", "sell instagram account", "tiktok account marketplace", "youtube channel for sale"],
  openGraph: {
    siteName: "SocialQX",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", site: "@SocialQX" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#fafafa] text-slate-900 antialiased">
        <ToastProvider>
          {children}
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
