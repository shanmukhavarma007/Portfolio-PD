"use client";

const MILESTONES = [
  "DIGITAL DESIGN",
  "CMOS",
  "LINUX",
  "TCL",
  "RTL",
  "PHYSICAL DESIGN",
  "STA",
  "AUTOMATION",
];

export function LearningJourney() {
  return (
    <section
      id="journey"
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
          06 / LEARNING JOURNEY
        </div>
        <hr className="editorial-hr" style={{ marginBottom: "12px" }} />
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            marginBottom: "48px",
          }}
        >
          2026
        </div>

        {/* Horizontal timeline (desktop) */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0",
            overflowX: "auto",
            paddingBottom: "16px",
          }}
          className="max-md:!flex-col max-md:!gap-0"
        >
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1;
            const isCurrent = i >= MILESTONES.length - 3;
            return (
              <div
                key={m}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
                className="max-md:!w-full max-md:!flex-col max-md:!items-stretch"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 4px",
                    minWidth: "90px",
                  }}
                  className="max-md:!w-full max-md:!items-start max-md:!flex-row max-md:!gap-3 max-md:!py-3"
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isLast
                        ? "var(--accent)"
                        : isCurrent
                          ? "var(--accent-secondary)"
                          : "var(--surface-4)",
                      border: isLast || isCurrent ? "none" : "1px solid var(--border)",
                      boxShadow: isLast
                        ? "0 0 10px rgba(61, 139, 253, 0.3)"
                        : "none",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: isLast
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m}
                  </span>
                </div>
                {!isLast && (
                  <>
                    <div
                      className="max-md:!hidden"
                      style={{
                        width: "40px",
                        height: "1px",
                        background: "var(--border-subtle)",
                        flexShrink: 0,
                        marginTop: "12px",
                      }}
                    />
                    <div
                      className="md:!hidden"
                      style={{
                        width: "1px",
                        height: "12px",
                        background: "var(--border-subtle)",
                        marginLeft: "3px",
                        flexShrink: 0,
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}