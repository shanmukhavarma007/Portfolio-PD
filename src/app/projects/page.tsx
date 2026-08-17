import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "96px", minHeight: "100vh" }}>
        <section
          style={{
            padding: "0 clamp(16px, 4vw, 48px) clamp(48px, 8vw, 96px)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
              PROJECTS
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 600,
                color: "var(--text)",
                margin: "0 0 32px 0",
                lineHeight: 1.1,
              }}
            >
              Engineering Case Studies
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "480px",
              }}
            >
              Content to be added. Each project will be presented as a detailed
              engineering case study with technical diagrams and process flows.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}