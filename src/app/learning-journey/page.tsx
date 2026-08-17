import Image from "next/image";

export default function LearningJourneyPage() {
  return (
    <main className="flex-1 py-24 px-6 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold semi-bold tracking-tight mb-8">
        Learning Journey
      </h1>

      <p className="text-[var(--color-secondary-text)] text-lg mb-10">
        Content to be added. Learning milestones added dynamically without page redesign.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--surface-3)] rounded-md border border-[var(--surface-4)]/50">
          <h3 className="text-sm font-medium semi-bold tracking-tight mb-2">
            Milestone to be added
          </h3>
          <p className="text-xs text-[var(--color-secondary-text)]">—</p>
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs text-[var(--color-secondary-text)]">Skill to be added</span>
          </div>
        </div>

        <div className="p-4 bg-[var(--surface-3)] rounded-md border border-[var(--surface-4)]/50">
          <h3 className="text-sm font-medium semi-bold tracking-tight mb-2">
            Milestone to be added
          </h3>
          <p className="text-xs text-[var(--color-secondary-text)]">—</p>
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs text-[var(--color-secondary-text)]">Skill to be added</span>
          </div>
        </div>

        <div className="p-4 bg-[var(--surface-3)] rounded-md border border-[var(--surface-4)]/50">
          <h3 className="text-sm font-medium semi-bold tracking-tight mb-2">
            Milestone to be added
          </h3>
          <p className="text-xs text-[var(--color-secondary-text)]">—</p>
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs text-[var(--color-secondary-text)]">Skill to be added</span>
          </div>
        </div>
      </div>
    </main>
  );
}