import { ImageResponse } from "next/og";
import { portfolioData } from "@/lib/data";

export const alt = `${portfolioData.personal.name} — ${portfolioData.personal.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#070607", // Caldera Obsidian
          color: "#f7f6f2", // Caldera Limestone
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Ember Glow in corner */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(252, 80, 0, 0.22) 0%, rgba(82, 74, 233, 0.08) 50%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo Brandmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#fc5000", // Ember
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#070607",
                fontWeight: 900,
                fontSize: 30,
              }}
            >
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", color: "#f7f6f2" }}>
                {portfolioData.personal.name}
              </span>
              <span style={{ fontSize: 16, color: "#a09f9b", fontWeight: 500 }}>
                {portfolioData.personal.location}
              </span>
            </div>
          </div>

          {/* Availability Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 9999,
              background: "#141314",
              border: "1px solid rgba(252, 80, 0, 0.35)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#f5f28e", // Sulfur
                display: "flex",
              }}
            />
            <span style={{ fontSize: 16, fontWeight: 600, color: "#f7f6f2" }}>
              {portfolioData.personal.badge}
            </span>
          </div>
        </div>

        {/* Middle: Architectural Headline & Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#f7f6f2" }}>VIDEO EDITOR &amp;</span>
            <span style={{ color: "#fc5000" }}>MOTION DESIGNER</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#d9d9d5",
              maxWidth: 860,
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            {portfolioData.personal.bio}
          </div>
        </div>

        {/* Bottom Row: Metrics & Software Stack */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {/* Key Metrics */}
          <div style={{ display: "flex", gap: 36 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#fc5000", lineHeight: 1 }}>
                10M+
              </span>
              <span style={{ fontSize: 14, color: "#a09f9b", marginTop: 4 }}>
                Organic Reach
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#fc5000", lineHeight: 1 }}>
                100+
              </span>
              <span style={{ fontSize: 14, color: "#a09f9b", marginTop: 4 }}>
                Delivered Cuts
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#fc5000", lineHeight: 1 }}>
                3+ Yrs
              </span>
              <span style={{ fontSize: 14, color: "#a09f9b", marginTop: 4 }}>
                Post-Production
              </span>
            </div>
          </div>

          {/* Software Badges */}
          <div style={{ display: "flex", gap: 10 }}>
            {["DaVinci Resolve Studio", "Adobe After Effects", "Kinetic Typography"].map((tool) => (
              <div
                key={tool}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 10,
                  background: "#1c1b1c",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: 15,
                  color: "#f7f6f2",
                  fontWeight: 600,
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
