import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex-1 py-24 px-6 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold semi-bold tracking-tight mb-8">
        About
      </h1>

      <p className="text-[var(--color-secondary-text)] text-lg mb-10">
        Content to be added. Professional bio and background information.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[var(--color-secondary-text)] text-lg leading-relaxed mb-6">
            Content to be added. VLSI Physical Design Engineer currently undergoing intensive
            training and building hands-on capability through active project work.
          </p>

          <p className="text-[var(--color-secondary-text)] text-lg leading-relaxed mb-6">
            Focused on physical design flow stages from floorplan through signoff, with expertise
            in EDA tools and methodology.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--surface-4)] flex items-center justify-center">
              <span className="text-xl font-bold">📍</span>
            </div>
            <span className="text-[var(--color-secondary-text)]">Location: To be added</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--surface-4)] flex items-center justify-center">
              <span className="text-xl font-bold">🎓</span>
            </div>
            <span className="text-[var(--color-secondary-text)]">Education: To be added</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--surface-4)] flex items-center justify-center">
              <span className="text-xl font-bold">🛠️</span>
            </div>
            <span className="text-[var(--color-secondary-text)]">Tools: To be added</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--surface-4)] flex items-center justify-center">
              <span className="text-xl font-bold">📫</span>
            </div>
            <span className="text-[var(--color-secondary-text)]">
              Contact: <a href="/contact" className="underline text-[var(--color-primary-accent)]">
                /contact
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}