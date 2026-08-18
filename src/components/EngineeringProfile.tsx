"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const SKILL_GROUPS = [
  {
    title: "FOUNDATION",
    items: ["Digital Design", "CMOS", "Linux", "Tcl"],
    statusColor: "var(--accent-secondary)",
    statusLabel: "COMPLETED / HANDS-ON",
    progress: 100,
  },
  {
    title: "CURRENTLY DEVELOPING",
    items: ["Physical Design", "STA", "EDA Implementation Flow"],
    statusColor: "var(--warning)",
    statusLabel: "ACTIVE",
    progress: 65,
  },
  {
    title: "EDA \u2014 INSTITUTE",
    items: ["Cadence Innovus", "Cadence Tempus", "Cadence Genus"],
    statusColor: "var(--accent)",
    statusLabel: "TRAINING",
    progress: 45,
  },
  {
    title: "OPEN-SOURCE EDA",
    items: ["OpenLane"],
    statusColor: "var(--accent-secondary)",
    statusLabel: "INSTALLED / EXPLORING",
    progress: 30,
  },
];

const METADATA = [
  { label: "LOCATION", value: "Hyderabad, India" },
  { label: "EDUCATION", value: "B.Tech \u2014 ECE \u00b7 2026\nVignan\u2019s Institute of Information Technology" },
  { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
  { label: "CURRENT FOCUS", value: "Physical Design \u00b7 STA \u00b7 EDA" },
  { label: "AUTOMATION", value: "Tcl \u00b7 Linux \u00b7 AWK" },
  { label: "EDA", value: "Cadence Innovus \u00b7 Tempus \u00b7 Genus \u00b7 OpenLane" },
];

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="engineering"
      ref={ref}
      className="scroll-reveal section-container"
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(32px, 5vw, 48px)",
          position: "relative",
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Left: profile info + metadata */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "clamp(16px, 3vw, 24px)",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border-subtle)",
              maxWidth: "480px",
            }}
          >
            Location, education, training focus and core technical capabilities.
          </div>

          {/* Metadata grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--border-subtle)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {METADATA.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "clamp(12px, 2vw, 16px)",
                  background: "var(--bg)",
                }}
              >
                <div
                  className="badge badge--muted"
                  style={{ marginBottom: "4px", fontSize: "8px", padding: "2px 6px" }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "var(--text)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.4,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: technical summary with progress bars */}
        <div
          className="card"
          style={{
            padding: "clamp(20px, 3vw, 32px)",
          }}
        >
          <div
            className="badge badge--muted"
            style={{
              marginBottom: "clamp(20px, 3vw, 28px)",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            TECHNICAL STATUS
          </div>

          {SKILL_GROUPS.map((group) => (
            <div key={group.title} style={{ marginBottom: "clamp(20px, 3vw, 28px)" }}>
              {/* Group header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: group.statusColor,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="badge"
                    style={{
                      color: group.statusColor,
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      fontSize: "10px",
                    }}
                  >
                    {group.title}
                  </span>
                </div>
                <span
                  className="badge badge--muted"
                  style={{ fontSize: "8px" }}
                >
                  {group.statusLabel}
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
                    background: group.statusColor,
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
                    style={{ fontSize: "9px" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
