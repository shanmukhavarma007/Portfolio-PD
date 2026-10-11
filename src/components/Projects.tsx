"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";
const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";

type PracticeModule = {
  num: string;
  name: string;
  detail: string;
};

type TermLine =
  | { kind: "sep" }
  | { kind: "log"; tag: string; tagClass: string; text: string };

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

type MetricTone = "neutral" | "warning" | "success";

type Metric = {
  label: string;
  value: string;
  tone?: MetricTone;
};

type Snapshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  fileName: string;
  tabLabel: string;
};

type Project = {
  num: string;
  title: string;
  category: string;
  categoryClass: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  previewTitle?: string;
  modules?: PracticeModule[];
  termLines?: TermLine[];
  statusLabel?: string;
  pulseStatus?: boolean;
  footerAction?: { label: string; href: string };
  metrics?: Metric[];
  snapshots?: Snapshot[];
  status?: string; // e.g., "SYN HANDOFF" — renders a status badge in the header
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
      { num: "[01]", name: "CMOS Basics", detail: "Transfer Curves & Sizing" },
      { num: "[02]", name: "Digital Logic", detail: "Setup/Hold Violations & FSMs" },
      { num: "[03]", name: "Linux for EDA", detail: "grep, awk, sed, Process Management" },
      { num: "[04]", name: "Tcl for PD", detail: "Regex, File I/O, Report Parsing" },
    ],
    statusLabel: "READY TO PRACTICE",
    pulseStatus: true,
    footerAction: { label: "Open VLSI Hub ↗", href: VLSI_HUB_URL },
  },
  {
    num: "02",
    title: "CVA6 — Logic Synthesis & QoR Analysis",
    category: "ASIC PD // LOGIC SYNTHESIS",
    categoryClass: "text-cyan-400",
    description:
      "Logic synthesis of the CVA6 RISC-V core with Genus, analyzing timing, instance count and area from the post-synthesis QoR report. Used to study violating path groups and constraint behavior on a large, hierarchical design.",
    tags: ["GENUS", "SDC", "QOR ANALYSIS", "TCL"],
    liveUrl: null,
    metrics: [
      { label: "CLOCK PERIOD", value: "1.700" },
      { label: "WNS", value: "-0.034", tone: "warning" },
      { label: "TNS", value: "-10.188", tone: "warning" },
      { label: "VIOLATING PATHS", value: "510", tone: "warning" },
      { label: "LEAF INSTANCES", value: "178,799" },
      { label: "CELL AREA", value: "592,578.141" },
    ],
    snapshots: [
      {
        src: "/projects/cva6/01-synthesis-qor.png",
        width: 807,
        height: 882,
        alt: "Genus post-synthesis QoR report for CVA6 showing timing by cost group, instance counts and cell area",
        caption: "Post-synthesis QoR summary: timing, instance count, area",
        fileName: "cva6_qor_summary",
        tabLabel: "QoR REPORT",
      },
      {
        src: "/projects/cva6/02-netlist.png",
        width: 1600,
        height: 875,
        alt: "Genus module view of the synthesized CVA6 netlist: green schematic with highlighted cell clusters, and the design browser listing terms, nets, standard cells and modules",
        caption: "Genus module view of the synthesized CVA6 netlist",
        fileName: "cva6_netlist_view",
        tabLabel: "NETLIST VIEW",
      },
    ],
  },
  {
    num: "03",
    title: "AES Core — Logic Synthesis & QoR Analysis",
    category: "ASIC PD // LOGIC SYNTHESIS",
    categoryClass: "text-cyan-400",
    description:
      "Logic synthesis of an AES core with Genus, closing timing with positive slack across all path groups. Post-synthesis QoR covers instance count, cell area and clock fanout.",
    tags: ["GENUS", "SDC", "QOR ANALYSIS", "TCL"],
    liveUrl: null,
    metrics: [
      { label: "CLOCK PERIOD", value: "1000.0" },
      { label: "WNS", value: "0.1", tone: "success" },
      { label: "TNS", value: "0.0", tone: "success" },
      { label: "VIOLATING PATHS", value: "0", tone: "success" },
      { label: "LEAF INSTANCES", value: "9,474" },
      { label: "CELL AREA", value: "5,774.454" },
      { label: "MAX FANOUT", value: "401 (clk)" },
    ],
    snapshots: [
      {
        src: "/projects/aes-core/01-synthesis-qor.png",
        width: 730,
        height: 859,
        alt: "Genus post-synthesis QoR report for the AES core showing timing by cost group, instance counts, cell area and max fanout",
        caption: "Post-synthesis QoR summary: timing, instance count, area, fanout",
        fileName: "aes_core_qor_summary",
        tabLabel: "QoR REPORT",
      },
      {
        src: "/projects/aes-core/02-netlist.jpeg",
        width: 1298,
        height: 821,
        alt: "Genus module view of the synthesized AES cipher top netlist: green schematic with a diagonal band of highlighted cells, and the design browser listing terms, nets, standard cells and modules",
        caption: "Genus module view of the synthesized AES core netlist",
        fileName: "aes_core_netlist_view",
        tabLabel: "NETLIST VIEW",
      },
    ],
  },
  {
    num: "04",
    title: "RTL Half Cycles — Logic Synthesis & QoR Analysis",
    category: "ASIC PD // LOGIC SYNTHESIS",
    categoryClass: "text-cyan-400",
    description:
      "Logic synthesis of a multi-clock RTL design (rtl_halfcycle_crosspaths) with Genus, constrained across four clocks. The post-synthesis QoR report and netlist view document the state of the design at synthesis handoff.",
    tags: ["GENUS", "SDC", "MULTI-CLOCK", "QOR ANALYSIS"],
    liveUrl: null,
    status: "SYN HANDOFF",
    metrics: [
      { label: "CLOCK PERIOD (CLK)", value: "1.000" },
      { label: "WNS", value: "-0.100", tone: "warning" },
      { label: "TNS", value: "-8.164", tone: "warning" },
      { label: "VIOLATING PATHS", value: "92", tone: "warning" },
      { label: "LEAF INSTANCES", value: "804" },
      { label: "CELL AREA", value: "1,360.170" },
    ],
    snapshots: [
      {
        src: "/projects/rtl-half-cycles/01-synthesis-qor.png",
        width: 958,
        height: 894,
        alt: "Genus post-synthesis QoR report for rtl_halfcycle_crosspaths listing four clocks, timing by cost group with negative slack on the i2r and r2o groups, instance counts and cell area",
        caption: "Post-synthesis QoR summary: clocks, timing by cost group, instance count, area",
        fileName: "rtl_half_cycles_qor_summary",
        tabLabel: "QoR REPORT",
      },
      {
        src: "/projects/rtl-half-cycles/02-netlist.jpeg",
        width: 960,
        height: 793,
        alt: "Genus schematic view of the synthesized rtl_halfcycle_crosspaths netlist: green nets and cell connections on a black background",
        caption: "Genus schematic view of the synthesized rtl_halfcycle_crosspaths netlist",
        fileName: "rtl_half_cycles_netlist_view",
        tabLabel: "NETLIST VIEW",
      },
    ],
  },
];

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
      className={`flex min-h-[44px] items-center gap-2 rounded-t-lg border-t border-x px-3 py-2 font-mono text-[11px] tracking-wide transition-colors ${
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
          <span className="ml-2 truncate font-mono text-[11px] tracking-wider text-slate-400">
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
                className={`w-[92px] shrink-0 select-none font-mono text-[11px] font-bold tracking-wide ${LOG_STYLES[line.level]}`}
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
        <span className="font-mono text-[11px] leading-relaxed text-emerald-400">
          {"$"} {tab.input}
          <span className="animate-pulse">▮</span>
        </span>
        <a
          href={tab.repo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold tracking-widest text-slate-300 transition-colors duration-200 hover:text-cyan-300"
        >
          {tab.repo.label} ↗
        </a>
      </div>
    </div>
  );
}

function SnapshotTabs({
  snapshots,
  activeIndex,
  onChange,
}: {
  snapshots: Snapshot[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex items-stretch gap-0.5 overflow-x-auto border-b border-white/10 bg-slate-900/80 px-2 pt-2">
      {snapshots.map((snap, i) => (
        <button
          key={snap.src}
          onClick={() => onChange(i)}
          className={`flex min-h-[44px] items-center gap-2 rounded-t-lg border-t border-x px-3 py-2 font-mono text-[11px] tracking-wide transition-colors ${
            i === activeIndex
              ? "border-white/10 bg-slate-950/90 text-cyan-300"
              : "border-white/10 bg-slate-900/50 text-slate-400 hover:text-slate-300"
          }`}
          style={{ cursor: "pointer" }}
        >
          {snap.tabLabel}
        </button>
      ))}
    </div>
  );
}

function SnapshotViewer({ snapshots }: { snapshots: Snapshot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLButtonElement;
    previousActiveElement.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
    // Move focus into the dialog once it is mounted.
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "";
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? snapshots.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === snapshots.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Tab") {
        // Trap focus inside the dialog.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, snapshots.length]);

  const currentSnap = snapshots[activeIndex];
  const figNumber = activeIndex === 0 ? "01" : "02";
  const lightboxFigNumber = lightboxIndex === 0 ? "01" : "02";

  return (
    <>
      {/* Snapshot frame */}
      <div className="glass-panel w-full max-w-full overflow-hidden rounded-2xl relative">
        {snapshots.length > 1 && (
          <SnapshotTabs
            snapshots={snapshots}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />
        )}

        <div className="relative p-3 sm:p-4 min-h-[280px] flex items-center justify-center">
          {/* Terminal-style title bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center gap-2 border-b border-slate-800 pb-2 pointer-events-none">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-slate-400">
              {currentSnap.fileName}
            </span>
            <span className="ml-auto shrink-0 rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-cyan-300">
              SNAPSHOT
            </span>
          </div>

          {/* Image with click to expand */}
          <div className="relative w-full h-full flex items-center justify-center p-8 pt-12">
            <button
              ref={triggerRef}
              onClick={() => openLightbox(activeIndex)}
              className="relative w-full h-full max-w-full cursor-zoom-in flex items-center justify-center"
              aria-label={`View ${currentSnap.caption} at full resolution`}
              style={{
                border: "1px solid rgba(6, 182, 212, 0.2)",
                borderRadius: "8px",
                background: "rgba(0, 0, 0, 0.3)",
                boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.05)",
              }}
            >
              <Image
                src={currentSnap.src}
                alt={currentSnap.alt}
                width={currentSnap.width}
                height={currentSnap.height}
                className="max-w-full max-h-[400px] object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              {/* Expand hint */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm">
                <span className="font-mono text-[10px] text-cyan-300">⌘</span>
                <span className="font-mono text-[10px] text-slate-300">Click to expand</span>
              </div>
            </button>
          </div>

          {/* Caption */}
          <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-wider text-slate-500">
            {"// FIG_" + figNumber + ": " + currentSnap.caption}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Full resolution QoR snapshot"
        >
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-slate-900 hover:border-cyan-400/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? snapshots.length - 1 : prev - 1)); }}
            className="absolute left-4 z-10 p-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-slate-900 hover:border-cyan-400/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === snapshots.length - 1 ? 0 : prev + 1)); }}
            className="absolute right-4 z-10 p-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-slate-900 hover:border-cyan-400/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={snapshots[lightboxIndex].src}
              alt={snapshots[lightboxIndex].alt}
              width={snapshots[lightboxIndex].width}
              height={snapshots[lightboxIndex].height}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              priority
              unoptimized
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-wider text-slate-400 text-center px-4">
            {"// FIG_" + lightboxFigNumber + ": " + snapshots[lightboxIndex].caption}
          </div>
        </div>
      )}
    </>
  );
}

function MetricsStrip({
  metrics,
  xlCols,
  className,
}: { metrics: Metric[]; xlCols?: 3 | 4; className?: string }) {
  const TONE_STYLES: Record<MetricTone, string> = {
    neutral: "border-slate-700 bg-slate-800/50 text-slate-300",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${xlCols === 4 ? "xl:grid-cols-4" : ""} ${className || ""}`}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`rounded-lg border px-3 py-2.5 ${TONE_STYLES[metric.tone || "neutral"]} transition-colors hover:border-opacity-50`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 mb-1">
            {metric.label}
          </div>
          <div className="font-mono text-sm font-medium tracking-wide leading-tight tabular-nums whitespace-nowrap">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasSnapshots = project.snapshots && project.snapshots.length > 0;
  const hasConsole = project.previewTitle && !hasSnapshots;
  const hasMetrics = project.metrics && project.metrics.length > 0;
  // AES has 7 metrics -> use 4 columns on xl for 4+3 layout
  const useXl4Cols = project.num === "03";

  return (
    <article
      className="scroll-reveal-child glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
      style={{ padding: "clamp(20px, 3vw, 36px)" }}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: details & actions */}
        <div className="flex flex-col min-w-0 h-full justify-between">
          {/* Top content: label row -> title -> description -> metrics */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">
                {project.num}
              </span>
              <span
                className={`font-mono text-[10px] font-semibold tracking-[0.15em] ${project.categoryClass}`}
              >
                {project.category}
              </span>
              {project.status && (
                <span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-200"
                  aria-label={`Status: ${project.status}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 6px var(--accent)",
                    }}
                  />
                  {project.status}
                </span>
              )}
            </div>

            <h3
              className="mt-3 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
              {project.description}
            </p>

            {hasMetrics && (
              <MetricsStrip
                className="mt-6"
                metrics={project.metrics!}
                xlCols={useXl4Cols ? 4 : 3}
              />
            )}
          </div>

          {/* Footer group: TECH STACK label -> chips -> links (pushed to bottom, min 28px from metrics) */}
          <div className="mt-7 flex flex-col gap-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
              TECH STACK
            </div>
            <div className="flex flex-wrap items-start gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center h-7 px-3 text-xs font-mono font-medium tracking-wider uppercase rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-cyan-950/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Actions - only for VLSI Hub (has liveUrl) */}
            {project.liveUrl && project.primaryCta && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-sm"
                >
                  {project.primaryCta.label}
                </a>
                {project.secondaryCta && (
                  <a
                    href={project.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary btn-sm"
                  >
                    {project.secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: snapshot viewer or tabbed console */}
        {hasSnapshots ? (
          <SnapshotViewer snapshots={project.snapshots!} />
        ) : hasConsole ? (
          <TabbedConsole />
        ) : (
          <div className="flex items-center justify-center min-h-[280px] text-slate-500 font-mono text-sm">
            No preview available
          </div>
        )}
      </div>
    </article>
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
      <div className="section-inner">
        <SectionHeader badge="04 // PROJECTS" title="Selected Work & Tooling" />

        <div className="mt-8 flex flex-col gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}