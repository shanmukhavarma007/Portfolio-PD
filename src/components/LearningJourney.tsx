"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

type StageStatus = "COMPLETED" | "ACTIVE" | "QUEUED";

interface PDStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: StageStatus;
  statusLabel: string;
  metadata: string;
  topics: string[];
  deliverables?: { label: string; href: string }[];
}

const PD_STAGES: PDStage[] = [
  {
    id: "foundation",
    number: "01",
    title: "VLSI Foundation",
    subtitle: "Digital Design, CMOS, Linux, RTL/Verilog, Tcl",
    status: "COMPLETED",
    statusLabel: "Mastered",
    metadata: "Artifacts: RTL Verilog, Tcl Scripts, Linux Automation",
    topics: ["Digital Design", "CMOS", "Linux", "Verilog", "Tcl"],
    deliverables: [
      { label: "RTL Labs Repo", href: "https://github.com/shanmukhavarma007" },
      { label: "Timing Basics", href: "#journey" },
      { label: "Tcl Automations", href: "https://github.com/shanmukhavarma007" },
    ],
  },
  {
    id: "floorplanning",
    number: "02",
    title: "Floorplanning",
    subtitle: "Die Area, Power Grid, Macro Placement",
    status: "ACTIVE",
    statusLabel: "Active Focus",
    metadata: "Target: Q2 / In Lab",
    topics: ["Die Area", "Power Grid", "Macros", "IO Planning"],
  },
  {
    id: "placement",
    number: "03",
    title: "Placement",
    subtitle: "Utilization, Congestion, Timing",
    status: "QUEUED",
    statusLabel: "Queued",
    metadata: "Prerequisite: Stage 02",
    topics: ["Utilization", "Congestion", "Cell Density"],
  },
  {
    id: "cts",
    number: "04",
    title: "Clock Tree Synthesis",
    subtitle: "Skew, Latency, CTS Cells",
    status: "QUEUED",
    statusLabel: "Queued",
    metadata: "Prerequisite: Stage 03",
    topics: ["Skew", "Latency", "CTS Cells", "Balance"],
  },
  {
    id: "routing",
    number: "05",
    title: "Routing",
    subtitle: "Metal Layers, DRC, Antenna",
    status: "QUEUED",
    statusLabel: "Queued",
    metadata: "Prerequisite: Stage 04",
    topics: ["Metal Layers", "DRC", "Antenna", "Vias"],
  },
  {
    id: "signoff",
    number: "06",
    title: "Sign-Off",
    subtitle: "STA, DRC, LVS",
    status: "QUEUED",
    statusLabel: "Queued",
    metadata: "Prerequisite: Stage 05",
    topics: ["STA", "DRC", "LVS", "IR Drop"],
  },
];

const BUILDING_ITEMS = [
  { label: "PHYSICAL DESIGN", concepts: "Floorplanning \u00b7 Placement \u00b7 CTS \u00b7 Routing" },
  { label: "STA", concepts: "Setup \u00b7 Hold \u00b7 Timing Analysis" },
  { label: "EDA", concepts: "Innovus \u00b7 Tempus \u00b7 Genus" },
];

/* Waveform segment generator - creates clock-like rising/falling edges */
function generateWaveformPath(
  startX: number,
  endX: number,
  y: number,
  isActive: boolean,
  segmentWidth: number = 40,
  highHeight: number = 12
): string {
  const segments: string[] = [];
  let x = startX;
  const midY = y;
  const highY = y - highHeight;

  while (x < endX) {
    const remaining = endX - x;
    const width = Math.min(segmentWidth, remaining);

    if (isActive) {
      /* Rising edge */
      segments.push(`M${x},${midY}`);
      segments.push(`L${x + 4},${highY}`);
      segments.push(`L${x + width / 2 - 4},${highY}`);
      segments.push(`L${x + width / 2},${midY}`);
      /* Falling edge */
      segments.push(`L${x + width / 2 + 4},${midY + highHeight}`);
      segments.push(`L${x + width - 4},${midY + highHeight}`);
      segments.push(`L${x + width},${midY}`);
    } else {
      /* Flat low line for inactive */
      segments.push(`M${x},${midY + 4}`);
      segments.push(`L${x + width},${midY + 4}`);
    }

    x += width;
  }

  return segments.join(" ");
}

