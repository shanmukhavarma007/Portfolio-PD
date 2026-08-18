"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const FOUNDATION_NODES = [
  {
    id: "digital-design",
    label: "DIGITAL DESIGN",
    concepts: "Logic · Boolean Algebra · K-Maps · Combinational · Sequential",
  },
  {
    id: "cmos",
    label: "CMOS",
    concepts:
      "MOSFET · CMOS Logic · Inverter · Digital CMOS Fundamentals",
  },
  {
    id: "linux",
    label: "LINUX",
    concepts: "CLI · Filesystem · Processes · Shell · AWK",
  },
  {
    id: "rtl-verilog",
    label: "RTL / VERILOG",
    concepts: "RTL Modeling · Control Flow · Blocking / Non-blocking · Basic Verilog",
  },
  {
    id: "tcl",
    label: "TCL",
    concepts:
      "Variables · Lists · Arrays · Dictionaries · Regexp · File I/O · Procedures",
  },
];

const CX = 300;
const CY = 240;
const RADIUS = 160;
const SVG_H = 560;
const NODE_POSITIONS: [number, number][] = [
  [CX, CY - RADIUS + 60],
  [CX - RADIUS * 0.95, CY - RADIUS * 0.31 + 60],
  [CX + RADIUS * 0.95, CY - RADIUS * 0.31 + 60],
  [CX - RADIUS * 0.59, CY + RADIUS * 0.81 + 60],
  [CX + RADIUS * 0.59, CY + RADIUS * 0.81 + 60],
];

/* Stage positions along the PD flow connecting line */
const STAGE_POSITIONS: [number, number][] = [
  [CX - 200, CY],     /* 01 · VLSI Foundation */
  [CX - 100, CY],     /* 02 · Floorplanning */
  [CX, CY],           /* 03 · Placement */
  [CX + 100, CY],     /* 04 · CTS */
  [CX + 200, CY],     /* 05 · Routing */
  [CX + 300, CY],     /* 06 · Sign-Off */
];

const BUILDING_ITEMS = [
  { label: "PHYSICAL DESIGN", concepts: "Floorplanning · Placement · CTS · Routing" },
  { label: "STA", concepts: "Setup · Hold · Timing Analysis" },
  { label: "EDA", concepts: "Innovus · Tempus · Genus" },
];

const PD_STAGES = [
  {
    id: "foundation",
    number: "01",
    title: "VLSI Foundation",
    subtitle: "Digital systems, CMOS, Linux, RTL/Verilog, Tcl",
    status: "COMPLETED",
    topics: FOUNDATION_NODES,
  },
  {
    id: "floorplanning",
    number: "02",
    title: "Floorplanning",
    subtitle: "Die area, power grid, macros",
    status: "LEARNING",
    topics: [],
  },
  {
    id: "placement",
    number: "03",
    title: "Placement",
    subtitle: "Utilization, congestion, timing",
    status: "LEARNING",
    topics: [],
  },
  {
    id: "cts",
    number: "04",
    title: "Clock Tree Synthesis",
    subtitle: "Skew, latency, CTS cells",
    status: "LEARNING",
    topics: [],
  },
  {
    id: "routing",
    number: "05",
    title: "Routing",
    subtitle: "Metal layers, DRC, antenna",
    status: "LEARNING",
    topics: [],
  },
  {
    id: "signoff",
    number: "06",
    title: "Sign-Off",
    subtitle: "STA, DRC, LVS",
    status: "LEARNING",
    topics: [
      {
        label: "STA",
        concepts: "Setup · Hold · Timing Analysis",
      },
    ],
  },
];

/* Manhattan routing path from hub center to satellite node */
function manhattanPath(hubX: number, hubY: number, nx: number, ny: number): string {
  const midX = Math.round((hubX + nx) / 2);
  return `M${hubX},${hubY} L${midX},${hubY} L${midX},${ny} L${nx},${ny}`;
}

/* Manhattan path between two stage positions */
function stagePath(sx1: number, sy1: number, sx2: number, sy2: number): string {
  const midX = Math.round((sx1 + sx2) / 2);
  const midY = Math.round((sy1 + sy2) / 2);
  return `M${sx1},${sy1} L${midX},${sy1} L${midX},${midY} L${sx2},${midY} L${sx2},${sy2}`;
}

function splitLabel(label: string): string[] {
  const idx = label.indexOf(" / ");
  if (idx !== -1) {
    return [label.slice(0, idx), label.slice(idx + 3)];
  }
  return [label];
}

function splitConcepts(concepts: string): string[] {
  return concepts.split("·").map((s) => s.trim()).filter(Boolean);
}

