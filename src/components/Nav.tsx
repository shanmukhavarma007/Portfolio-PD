"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { num: "01", label: "WORK", href: "#work" },
  { num: "02", label: "STACK", href: "#engineering" },
  { num: "03", label: "PIPELINE", href: "#journey" },
  { num: "04", label: "ACTIVITY", href: "#activity" },
  { num: "05", label: "JOURNEY", href: "#about" },
];

const MD_BREAKPOINT = 768;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= MD_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`glass-nav ${scrolled ? "scrolled" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 4vw, 48px)",
        }}
      >
        {/* Left: brand */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>SHANMUKHA</span>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>PENMETSA</span>
        </div>

        {/* Center: numbered nav (desktop only) */}
        {isDesktop && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.num}
                href={item.href}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                <span style={{ color: "var(--accent)", fontSize: "9px" }}>
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Right: theme + social + CTA */}
        {isDesktop && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="https://github.com/shanmukhavarma007"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              LI
            </a>
            <span style={{ width: "1px", height: "12px", background: "var(--border-subtle)" }} />
            <a
              href="#contact"
              className="glow-btn-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#FFF",
                padding: "6px 16px",
                textDecoration: "none",
                borderRadius: "4px",
                transition: "box-shadow 0.2s ease, transform 0.15s ease",
              }}
            >
              GET IN TOUCH
            </a>
          </div>
        )}

        {/* Mobile menu button */}
        {!isDesktop && (
          <button
            type="button"
            className="site-nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "28px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "100%",
                height: "1px",
                background: "var(--text)",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(45deg) translateY(5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: mobileOpen ? "0%" : "60%",
                height: "1px",
                background: "var(--text)",
                transition: "all 0.3s ease",
                marginLeft: "auto",
              }}
            />
            <span
              style={{
                display: "block",
                width: "100%",
                height: "1px",
                background: "var(--text)",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(-45deg) translateY(-5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="site-nav-overlay"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 32px",
            gap: "32px",
          }}
        >
          <button
            type="button"
            className="site-nav-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "var(--text)",
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.num}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                transition: "color 0.2s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                }}
              >
                {item.num}
              </span>
              {item.label}
            </a>
          ))}
          <div
            style={{
              borderTop: "1px solid var(--border-subtle)",
              paddingTop: "24px",
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <a
                href="https://github.com/shanmukhavarma007"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                LinkedIn
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="glow-btn-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                padding: "12px 24px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      )}
    </>
  );
}
