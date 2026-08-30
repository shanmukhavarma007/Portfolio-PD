"use client";

export default function ResumePage() {
  return (
    <main
      style={{
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          RESUME
        </div>
        <hr className="editorial-hr" style={{ marginBottom: "32px" }} />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: "0 0 12px 0",
          }}
        >
          Shanmukha Varma Penmetsa
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "var(--text-secondary)",
            margin: "0 0 24px 0",
          }}
        >
          VLSI Physical Design Engineer
        </p>

        {/* Action buttons */}
        <div
          className="flex flex-wrap items-center gap-3 sticky top-[64px] z-10 bg-[var(--bg)] py-3"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Shanmukha Varma resume"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              padding: "12px 28px",
              background: "var(--accent)",
              color: "var(--bg)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent-secondary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
            }}
          >
            VIEW RESUME
          </a>
          <a
            href="/resume.pdf"
            download="Shanmukha_Varma_Resume.pdf"
            aria-label="Download Shanmukha Varma resume PDF"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              padding: "12px 28px",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            DOWNLOAD PDF
          </a>
        </div>
      </div>

      {/* PDF embed */}
      <div
        className="w-full h-[65vh] sm:h-[80vh] border-0"
        style={{
          width: "100%",
          background: "var(--surface-1)",
          overflow: "hidden",
        }}
      >
        <iframe
          src="/resume.pdf"
          title="Shanmukha Varma Resume"
          className="w-full h-full border-0"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </main>
  );
}