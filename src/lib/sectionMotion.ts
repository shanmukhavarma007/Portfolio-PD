"use client";

/**
 * Small DOM helpers shared by the nav and command palette so section
 * navigation and the existing scroll-reveal system stay in sync.
 * Presentation only — no copy, data or status changes live here.
 */

const LOCK_MS = 600;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Make a section (and its staggered children) visible immediately. */
export function revealSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.remove("scroll-reveal-init");
  section.classList.add("scroll-revealed");
  section.querySelectorAll<HTMLElement>(".scroll-reveal-child").forEach((child) => {
    child.classList.add("scroll-revealed");
  });
}

/** Single ~700ms cyan glow pulse on the target heading (skipped for reduced motion). */
export function pulseSectionHeading(id: string) {
  if (reducedMotion()) return;
  const section = document.getElementById(id);
  // Pulse the small pill first — the glow must stay on a small element.
  const target = section?.querySelector<HTMLElement>(
    ".scroll-reveal-heading .glass-badge, .scroll-reveal-heading h2, h2, h1"
  );
  if (!target) return;
  target.classList.remove("section-heading-pulse");
  // Restart the one-shot animation (no layout reads on scroll paths).
  void target.offsetWidth;
  target.classList.add("section-heading-pulse");
  window.setTimeout(
    () => target.classList.remove("section-heading-pulse"),
    750
  );
}

/** Move focus to the section heading without scrolling the viewport. */
export function focusSectionHeading(id: string) {
  const section = document.getElementById(id);
  const target = section?.querySelector<HTMLElement>(
    "h2, h1, .scroll-reveal-heading"
  );
  if (!target) return;
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
}

export const NAV_LOCK_MS = LOCK_MS;
