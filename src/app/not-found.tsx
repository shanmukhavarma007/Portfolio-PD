import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Signal Lost",
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: "var(--bg)" }}
    >
      {/* dot grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.6,
        }}
      />

      <div className="glass-panel relative w-full max-w-xl p-8 text-center sm:p-10">
        {/* corner brackets */}
        <span aria-hidden="true" className="pd-hud-bracket pd-hud-bracket--tl" />
        <span aria-hidden="true" className="pd-hud-bracket pd-hud-bracket--tr" />
        <span aria-hidden="true" className="pd-hud-bracket pd-hud-bracket--bl" />
        <span aria-hidden="true" className="pd-hud-bracket pd-hud-bracket--br" />

        <p className="font-mono text-xs tracking-[0.25em] text-cyan-400">
          404 // ROUTE_NOT_FOUND
        </p>
        <h1 className="mt-4 text-3xl font-bold text-balance text-slate-100 sm:text-4xl">
          Signal lost on this path
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-slate-400 sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            RETURN HOME
          </Link>
          <Link href="/#contact" className="btn-secondary w-full sm:w-auto">
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </main>
  );
}
