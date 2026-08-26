import { stats } from '../../data/content.js';
import { AnimatedCounter } from '../ui/AnimatedCounter.jsx';
import { Reveal } from '../ui/Reveal.jsx';

export function Stats() {
  return (
    <section id="stats" data-theme="dark" className="theme-dark technical-grid relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl border-y section-border">
        <div className="grid divide-y divide-white/12 md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map(({ label, value, prefix, suffix, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 0.08} className="py-8 md:px-8 md:py-10">
            <Icon className="mb-6 h-7 w-7 text-cyanBrand" aria-hidden="true" />
            <p className="font-heading text-5xl font-bold tracking-[-0.04em] text-primary md:text-6xl">
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
            </p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-secondary">{label}</p>
          </Reveal>
        ))}
        </div>
      </div>
    </section>
  );
}
