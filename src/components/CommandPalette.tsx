"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  focusSectionHeading,
  pulseSectionHeading,
  revealSection,
} from "@/lib/sectionMotion";

type LogLine = { kind: "in" | "out" | "ok" | "err"; text: string };

// Anchor ids must match the on-page section ids exactly
// (#hero #stack #flow #matrix #projects #building #pipeline #activity #journey #contact)
const SECTIONS: { cmd: string; label: string; id: string | null }[] = [
  { cmd: "home", label: "Hero / Top", id: null },
  { cmd: "stack", label: "Engineering Profile", id: "stack" },
  { cmd: "flow", label: "Physical Design Flow", id: "flow" },
  { cmd: "matrix", label: "Technical Matrix", id: "matrix" },
  { cmd: "projects", label: "Selected Work", id: "projects" },
  { cmd: "building", label: "Currently Building", id: "building" },
  { cmd: "pipeline", label: "ASIC PD Pipeline", id: "pipeline" },
  { cmd: "activity", label: "Professional Activity", id: "activity" },
  { cmd: "journey", label: "Engineering Journey", id: "journey" },
  { cmd: "contact", label: "Get In Touch", id: "contact" },
];

const SKILLS = [
  "Physical Design (PD) — floorplan/place/CTS/route",
  "Tcl scripting & EDA automation",
  "STA / timing signoff & setup/hold closure",
  "DRC & LVS verification (Calibre)",
  "CMOS / digital logic fundamentals",
  "Linux, shell, regex processing",
];

const BANNER = `sh_pd@7nm:~$ open command palette

  type a command and press ENTER
  CTRL+K or ~ to toggle · ESC to close`;

const SKILL_COMMANDS = [
  { cmd: "cat skills" },
  { cmd: "open resume" },
  { cmd: "open hub" },
  { cmd: "github" },
  { cmd: "linkedin" },
];

function smooth() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto" as const
    : "smooth" as const;
}

