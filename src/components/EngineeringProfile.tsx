"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const STACK_GRID = [
  {
    category: "EDA Tools",
    color: "var(--accent)",
    items: ["Innovus", "Tempus", "Genus", "PrimeTime", "OpenLane"],
  },
  {
    category: "Physical Design",
    color: "var(--accent-secondary)",
    items: ["Floorplan", "Placement", "CTS", "Routing", "Signoff"],
  },
  {
    category: "Analysis & Verification",
    color: "var(--success)",
    items: ["STA", "Power Analysis", "IR Drop", "DRC", "LVS"],
  },
  {
    category: "Scripting & Automation",
    color: "var(--warning)",
    items: ["Tcl", "Python", "AWK", "Shell / Bash"],
  },
  {
    category: "Foundation",
    color: "var(--text-muted)",
    items: ["Digital Design", "CMOS", "RTL / Verilog", "Linux"],
  },
];

const COMPETENCIES = [
  { label: "RTL-to-GDSII Flow", value: "Full Pipeline", description: "End-to-end ASIC implementation from register-transfer level to tapeout-ready GDSII stream" },
  { label: "Timing Closure", value: "Multi-Corner", description: "Setup / hold analysis, OCV / AOCV derating, clock树 synthesis and skew minimization" },
  { label: "Physical Verification", value: "Signoff-Grade", description: "DRC, LVS, antenna rule checking, and density compliance across metal layers" },
  { label: "Power Architecture", value: "PDN Design", description: "Power grid planning, IR-drop analysis, electromigration checks, and low-power domain isolation" },
  { label: "EDA Automation", value: "Tcl / Python", description: "Custom tool flows, batch report parsing, constraint generation, and layout scripting" },
  { label: "Synthesis & Constraints", value: "SDC-Driven", description: "Logic synthesis with Genus, SDC constraint writing, area-timing tradeoff optimization" },
];

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="engineering"
      ref={ref}
      className="scroll-reveal section-container section-glow"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader index="01" title="Technical Capabilities &amp; Stack Architecture" />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: "0 0 clamp(24px, 4vw, 40px) 0",
            maxWidth: "640px",
          }}
        >
          Complete ASIC physical design toolchain — from RTL synthesis through signoff, backed by strong EDA automation and foundational VLSI knowledge.
        </p>

        {/* Core Stack Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
        >
          {STACK_GRID.map((group) => (
            <div
              key={group.category}
              style={{
                padding: "clamp(16px, 2.5vw, 24px)",
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: group.color,
                  fontWeight: 600,
                }}
              >
                {group.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="badge badge--muted"
                    style={{ fontSize: "11px" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture & System Competencies */}
        <div style={{ marginBottom: "clamp(12px, 2vw, 16px)" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            Architecture &amp; System Competencies
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "12px",
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
        >
          {COMPETENCIES.map((comp) => (
            <div
              key={comp.label}
              className="card"
              style={{
                padding: "clamp(16px, 2.5vw, 20px)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {comp.label}
                </span>
                <span
                  className="badge badge--accent-secondary"
                  style={{ fontSize: "9px", flexShrink: 0 }}
                >
                  {comp.value}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
