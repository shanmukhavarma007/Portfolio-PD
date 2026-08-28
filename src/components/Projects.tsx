"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const VLSI_HUB_URL = "https://vlsi-hub-iota.vercel.app/";
const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";

type TermLine =
  | { kind: "sep" }
  | { kind: "log"; tag: string; tagClass: string; text: string };

type PracticeModule = {
  num: string;
  name: string;
  detail: string;
};

type Project = {
  num: string;
  title: string;
  category: string;
  categoryClass: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  previewTitle: string;
  modules?: PracticeModule[];
  termLines?: TermLine[];
  statusLabel: string;
  pulseStatus?: boolean;
  footerAction: { label: string; href: string };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "VLSI Hub — Interactive CMOS, Digital & Scripting Platform",
    category: "WEB PLATFORM // PRACTICE ENGINE",
    categoryClass: "text-cyan-400",
    description:
      "An interactive web environment built for VLSI engineers to practice core semiconductor fundamentals: CMOS transistor behavior, digital logic design, Linux shell commands, and Tcl scripting for EDA automation.",
    tags: [
      "Next.js",
      "CMOS Logic",
      "Digital Design",
      "Linux CLI",
      "Tcl Automation",
      "Interactive Quizzes",
    ],
    liveUrl: VLSI_HUB_URL,
    primaryCta: { label: "LAUNCH VLSI HUB ↗", href: VLSI_HUB_URL },
    secondaryCta: { label: "EXPLORE MODULES", href: VLSI_HUB_URL },
    previewTitle: "vlsi-hub-session // interactive-practice",
    modules: [
      {
        num: "[01]",
        name: "CMOS Basics",
        detail: "Transfer Curves & Sizing",
      },
      {
        num: "[02]",
        name: "Digital Logic",
        detail: "Setup/Hold Violations & FSMs",
      },
      {
        num: "[03]",
        name: "Linux for EDA",
        detail: "grep, awk, sed, Process Management",
      },
      {
        num: "[04]",
        name: "Tcl for PD",
        detail: "Regex, File I/O, Report Parsing",
      },
    ],
    statusLabel: "READY TO PRACTICE",
    pulseStatus: true,
    footerAction: { label: "Open VLSI Hub ↗", href: VLSI_HUB_URL },
  },
];

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 shadow-inner backdrop-blur-sm">
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 truncate font-mono text-[10px] tracking-wider text-slate-400">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export function Projects() {
  const ref = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-reveal section-container section-glow section-divider-top section-divider-bottom"
      style={{
        background: "var(--surface-1)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader id="04" title="Selected Work" />

        <div className="mt-8 flex flex-col gap-10">
          {PROJECTS.map((project) => (
            <article
              key={project.num}
              className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-colors duration-300 hover:border-cyan-500/40"
              style={{ padding: "clamp(20px, 3vw, 36px)" }}
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                {/* Left: details & actions */}
                <div className="flex flex-col">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-slate-500">
                      {project.num}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.15em] ${project.categoryClass}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="mb-4 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  <div className="mb-7">
                    <div className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 font-mono text-[10px] tracking-wide text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap gap-3">
                    <a
                      href={project.primaryCta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/50 bg-cyan-500/15 px-5 py-2.5 font-mono text-xs font-semibold tracking-widest text-cyan-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-500/25"
                    >
                      {project.primaryCta.label}
                    </a>
                    {project.secondaryCta && (
                      <a
                        href={project.secondaryCta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 font-mono text-xs tracking-widest text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:text-white"
                      >
                        {project.secondaryCta.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: terminal-style interactive preview */}
                <TerminalWindow title={project.previewTitle}>
                  <div className="min-h-[260px] p-4">
                    {project.modules && (
                      <div className="flex flex-col gap-2.5">
                        {project.modules.map((module) => (
                          <div
                            key={module.num}
                            className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/70 px-3.5 py-3 transition-colors duration-200 hover:border-cyan-500/40 hover:bg-slate-900"
                          >
                            <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold text-cyan-400">
                              {module.num}
                            </span>
                            <div className="min-w-0">
                              <div className="font-mono text-xs font-semibold tracking-wide text-slate-100">
                                {module.name}
                              </div>
                              <div className="mt-0.5 font-mono text-[11px] leading-snug text-slate-400">
                                {module.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.termLines && (
                      <pre className="overflow-x-auto font-mono text-[11px] leading-loose">
                        {project.termLines.map((line, i) =>
                          line.kind === "sep" ? (
                            <span
                              key={i}
                              className="my-1 block text-slate-600"
                            >
                              {"--------------------------------------------------"}
                            </span>
                          ) : (
                            <span key={i} className="block whitespace-pre">
                              <span className={`font-bold ${line.tagClass}`}>
                                {line.tag}
                              </span>{" "}
                              <span className="text-slate-300">{line.text}</span>
                            </span>
                          )
                        )}
                      </pre>
                    )}
                  </div>

                  {/* Terminal footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 bg-slate-900/60 px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-emerald-400">
                      <span
                        className={`h-2 w-2 rounded-full bg-emerald-400 ${
                          project.pulseStatus ? "status-dot-pulse" : ""
                        }`}
                        style={{ color: "var(--success)" }}
                      />
                      {project.statusLabel}
                    </span>
                    <a
                      href={project.footerAction.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-cyan-300 transition-colors duration-200 hover:border-cyan-400/60 hover:bg-cyan-500/20"
                    >
                      {project.footerAction.label}
                    </a>
                  </div>
                </TerminalWindow>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
