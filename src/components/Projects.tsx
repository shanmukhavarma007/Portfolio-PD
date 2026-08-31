"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";
const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";

type TermLine =
  | { kind: "sep" }
  | { kind: "log"; tag: string; tagClass: string; text: string };

type PracticeModule = {
  num: string;
  name: string;
  detail: string;
};

type Project = {
  num: string;
  title: string;
  category: string;
  categoryClass: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  previewTitle: string;
  modules?: PracticeModule[];
  termLines?: TermLine[];
  statusLabel: string;
  pulseStatus?: boolean;
  footerAction: { label: string; href: string };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "VLSI Hub — Interactive CMOS, Digital & Scripting Platform",
    category: "WEB PLATFORM // PRACTICE ENGINE",
    categoryClass: "text-cyan-400",
    description:
      "An interactive web environment built for VLSI engineers to practice core semiconductor fundamentals: CMOS transistor behavior, digital logic design, Linux shell commands, and Tcl scripting for EDA automation.",
    tags: [
      "Next.js",
      "CMOS Logic",
      "Digital Design",
      "Linux CLI",
      "Tcl Automation",
      "Interactive Quizzes",
    ],
    liveUrl: VLSI_HUB_URL,
    primaryCta: { label: "LAUNCH VLSI HUB ↗", href: VLSI_HUB_URL },
    secondaryCta: { label: "EXPLORE MODULES", href: VLSI_HUB_URL },
    previewTitle: "vlsi-hub-session // interactive-practice",
    modules: [
      {
        num: "[01]",
        name: "CMOS Basics",
        detail: "Transfer Curves & Sizing",
      },
      {
        num: "[02]",
        name: "Digital Logic",
        detail: "Setup/Hold Violations & FSMs",
      },
      {
        num: "[03]",
        name: "Linux for EDA",
        detail: "grep, awk, sed, Process Management",
      },
      {
        num: "[04]",
        name: "Tcl for PD",
        detail: "Regex, File I/O, Report Parsing",
      },
    ],
    statusLabel: "READY TO PRACTICE",
    pulseStatus: true,
    footerAction: { label: "Open VLSI Hub ↗", href: VLSI_HUB_URL },
  },
];

type LogLevel = "INFO" | "WARN" | "OK" | "CMD" | "DRC_CLEAN";

type ConsoleLine = { level: LogLevel; text: string };

type ConsoleTab = {
  id: string;
  label: string;
  title: string;
  repo: { label: string; href: string };
  input: string;
  lines: ConsoleLine[];
};

const LOG_STYLES: Record<LogLevel, string> = {
  INFO: "text-cyan-300",
  WARN: "text-amber-300",
  OK: "text-emerald-300",
  CMD: "text-slate-300",
  DRC_CLEAN: "text-emerald-300",
};

const CONSOLE_TABS: ConsoleTab[] = [
  {
    id: "timing",
    label: "[01] TCL Timing Flow",
    title: "timing_flow.tcl // clock-tree + slack closure",
    repo: {
      label: "SRC: tcl-scripts/timing_flow.tcl",
      href: `${TCL_SCRIPTS_URL}/blob/main/timing_flow.tcl`,
    },
    input: "report_timing -setup -max_paths 100",
    lines: [
      { level: "CMD", text: "source timing_flow.tcl" },
      { level: "INFO", text: "Loading SDC constraints: timing.sdc ..." },
      { level: "INFO", text: "Clock tree synthesized — skew: 22.4ps" },
      { level: "INFO", text: "Propagate clock networks across 84K flops" },
      { level: "CMD", text: "report_timing -setup -max_paths 100" },
      { level: "INFO", text: "Path 1 — WNS 0.038ns (clock clk)" },
      { level: "INFO", text: "Path 2 — setup met, hold clean" },
      { level: "WARN", text: "Marginal hold on 12 leaf cells — adding buffers" },
      { level: "DRC_CLEAN", text: "DRC: 0 violations — timing closure accepted" },
      { level: "OK", text: "WNS >= 0ns / TNS 0 — signoff ready" },
    ],
  },
  {
    id: "macro",
    label: "[02] Macro Placer",
    title: "macro_placer.py // automated block placement",
    repo: {
      label: "SRC: tcl-scripts/macro_placer.tcl",
      href: `${TCL_SCRIPTS_URL}/blob/main/macro_placer.tcl`,
    },
    input: "place_macros -util 0.68",
    lines: [
      { level: "CMD", text: "python3 macro_placer.py --util 0.68" },
      { level: "INFO", text: "Parsing netlist — 6 macros, 8 power domains" },
      { level: "INFO", text: "Optimizing floorplan for congestion" },
      { level: "INFO", text: "SRAM_0 @ (44,44) — SRAM_1 @ (162,44)" },
      { level: "INFO", text: "PLL_TOP isolated with guard ring" },
      { level: "OK", text: "Core utilization: 68.4% (target <= 70%)" },
      { level: "DRC_CLEAN", text: "Legalized 100% — 0 overlaps" },
    ],
  },
  {
    id: "signoff",
    label: "[03] Signoff Automation",
    title: "signoff.sh // calibre DRC/LVS + GDS stream",
    repo: {
      label: "SRC: tcl-scripts/signoff.sh",
      href: `${TCL_SCRIPTS_URL}/blob/main/signoff.sh`,
    },
    input: "./signoff.sh --top top_chip --write-gds",
    lines: [
      { level: "CMD", text: "./signoff.sh --top top_chip --write-gds" },
      { level: "INFO", text: "Running Calibre DRC on layout.gds ..." },
      { level: "INFO", text: "Layer checks: metal1..metal8, via, sealring" },
      { level: "DRC_CLEAN", text: "DRC clean — 0 rule violations" },
      { level: "INFO", text: "Running Calibre LVS (top_chip.vs)" },
      { level: "OK", text: "LVS clean — netlist matches layout" },
      { level: "INFO", text: "IR drop: 2.1% VDD / 1.8% VSS (limits met)" },
      { level: "INFO", text: "Streaming out GDSII: top_chip.gds" },
      { level: "OK", text: "GDSII written — tapeout ready" },
    ],
  },
];

