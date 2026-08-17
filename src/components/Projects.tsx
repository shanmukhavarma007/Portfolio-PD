"use client";

const PROJECTS = [
  {
    num: "01",
    title: "TCL TIMING REPORT PARSER",
    category: "TCL / AUTOMATION",
    description:
      "A practical report-processing project focused on extracting timing information from STA-style reports.",
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
  },
];

export function Projects() {
  return (
    <section
      id="work"
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          04 / SELECTED WORK
        </div>
        <hr className="editorial-hr" style={{ marginBottom: "48px" }} />

        {/* Project blocks */}
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
                gap: "32px",
              }}
              className="md:!grid-cols-[1fr_2fr]"
            >
              {/* Left: meta */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  {project.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 600,
                    color: "var(--text)",
                    margin: "0 0 12px 0",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--accent-secondary)",
                    marginBottom: "16px",
                  }}
                >
                  {project.category}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    margin: "0 0 24px 0",
                  }}
                >
                  {project.description}
                </p>

                {/* Technology */}
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    TECHNOLOGY
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--accent)",
                      background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                      padding: "4px 10px",
                      border: "1px solid color-mix(in srgb, var(--accent) 15%, transparent)",
                    }}
                  >
                    {project.technology}
                  </span>
                </div>

                {/* Capabilities */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    CAPABILITIES
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {project.capabilities.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.06em",
                          color: "var(--text-secondary)",
                          background: "var(--surface-2)",
                          padding: "3px 8px",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: flow visualization */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "24px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted)",
                    marginBottom: "20px",
                    textTransform: "uppercase",
                  }}
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