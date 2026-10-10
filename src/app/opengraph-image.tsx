import { ImageResponse } from "next/og";

// Route segment config — statically generated at build time.
export const alt = "Shanmukha Varma Penmetsa — VLSI Physical Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050811",
          backgroundImage:
            "linear-gradient(rgba(30,41,59,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.35) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            width: 34,
            height: 34,
            borderTop: "3px solid #22d3ee",
            borderLeft: "3px solid #22d3ee",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 36,
            width: 34,
            height: 34,
            borderTop: "3px solid #22d3ee",
            borderRight: "3px solid #22d3ee",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 36,
            width: 34,
            height: 34,
            borderBottom: "3px solid #22d3ee",
            borderLeft: "3px solid #22d3ee",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            width: 34,
            height: 34,
            borderBottom: "3px solid #22d3ee",
            borderRight: "3px solid #22d3ee",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#22d3ee",
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#22d3ee",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            VLSI PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.05,
            }}
          >
            Shanmukha Varma Penmetsa
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#94a3b8",
            }}
          >
            VLSI Physical Design Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148,163,184,0.25)",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#22d3ee",
              fontSize: 24,
              letterSpacing: 3,
            }}
          >
            RTL-to-GDSII · TIMING CLOSURE · TCL AUTOMATION
          </div>
          <div style={{ display: "flex", color: "#64748b", fontSize: 22 }}>
            portfolio-pd-rho.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
