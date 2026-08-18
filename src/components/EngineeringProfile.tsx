"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const EDUCATION = {
  degree: "B.Tech — ECE",
  period: "2022 – 2026",
  institution: "Vignan's Institute of Information Technology",
  location: "Hyderabad, India",
};

const TRAINING = {
  role: "VLSI Physical Design Trainee",
  company: "Sumedha IT",
  status: "In Progress",
};

const FOCUS_AREAS = [
  { label: "Physical Design", primary: true },
  { label: "Static Timing Analysis" },
  { label: "RTL Synthesis" },
  { label: "PDN & Routing" },
  { label: "Tcl Automation" },
];

const SKILL_GROUPS = [
  {
    title: "Foundation",
    items: ["Digital Design", "CMOS", "Linux", "Tcl"],
    progress: 100,
  },
  {
    title: "Active Development",
    items: ["Physical Design", "STA", "EDA Flow"],
    progress: 65,
  },
  {
    title: "EDA Tools",
    items: ["Innovus", "Tempus", "Genus", "OpenLane"],
    progress: 45,
  },
];

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="engineering"
      ref={ref}
      className="scroll-reveal section-container"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          01 / ENGINEERING PROFILE
        </div>

        <WaveformHr style={{ marginBottom: "clamp(20px, 4vw, 32px)" }} />

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "0 0 16px 0",
          }}
        >
          Engineering Profile
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: "0 0 clamp(24px, 4vw, 40px) 0",
            maxWidth: "480px",
          }}
        >
          Education, active training, and core focus areas in VLSI physical design.
        </p>

        {/* 2-Column Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
          className="lg:!grid-cols-[1fr_1fr]"
        >
          {/* Left Column: Education & Training */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Education Card */}
            <div
              className="card"
              style={{
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <div style={{ marginBottom: "clamp(16px, 2vw, 20px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Education
                </span>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 3vw, 22px)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "var(--text)",
                    margin: "0 0 4px 0",
                  }}
                >
                  {EDUCATION.degree}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {EDUCATION.period}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 2vw, 14px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {EDUCATION.institution}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                {EDUCATION.location}
              </div>
            </div>

            {/* Training Card */}
            <div
              className="card"
              style={{
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "clamp(16px, 2vw, 20px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Active Training
                </span>
                <span
                  className="badge"
                  style={{
                    fontSize: "9px",
                    padding: "3px 8px",
                    background: "var(--success)",
                    color: "#FFF",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#FFF",
                      marginRight: "4px",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  {TRAINING.status}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 3vw, 22px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "var(--text)",
                  margin: "0 0 4px 0",
                }}
              >
                {TRAINING.role}
              </h3>

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 2vw, 14px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {TRAINING.company}
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas & Skills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Focus Areas Card */}
            <div
              className="card"
              style={{
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <div style={{ marginBottom: "clamp(16px, 2vw, 20px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Focus & Interests
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area.label}
                    className="badge"
                    style={{
                      fontSize: "11px",
                      padding: "6px 12px",
                      background: area.primary ? "var(--accent)" : "var(--surface-2)",
                      color: area.primary ? "#FFF" : "var(--text-secondary)",
                      border: `1px solid ${area.primary ? "var(--accent)" : "var(--border-subtle)"}`,
                    }}
                  >
                    {area.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Progress Card */}
            <div
              className="card"
              style={{
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <div style={{ marginBottom: "clamp(16px, 2vw, 20px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Technical Progress
                </span>
              </div>

              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.title}
                  style={{
                    marginBottom: "clamp(16px, 2vw, 20px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {group.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {group.progress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{
                      height: "3px",
                      background: "var(--border-subtle)",
                      marginBottom: "10px",
                      overflow: "hidden",
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${group.progress}%`,
                        background: "var(--accent)",
                        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        borderRadius: "2px",
                      }}
                    />
                  </div>

                  {/* Items as chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="badge badge--muted"
                        style={{ fontSize: "10px" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
