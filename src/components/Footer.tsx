"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Footer() {
  const ref = useScrollReveal();

  return (
    <footer
      ref={ref}
      className="scroll-reveal"
    >
      <div
        className="glass-panel border-b-0 border-l-0 border-r-0 rounded-none"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          className="md:!flex-row md:!items-center md:!justify-between"
        >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            SHANMUKHA VARMA PENMETSA
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              marginTop: "2px",
              opacity: 0.7,
            }}
          >
            VLSI PHYSICAL DESIGN ENGINEER
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--text-muted)",
              marginTop: "6px",
              fontStyle: "italic",
            }}
          >
            Building toward silicon.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <a
            href="https://github.com/shanmukhavarma007"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:psvarma.e@gmail.com"
            className="animated-underline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            Email
          </a>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-muted)",
            }}
          >
            &copy; 2026
          </span>
        </div>
        </div>
      </div>
    </footer>
  );
}