function TerminalTab({
  tab,
  active,
  onClick,
}: {
  tab: ConsoleTab;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[40px] items-center gap-2 rounded-t-lg border-t border-x px-3 py-2 font-mono text-[10px] tracking-wide transition-colors ${
        active
          ? "border-white/10 bg-slate-950/90 text-cyan-300"
          : "border-white/10 bg-slate-900/50 text-slate-400 hover:text-slate-300"
      }`}
      style={{ cursor: "pointer" }}
    >
      {tab.label}
    </button>
  );
}

function TabbedConsole() {
  const [activeTabId, setActiveTabId] = useState(CONSOLE_TABS[0].id);
  const tab = CONSOLE_TABS.find((t) => t.id === activeTabId) || CONSOLE_TABS[0];

  return (
    <div className="glass-panel w-full max-w-full overflow-hidden rounded-2xl">
      {/* Tab bar */}
      <div className="flex items-stretch gap-0.5 overflow-x-auto border-b border-white/10 bg-slate-900/80 px-2 pt-2">
        {CONSOLE_TABS.map((t) => (
          <TerminalTab
            key={t.id}
            tab={t}
            active={t.id === activeTabId}
            onClick={() => setActiveTabId(t.id)}
          />
        ))}
      </div>

      {/* Viewport */}
      <div className="min-h-[300px] p-3 sm:p-5">
        {/* Console title */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-slate-400">
            {tab.title}
          </span>
        </div>

        {/* Log stream */}
        <div
          key={activeTabId}
          className="pd-readout-animate overflow-x-auto whitespace-pre"
        >
          {tab.lines.map((line, i) => (
            <div key={i} className="flex items-start gap-2 py-0.5">
              <span
                className={`w-[92px] shrink-0 select-none font-mono text-[10px] font-bold tracking-wide ${LOG_STYLES[line.level]}`}
              >
                [{line.level}]
              </span>
              <span className="font-mono text-[11px] leading-relaxed text-slate-300">
                {line.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CLI input + repo link */}
      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-slate-900/60 px-4 py-3">
        <span className="font-mono text-[10px] leading-relaxed text-emerald-400">
          {"$"} {tab.input}
          <span className="animate-pulse">▮</span>
        </span>
        <a
          href={tab.repo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-slate-300 transition-colors duration-200 hover:text-cyan-300"
        >
          {tab.repo.label} ↗
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const ref = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-reveal section-container section-glow section-divider-top section-divider-bottom"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader badge="04 // PROJECTS" title="Selected Work &amp; Tooling" />

        <div className="mt-8 flex flex-col gap-10">
          {PROJECTS.map((project) => (
            <article
              key={project.num}
              className="glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
              style={{ padding: "clamp(20px, 3vw, 36px)" }}
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                {/* Left: details & actions */}
                <div className="flex flex-col">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-slate-400">
                      {project.num}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.15em] ${project.categoryClass}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="mb-4 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  <div className="mb-7">
                    <div className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass-badge font-mono text-[10px] tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap gap-3">
                    <a
                      href={project.primaryCta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary btn-sm"
                    >
                      {project.primaryCta.label}
                    </a>
                    {project.secondaryCta && (
                      <a
                        href={project.secondaryCta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary btn-sm"
                      >
                        {project.secondaryCta.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: tabbed console preview */}
                <TabbedConsole />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
