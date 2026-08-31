"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const TIMELINE = [
  {
    year: "2022",
    title: "Started B.Tech in ECE",
    detail: "Vignan's Institute of Information Technology. Built core engineering foundations in digital electronics, signals, semiconductor physics, and circuit design.",
  },
  {
    year: "2023–24",
    title: "Core Electronics & Discovered VLSI",
    detail: "Deepened understanding of CMOS fundamentals, digital logic design, and semiconductor concepts. Began exploring Linux environments and introductory automation scripting (Python/Shell).",
  },
  {
    year: "Early 2026",
    title: "Completed B.Tech (ECE)",
    detail: "Successfully graduated with a degree in Electronics and Communication Engineering, solidifying theoretical concepts in digital circuits and hardware architectures.",
  },
  {
    year: "Jun 2026",
    title: "Intensive PD Training — Sumedha IT",
    detail: "Commenced dedicated physical design training covering the end-to-end RTL-to-GDSII ASIC flow: logic synthesis, floorplanning, power planning, placement, CTS, routing, and timing analysis using industry EDA tools.",
  },
  {
    year: "Present",
    title: "Aspiring VLSI Physical Design Engineer",
    detail: "Actively developing hands-on execution skills across ASIC backend design flows, timing closure, and Tcl scripting, preparing to contribute to silicon design and tapeout teams.",
  },
];

const PRINCIPLES = [
  {
    title: "Build to Understand",
    description:
      "Every concept becomes real only when implemented. I learn physical design by running the tools, breaking things, and iterating until timing closes.",
  },
  {
    title: "Automate the Repetitive",
    description:
      "If a task is done twice, it gets scripted. Tcl and Python are my leverage — turning hours of manual work into reproducible flows.",
  },
  {
    title: "Document the Path",
    description:
      "Engineering notes and open repos aren't just for others — they're for future me. Every project includes clear documentation of decisions and tradeoffs.",
  },
  {
    title: "Depth Before Breadth",
    description:
      "Master the fundamentals (CMOS, timing, power) before reaching for the next tool. Strong foundations make new tools intuitive.",
  },
];

const INTERESTS = [
  "Open-Source EDA Tools",
  "Technical Writing",
  "CMOS Layout Art",
  "FPGA Experiments",
  "VLSI Community Forums",
  "Linux Ricing",
];

export function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="journey"
      ref={ref}
      className="scroll-reveal mx-auto max-w-6xl px-4 py-16 section-glow"
    >
      <SectionHeader badge="08 // JOURNEY" title="Engineering Journey" />

      {/* Narrative */}
      <div className="mt-8 mb-12 max-w-3xl">
        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
          I&apos;m a VLSI Physical Design engineer driven by the challenge of translating abstract RTL into
          silicon-realizable layouts. My path started with digital electronics coursework and evolved
          into intensive hands-on training across the full ASIC implementation flow — from synthesis
          constraints through final verification.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          What drives me is the intersection of electrical engineering rigor and software automation.
          Writing a Tcl script that automates a three-hour manual process, or tracing a timing path
          through a clock tree to find the critical bottleneck — these are the problems I enjoy solving.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Timeline */}
        <div className="lg:col-span-5">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Journey So Far
          </h3>
          <div>
            {TIMELINE.map((step, i) => (
              <div key={step.year} className={`flex gap-4${i < TIMELINE.length - 1 ? " pb-6" : ""}`}>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {step.year}
                  </span>
                  {i < TIMELINE.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-gradient-to-b from-cyan-500/40 to-slate-800" />
                  )}
                </div>
                <div className="pb-2">
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Working Principles */}
        <div className="lg:col-span-7">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Working Principles
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="glass-card cursor-glow-card p-5"
              >
                <h4 className="text-sm font-bold text-[var(--text-primary)]">{p.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          {/* Beyond the Code */}
          <div className="glass-card mt-8 p-5">
            <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Beyond the Code
            </h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="glass-badge font-mono text-xs transition-colors duration-300 hover:border-cyan-400/60 hover:text-cyan-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
