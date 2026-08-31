"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { SectionHeader } from "./SectionHeader";

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
      className="section-container section-glow section-divider-top section-divider-bottom"
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
            <SectionHeader badge="07 // ACTIVITY" title="Professional Activity" />

            <h2
              className="text-gradient"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 500,
                lineHeight: 1.15,
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
              className="btn-secondary btn-sm whitespace-nowrap"
            >
              VIEW LINKEDIN
            </a>
          </div>
        </div>

        {/* Elfsight widget container — themed wrapper + dark-mode fallback */}
        <div className="glass-panel w-full max-w-full overflow-hidden p-4 sm:p-5">
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
                className="btn-secondary btn-sm inline-block"
              >
                VIEW LINKEDIN
              </a>
            </div>
          )}

          {/* Elfsight widget (dark-mode inversion fallback for light embeds) */}
          <div
            className={`elfsight-app-${ELFSIGHT_APP_ID} linkedin-dark-embed`}
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

      {/* Dark-mode fallback CSS for the Elfsight embed */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .linkedin-dark-embed,
            .linkedin-dark-embed * {
              filter: invert(0.9) hue-rotate(180deg) !important;
            }
            .linkedin-dark-embed img,
            .linkedin-dark-embed svg,
            .linkedin-dark-embed video {
              filter: invert(1) hue-rotate(180deg) !important;
            }
            .linkedin-dark-embed {
              background: transparent !important;
            }
          `,
        }}
      />
    </section>
  );
}