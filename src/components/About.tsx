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
    detail: "Commenced dedicated physical design training covering the end-to-end RTL-to-GDSII ASIC flow: logic synthesis, floorplanning, power planning, placement, CTS, routing, and STA using industry EDA tools.",
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

export function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-reveal mx-auto max-w-6xl px-4 py-16 section-glow"
    >
      <SectionHeader index="08" title="Engineering Journey &amp; Approach" />

      {/* Narrative */}
      <div className="mt-8 mb-12 max-w-3xl">
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
          I'm a VLSI Physical Design engineer driven by the challenge of translating abstract RTL into
          silicon-realizable layouts. My path started with digital electronics coursework and evolved
          into intensive hands-on training across the full ASIC implementation flow — from synthesis
          constraints through signoff verification.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
          What drives me is the intersection of electrical engineering rigor and software automation.
          Writing a Tcl script that automates a three-hour manual process, or tracing a timing path
          through a clock tree to find the critical bottleneck — these are the problems I enjoy solving.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Timeline */}
        <div className="lg:col-span-5">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-cyan-400">
            Journey So Far
          </h3>
          <div className="space-y-6">
            {TIMELINE.map((step) => (
              <div key={step.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                    {step.year}
                  </span>
                  <div className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="pb-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Working Principles */}
        <div className="lg:col-span-7">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-cyan-400">
            Working Principles
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          {/* Beyond the Code */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-cyan-400">
              Beyond the Code
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Open-Source EDA Tools",
                "Technical Writing",
                "CMOS Layout Art",
                "FPGA Experiments",
                "VLSI Community Forums",
                "Linux Ricing",
              ].map((interest) => (
                <span
                  key={interest}
                  className="rounded-md border border-slate-200 bg-slate-100/80 px-2.5 py-1 font-mono text-xs text-slate-700 transition-colors hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-slate-600"
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
