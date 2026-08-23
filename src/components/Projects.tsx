"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";
const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";
const GITHUB_URL = "https://github.com/shanmukhavarma007";

const SLACK_SNIPPET = `# Extract worst setup slack from PrimeTime / Tempus report
set fh [open report_timing.rpt r]
set data [read $fh]
close $fh

set worst_slack 999999.0
foreach line [split $data "\\n"] {
    # regex-based violation pattern matching
    if {[regexp {slack\\s+\\(VIOLATED\\)\\s+(-?[0-9.]+)} $line -> slack]} {
        puts "VIOLATED PATH SLACK: $slack ns"
        if {$slack < $worst_slack} {
            set worst_slack $slack ;# critical path isolation
        }
    }
}

puts "WORST SETUP SLACK: $worst_slack ns"
`;

type Project = {
  num: string;
  title: string;
  category: string;
  description?: string;
  problem?: string;
  solution?: string;
  technology?: string;
  features?: string[];
  capabilities?: string[];
  capabilitiesLabel?: string;
  flow: string[];
  snippet?: string;
  github: string;
  liveDemo: string | null;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "VLSI Hub — Interactive Physical Design & ASIC Knowledge Engine",
    category: "FLAGSHIP / WEB APPLICATION",
    description:
      "A specialized web application built for VLSI engineers featuring interactive RTL-to-GDSII flow references, static timing analysis (STA) cheatsheets, floorplan calculators, and EDA automation snippets.",
    capabilities: [
      "Next.js",
      "TypeScript",
      "Physical Design Flow",
      "STA Reference",
      "EDA Tools",
    ],
    flow: [
      "INTERACTIVE RTL→GDSII REFERENCES",
      "STA CHEATSHEETS",
      "FLOORPLAN CALCULATORS",
      "EDA AUTOMATION SNIPPETS",
    ],
    github: GITHUB_URL,
    liveDemo: VLSI_HUB_URL,
  },
  {
    num: "02",
    title: "Tcl Timing Report Parser & EDA Scripting Suite",
    category: "TCL / EDA AUTOMATION",
    features: [
      "Automated STA report parsing",
      "Worst setup/hold slack extraction",
      "Critical path isolation",
      "Regex-based violation pattern matching",
      "Summary report generation for PrimeTime / Tempus logs",
    ],
    capabilities: [
      "Tcl",
      "EDA Automation",
      "Static Timing Analysis",
      "Regex",
      "PrimeTime / Tempus",
    ],
    capabilitiesLabel: "TECH STACK",
    flow: [
      "RAW STA REPORT",
      "PARSER",
      "SLACK EXTRACTION",
      "VIOLATION ANALYSIS",
      "ENGINEERING SUMMARY",
    ],
    snippet: SLACK_SNIPPET,
    github: TCL_SCRIPTS_URL,
    liveDemo: null,
  },
];

