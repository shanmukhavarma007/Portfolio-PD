interface SectionHeaderProps {
  index: string;
  title: string;
}

export function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-cyan-400">
        {index} // {title} ────
      </span>
      <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
