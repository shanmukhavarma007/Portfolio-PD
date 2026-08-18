"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const ITEMS = [
  { label: "PHYSICAL DESIGN", state: "LEARNING", color: "var(--warning)", desc: "Floorplan, placement, CTS, routing, signoff" },
  { label: "STA", state: "PRACTICING", color: "var(--warning)", desc: "Timing analysis, constraint writing, AOCV" },
  { label: "TCL AUTOMATION", state: "PROJECT-BASED", color: "var(--accent)", desc: "Layout scripting, EDA automation, tool flows" },
  { label: "LINUX", state: "HANDS-ON", color: "var(--success)", desc: "Shell scripting, environment setup, flow automation" },
  { label: "RTL / VERILOG", state: "LEARNING", color: "var(--warning)", desc: "RTL concepts, synthesis basics" },
  { label: "CMOS", state: "EXPLORING", color: "var(--accent-secondary)", desc: "Transistor-level design, fabrication" },
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
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
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

        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 40px)" }} />

        {/* Cards — larger, 1-col mobile / 2-col tablet / 3-col desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="cursor-glow-card"
              style={{
                padding: "clamp(20px, 3vw, 28px)",
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--surface-1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg)";
              }}
            >
              {/* Color accent strip at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: item.color,
                  opacity: 0.6,
                }}
              />

              {/* Status badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    className="status-dot-pulse"
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: item.color,
                      color: item.color,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      color: item.color,
                    }}
                  >
                    {item.state}
                  </span>
                </div>
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 3.5vw, 22px)",
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>

              {/* Subtle horizontal line separator */}
              <div
                style={{
                  marginTop: "auto",
                  height: "1px",
                  background: `linear-gradient(90deg, ${item.color} 0%, transparent 100%)`,
                  opacity: 0.2,
                }}
              />
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            color: "var(--text-muted)",
            marginTop: "clamp(16px, 3vw, 24px)",
            fontStyle: "italic",
          }}
        >
          Actively progressing through intensive training and project-based learning.
        </p>
      </div>
    </section>
  );
}
