"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/shanmukhavarma007",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shanmukhavarma-penmetsa/",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:psvarma.e@gmail.com",
    external: false,
  },
];

export function Footer() {
  const ref = useScrollReveal();

  return (
    <footer ref={ref} className="scroll-reveal glass-panel site-footer">
      {/* Same container as every section (see .section-inner) so the footer's
          left/right content edge is identical to the sections above it. */}
      <div className="section-inner">
        {/* Mobile: identity → links → copyright, stacked and centred on one
            axis. md+: identity left, links middle, © flush right. */}
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
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
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                marginTop: "2px",
              }}
            >
              VLSI PHYSICAL DESIGN ENGINEER
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-muted)",
                marginTop: "6px",
                fontStyle: "italic",
              }}
            >
              Building toward silicon.
            </div>
          </div>

          {/* Links: spacing comes from the container gap, never per-link. */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="animated-underline inline-flex min-h-11 items-center px-3 font-mono text-sm tracking-wider whitespace-nowrap text-slate-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright: identical box metrics to the links (text-sm, min-h-11,
              items-center) so it shares their baseline exactly. */}
          <span className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap font-mono text-sm tracking-wider text-slate-300">
            &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
