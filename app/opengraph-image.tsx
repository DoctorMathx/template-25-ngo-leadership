import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0A0A0A", padding: "72px 80px", fontFamily: "sans-serif", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 60, height: 60, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, letterSpacing: -1 }}>AO</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 15, opacity: 0.7 }}>The</span>
            <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>Adaeze Okafor Foundation</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 92, fontWeight: 600, lineHeight: 0.98, letterSpacing: -4, maxWidth: 980 }}>The next generation is ready to lead.</span>
          <div style={{ display: "flex", marginTop: 34, width: 120, height: 6, background: "#2F5FE3" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#A6A6A6", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>Fellowships · Mentorship · Civic Centre, Enugu</span>
          <span>{siteConfig.brand.domain}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
