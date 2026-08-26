import { processSteps } from '../../data/content.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function Process() {
  return (
    <section id="process" data-theme="dark" className="theme-dark px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading align="center" eyebrow="04 / How We Build" title="The delivery line is engineered before steel reaches site." />
        </Reveal>
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-[45px] hidden h-[3px] bg-[linear-gradient(90deg,transparent,#68727A_8%,#1CA7E0_50%,#68727A_92%,transparent)] md:block" aria-hidden="true" />
          {processSteps.map(({ title, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="relative p-4 text-center">
                <div className="icon-box mx-auto flex h-[90px] w-[90px] items-center justify-center border shadow-cyan">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-secondary">0{index + 1}</p>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] text-primary">{title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
