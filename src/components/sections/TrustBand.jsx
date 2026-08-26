import { projects } from '../../data/content.js';

export function TrustBand() {
  return (
    <section data-theme="dark" className="theme-dark overflow-hidden px-5 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-heading text-3xl font-bold md:text-4xl">Trusted by 100+ clients across 5+ states</p>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((project) => (
            <div key={project.name} className="flex min-h-20 items-center justify-center border border-white/10 bg-white/6 px-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-white/62">
              {project.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
