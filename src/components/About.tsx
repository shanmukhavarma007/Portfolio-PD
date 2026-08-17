"use client";

const METADATA = [
  { label: "EDUCATION", value: "B.Tech — ECE · 2026\nVignan\u2019s Institute of Information Technology" },
  { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
  { label: "CURRENT FOCUS", value: "VLSI PHYSICAL DESIGN" },
  { label: "INTERESTS", value: "Physical Design · STA · Automation" },
  { label: "STATUS", value: "Intensive Training" },
];

export function About() {
  return (
    <section
      id="about"
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
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
        {/* Left */}
        <div>
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
            08 / ABOUT THE ENGINEER
          </div>
          <hr className="editorial-hr" style={{ marginBottom: "32px" }} />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "480px",
            }}
          >
            A VLSI Physical Design engineer currently undergoing intensive
            training. Building hands-on capability through active project work,
            engineering notes and continuous learning. Focused on the physical
            design flow from floorplan through signoff.
          </p>
        </div>

        {/* Right: metadata */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {METADATA.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "16px",
                padding: "14px 0",
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
    </section>
  );
}