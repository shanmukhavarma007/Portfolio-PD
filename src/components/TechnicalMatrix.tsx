"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

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
    { label: "Physical Design Flow", status: "ACTIVE TRAINING", dots: 4, context: "Floorplan \u2192 Signoff" },
    { label: "Static Timing Analysis", status: "ACTIVE TRAINING", dots: 4, context: "Setup, Hold, Slack analysis" },
    { label: "Power Analysis", status: "USUALLY USE", dots: 3, context: "Power grid, IR drop basics" },
    { label: "Low-Power Design", status: "FAMILIAR", dots: 2, context: "Power domains, Isolation" },
  ],
};

const STATUS_STYLES: Record<string, { color: string; badgeVariant: string }> = {
  EXPERT: { color: "#0D9488", badgeVariant: "accent-secondary" },
  PROFICIENT: { color: "#0284C7", badgeVariant: "accent" },
  ADVANCED: { color: "#0284C7", badgeVariant: "accent" },
  INTERMEDIATE: { color: "#0891B2", badgeVariant: "accent-secondary" },
  "USUALLY USE": { color: "#0891B2", badgeVariant: "accent-secondary" },
  FAMILIAR: { color: "#94A3B8", badgeVariant: "muted" },
  EXPLORING: { color: "#94A3B8", badgeVariant: "muted" },
};

function SkillCard({ label, status, dots, context }: SkillItem) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.FAMILIAR;

  return (
    <div
      className="card"
      style={{
        padding: "clamp(16px, 2.5vw, 24px)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
      className="scroll-reveal section-container"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader index="03" title="Technical Matrix" />

        {/* Section header */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "0 0 4px 0",
          }}
        >
          Tech & Skills
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            color: "var(--text-secondary)",
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
