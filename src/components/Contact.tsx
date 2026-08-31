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
        <SectionHeader badge="09 // CONNECT" title="Let's Connect" />

        {/* Centered conversion card */}
        <div
          className="glass-panel"
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "clamp(32px, 5vw, 48px)",
            textAlign: "center",
          }}
        >
          <h2
            className="font-bold leading-tight tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 36px)",
              margin: "0 0 12px 0",
            }}
          >
            Let&apos;s build together
          </h2>
          <p
            className="text-slate-300"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 2.5vw, 16px)",
              lineHeight: 1.6,
              margin: "0 0 clamp(24px, 4vw, 32px) 0",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Open to opportunities in VLSI Physical Design and EDA
            automation. Let&apos;s connect and discuss how I can contribute to
            your team.
          </p>

          {/* Full-width glowing CTA buttons */}
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="btn-secondary w-full min-h-[48px] px-6 py-3.5"
              >
                {link.label}
                {link.external && (
                  <span className="text-[10px] opacity-70">↗</span>
                )}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download="Shanmukha_Varma_Resume.pdf"
              aria-label="Download Shanmukha Varma resume PDF"
              className="btn-primary w-full min-h-[48px] px-6 py-3.5"
            >
              DOWNLOAD RESUME ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