export function LearningJourney() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const ref = useScrollReveal();

  const getStageStyles = (status: StageStatus) => {
    switch (status) {
      case "COMPLETED":
        return {
          border: "2px solid #00f0ff",
          background: "color-mix(in srgb, #00f0ff 6%, transparent)",
          shadow: "0 0 20px color-mix(in srgb, #00f0ff 15%, transparent)",
          numberColor: "#00f0ff",
          titleColor: "var(--text)",
          opacity: 1,
        };
      case "ACTIVE":
        return {
          border: "2px solid var(--warning)",
          background: "color-mix(in srgb, var(--warning) 8%, transparent)",
          shadow: "0 0 20px color-mix(in srgb, var(--warning) 20%, transparent)",
          numberColor: "var(--warning)",
          titleColor: "var(--text)",
          opacity: 1,
        };
      case "QUEUED":
        return {
          border: "1px dashed var(--border)",
          background: "color-mix(in srgb, var(--surface-2) 40%, transparent)",
          shadow: "none",
          numberColor: "var(--text-muted)",
          titleColor: "var(--text-secondary)",
          opacity: 0.6,
        };
    }
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
          06 / SILICON TAPEOUT PATH
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "0 0 8px 0",
          }}
        >
          Physical Design Pipeline
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            color: "var(--text-secondary)",
            margin: "0 0 clamp(24px, 4vw, 48px) 0",
            maxWidth: "600px",
          }}
        >
          From foundational knowledge through silicon tapeout. Each stage builds
          on the previous, moving from RTL to signed-off GDSII.
        </p>

        {/* Digital Waveform Track + Pin Nodes */}
        <div
          style={{
            position: "relative",
            marginBottom: "clamp(24px, 4vw, 40px)",
            overflow: "visible",
          }}
        >
          {/* Waveform SVG */}
          <svg
            viewBox="0 0 900 60"
            style={{
              width: "100%",
              height: "60px",
              overflow: "visible",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Active waveform (solid glowing) for stages 01-02 */}
            <path
              d={generateWaveformPath(50, 350, 40, true, 50, 14)}
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              opacity="0.8"
              style={{
                filter: "drop-shadow(0 0 4px #00f0ff80)",
              }}
            />

            {/* Inactive waveform (dashed dimmed) for stages 03-06 */}
            <path
              d={generateWaveformPath(350, 850, 40, false, 50, 14)}
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.3"
            />

            {/* Pin nodes */}
            {PD_STAGES.map((stage, i) => {
              const x = 50 + i * 160;
              const y = 40;
              const isActive = stage.status === "COMPLETED" || stage.status === "ACTIVE";

              return (
                <g key={stage.id}>
                  {/* Pin circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={isActive ? "#00f0ff" : "var(--surface-3)"}
                    stroke={isActive ? "#00f0ff" : "var(--border)"}
                    strokeWidth={isActive ? "2" : "1"}
                    opacity={stage.status === "QUEUED" ? 0.5 : 1}
                    style={stage.status === "ACTIVE" ? {
                      filter: "drop-shadow(0 0 6px var(--warning))",
                    } : isActive ? {
                      filter: "drop-shadow(0 0 4px #00f0ff80)",
                    } : {}}
                  />
                  {/* Pin label */}
                  <text
                    x={x}
                    y={y + 22}
                    textAnchor="middle"
                    fill={isActive ? "#00f0ff" : "var(--text-muted)"}
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.05em"
                    opacity={stage.status === "QUEUED" ? 0.5 : 1}
                  >
                    PAD_{stage.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stage Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {PD_STAGES.map((stage) => {
            const styles = getStageStyles(stage.status);
            const isExpanded = expandedStage === stage.id;

            return (
              <div
                key={stage.id}
                className="surface-card"
                style={{
                  border: styles.border,
                  background: styles.background,
                  boxShadow: styles.shadow,
                  borderRadius: "12px",
                  padding: "clamp(16px, 2.5vw, 24px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: styles.opacity,
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
              >
                {/* Lock icon for queued stages */}
                {stage.status === "QUEUED" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "14px",
                      opacity: 0.5,
                    }}
                  >
                    🔒
                  </div>
                )}

                {/* Status badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  {stage.status === "COMPLETED" && (
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#00f0ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 12px #00f0ff80",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    </div>
                  )}
                  {stage.status === "ACTIVE" && (
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "color-mix(in srgb, var(--warning) 30%, transparent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "var(--warning)",
                        }}
                      />
                    </div>
                  )}
                  <span
                    className={`badge ${
                      stage.status === "COMPLETED"
                        ? "badge--accent-secondary"
                        : stage.status === "ACTIVE"
                        ? "badge--warning"
                        : "badge--muted"
                    }`}
                  >
                    {stage.statusLabel}
                  </span>
                </div>

                {/* Stage number and title */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: styles.numberColor,
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  STAGE_{stage.number}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 3vw, 22px)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: styles.titleColor,
                    margin: "0 0 8px 0",
                  }}
                >
                  {stage.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: "0 0 12px 0",
                    lineHeight: 1.5,
                  }}
                >
                  {stage.subtitle}
                </p>

                {/* Metadata */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  {stage.metadata}
                </div>

                {/* Topic badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: stage.deliverables ? "16px" : 0,
                  }}
                >
                  {stage.topics.map((topic) => (
                    <span
                      key={topic}
                      className={`badge ${
                        stage.status === "QUEUED" ? "badge--muted" : "badge--accent"
                      }`}
                      style={{ fontSize: "8px" }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Deliverables (only for completed stages) */}
                {stage.deliverables && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    {stage.deliverables.map((d) => (
                      <a
                        key={d.label}
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="badge badge--accent-secondary"
                        style={{
                          fontSize: "9px",
                          textDecoration: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {d.label} ↗
                      </a>
                    ))}
                  </div>
                )}

                {/* Expand indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    transition: "transform 0.2s ease",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </div>
              </div>
            );
          })}
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
              color: "#00f0ff",
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
              color: "var(--warning)",
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
            borderRadius: "12px",
            overflow: "hidden",
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
