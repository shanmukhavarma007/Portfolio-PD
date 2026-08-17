"use client";

const FOUNDATIONS = ["Digital Design", "CMOS", "Linux", "Tcl"];
const BUILDING = ["Physical Design", "STA", "EDA Implementation Flow"];
const EDA_TOOLS = ["Cadence Innovus", "Cadence Tempus", "Cadence Genus"];
const OPEN_SOURCE = ["OpenLane"];

function SkillGroup({
  title,
  items,
  statusColor,
  statusLabel,
}: {
  title: string;
  items: string[];
  statusColor: string;
  statusLabel: string;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: statusColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: statusColor,
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            marginLeft: "auto",
          }}
        >
          {statusLabel}
        </span>
      </div>
      {items.map((item) => (
        <div
          key={item}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--text-secondary)",
            padding: "8px 0 8px 14px",
            borderLeft: "1px solid var(--border-subtle)",
            lineHeight: 1.5,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function EngineeringProfile() {
  return (
    <section
      id="engineering"
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Left: large statement + metadata */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            01 / ENGINEERING PROFILE
          </div>

          <hr className="editorial-hr" style={{ marginBottom: "32px" }} />

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: "0 0 24px 0",
            }}
          >
            Shanmukha Varma Penmetsa
          </h2>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "0.12em",
              color: "var(--accent-secondary)",
              textTransform: "uppercase",
              marginBottom: "24px",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            VLSI PHYSICAL DESIGN ENGINEER
          </div>

          {/* Metadata grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "LOCATION", value: "Hyderabad, India" },
              { label: "EDUCATION", value: "B.Tech — ECE · 2026\nVignan\u2019s Institute of Information Technology" },
              { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
              { label: "CURRENT FOCUS", value: "Physical Design · STA · EDA" },
              { label: "AUTOMATION", value: "Tcl · Linux · AWK" },
              { label: "EDA", value: "Cadence Innovus · Tempus · Genus · OpenLane" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "16px",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
                className="max-md:!grid-cols-1 max-md:!gap-1"
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--text)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: technical summary */}
        <div
          style={{
            padding: "32px",
            background: "var(--surface-1)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "28px",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border-subtle)",
              textTransform: "uppercase",
            }}
          >
            TECHNICAL STATUS
          </div>

          <SkillGroup
            title="FOUNDATION"
            items={FOUNDATIONS}
            statusColor="var(--accent-secondary)"
            statusLabel="COMPLETED / HANDS-ON"
          />
          <SkillGroup
            title="CURRENTLY DEVELOPING"
            items={BUILDING}
            statusColor="var(--warning)"
            statusLabel="ACTIVE"
          />
          <SkillGroup
            title="EDA — INSTITUTE"
            items={EDA_TOOLS}
            statusColor="var(--accent)"
            statusLabel="TRAINING"
          />
          <SkillGroup
            title="OPEN-SOURCE EDA"
            items={OPEN_SOURCE}
            statusColor="var(--accent-secondary)"
            statusLabel="INSTALLED / EXPLORING"
          />
        </div>
      </div>
    </section>
  );
}