"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

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
      className="scroll-reveal section-container"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader index="05" title="Currently Building" />

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "12px",
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="card cursor-glow-card"
              style={{
                padding: "clamp(16px, 2.5vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseMove={handleCardMouseMove}
            >
              {/* Color accent strip */}
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
                    className="badge"
                    style={{ color: item.color, padding: 0, border: "none", background: "transparent" }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
