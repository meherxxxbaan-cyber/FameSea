import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SocialQX — Buy & Sell Social Media Accounts Safely";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: "white", fontSize: 28, fontWeight: 900 }}>✓</div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#0f172a" }}>
            69<span style={{ color: "#6366f1" }}>Swap</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 52, fontWeight: 900, color: "#0f172a", textAlign: "center", lineHeight: 1.1, maxWidth: 800, marginBottom: 20 }}>
          Buy & Sell Social Media Accounts Safely
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 24, color: "#64748b", textAlign: "center", maxWidth: 600, marginBottom: 40 }}>
          Stripe escrow · 5,000+ listings · TikTok, Instagram, YouTube, X, Telegram
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { value: "$14M+", label: "Volume" },
            { value: "3,842", label: "Transfers" },
            { value: "4.98★", label: "Rating" },
            { value: "100%", label: "Escrow" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", borderRadius: 16, padding: "16px 24px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.label === "Volume" ? "#059669" : "#6366f1" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
