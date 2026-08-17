"use client";

const ITEMS = [
  { label: "PHYSICAL DESIGN", state: "LEARNING", color: "var(--warning)" },
  { label: "STA", state: "PRACTICING", color: "var(--warning)" },
  { label: "TCL AUTOMATION", state: "PROJECT-BASED", color: "var(--accent)" },
  { label: "LINUX", state: "HANDS-ON", color: "var(--success)" },
  { label: "RTL / VERILOG", state: "LEARNING", color: "var(--warning)" },
  { label: "CMOS", state: "EXPLORING", color: "var(--accent-secondary)" },
];

export function CurrentlyBuilding() {
  return (
    <section
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
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
          05 / CURRENTLY BUILDING
        </div>
        <hr className="editorial-hr" style={{ marginBottom: "48px" }} />

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "24px",
                background: "var(--bg)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--surface-1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--text)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      color: item.color,
                    }}
                  >
                    {item.state}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginTop: "24px",
            fontStyle: "italic",
          }}
        >
          Actively progressing through intensive training and project-based learning.
        </div>
      </div>
    </section>
  );
}