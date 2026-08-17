"use client";

import { useState } from "react";

interface PDStage {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  concepts: string[];
}

const PD_STAGES: PDStage[] = [
  {
    id: "rtl",
    label: "RTL",
    shortLabel: "RTL",
    description: "Register-Transfer Level design and verification of digital logic.",
    concepts: ["VERILOG", "SYSTEMVERILOG", "TESTBENCH"],
  },
  {
    id: "synth",
    label: "SYNTHESIS",
    shortLabel: "SYN",
    description: "Logic synthesis converts RTL to gate-level netlist using standard cell libraries.",
    concepts: ["GTECH", "CONSTRAINTS", "OPTIMIZATION"],
  },
  {
    id: "floorplan",
    label: "FLOORPLAN",
    shortLabel: "FP",
    description: "Establishing die area, macro placement and power distribution network.",
    concepts: ["DIE AREA", "POWER GRID", "MACROS"],
  },
  {
    id: "placement",
    label: "PLACEMENT",
    shortLabel: "PLACE",
    description: "Optimizing standard-cell locations while balancing timing, congestion and utilization.",
    concepts: ["UTILIZATION", "CONGESTION", "TIMING", "CELL DENSITY"],
  },
  {
    id: "cts",
    label: "CTS",
    shortLabel: "CTS",
    description: "Clock Tree Synthesis builds balanced clock distribution to minimize skew.",
    concepts: ["SKEW", "LATENCY", "CTS CELLS", "BALANCE"],
  },
  {
    id: "routing",
    label: "ROUTING",
    shortLabel: "ROUTE",
    description: "Global and detailed routing connecting all signals through metal layers.",
    concepts: ["VIA", "Metal Layers", "DRC", "ANTENNA"],
  },
  {
    id: "sta",
    label: "STA",
    shortLabel: "STA",
    description: "Static Timing Analysis verifies setup and hold constraints across all paths.",
    concepts: ["SETUP", "HOLD", "SLACK", "WNS"],
  },
  {
    id: "signoff",
    label: "SIGNOFF",
    shortLabel: "SIGN",
    description: "Final verification including DRC, LVS, IR drop and electromigration checks.",
    concepts: ["DRC", "LVS", "IR DROP", "EM"],
  },
];

export function PDFlow() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const activeData = PD_STAGES.find((s) => s.id === activeStage);

  return (
    <section
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section header */}
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
          02 / PHYSICAL DESIGN FLOW
        </div>
        <hr className="editorial-hr" style={{ marginBottom: "48px" }} />

        {/* Flow visualization — horizontal on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
          }}
          className="md:!grid-cols-1"
        >
          {/* Horizontal flow (desktop) */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0",
              overflowX: "auto",
              paddingBottom: "16px",
            }}
            className="max-md:!flex-col max-md:!gap-0"
          >
            {PD_STAGES.map((stage, i) => {
              const isActive = activeStage === stage.id;
              const isLast = i === PD_STAGES.length - 1;

              return (
                <div
                  key={stage.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  className="max-md:!w-full max-md:!flex-col max-md:!items-stretch"
                >
                  {/* Node */}
                  <button
                    onClick={() =>
                      setActiveStage(isActive ? null : stage.id)
                    }
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onMouseLeave={() => setActiveStage(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 8px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      minWidth: "80px",
                      transition: "all 0.2s ease",
                    }}
                    className="max-md:!w-full max-md:!items-start max-md:!flex-row max-md:!gap-4 max-md:!px-0 max-md:!py-3"
                  >
                    {/* Dot */}
                    <div
                      className="pd-node-dot"
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: isActive
                          ? "var(--accent)"
                          : "var(--surface-4)",
                        border: isActive
                          ? "none"
                          : "1px solid var(--border)",
                        transition: "all 0.3s ease",
                        boxShadow: isActive
                          ? "0 0 12px color-mix(in srgb, var(--accent) 30%, transparent)"
                          : "none",
                        flexShrink: 0,
                      }}
                    />

                    {/* Label */}
                    <span
                      className="pd-node-label"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        color: isActive ? "var(--text)" : "var(--text-muted)",
                        textTransform: "uppercase",
                        transition: "color 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stage.shortLabel}
                    </span>

                    {/* Full label (desktop only) */}
                    <span
                      className="hidden md:block"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8px",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        marginTop: "-4px",
                      }}
                    >
                      {stage.label}
                    </span>
                  </button>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className="max-md:!hidden"
                      style={{
                        width: "32px",
                        height: "1px",
                        background: isActive
                          ? "var(--accent)"
                          : "var(--border-subtle)",
                        transition: "background 0.3s ease",
                        flexShrink: 0,
                        marginTop: "20px",
                      }}
                    />
                  )}
                  {/* Vertical connector (mobile) */}
                  {!isLast && (
                    <div
                      className="md:!hidden"
                      style={{
                        width: "1px",
                        height: "16px",
                        background: "var(--border-subtle)",
                        marginLeft: "4px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div
          style={{
            marginTop: "32px",
            minHeight: "120px",
            padding: activeData ? "24px" : "0",
            background: activeData ? "var(--surface-2)" : "transparent",
            border: activeData ? "1px solid var(--border-subtle)" : "1px solid transparent",
            transition: "all 0.3s ease",
          }}
        >
          {activeData ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "20px",
              }}
              className="md:!grid-cols-[1fr_2fr]"
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "4px",
                  }}
                >
                  {activeData.label}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    margin: "0 0 16px 0",
                  }}
                >
                  {activeData.description}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {activeData.concepts.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.08em",
                        color: "var(--accent-secondary)",
                        background: "color-mix(in srgb, var(--accent-secondary) 8%, transparent)",
                        padding: "4px 10px",
                        border: "1px solid color-mix(in srgb, var(--accent-secondary) 15%, transparent)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                padding: "24px",
              }}
            >
              Hover a stage to explore →
            </div>
          )}
        </div>
      </div>
    </section>
  );
}