function navToSection(id: string | null, label: string) {
  if (id === null) {
    window.scrollTo({ top: 0, behavior: smooth() });
    return `navigated to: ${label}`;
  }
  const el = document.getElementById(id);
  if (el) {
    // Land on a section that is already revealed, then pulse + focus it so
    // the palette jump behaves exactly like a nav click.
    revealSection(id);
    el.scrollIntoView({ behavior: smooth(), block: "start" });
    window.setTimeout(() => {
      pulseSectionHeading(id);
      focusSectionHeading(id);
    }, 40);
    return `navigated to: ${label}`;
  }
  return `target not found: #${id}`;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([{ kind: "out", text: BANNER }]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (e.key === "Backquote") {
        e.preventDefault();
        toggle();
        return;
      }
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggle();
        return;
      }
      if (open && e.key === "Escape") {
        setOpen(false);
      }
      void target;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const suggestions = value.trim()
    ? [
        ...SECTIONS.filter((s) => s.cmd.startsWith(value.trim().toLowerCase())).map(
          (s) => `goto ${s.cmd}`
        ),
        ...SKILL_COMMANDS.filter((c) => c.cmd.startsWith(value.trim().toLowerCase())).map((c) => c.cmd),        ...(value.trim().toLowerCase() === "goto" ? SECTIONS.map((s) => `goto ${s.cmd}`) : []),
      ].slice(0, 8)
    : [];

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    setLogs((l) => [...l, { kind: "in", text: cmd }]);

    if (cmd === "" || cmd === "help") {
      appendHelp();
    } else if (cmd === "clear") {
      setLogs([]);
    } else if (cmd === "whoami") {
      setLogs((l) => [
        ...l,
        { kind: "out", text: "Shanmukha Varma Penmetsa" },
        { kind: "out", text: "VLSI Physical Design Engineer · Tcl / EDA automation" },
      ]);
    } else if (cmd === "cat skills" || cmd === "skills" || cmd === "ls skills") {
      setLogs((l) => [...l, ...SKILLS.map((s): LogLine => ({ kind: "ok", text: `• ${s}` }))]);
    } else if (cmd.startsWith("goto ")) {
      const key = cmd.slice(5);
      const sec = SECTIONS.find((s) => s.cmd === key);
      if (sec) {
        setLogs((l) => [...l, { kind: "ok", text: navToSection(sec.id, sec.label) }]);
      } else {
        setLogs((l) => [
          ...l,
          { kind: "out", text: `available: ${SECTIONS.map((s) => s.cmd).join(", ")}` },
        ]);
      }
    } else if (cmd === "open resume" || cmd === "resume") {
      setLogs((l) => [...l, { kind: "ok", text: "opening /resume ..." }]);
      router.push("/resume");
      setOpen(false);
    } else if (cmd === "contact" || cmd === "email") {
      setLogs((l) => [...l, { kind: "ok", text: navToSection("contact", "Get In Touch") }]);
    } else if (cmd === "open hub" || cmd === "hub" || cmd === "vlsi hub") {
      window.open("https://vlsi-hub-iota.vercel.app/", "_blank", "noopener");
    } else if (cmd === "github" || cmd === "open github") {
      window.open("https://github.com/shanmukhavarma007", "_blank", "noopener");
    } else if (cmd === "linkedin" || cmd === "open linkedin") {
      window.open("https://www.linkedin.com/in/shanmukhavarma-penmetsa/", "_blank", "noopener");
    } else {
      setLogs((l) => [...l, { kind: "err", text: `command not found: ${cmd} — type "help"` }]);
    }
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);
    setValue("");
  }

  function appendHelp() {
    const help: LogLine[] = [
      { kind: "out", text: "available commands:" },
      ...SECTIONS.map((s): LogLine => ({ kind: "ok", text: `  goto ${s.cmd.padEnd(11)} — ${s.label}` })),
      { kind: "ok", text: "  open resume        — view the resume page" },
      { kind: "ok", text: "  contact / email    — jump to contact" },
      { kind: "ok", text: "  cat skills         — print skills matrix" },
      { kind: "ok", text: "  github / linkedin  — external profiles" },
      { kind: "ok", text: "  open hub           — VLSI Hub platform" },
      { kind: "ok", text: "  whoami / clear / help" },
    ];
    setLogs((l) => [...l, ...help]);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center"
      style={{ padding: "clamp(48px, 12vh, 120px) 16px 16px" }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(2,6,16,0.72)", backdropFilter: "blur(6px)" }}
        onClick={() => setOpen(false)}
      />

      {/* Terminal */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700/80 bg-[#050b14]/95 shadow-2xl shadow-black/60"
        style={{ boxShadow: "0 0 40px rgba(6,182,212,0.18)" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {"pd_shell // command palette"}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
            className="ml-auto font-mono text-xs text-slate-400 hover:text-slate-200"
            style={{ cursor: "pointer" }}
          >
            [ESC]
          </button>
        </div>

        {/* Log stream */}
        <div
          ref={logRef}
          className="term-scroll max-h-[50vh] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed"
        >
          {logs.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              <span className={lineStyle[line.kind]}>{line.text}</span>
            </div>
          ))}
        </div>

        {/* Input + suggestions */}
        <div className="border-t border-slate-800 bg-slate-900/40">
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pt-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => run(s)}
              className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-300 hover:bg-cyan-500/20"
            >
              {s}
            </button>
          ))}
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="shrink-0 font-mono text-[12px] text-emerald-400">
              sh_pd@7nm:~$
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setHistIdx(-1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  run(value);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const ni = histIdx === -1 ? history.length - 1 : histIdx - 1;
                  if (history[ni]) {
                    setHistIdx(ni);
                    setValue(history[ni]);
                  }
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const ni = histIdx + 1;
                  if (ni < history.length) {
                    setHistIdx(ni);
                    setValue(history[ni]);
                  } else {
                    setHistIdx(-1);
                    setValue("");
                  }
                }
              }}
              className="w-full bg-transparent font-mono text-[12px] text-slate-100 caret-cyan-400 outline-none placeholder:text-slate-400"
              placeholder='type "help" for commands…'
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className="animate-pulse shrink-0 text-cyan-400">▮</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const lineStyle: Record<LogLine["kind"], string> = {
  in: "text-emerald-300",
  out: "text-slate-300",
  ok: "text-cyan-300",
  err: "text-amber-300",
};
