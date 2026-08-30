import React from "react";

interface SectionHeaderProps {
  badge?: string; // e.g. "01 // PROJECTS"
  title: string; // e.g. "Featured Projects"
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`w-full mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4 w-full">
        {/* Numbered Index Badge */}
        {badge && (
          <span className="inline-flex items-center shrink-0 px-2.5 py-1 rounded border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-xs tracking-widest uppercase select-none">
            {badge}
          </span>
        )}

        {/* Section Heading Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono tracking-tight text-cyan-300 whitespace-nowrap">
          {title}
        </h2>

        {/* Trailing EDA Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 via-cyan-500/10 to-transparent self-center ml-2" />
      </div>

      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted,#8b949e)] font-mono max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
