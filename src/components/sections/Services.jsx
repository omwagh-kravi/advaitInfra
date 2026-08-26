import { services } from '../../data/content.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
import { WireIcon } from '../ui/WireIcon.jsx';

export function Services() {
  return (
    <section id="services" data-theme="dark" className="theme-dark relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading light eyebrow="02 / Capabilities" title="Built to Handle Complexity at Scale." copy="Four integrated pillars for steel, civil, systems, and project delivery." />
        </Reveal>
        <div className="mt-14 border-t section-border">
          {services.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="group grid gap-8 border-b section-border py-10 transition hover:bg-white/[0.025] md:grid-cols-[0.16fr_0.31fr_0.38fr_0.15fr] md:items-center">
                <p className="font-heading text-5xl font-bold text-white/14">0{index + 1}</p>
                <div>
                  <Icon className="h-8 w-8 text-cyanBrand" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-3xl font-bold tracking-[-0.03em] md:text-4xl">{title}</h3>
                </div>
                <p className="text-lg leading-8 text-secondary">{description}</p>
                <div className="opacity-70 transition group-hover:opacity-100">
                  <WireIcon />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
