"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  focusSectionHeading,
  pulseSectionHeading,
  revealSection,
} from "@/lib/sectionMotion";

const NAV_ITEMS = [
  { num: "01", label: "STACK", href: "#stack" },
  { num: "02", label: "FLOW", href: "#flow" },
  { num: "03", label: "MATRIX", href: "#matrix" },
  { num: "04", label: "PROJECTS", href: "#projects" },
  { num: "05", label: "BUILDING", href: "#building" },
  { num: "06", label: "PIPELINE", href: "#pipeline" },
  { num: "07", label: "ACTIVITY", href: "#activity" },
  { num: "08", label: "JOURNEY", href: "#journey" },
  { num: "09", label: "CONNECT", href: "#contact" },
];

/** Stable identity so the section observer is built exactly once. */
const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

/** How long observer updates are locked after a nav click (ms). */
const SCROLL_LOCK_MS = 600;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<string | null>(null);

  const { activeId, setActive, lock } = useActiveSection(SECTION_IDS);

  /* ── Header surface: transparent over the hero, glass once scrolled ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Initial hash load: re-align after fonts/images settle so the target
        isn't pushed away by late layout (item 1). ── */
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id || !document.getElementById(id)) return;
    let cancelled = false;

    const align = () => {
      if (cancelled) return;
      revealSection(id);
      document.getElementById(id)?.scrollIntoView({ block: "start" });
      setActive(id);
    };

    align();
    document.fonts?.ready.then(align).catch(() => undefined);
    window.addEventListener("load", align, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", align);
    };
  }, [setActive]);

  /* ── Nav link click: update highlight immediately, reveal target, pulse,
        move focus. We do NOT preventDefault — the browser owns hash +
        native smooth scroll (and back/forward keeps working). ── */
  const onNavClick = useCallback(
    (href: string) => {
      const id = href.replace(/^#/, "");
      if (!document.getElementById(id)) return;

      setMobileOpen(false);
      setActive(id);          // highlight now, don't wait for the observer
      lock(SCROLL_LOCK_MS);   // ...and hold the observer while we travel
      revealSection(id);      // never land on an empty-looking section
      // Keyboard/screen-reader focus follows the jump, but without scrolling.
      pendingFocusRef.current = id;
      focusSectionHeading(id);
      // The glow lands once the (smooth) scroll has settled; clearing the
      // pending ref here also guarantees the menu close-effect sees it.
      window.setTimeout(() => {
        pulseSectionHeading(id);
        pendingFocusRef.current = null;
      }, 700);
    },
    [setActive, lock]
  );

  /* ── Close the menu when the route/hash changes (link was followed). ── */
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  /* ── Body scroll lock + focus management while the menu is open. ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      overlayRef.current
        ?.querySelector<HTMLElement>('a[href], button')
        ?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      // When a section link was clicked we hand focus to the heading instead.
      if (pendingFocusRef.current) return;
      (previouslyFocused ?? trigger)?.focus?.();
    };
  }, [mobileOpen]);

  /* ── Esc to close + trap Tab focus inside the menu. ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className={`glass-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          {/* Left: brand */}
          <div
            className="shrink-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              SHANMUKHA VARMA
            </span>
          </div>

          {/* Center: numbered nav (desktop only) */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-2.5 xl:flex 2xl:gap-5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => onNavClick(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={`nav-link ${
                    isActive ? "is-active" : ""
                  } flex items-center gap-1.5 whitespace-nowrap py-2 transition-colors`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{ color: "var(--accent)", fontSize: "9px" }}
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: VLSI Hub + social + CTA (desktop only) */}
          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            <a
              href="https://vlsi-hub-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded py-1.5 px-3 transition-shadow"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--accent)",
                textDecoration: "none",
                border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                boxShadow: "0 0 10px color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            >
              <span
                className="status-dot-pulse shrink-0 rounded-full"
                aria-hidden="true"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--success)",
                  color: "var(--success)",
                }}
              />
              VLSI HUB ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>

            {/* GitHub / LinkedIn shortcuts — only where there is room */}
            <a
              href="https://github.com/shanmukhavarma007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="hidden py-2 text-slate-500 transition-colors hover:text-slate-100 2xl:inline-flex"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="hidden py-2 text-slate-500 transition-colors hover:text-slate-100 2xl:inline-flex"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              LI
            </a>
            <span
              aria-hidden="true"
              className="hidden 2xl:block"
              style={{ width: "1px", height: "12px", background: "var(--border-subtle)" }}
            />
            <a
              href="#contact"
              onClick={() => onNavClick("#contact")}
              className="btn-primary whitespace-nowrap"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                padding: "6px 16px",
                fontSize: "11px",
                textDecoration: "none",
              }}
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Hamburger (below xl) — morphs to an X */}
          <button
            ref={triggerRef}
            type="button"
            className={`site-nav-hamburger -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1 xl:hidden ${
              mobileOpen ? "is-open" : ""
            }`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="site-nav-hamburger-bar bar-1" />
            <span className="site-nav-hamburger-bar bar-2" />
            <span className="site-nav-hamburger-bar bar-3" />
          </button>
        </div>

        {/* Slim scroll-progress bar under the header (CSS scroll-driven) */}
        <div className="scroll-progress" aria-hidden="true" />
      </header>

      {/* Mobile overlay menu — stays mounted so it can animate in AND out.
          `inert` + aria-hidden keep it unreachable while closed. */}
      <div
        id="mobile-nav-menu"
        ref={overlayRef}
        className={`site-nav-overlay ${mobileOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
      >
        <div className="site-nav-panel safe-area-top flex min-h-full flex-col justify-center gap-1 px-8 py-24"
          style={{ paddingBottom: "calc(3rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => onNavClick(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className="site-nav-link flex min-h-[52px] items-center gap-4 py-1 transition-colors"
                  style={
                    {
                      "--nav-i": String(Math.min(index, 6)),
                      fontFamily: "var(--font-display)",
                      fontSize: "26px",
                      fontWeight: 500,
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      textDecoration: "none",
                    } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: isActive ? "var(--accent)" : "var(--text-muted)",
                    }}
                  >
                    {item.num}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div
            className="mt-6 flex flex-col gap-4 pt-6"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <a
              href="https://vlsi-hub-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="site-nav-link inline-flex min-h-[48px] items-center gap-2 self-start rounded px-4 py-2.5"
              style={
                {
                  "--nav-i": 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  textDecoration: "none",
                  border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
                  background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                  boxShadow: "0 0 12px color-mix(in srgb, var(--accent) 30%, transparent)",
                } as React.CSSProperties
              }
            >
              <span
                className="status-dot-pulse shrink-0 rounded-full"
                aria-hidden="true"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--success)",
                  color: "var(--success)",
                }}
              />
              VLSI HUB ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="https://github.com/shanmukhavarma007"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="site-nav-link inline-flex min-h-[44px] items-center text-slate-300"
                style={
                  {
                    "--nav-i": 7,
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                  } as React.CSSProperties
                }
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="site-nav-link inline-flex min-h-[44px] items-center text-slate-300"
                style={
                  {
                    "--nav-i": 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                  } as React.CSSProperties
                }
              >
                LinkedIn ↗
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => onNavClick("#contact")}
              className="site-nav-link btn-primary min-h-[48px] w-full"
              style={
                {
                  "--nav-i": 9,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                } as React.CSSProperties
              }
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
