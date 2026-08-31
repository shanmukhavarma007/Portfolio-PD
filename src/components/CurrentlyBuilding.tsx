"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";
const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";

type ItemLink = { label: string; href: string };

const ITEMS = [
  { label: "PHYSICAL DESIGN", state: "LEARNING", color: "var(--warning)", desc: "Floorplan, placement, CTS, routing, verification" },
  {
    label: "TCL AUTOMATION",
    state: "PROJECT-BASED",
    color: "var(--accent)",
    desc: "Layout scripting, EDA automation, tool flows",
    links: [
      { label: "TCL SCRIPTS REPO ↗", href: TCL_SCRIPTS_URL },
      { label: "PRACTICE ON VLSI HUB ↗", href: VLSI_HUB_URL },
    ] as ItemLink[],
  },
  {
    label: "LINUX",
    state: "HANDS-ON",
    color: "var(--success)",
    desc: "Shell scripting, environment setup, flow automation",
    links: [{ label: "PRACTICE ON VLSI HUB ↗", href: VLSI_HUB_URL }] as ItemLink[],
  },
  {
    label: "RTL / VERILOG",
    state: "LEARNING",
    color: "var(--warning)",
    desc: "RTL concepts, synthesis basics",
    links: [{ label: "PRACTICE ON VLSI HUB ↗", href: VLSI_HUB_URL }] as ItemLink[],
  },
  { label: "CMOS", state: "EXPLORING", color: "var(--accent-secondary)", desc: "Transistor-level design, fabrication" },
];

function handleCardMouseMove(e: React.MouseEvent<HTMLElement>) {
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
      id="building"
      ref={ref}
      className="scroll-reveal section-container section-glow"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader badge="05 // BUILDING" title="Currently Building" />

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          style={{
            gap: "12px",
          }}
        >
          {ITEMS.map((item) => {
            const cardStyle: React.CSSProperties = {
              padding: "clamp(16px, 2.5vw, 24px)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              overflow: "hidden",
            };

            const cardContent = (
              <>
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
                  {item.links && item.links.length > 0 && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: item.color,
                        opacity: 0.8,
                      }}
                    >
                      ↗
                    </span>
                  )}
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

                {/* Live platform links */}
                {item.links && item.links.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginTop: "auto",
                      paddingTop: "4px",
                    }}
                  >
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--accent-secondary min-h-[44px]"
                        style={{ textDecoration: "none", cursor: "pointer", alignItems: "center" }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </>
            );

            return (
              <div
                key={item.label}
                className="glass-card cursor-glow-card"
                style={cardStyle}
                onMouseMove={handleCardMouseMove}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
