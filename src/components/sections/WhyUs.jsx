import { whyUs } from '../../data/content.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function WhyUs() {
  return (
    <section id="why-us" data-theme="light" className="theme-light px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <SectionHeading eyebrow="05 / Why Advait" title={"Precision is visible\nbefore the first bolt\nis tightened."} copy="Strong construction companies are built around repeatable execution, not decorative promises." />
        </Reveal>
        <div className="grid gap-px bg-black/12">
          {whyUs.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="grid gap-5 bg-paper p-7 transition hover:bg-white md:grid-cols-[72px_1fr]">
                <div className="icon-box flex h-14 w-14 items-center justify-center border">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-[-0.03em] text-primary">{title}</h3>
                  <p className="mt-3 leading-7 text-secondary">{description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
