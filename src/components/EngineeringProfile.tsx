"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const STACK_GRID = [
  {
    category: "EDA Tools",
    items: ["Innovus", "Genus", "OpenLane"],
  },
  {
    category: "Physical Design",
    items: ["Floorplan", "Placement", "CTS", "Routing", "Signoff"],
  },
  {
    category: "Analysis & Verification",
    items: ["Timing Analysis", "Power Analysis", "IR Drop", "DRC", "LVS"],
  },
  {
    category: "Scripting & Automation",
    items: ["Tcl", "Python", "AWK", "Shell / Bash"],
  },
  {
    category: "Foundation",
    items: ["Digital Design", "CMOS", "RTL / Verilog", "Linux"],
  },
];

const COMPETENCIES = [
  {
    label: "RTL-to-GDSII Flow",
    tag: "FULL PIPELINE",
    description:
      "End-to-end ASIC implementation from netlist synthesis and floorplanning to signoff-grade tapeout stream.",
  },
  {
    label: "Timing Closure & CTS",
    tag: "MULTI-CORNER / OCV",
    description:
      "Setup/hold signoff across multi-PVT corners, AOCV/POCV derating, clock skew balancing, and slack closure.",
  },
  {
    label: "Synthesis & Constraints",
    tag: "SDC-DRIVEN",
    description:
      "Logic synthesis with Genus, SDC boundary constraints, false/multicycle paths, and area-timing tradeoffs.",
  },
  {
    label: "EDA Flow Automation",
    tag: "TCL / PYTHON",
    description:
      "Automated run-scripts, batch timing report parsing, constraint generation, and custom Tcl/Python utilities.",
  },
  {
    label: "Physical Verification",
    tag: "SIGNOFF-GRADE",
    description:
      "DRC, LVS, antenna rule closure, and metal fill compliance across advanced semiconductor process nodes.",
  },
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
      <pattern
        id="pcb-traces"
        x="0"
        y="0"
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 14h12m4 0h12"
          stroke="#06B6D4"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M14 0v12m0 4v12"
          stroke="#06B6D4"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="14"
          cy="14"
          r="1.5"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.3"
        />
        <circle cx="0" cy="0" r="0.8" fill="#06B6D4" />
        <circle cx="28" cy="0" r="0.8" fill="#06B6D4" />
        <circle cx="0" cy="28" r="0.8" fill="#06B6D4" />
        <circle cx="28" cy="28" r="0.8" fill="#06B6D4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pcb-traces)" />
  </svg>
);

type Competency = {
  label: string;
  tag: string;
  description: string;
};

function CompetencyCard({ label, tag, description }: Competency) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-cyan-500/15 bg-slate-900/40 backdrop-blur-md p-5 min-w-0 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08),0_4px_24px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
      {/* 4-corner L-bracket accents */}
      <span className="pd-comp-corner pd-comp-corner--tl" />
      <span className="pd-comp-corner pd-comp-corner--tr" />
      <span className="pd-comp-corner pd-comp-corner--bl" />
      <span className="pd-comp-corner pd-comp-corner--br" />

      {/* Top gradient trace line */}
      <span className="pd-comp-glow" />

      {/* Header — Title + Badge (aligned baseline) */}
      <div className="relative z-[1] flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[13px] font-medium text-slate-100 leading-tight">
          {label}
        </span>
        <span className="shrink-0 text-[10px] font-mono font-medium tracking-wider uppercase px-2.5 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
          {tag}
        </span>
      </div>

      {/* Body — Description */}
      <p className="relative z-[1] font-body text-sm text-slate-400 leading-relaxed m-0">
        {description}
      </p>
    </div>
  );
}

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="stack"
      ref={ref}
      className="scroll-reveal section-container section-glow"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader badge="01 // STACK" title="Technical Capabilities" />

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
          Complete ASIC physical design toolchain — from RTL synthesis through
          final verification, backed by strong EDA automation and foundational
          VLSI knowledge.
        </p>

        {/* ─── Skill Tags — Bento Flex Grid ─── */}
        <div className="relative flex flex-wrap gap-3 mb-8 md:mb-10">
          {PCB_SVG}
          {STACK_GRID.map((group) => (
            <div
              key={group.category}
              className="bg-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 min-w-[200px] flex-1 basis-[200px] max-w-sm"
            >
              <div className="font-mono text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono font-medium tracking-wider uppercase px-2.5 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-950/60 hover:scale-[1.03] transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Architecture & System Competencies ─── */}
        <div className="mb-3">
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-cyan-400 font-semibold">
            Architecture &amp; System Competencies
          </span>
        </div>

        {/* Row 1 — two hero cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
          {COMPETENCIES.slice(0, 2).map((comp) => (
            <CompetencyCard key={comp.label} {...comp} />
          ))}
        </div>

        {/* Row 2 — three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {COMPETENCIES.slice(2).map((comp) => (
            <CompetencyCard key={comp.label} {...comp} />
          ))}
        </div>
      </div>
    </section>
  );
}
