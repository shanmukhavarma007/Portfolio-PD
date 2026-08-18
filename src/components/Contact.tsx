"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const LINKS = [
  {
    label: "GITHUB",
    href: "https://github.com/shanmukhavarma007",
    external: true,
  },
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/shanmukhavarma-penmetsa/",
    external: true,
  },
  {
    label: "EMAIL",
    href: "mailto:psvarma.e@gmail.com",
    external: false,
  },
  {
    label: "DOWNLOAD RESUME",
    href: "/resume.pdf",
    download: "Shanmukha_Varma_Resume.pdf",
    ariaLabel: "Download Shanmukha Varma resume PDF",
    external: false,
  },
];

export function Contact() {
  const ref = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          09 / LET&apos;S CONNECT
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="lg:!grid-cols-[1fr_auto]"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "420px",
            }}
          >
            For engineering opportunities, technical discussions and collaboration.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                download={"download" in link ? link.download : undefined}
                aria-label={"ariaLabel" in link ? link.ariaLabel : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 0",
                  borderBottom:
                    i < LINKS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const arrow = e.currentTarget.querySelector(".link-arrow") as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = "translateX(4px)";
                    arrow.style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  const arrow = e.currentTarget.querySelector(".link-arrow") as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = "translateX(0)";
                    arrow.style.color = "var(--text-muted)";
                  }
                }}
              >
                <span
                  className="link-arrow"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                    width: "20px",
                  }}
                >
                  →
                </span>
                <span
                  className="animated-underline"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {link.label}
                </span>
                {link.external && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--text-muted)",
                      marginLeft: "4px",
                    }}
                  >
                    ↗
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}