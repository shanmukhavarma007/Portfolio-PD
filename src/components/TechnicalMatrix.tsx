"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";

const VLSI_HUB_LINK = {
  label: "PRACTICE ON VLSI HUB ↗",
  href: VLSI_HUB_URL,
};

interface SkillItem {
  label: string;
  status: string;
  dots: number;
  context: string;
  link?: { label: string; href: string };
}

const TABS = [
  { id: "fundamentals", label: "Core Fundamentals" },
  { id: "eda", label: "EDA Tools" },
  { id: "automation", label: "Automation" },
  { id: "pd", label: "PD & Timing" },
] as const;

const SKILLS: Record<string, SkillItem[]> = {
  fundamentals: [
    { label: "Digital Design", status: "STRONG", dots: 5, context: "Logic, Boolean Algebra, Sequential", link: VLSI_HUB_LINK },
    { label: "CMOS Fundamentals", status: "STRONG", dots: 5, context: "MOSFET, Inverter, Digital CMOS" },
    { label: "Linux / Shell", status: "STRONG", dots: 5, context: "CLI, Filesystem, Processes", link: VLSI_HUB_LINK },
    { label: "RTL / Verilog", status: "FAMILIAR", dots: 2, context: "RTL Modeling, Basic Verilog" },
  ],
  eda: [
    { label: "Cadence Innovus", status: "TRAINING", dots: 4, context: "Place & Route implementation" },
    { label: "Cadence Genus", status: "COMPLETED", dots: 4, context: "Logic Synthesis" },
    { label: "OpenLane", status: "EXPLORING", dots: 2, context: "Open-source RTL-to-GDSII" },
  ],
  automation: [
    { label: "Tcl", status: "STRONG", dots: 5, context: "EDA scripting, Layout automation", link: VLSI_HUB_LINK },
    { label: "Python / AWK", status: "INTERMEDIATE", dots: 3, context: "Data processing, Report parsing" },
  ],
  pd: [
    { label: "Physical Design Flow", status: "ACTIVE TRAINING", dots: 4, context: "Floorplan \u2192 Signoff" },
    { label: "Static Timing Analysis", status: "COMPLETED", dots: 4, context: "Setup, Hold, Slack analysis" },
    { label: "Power Analysis", status: "USUALLY USE", dots: 3, context: "Power grid, IR drop basics" },
    { label: "Low-Power Design", status: "FAMILIAR", dots: 2, context: "Power domains, Isolation" },
  ],
};

const STATUS_STYLES: Record<string, { color: string; badgeVariant: string }> = {
  STRONG: { color: "var(--success)", badgeVariant: "success" },
  COMPLETED: { color: "var(--success)", badgeVariant: "success" },
  "ACTIVE TRAINING": { color: "var(--accent)", badgeVariant: "accent" },
  TRAINING: { color: "var(--accent)", badgeVariant: "accent" },
  "USUALLY USE": { color: "var(--accent-secondary)", badgeVariant: "accent-secondary" },
  INTERMEDIATE: { color: "var(--accent-secondary)", badgeVariant: "accent-secondary" },
  FAMILIAR: { color: "var(--warning)", badgeVariant: "warning" },
  EXPLORING: { color: "var(--text-muted)", badgeVariant: "muted" },
};

function SkillCard({ label, status, dots, context, link }: SkillItem) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.FAMILIAR;

  return (
    <div
      className="glass-card"
      style={{
        position: "relative",
        padding: "clamp(16px, 2.5vw, 24px)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: style.color,
          opacity: 0.6,
          borderRadius: "16px 16px 0 0",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 3vw, 16px)",
            fontWeight: 500,
            color: "var(--text)",
            minWidth: 0,
          }}
        >
          {label}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-200">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: style.color, boxShadow: `0 0 6px ${style.color}` }}
          />
          {status}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--text-muted)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {context}
      </p>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i < dots ? style.color : "var(--border-subtle)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge--accent-secondary min-h-[44px]"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            alignSelf: "flex-start",
            marginTop: "2px",
            alignItems: "center",
          }}
        >
          {link.label}
        </a>
      )}
    </div>
  );
}

export function TechnicalMatrix() {
  const [activeTab, setActiveTab] = useState<string>("fundamentals");
  const ref = useScrollReveal();

  const currentSkills = SKILLS[activeTab] || [];

  // Keep the active tab visible in the mobile scroll strip.
  useEffect(() => {
    const el = document.getElementById(`mat-tab-${activeTab}`);
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const idx = TABS.findIndex((t) => t.id === activeTab);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    const id = TABS[next].id;
    setActiveTab(id);
    document.getElementById(`mat-tab-${id}`)?.focus();
  };

  return (
    <section
      id="matrix"
      ref={ref}
      className="scroll-reveal section-container section-glow"
    >
      <div className="section-inner">
        <SectionHeader badge="03 // MATRIX" title="Technical Matrix" />

        <p className="text-pretty max-w-prose text-[var(--text-secondary)] leading-relaxed mb-8 text-base sm:text-lg">
          Programming, core EDA domain knowledge, and physical design expertise
        </p>

        {/* Tab navigation — horizontally scrollable one-line tab strip on mobile */}
        <div
          className="scroll-reveal-child tab-strip gap-2 -mx-4 px-4 pb-2"
          role="tablist"
          aria-label="Skill categories"
          onKeyDown={onTabKeyDown}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`mat-tab-${tab.id}`}
              className={`badge min-h-[44px] shrink-0 whitespace-nowrap ${activeTab === tab.id ? "badge--accent" : "badge--muted"}`}
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: "6px 14px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento grid — 1 col mobile, 2 at md, 3 at lg */}
        <div className="scroll-reveal-child grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {currentSkills.map((skill) => (
            <SkillCard key={skill.label} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
