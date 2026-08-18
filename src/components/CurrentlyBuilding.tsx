"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const ITEMS = [
  { label: "PHYSICAL DESIGN", state: "LEARNING", color: "var(--warning)" },
  { label: "STA", state: "PRACTICING", color: "var(--warning)" },
  { label: "TCL AUTOMATION", state: "PROJECT-BASED", color: "var(--accent)" },
  { label: "LINUX", state: "HANDS-ON", color: "var(--success)" },
  { label: "RTL / VERILOG", state: "LEARNING", color: "var(--warning)" },
  { label: "CMOS", state: "EXPLORING", color: "var(--accent-secondary)" },
];

function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
}

export function CurrentlyBuilding() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
      }}
    >
      {/* Decorative section number */}
      <div className="section-deco-number" aria-hidden="true">05</div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          05 / CURRENTLY BUILDING
        </div>
        <WaveformHr style={{ marginBottom: "48px" }} />

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="cursor-glow-card"
              style={{
                padding: "24px",
                background: "var(--bg)",
                transition: "background 0.2s ease",
              }}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--surface-1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--text)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="status-dot-pulse"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: item.color,
                      color: item.color,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      color: item.color,
                    }}
                  >
                    {item.state}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginTop: "24px",
            fontStyle: "italic",
          }}
        >
          Actively progressing through intensive training and project-based learning.
        </div>
      </div>
    </section>
  );
}