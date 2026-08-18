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
      className="scroll-reveal section-container"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <div
          className="badge badge--muted"
          style={{ marginBottom: "12px" }}
        >
          09 / LET&apos;S CONNECT
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

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
              color: "#0F172A",
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
              color: "#475569",
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
            <a
              href="https://github.com/shanmukhavarma007"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                padding: "16px 24px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0284C7";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <span style={{ fontSize: "18px" }}>GitHub</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#64748B",
                }}
              >
                ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                padding: "16px 24px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0284C7";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <span style={{ fontSize: "18px" }}>LinkedIn</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#64748B",
                }}
              >
                ↗
              </span>
            </a>
            <a
              href="mailto:psvarma.e@gmail.com"
              className="card"
              style={{
                padding: "16px 24px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0284C7";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <span style={{ fontSize: "18px" }}>Email</span>
            </a>
            <a
              href="/resume.pdf"
              download="Shanmukha_Varma_Resume.pdf"
              aria-label="Download Shanmukha Varma resume PDF"
              className="card"
              style={{
                padding: "16px 24px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0284C7";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <span style={{ fontSize: "18px" }}>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