export function Projects() {
  const ref = useScrollReveal();
  const [openSnippet, setOpenSnippet] = useState<string | null>(null);

  return (
    <section
      id="work"
      ref={ref}
      className="scroll-reveal section-container section-glow section-divider-top section-divider-bottom"
      style={{
        background: "var(--surface-1)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader index="04" title="Selected Work" />

        {/* Project cards */}
        {PROJECTS.map((project, i) => (
          <article
            key={project.num}
            style={{
              borderBottom:
                i < PROJECTS.length - 1 ? "1px solid var(--border-subtle)" : "none",
              paddingBottom: "48px",
              marginBottom: i < PROJECTS.length - 1 ? "48px" : 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "24px",
              }}
              className="md:!grid-cols-[1fr_1fr]"
            >
              {/* Left: problem/architecture + tech pills + links */}
              <div>
                <div
                  className="badge badge--muted"
                  style={{ marginBottom: "8px" }}
                >
                  {project.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: "#0F172A",
                    margin: "0 0 12px 0",
                  }}
                >
                  {project.title}
                </h3>
                <div
                  className="badge badge--accent-secondary"
                  style={{ marginBottom: "16px" }}
                >
                  {project.category}
                </div>

                {/* Description */}
                {project.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#475569",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {project.description}
                  </p>
                )}

                {/* Problem/Solution */}
                {project.problem && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      className="badge badge--muted"
                      style={{ marginBottom: "6px", fontSize: "8px" }}
                    >
                      PROBLEM
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "#475569",
                        margin: 0,
                      }}
                    >
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      className="badge badge--muted"
                      style={{ marginBottom: "6px", fontSize: "8px" }}
                    >
                      SOLUTION
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "#475569",
                        margin: 0,
                      }}
                    >
                      {project.solution}
                    </p>
                  </div>
                )}

                {/* Technology */}
                {project.technology && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      className="badge badge--muted"
                      style={{ marginBottom: "8px", fontSize: "8px" }}
                    >
                      TECHNOLOGY
                    </div>
                    <span className="badge badge--accent">
                      {project.technology}
                    </span>
                  </div>
                )}

                {project.features && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      className="badge badge--muted"
                      style={{ marginBottom: "8px", fontSize: "8px" }}
                    >
                      CORE FEATURES
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              lineHeight: 1.55,
                              color: "#475569",
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Capabilities / Tech stack */}
                {project.capabilities && (
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      className="badge badge--muted"
                      style={{ marginBottom: "8px", fontSize: "8px" }}
                    >
                      {project.capabilitiesLabel ?? "CAPABILITIES"}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.capabilities.map((c) => (
                        <span key={c} className="badge badge--muted">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hover-lift badge badge--accent"
                      style={{
                        padding: "10px 20px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      LIVE DEMO ↗
                    </a>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hover-lift badge badge--accent"
                      style={{
                        padding: "10px 20px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      VIEW ON GITHUB
                    </a>
                  )}
                  {project.liveDemo ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hover-lift badge badge--muted"
                      style={{
                        padding: "10px 20px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      REPOSITORY ↗
                    </a>
                  ) : (
                    project.snippet && (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSnippet(
                            openSnippet === project.num ? null : project.num
                          )
                        }
                        className="btn-hover-lift badge badge--muted"
                        style={{
                          padding: "10px 20px",
                          textDecoration: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {openSnippet === project.num
                          ? "HIDE CODE BREAKDOWN"
                          : "CODE BREAKDOWN"}
                      </button>
                    )
                  )}
                </div>

                {/* Inline terminal snippet */}
                {!project.liveDemo &&
                  openSnippet === project.num &&
                  project.snippet && (
                    <div
                      style={{
                        marginTop: "16px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--border-subtle)",
                          background: "var(--surface-2)",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--error)",
                            opacity: 0.7,
                          }}
                        />
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--warning)",
                            opacity: 0.7,
                          }}
                        />
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--success)",
                            opacity: 0.7,
                          }}
                        />
                        <span
                          style={{
                            marginLeft: "8px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            color: "var(--text-muted)",
                          }}
                        >
                          parse_slack.tcl — TCL SNIPPET
                        </span>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          padding: "16px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          lineHeight: 1.7,
                          color: "var(--text-secondary)",
                          overflowX: "auto",
                        }}
                      >
                        {project.snippet}
                      </pre>
                    </div>
                  )}
              </div>

              {/* Right: framed schematic/waveform window */}
              <div
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "clamp(20px, 3vw, 32px)",
                }}
              >
                <div
                  className="badge badge--muted"
                  style={{ marginBottom: "20px", alignSelf: "flex-start" }}
                >
                  PROCESSING FLOW
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                  }}
                >
                  {project.flow.map((step, si) => (
                    <div key={step} style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              si === project.flow.length - 1
                                ? "var(--accent)"
                                : "var(--surface-4)",
                            border:
                              si === project.flow.length - 1
                                ? "none"
                                : "1px solid var(--border)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.06em",
                            color:
                              si === project.flow.length - 1
                                ? "var(--accent)"
                                : "var(--text-secondary)",
                          }}
                        >
                          {step}
                        </span>
                      </div>
                      {si < project.flow.length - 1 && (
                        <div
                          style={{
                            width: "1px",
                            height: "20px",
                            background: "var(--border-subtle)",
                            marginLeft: "2.5px",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