export function LearningJourney() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const ref = useScrollReveal();

  const getVisibleNode = (id: string) => {
    if (hoveredNode === id || expandedNode === id) return id;
    return null;
  };

  const getStageStatusColor = (status: string) => {
    if (status === "COMPLETED") return "var(--accent)";
    if (status === "ACTIVE") return "var(--accent)";
    return "var(--text-muted)";
  };

  const getStageBorderColor = (status: string) => {
    if (status === "COMPLETED") return "3px solid var(--accent)";
    if (status === "ACTIVE") return "3px solid color-mix(in srgb, var(--accent) 60%, transparent)";
    return "3px solid var(--border-subtle)";
  };

  return (
    <section
      id="journey"
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* IC floorplan-style background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fp-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="4" y="4" width="112" height="112" fill="none" stroke="var(--border)" strokeWidth="0.5" />
              <rect x="8" y="8" width="48" height="32" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="60" y="8" width="52" height="20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="60" y="28" width="24" height="12" fill="none" stroke="var(--accent)" strokeWidth="0.3" opacity="0.5" />
              <rect x="8" y="44" width="32" height="28" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="44" y="44" width="36" height="20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="84" y="44" width="28" height="28" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="8" y="76" width="68" height="36" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="80" y="76" width="32" height="36" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.3" opacity="0.4" />
              <line x1="56" y1="8" x2="56" y2="112" stroke="var(--accent)" strokeWidth="0.2" opacity="0.3" />
              <line x1="8" y1="42" x2="112" y2="42" stroke="var(--border)" strokeWidth="0.2" opacity="0.3" />
              <line x1="8" y1="74" x2="112" y2="74" stroke="var(--border)" strokeWidth="0.2" opacity="0.2" />
              <line x1="40" y1="8" x2="40" y2="112" stroke="var(--border)" strokeWidth="0.15" opacity="0.2" />
              <line x1="80" y1="8" x2="80" y2="112" stroke="var(--border)" strokeWidth="0.15" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fp-grid)" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          06 / FOUNDATION BUILT
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

        {/* Main content: PD flow stages */}
        <div
          style={{
            position: "relative",
            marginTop: "clamp(24px, 4vw, 48px)",
            overflow: "visible",
          }}
        >
          {/* Connecting line - horizontal PCB trace */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "var(--border)",
              borderRadius: "2px",
              zIndex: 0,
            }}
          />
          {/* Stage cards */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "clamp(8px, 2vw, 12px)",
              padding: "clamp(12px, 3vw, 20px) 0",
            }}
          >
            {PD_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="surface-card"
                style={{
                  background:
                    stage.status === "COMPLETED"
                      ? "color-mix(in srgb, var(--accent) 5%, transparent)"
                    : stage.status === "ACTIVE"
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                    : "var(--surface-2)",
                  borderLeft:
                    stage.status === "COMPLETED"
                      ? "3px solid var(--accent)"
                    : stage.status === "ACTIVE"
                      ? "3px solid color-mix(in srgb, var(--accent) 60%, transparent)"
                      : "3px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "clamp(16px, 2.5vw, 24px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "110px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
                onClick={() => setExpandedStage(stage.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color:
                        stage.status === "COMPLETED"
                          ? "var(--accent)"
                          : stage.status === "ACTIVE"
                          ? "var(--accent)"
                          : "var(--text-muted)",
                    }}
                  >
                    {stage.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.05em",
                      color:
                        stage.status === "COMPLETED"
                          ? "var(--accent)"
                          : stage.status === "ACTIVE"
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {stage.title}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8.5px",
                    letterSpacing: "0.07em",
                    color:
                      stage.status === "LEARNING"
                        ? "var(--text-secondary)"
                        : stage.status === "COMPLETED"
                        ? "var(--accent)"
                        : "var(--text)",
                    margin: "2px 0 0 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stage.subtitle}
                </p>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background:
                      stage.status === "COMPLETED"
                        ? "var(--accent)"
                      : stage.status === "ACTIVE"
                      ? "color-mix(in srgb, var(--accent) 35%, transparent)"
                      : "var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "6px",
                    boxShadow:
                      stage.status === "ACTIVE"
                        ? "0 0 8px color-mix(in srgb, var(--accent) 25%, transparent)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--bg)",
                    }}
                  >
                    &#10003;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition strip */}
        <div
          style={{
            marginTop: "clamp(32px, 5vw, 56px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              marginBottom: "4px",
            }}
          >
            FOUNDATION COMPLETE
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              lineHeight: 1,
            }}
          >
            ↓
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--accent-secondary)",
              marginTop: "4px",
              marginBottom: "clamp(20px, 3vw, 36px)",
            }}
          >
            CURRENTLY BUILDING
          </div>
        </div>

        {/* Currently Building */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
          className="md:!grid-cols-3"
        >
          {BUILDING_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "24px",
                background: "var(--bg)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--surface-2)";
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
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <span
                  className="status-dot-pulse"
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--warning)",
                    color: "var(--warning)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    color: "var(--text)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {item.concepts}
              </div>
            </div>
          ))}
        </div>

        {/* Open-Source Exploration */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              height: "1px",
              flex: 1,
              background: "var(--border-subtle)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            OPEN-SOURCE EXPLORATION
          </span>
          <div
            style={{
              height: "1px",
              flex: "1",
              background: "var(--border-subtle)",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "var(--text-secondary)",
            marginTop: "12px",
          }}
        >
          OpenLane — Installed
        </div>
      </div>
    </section>
  );
}