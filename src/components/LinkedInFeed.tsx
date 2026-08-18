"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { WaveformHr } from "./WaveformHr";

const ELFSIGHT_APP_ID = "6319c12b-b5ad-4cb5-a073-1dfecd804068";
const LINKEDIN_URL = "https://www.linkedin.com/in/shanmukhavarma-penmetsa/";

export function LinkedInFeed() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const widget = document.querySelector(
        `[data-elfsight-app-lazy]`
      );
      if (widget && widget.children.length > 0) {
        setLoaded(true);
      } else {
        setFailed(true);
      }
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const widget = document.querySelector(
        `.elfsight-app-${ELFSIGHT_APP_ID}`
      );
      if (widget && widget.children.length > 0) {
        setLoaded(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="activity"
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
            marginBottom: "40px",
          }}
          className="lg:!grid-cols-[1fr_auto]"
        >
          <div>
            <div
              className="badge badge--muted"
              style={{ marginBottom: "12px" }}
            >
              07 / PROFESSIONAL ACTIVITY
            </div>
            <WaveformHr style={{ marginBottom: "24px" }} />

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 500,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "0 0 12px 0",
                letterSpacing: "-0.01em",
              }}
            >
              LinkedIn / Latest
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Following my journey through VLSI Physical Design, technical
              learning and hands-on projects.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Shanmukha Varma LinkedIn profile"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "10px 20px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              VIEW LINKEDIN
            </a>
          </div>
        </div>

        {/* Elfsight widget container */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Loading state */}
          {!loaded && !failed && (
            <div
              style={{
                padding: "48px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                }}
              >
                Loading professional updates...
              </div>
            </div>
          )}

          {/* Fallback state */}
          {failed && (
            <div
              style={{
                padding: "48px 0",
                textAlign: "center",
                borderTop: "1px solid var(--border-subtle)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                LINKEDIN / LATEST
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  margin: "0 0 20px 0",
                }}
              >
                Unable to load the live feed right now.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Shanmukha Varma LinkedIn profile"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  padding: "10px 20px",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)";
                }}
              >
                VIEW LINKEDIN
              </a>
            </div>
          )}

          {/* Elfsight widget */}
          <div
            className={`elfsight-app-${ELFSIGHT_APP_ID}`}
            data-elfsight-app-lazy
            style={{
              width: "100%",
              opacity: loaded ? 1 : 0,
              height: loaded ? "auto" : 0,
              overflow: loaded ? "visible" : "hidden",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}