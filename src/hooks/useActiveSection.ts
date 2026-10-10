"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently "current" using ONE IntersectionObserver
 * with a narrow mid-viewport band (`-45% 0px -50% 0px`). No scroll listeners.
 *
 * `setActive()` lets a nav click update the highlight immediately, and `lock()`
 * holds the observer quiet for a few hundred ms so the indicator never flickers
 * while the browser's native smooth scroll is still travelling.
 */
export function useActiveSection(ids: readonly string[], rootMargin?: string) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  const lockUntil = useRef(0);
  const unlockTimer = useRef<number | null>(null);

  const setActive = useCallback((id: string | null) => {
    activeRef.current = id;
    setActiveId(id);
    lockUntil.current = 0;
  }, []);

  /** Lock observer updates for `ms` (called on nav click, before the scroll). */
  const lock = useCallback((ms: number) => {
    lockUntil.current = Date.now() + ms;
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // The band is only ~5% of the viewport tall, so exactly one section owns
    // its centre. Recomputing over this short list inside the observer
    // callback (never inside a scroll handler) keeps the choice correct at
    // every section boundary.
    const sync = () => {
      const centre = window.innerHeight * 0.475;
      let chosen: string | null = null;
      for (const target of targets) {
        const rect = target.getBoundingClientRect();
        if (rect.top <= centre && rect.bottom >= centre) {
          chosen = target.id;
          break;
        }
      }
      if (chosen && chosen !== activeRef.current) {
        activeRef.current = chosen;
        setActiveId(chosen);
      }
    };

    const clearUnlockTimer = () => {
      if (unlockTimer.current !== null) {
        window.clearTimeout(unlockTimer.current);
        unlockTimer.current = null;
      }
    };

    const onIntersect = () => {
      const remaining = lockUntil.current - Date.now();
      if (remaining > 0) {
        // Locked by a nav click: retry once the lock expires.
        if (unlockTimer.current === null) {
          unlockTimer.current = window.setTimeout(() => {
            unlockTimer.current = null;
            sync();
          }, remaining);
        }
        return;
      }
      sync();
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: rootMargin ?? "-45% 0px -50% 0px",
      threshold: 0,
    });
    targets.forEach((t) => observer.observe(t));
    sync();

    const unlock = (e: Event) => {
      // Only unlock when the *document* scroll settles — a nested tab strip
      // scrolling must not release the post-click lock early.
      const target = e.target as EventTarget | null;
      if (
        target !== document.documentElement &&
        target !== document.body &&
        target !== document
      ) {
        return;
      }
      lockUntil.current = 0;
      clearUnlockTimer();
      sync();
    };
    window.addEventListener("scrollend", unlock);

    return () => {
      observer.disconnect();
      clearUnlockTimer();
      window.removeEventListener("scrollend", unlock);
    };
  }, [ids, rootMargin]);

  return { activeId, setActive, lock };
}
