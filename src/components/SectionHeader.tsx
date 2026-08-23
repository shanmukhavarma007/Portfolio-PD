interface SectionHeaderProps {
  id: string;
  title: string;
}

export function SectionHeader({ id, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider">
        {`${id} // ${title}`}
      </span>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 via-slate-800 to-transparent" />
    </div>
  );
}
