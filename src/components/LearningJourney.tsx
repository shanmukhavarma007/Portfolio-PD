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
      { label: "TCL AUTOMATIONS", url: "https://github.com/shanmukhavarma007/tcl-scripts" },
      { label: "PRACTICE ON VLSI HUB", url: "https://vlsi-hub-iota.vercel.app/" },
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
    tags: ["GENUS / YOSYS", "SDC", "NETLIST", "GATE MAPPING", "TIMING BASICS"],
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
    description: "Comprehensive timing closure (setup/hold slack analysis within Innovus), DRC/LVS physical verification, and GDSII/OASIS stream generation.",
    prerequisite: "Stage 07 (Routing)",
    tags: ["CALIBRE DRC", "LVS", "GDSII EXPORT", "TIMING CLOSURE"],
  },
];

function StatusNode({ status }: { status: StageStatus }) {
  if (status === "mastered") {
    return (
      <span
        className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400 bg-emerald-500 font-mono text-[9px] font-bold text-white"
        style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)" }}
      >
        ✓
      </span>
    );
  }
  if (status === "active") {
    return (
      <span
        className="status-dot-pulse h-3.5 w-3.5 rounded-full border-2 border-amber-400 bg-transparent"
        style={{ color: "#F59E0B" }}
      />
    );
  }
  return (
    <span className="h-3 w-3 rounded-full border-2 border-slate-600 bg-slate-900" />
  );
}

export function LearningJourney() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const ref = useScrollReveal();

  const statusMeta: Record<
    StageStatus,
    { label: string; chipClass: string }
  > = {
    mastered: {
      label: "MASTERED",
      chipClass: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
    },
    active: {
      label: "ACTIVE FOCUS",
      chipClass: "border-amber-500/50 bg-amber-500/10 text-amber-400",
    },
    queued: {
      label: "QUEUED",
      chipClass: "border-slate-700 bg-slate-800/60 text-slate-400",
    },
  };

  return (
    <section
      id="pipeline"
      ref={ref}
      className="scroll-reveal section-container section-glow section-divider-top section-divider-bottom"
      style={{
        background: "var(--surface-1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader badge="06 // PIPELINE" title="ASIC PD Pipeline" />

        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 700,
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

        {/* Silicon timeline */}
        <div className="relative max-w-3xl">
          {/* Unified left rail anchor: 2px border defines the rail, gradient overlay centers on it */}
          <div className="relative pl-8 sm:pl-12 border-l-2 border-cyan-500/40">
            <div
              aria-hidden="true"
              className="absolute bottom-1 left-0 top-1 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-500/40 to-emerald-400 opacity-70"
            />

            <div className="flex flex-col gap-5">
              {pipelineStages.map((stage) => {
                const meta = statusMeta[stage.status];
                const isExpanded = expandedStage === stage.id;

                return (
                  <div key={stage.id} className="relative group">
                    {/* Perfectly centered status dot on the rail */}
                    <div className="absolute -left-[calc(2rem+1px)] sm:-left-[calc(3rem+1px)] top-6 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                      <StatusNode status={stage.status} />
                    </div>

                  <div
                    className={`card cursor-pointer p-5 min-h-[44px] ${
                      stage.status === "queued" ? "opacity-80" : ""
                    }`}
                    onClick={() =>
                      setExpandedStage(isExpanded ? null : stage.id)
                    }
                  >
                    {/* Header row */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-[0.15em] ${
                          stage.status === "queued"
                            ? "text-slate-500"
                            : "text-cyan-400"
                        }`}
                      >
                        {`${stage.stageNumber} // ${stage.padId}`}
                      </span>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-widest ${meta.chipClass}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <h3 className="mb-2 font-mono text-base font-bold tracking-wide text-white">
                      {stage.title}
                    </h3>
                    <p className="mb-3 text-[13px] leading-relaxed text-slate-300">
                      {stage.description}
                    </p>

                    {stage.prerequisite && (
                      <div className="mb-2 font-mono text-[9px] tracking-wider text-slate-500">
                        PREREQUISITE: {stage.prerequisite}
                      </div>
                    )}

                    {stage.artifacts && (
                      <div className="mb-3 font-mono text-[9px] tracking-wider text-slate-500">
                        ARTIFACTS: {stage.artifacts.join(", ")}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(isExpanded || stage.links) && stage.links && (
                      <div
                        className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {stage.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target={
                              link.url.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              link.url.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-cyan-300 transition-colors duration-200 hover:border-cyan-400/70 hover:bg-cyan-500/20"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Expand indicator */}
                    <span
                      className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-500 transition-transform duration-200"
                      style={{
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
