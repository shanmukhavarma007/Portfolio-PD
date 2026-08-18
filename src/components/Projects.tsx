"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const PROJECTS = [
  {
    num: "01",
    title: "TCL Timing Report Parser",
    category: "TCL / AUTOMATION",
    description:
      "A practical report-processing project focused on extracting timing information from STA-style reports. Parses setup/hold violations, slack values, and path details into structured engineering summaries.",
    problem: "Manual timing report analysis is time-consuming and error-prone for large designs with thousands of paths.",
    solution: "Automated parser extracts key metrics, categorizes violations, and generates actionable summaries for engineering review.",
    technology: "TCL",
    capabilities: [
      "FILE I/O",
      "REGEXP",
      "LISTS",
      "PROCEDURES",
      "STRING PROCESSING",
    ],
    flow: [
      "RAW STA REPORT",
      "PARSER",
      "SLACK EXTRACTION",
      "VIOLATION ANALYSIS",
      "ENGINEERING SUMMARY",
    ],
    github: "https://github.com/shanmukhavarma007",
    liveDemo: null,
  },
];

export function Projects() {
  const ref = useScrollReveal();

  return (
    <section
      id="work"
      ref={ref}
      className="scroll-reveal section-container"
      style={{
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          04 / SELECTED WORK
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

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
                    color: "var(--text)",
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

                {/* Problem/Solution */}
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
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {project.problem}
                  </p>
                </div>

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
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {project.solution}
                  </p>
                </div>

                {/* Technology */}
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

                {/* Capabilities */}
                <div style={{ marginBottom: "24px" }}>
                  <div
                    className="badge badge--muted"
                    style={{ marginBottom: "8px", fontSize: "8px" }}
                  >
                    CAPABILITIES
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {project.capabilities.map((c) => (
                      <span key={c} className="badge badge--muted">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

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
                      VIEW CODE ↗
                    </a>
                  )}
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
                    GITHUB ↗
                  </a>
                </div>
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
                  style={{ marginBottom: "20px" }}
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
                    <div key={step} style={{ display: "flex", alignItems: "center" }}>
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
                            marginLeft: "31px",
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
