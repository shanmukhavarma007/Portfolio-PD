"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive-enhancement scroll reveal (ONE observer per section).
 *
 * Content is ALWAYS visible by default (see `.scroll-reveal` in globals.css).
 * The hidden start state (`scroll-reveal-init`) is only ever applied on the
 * client, and only when ALL of the following are true:
 *
 *   - IntersectionObserver is available
 *   - the user has not requested reduced motion
 *   - the element is currently below the fold (so there is no visible flash)
 *
 * The reveal is a section-level operation:
 *   - the section root fades (opacity only)
 *   - `.scroll-reveal-heading` blocks rise + draw their hairline (CSS)
 *   - `.scroll-reveal-child` blocks rise with a per-index stagger (CSS)
 *
 * The stagger delay is derived from a ONE-TIME child index written here as
 * `--reveal-i`, so scrolling never runs per-child timers.
 *
 * Safeguards guarantee content can never get stuck hidden:
 *   - a failsafe timer force-reveals after 2.5s
 *   - `beforeprint` force-reveals
 *   - elements that resize into view are revealed by the observer
 *   - if JS never runs / is slow the element simply stays visible
 *   - the hidden-start class is dropped ~1s after the reveal, so a reveal can
 *     never replay for content that mounts or re-keys afterwards
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /**
     * Longest entrance: --dur-slow (500ms) + 5 * --stagger (300ms) = 800ms.
     * After that we drop the hidden-start class entirely.
     */
    const SETTLE_MS = 1000;
    let settleTimer: number | null = null;

    const reveal = () => {
      el.classList.add("scroll-revealed");

      // Once the entrance has played, remove the hidden-start class so that
      // anything which mounts or re-keys LATER (e.g. the keyed PDFlow readout
      // when a stage is switched) can never replay the reveal animation.
      // In the bail-out paths below the class was never added, so no-op.
      if (!el.classList.contains("scroll-reveal-init")) return;
      if (settleTimer !== null) return;
      settleTimer = window.setTimeout(() => {
        el.classList.remove("scroll-reveal-init");
        settleTimer = null;
      }, SETTLE_MS);
    };

    // Index staggered children once (capped at 6) so CSS can derive delays.
    el.querySelectorAll<HTMLElement>(".scroll-reveal-child").forEach((child, i) => {
      child.style.setProperty("--reveal-i", String(Math.min(i, 5)));
    });

    // Bail out (keep content visible) when we cannot safely animate.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    // Only hide elements that start below the fold — never the first screen.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      reveal();
      return;
    }

    el.classList.add("scroll-reveal-init");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0,
        rootMargin: options?.rootMargin ?? "0px 0px -20% 0px",
      }
    );
    observer.observe(el);

    // Failsafe: never leave content hidden, whatever happens.
    const failsafe = window.setTimeout(reveal, 2500);

    // Printing must always show everything.
    const onPrint = () => reveal();
    window.addEventListener("beforeprint", onPrint);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}
