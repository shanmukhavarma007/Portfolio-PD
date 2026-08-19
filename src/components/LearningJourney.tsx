"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

type StageStatus = "mastered" | "active" | "queued";

interface FlowStage {
  id: string;
  padId: string;
  stageNumber: string;
  title: string;
  status: StageStatus;
  description: string;
  artifacts?: string[];
  tags: string[];
  prerequisite?: string;
  links?: { label: string; url: string }[];
}

const pipelineStages: FlowStage[] = [
  {
    id: "foundation",
    padId: "PAD_01",
    stageNumber: "STAGE_01",
    title: "VLSI Foundation",
    status: "mastered",
    description: "Digital Design, CMOS logic, Linux environment, RTL modeling in Verilog, and Tcl scripting.",
    artifacts: ["RTL Verilog", "Tcl Scripts", "Linux Automation"],
    tags: ["DIGITAL DESIGN", "CMOS", "LINUX", "VERILOG", "TCL"],
    links: [
      { label: "RTL LABS REPO", url: "https://github.com/shanmukhavarma007" },
      { label: "TIMING BASICS", url: "#journey" },
      { label: "TCL AUTOMATIONS", url: "https://github.com/shanmukhavarma007" },
    ],
  },
  {
    id: "synthesis",
    padId: "PAD_02",
    stageNumber: "STAGE_02",
    title: "Logic Synthesis",
    status: "active",
    description: "Translating RTL descriptions to gate-level netlists with timing constraints (SDC), area tradeoffs, and cell mapping.",
    artifacts: ["Synthesized Netlists", "SDC Constraints", "Area/Timing Reports"],
    tags: ["GENUS / YOSYS", "SDC", "NETLIST", "GATE MAPPING", "STA BASICS"],
  },
  {
    id: "floorplanning",
    padId: "PAD_03",
    stageNumber: "STAGE_03",
    title: "Floorplanning",
    status: "queued",
    description: "Die area estimation, aspect ratio selection, core utilization, I/O pin allocation, and macro placement.",
    prerequisite: "Stage 02 (Logic Synthesis)",
    tags: ["DIE AREA", "ASPECT RATIO", "MACRO PLACEMENT", "IO PADS"],
  },
  {
    id: "powerplanning",
    padId: "PAD_04",
    stageNumber: "STAGE_04",
    title: "Power Planning",
    status: "queued",
    description: "Power Distribution Network (PDN) design: core power rings, vertical/horizontal stripes, rails, and IR-drop analysis.",
    prerequisite: "Stage 03 (Floorplanning)",
    tags: ["PDN", "POWER RINGS", "STRIPES", "IR DROP", "POWER RAILS"],
  },
  {
    id: "placement",
    padId: "PAD_05",
    stageNumber: "STAGE_05",
    title: "Placement",
    status: "queued",
    description: "Coarse and detailed standard cell placement, cell density balancing, and congestion reduction.",
    prerequisite: "Stage 04 (Power Planning)",
    tags: ["STD CELLS", "CONGESTION", "CELL DENSITY", "TIMING OPT"],
  },
  {
    id: "cts",
    padId: "PAD_06",
    stageNumber: "STAGE_06",
    title: "Clock Tree Synthesis",
    status: "queued",
    description: "Clock distribution network construction, skew and insertion delay minimization, and clock buffer sizing.",
    prerequisite: "Stage 05 (Placement)",
    tags: ["CLOCK SKEW", "LATENCY", "BUFFER INSERTION", "CLOCK ROOTS"],
  },
  {
    id: "routing",
    padId: "PAD_07",
    stageNumber: "STAGE_07",
    title: "Routing",
    status: "queued",
    description: "Global routing and detailed signal routing across metal layers while adhering to design rules and antenna limits.",
    prerequisite: "Stage 06 (CTS)",
    tags: ["GLOBAL ROUTING", "DETAIL ROUTING", "DRC", "CROSSTALK"],
  },
  {
    id: "signoff",
    padId: "PAD_08",
    stageNumber: "STAGE_08",
    title: "Signoff & Tapeout",
    status: "queued",
    description: "Comprehensive timing closure (STA), DRC/LVS physical verification, and GDSII/OASIS stream generation.",
    prerequisite: "Stage 07 (Routing)",
    tags: ["PRIMETIME", "CALIBRE DRC", "LVS", "GDSII EXPORT"],
  },
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
      segments.push(`M${x},${midY}`);
      segments.push(`L${x + 4},${highY}`);
      segments.push(`L${x + width / 2 - 4},${highY}`);
      segments.push(`L${x + width / 2},${midY}`);
      segments.push(`L${x + width / 2 + 4},${midY + highHeight}`);
      segments.push(`L${x + width - 4},${midY + highHeight}`);
      segments.push(`L${x + width},${midY}`);
    } else {
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
      case "mastered":
        return {
          border: "2px solid var(--success)",
          background: "color-mix(in srgb, var(--success) 6%, transparent)",
          shadow: "0 0 20px color-mix(in srgb, var(--success) 15%, transparent)",
          numberColor: "var(--success)",
          titleColor: "var(--text)",
          opacity: 1,
          statusBg: "var(--success)",
          statusColor: "#FFF",
          tagBg: "var(--surface-2)",
          tagColor: "var(--text-secondary)",
          tagBorder: "var(--border)",
        };
      case "active":
        return {
          border: "2px solid var(--warning)",
          background: "color-mix(in srgb, var(--warning) 8%, transparent)",
          shadow: "0 0 20px color-mix(in srgb, var(--warning) 20%, transparent)",
          numberColor: "var(--warning)",
          titleColor: "var(--text)",
          opacity: 1,
          statusBg: "var(--warning)",
          statusColor: "#FFF",
          tagBg: "var(--surface-2)",
          tagColor: "var(--text-secondary)",
          tagBorder: "var(--border)",
        };
      case "queued":
        return {
          border: "1px dashed var(--border)",
          background: "var(--surface-2)",
          shadow: "none",
          numberColor: "var(--text-muted)",
          titleColor: "var(--text-secondary)",
          opacity: 0.7,
          statusBg: "var(--surface-3)",
          statusColor: "var(--text-muted)",
          tagBg: "var(--surface-3)",
          tagColor: "var(--text-muted)",
          tagBorder: "var(--border-subtle)",
        };
    }
  };

  return (
    <section
      id="journey"
      ref={ref}
      className="scroll-reveal section-container section-glow"
      style={{
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
        <SectionHeader index="06" title="ASIC Physical Design Pipeline" />

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
            fontSize: "clamp(14px, 2.5vw, 16px)",
            color: "var(--text-secondary)",
            margin: "0 0 clamp(24px, 4vw, 48px) 0",
            maxWidth: "600px",
          }}
        >
          From RTL to signed-off GDSII. Each stage builds on the previous,
          moving through the complete ASIC physical design flow.
        </p>

        {/* Digital Waveform Track + Pin Nodes */}
        <div
          style={{
            position: "relative",
            marginBottom: "clamp(24px, 4vw, 40px)",
            overflow: "visible",
          }}
        >
          <svg
            viewBox="0 0 1200 60"
            style={{
              width: "100%",
              height: "60px",
              overflow: "visible",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Active waveform for stages 01-02 */}
            <path
              d={generateWaveformPath(50, 350, 40, true, 50, 14)}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              opacity="0.8"
              style={{ filter: "drop-shadow(0 0 4px color-mix(in srgb, var(--success) 50%, transparent))" }}
            />

            {/* Inactive waveform for stages 03-08 */}
            <path
              d={generateWaveformPath(350, 1150, 40, false, 50, 14)}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.5"
            />

            {/* Pin nodes */}
            {pipelineStages.map((stage, i) => {
              const x = 50 + i * 150;
              const y = 40;
              const isActive = stage.status === "mastered" || stage.status === "active";

              return (
                <g key={stage.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={isActive ? (stage.status === "mastered" ? "var(--success)" : "var(--warning)") : "var(--surface-3)"}
                    stroke={isActive ? (stage.status === "mastered" ? "var(--success)" : "var(--warning)") : "var(--border)"}
                    strokeWidth={isActive ? "2" : "1"}
                    opacity={stage.status === "queued" ? 0.5 : 1}
                    style={stage.status === "active" ? {
                      filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--warning) 50%, transparent))",
                    } : stage.status === "mastered" ? {
                      filter: "drop-shadow(0 0 4px color-mix(in srgb, var(--success) 50%, transparent))",
                    } : {}}
                  />
                  <text
                    x={x}
                    y={y + 22}
                    textAnchor="middle"
                    fill={isActive ? (stage.status === "mastered" ? "var(--success)" : "var(--warning)") : "var(--text-muted)"}
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.05em"
                    opacity={stage.status === "queued" ? 0.5 : 1}
                  >
                    {stage.padId}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stage Cards Grid - 4 columns on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {pipelineStages.map((stage) => {
            const styles = getStageStyles(stage.status);
            const isExpanded = expandedStage === stage.id;

            return (
              <div
                key={stage.id}
                className="card"
                style={{
                  border: styles.border,
                  background: styles.background,
                  boxShadow: styles.shadow,
                  padding: "clamp(16px, 2.5vw, 20px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: styles.opacity,
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
              >
                {/* Lock icon for queued stages */}
                {stage.status === "queued" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "12px",
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
                  {stage.status === "mastered" && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "var(--success)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 12px color-mix(in srgb, var(--success) 40%, transparent)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "#FFF",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    </div>
                  )}
                  {stage.status === "active" && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
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
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--warning)",
                        }}
                      />
                    </div>
                  )}
                  <span
                    className="badge"
                    style={{
                      background: styles.statusBg,
                      color: styles.statusColor,
                      fontSize: "8px",
                    }}
                  >
                    {stage.status === "mastered" ? "MASTERED" : stage.status === "active" ? "ACTIVE FOCUS" : "QUEUED"}
                  </span>
                </div>

                {/* Stage pin and title */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: styles.numberColor,
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {stage.stageNumber} {stage.padId}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(16px, 2.5vw, 18px)",
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
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    margin: "0 0 12px 0",
                    lineHeight: 1.5,
                  }}
                >
                  {stage.description}
                </p>

                {/* Prerequisite */}
                {stage.prerequisite && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                      marginBottom: "12px",
                    }}
                  >
                    PREREQUISITE: {stage.prerequisite}
                  </div>
                )}

                {/* Artifacts */}
                {stage.artifacts && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                      marginBottom: "12px",
                    }}
                  >
                    ARTIFACTS: {stage.artifacts.join(", ")}
                  </div>
                )}

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: stage.links ? "12px" : 0,
                  }}
                >
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge"
                      style={{
                        fontSize: "7px",
                        background: styles.tagBg,
                        color: styles.tagColor,
                        border: `1px solid ${styles.tagBorder}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {stage.links && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    {stage.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="badge badge--accent-secondary"
                        style={{
                          fontSize: "8px",
                          textDecoration: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label} ↗
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
      </div>
    </section>
  );
}
