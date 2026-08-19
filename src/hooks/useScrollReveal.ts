"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);

  const setup = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>(
      ".scroll-reveal-child"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("scroll-revealed");
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add("scroll-revealed");
              }, 40 + i * 50);
            });
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px 0px -100px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  useEffect(() => {
    const cleanup = setup();
    return () => {
      if (cleanup) cleanup();
    };
  }, [setup]);

  return ref;
}
