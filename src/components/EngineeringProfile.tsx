"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const STACK_GRID = [
  {
    category: "EDA Tools",
    color: "#06B6D4",
    items: ["Innovus", "Tempus", "Genus", "PrimeTime", "OpenLane"],
  },
  {
    category: "Physical Design",
    color: "#3B82F6",
    items: ["Floorplan", "Placement", "CTS", "Routing", "Signoff"],
  },
  {
    category: "Analysis & Verification",
    color: "#10B981",
    items: ["STA", "Power Analysis", "IR Drop", "DRC", "LVS"],
  },
  {
    category: "Scripting & Automation",
    color: "#F59E0B",
    items: ["Tcl", "Python", "AWK", "Shell / Bash"],
  },
  {
    category: "Foundation",
    color: "#8B5CF6",
    items: ["Digital Design", "CMOS", "RTL / Verilog", "Linux"],
  },
];

const COMPETENCIES = [
  { label: "RTL-to-GDSII Flow", value: "Full Pipeline", description: "End-to-end ASIC implementation from register-transfer level to tapeout-ready GDSII stream" },
  { label: "Timing Closure", value: "Multi-Corner", description: "Setup / hold analysis, OCV / AOCV derating, clock tree synthesis and skew minimization" },
  { label: "Physical Verification", value: "Signoff-Grade", description: "DRC, LVS, antenna rule checking, and density compliance across metal layers" },
  { label: "Power Architecture", value: "PDN Design", description: "Power grid planning, IR-drop analysis, electromigration checks, and low-power domain isolation" },
  { label: "EDA Automation", value: "Tcl / Python", description: "Custom tool flows, batch report parsing, constraint generation, and layout scripting" },
  { label: "Synthesis & Constraints", value: "SDC-Driven", description: "Logic synthesis with Genus, SDC constraint writing, area-timing tradeoff optimization" },
];

const PCB_SVG = (
  <svg
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      opacity: 0.05,
    }}
  >
    <defs>
      <pattern id="pcb-traces" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M0 14h12m4 0h12" stroke="#06B6D4" strokeWidth="0.5" fill="none" />
        <path d="M14 0v12m0 4v12" stroke="#06B6D4" strokeWidth="0.5" fill="none" />
        <circle cx="14" cy="14" r="1.5" fill="none" stroke="#06B6D4" strokeWidth="0.3" />
        <circle cx="0" cy="0" r="0.8" fill="#06B6D4" />
        <circle cx="28" cy="0" r="0.8" fill="#06B6D4" />
        <circle cx="0" cy="28" r="0.8" fill="#06B6D4" />
        <circle cx="28" cy="28" r="0.8" fill="#06B6D4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pcb-traces)" />
  </svg>
);

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

        {/* ─── Stack Grid — PCB-trace HUD panels ─── */}
        <div className="pd-stack-grid">
          {PCB_SVG}
          {STACK_GRID.map((group) => (
            <div key={group.category} className="pd-stack-panel">
              <div className="pd-stack-label" style={{ color: group.color }}>
                <span
                  className="pd-led"
                  style={{
                    backgroundColor: group.color,
                    boxShadow: `0 0 6px ${group.color}`,
                  }}
                />
                {group.category}
              </div>
              <div className="pd-stack-chips">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="pd-stack-chip"
                    style={{
                      color: group.color,
                      borderColor: `color-mix(in srgb, ${group.color} 40%, transparent)`,
                      background: `color-mix(in srgb, ${group.color} 8%, transparent)`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Architecture & System Competencies ─── */}
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

        <div className="pd-comp-grid">
          {COMPETENCIES.map((comp) => (
            <div key={comp.label} className="pd-comp-card">
              {/* 4-corner L-bracket accents */}
              <span className="pd-comp-corner pd-comp-corner--tl" />
              <span className="pd-comp-corner pd-comp-corner--tr" />
              <span className="pd-comp-corner pd-comp-corner--bl" />
              <span className="pd-comp-corner pd-comp-corner--br" />

              {/* Top gradient trace line (revealed on hover) */}
              <span className="pd-comp-glow" />

              {/* Content */}
              <div className="pd-comp-content">
                <span className="pd-comp-title">{comp.label}</span>
                <span className="pd-comp-badge">{comp.value}</span>
              </div>
              <p className="pd-comp-desc">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
