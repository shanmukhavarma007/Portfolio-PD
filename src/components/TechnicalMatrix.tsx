"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

interface SkillItem {
  label: string;
  status: string;
  dots: number;
  context: string;
}

const TABS = [
  { id: "fundamentals", label: "Core Fundamentals" },
  { id: "eda", label: "EDA Tools" },
  { id: "automation", label: "Automation" },
  { id: "pd", label: "PD & Timing" },
] as const;

const SKILLS: Record<string, SkillItem[]> = {
  fundamentals: [
    { label: "Digital Design", status: "STRONG", dots: 5, context: "Logic, Boolean Algebra, Sequential" },
    { label: "CMOS Fundamentals", status: "STRONG", dots: 5, context: "MOSFET, Inverter, Digital CMOS" },
    { label: "Linux / Shell", status: "STRONG", dots: 5, context: "CLI, Filesystem, Processes" },
    { label: "RTL / Verilog", status: "FAMILIAR", dots: 2, context: "RTL Modeling, Basic Verilog" },
  ],
  eda: [
    { label: "Cadence Innovus", status: "TRAINING", dots: 4, context: "Place & Route implementation" },
    { label: "Cadence Tempus", status: "TRAINING", dots: 4, context: "Static Timing Analysis" },
    { label: "Cadence Genus", status: "TRAINING", dots: 4, context: "Logic Synthesis" },
    { label: "OpenLane", status: "EXPLORING", dots: 2, context: "Open-source RTL-to-GDSII" },
  ],
  automation: [
    { label: "Tcl", status: "STRONG", dots: 5, context: "EDA scripting, Layout automation" },
    { label: "Python / AWK", status: "INTERMEDIATE", dots: 3, context: "Data processing, Report parsing" },
  ],
  pd: [
    { label: "Physical Design Flow", status: "ACTIVE TRAINING", dots: 4, context: "Floorplan → Signoff" },
    { label: "Static Timing Analysis", status: "ACTIVE TRAINING", dots: 4, context: "Setup, Hold, Slack analysis" },
    { label: "Power Analysis", status: "USUALLY USE", dots: 3, context: "Power grid, IR drop basics" },
    { label: "Low-Power Design", status: "FAMILIAR", dots: 2, context: "Power domains, Isolation" },
  ],
};

const STATUS_STYLES: Record<string, { color: string; bg: string; badgeVariant: string }> = {
  STRONG: { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 8%, transparent)", badgeVariant: "accent-secondary" },
  "ACTIVE TRAINING": { color: "var(--warning)", bg: "color-mix(in srgb, var(--warning) 8%, transparent)", badgeVariant: "warning" },
  TRAINING: { color: "var(--accent)", bg: "color-mix(in srgb, var(--accent) 8%, transparent)", badgeVariant: "accent" },
  INTERMEDIATE: { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 5%, transparent)", badgeVariant: "accent-secondary" },
  "USUALLY USE": { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 5%, transparent)", badgeVariant: "accent-secondary" },
  FAMILIAR: { color: "var(--text-muted)", bg: "transparent", badgeVariant: "muted" },
  EXPLORING: { color: "var(--text-muted)", bg: "transparent", badgeVariant: "muted" },
};

function SkillCard({ label, status, dots, context }: SkillItem) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.FAMILIAR;

  return (
    <div
      className="surface-card"
      style={{
        padding: "clamp(16px, 2.5vw, 24px)",
        background: style.bg,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRadius: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 3vw, 16px)",
            fontWeight: 500,
            color: "var(--text)",
          }}
        >
          {label}
        </span>
        <span
          className={`badge badge--${style.badgeVariant || "muted"}`}
          style={{ flexShrink: 0 }}
        >
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
    </div>
  );
}

export function TechnicalMatrix() {
  const [activeTab, setActiveTab] = useState<string>("fundamentals");
  const ref = useScrollReveal();

  const currentSkills = SKILLS[activeTab] || [];

  return (
    <section
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          03 / TECHNICAL MATRIX
        </div>

        <WaveformHr style={{ marginBottom: "clamp(20px, 4vw, 32px)" }} />

        {/* Section header */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "0 0 4px 0",
          }}
        >
          Tech & Skills
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            margin: "0 0 clamp(16px, 3vw, 24px) 0",
          }}
        >
          Programming, core EDA domain knowledge, and physical design expertise
        </p>

        {/* Tab navigation */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "clamp(16px, 3vw, 24px)",
            flexWrap: "wrap",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`badge ${activeTab === tab.id ? "badge--accent" : "badge--muted"}`}
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

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-2"
        >
          {currentSkills.map((skill) => (
            <SkillCard key={skill.label} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
