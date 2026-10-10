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
    <div className={`scroll-reveal-heading w-full mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4 w-full">
        {/* Numbered Index Badge — normalized terminal tag */}
        {badge && (
          <span className="glass-badge px-2.5 py-1 font-mono text-xs tracking-widest uppercase select-none">
            {badge}
          </span>
        )}

        {/* Section Heading Title — unified gradient */}
        <h2 className="min-w-0 text-balance text-gradient text-xl sm:text-2xl lg:text-3xl font-bold font-mono tracking-tight">
          {title}
        </h2>

        {/* Trailing EDA Line */}
        <div
          className="scroll-reveal-hairline flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 via-cyan-500/10 to-transparent self-center ml-2"
          aria-hidden="true"
        />
      </div>

      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-slate-400 font-mono max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
