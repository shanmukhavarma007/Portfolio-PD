"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

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
      className="scroll-reveal section-container"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader index="09" title="Let's Connect" />

        {/* Centered conversion card */}
        <div
          className="card"
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "clamp(32px, 5vw, 48px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 12px 0",
            }}
          >
            Let&apos;s build together
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              margin: "0 0 clamp(24px, 4vw, 32px) 0",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Open to opportunities in VLSI Physical Design, STA, and EDA
            automation. Let&apos;s connect and discuss how I can contribute to
            your team.
          </p>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                download={"download" in link ? link.download : undefined}
                aria-label={"ariaLabel" in link ? link.ariaLabel : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="card"
                style={{
                  padding: "16px 24px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(56, 189, 248, 0.7)";
                  el.style.boxShadow = "0 0 14px rgba(56, 189, 248, 0.3)";
                  el.style.color = "var(--text)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                  el.style.color = "var(--text-secondary)";
                  el.style.transform = "";
                }}
              >
                <span>{link.label}</span>
                {link.external && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", opacity: 0.6 }}>
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
