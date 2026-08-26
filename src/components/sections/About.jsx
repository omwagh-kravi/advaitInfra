import { Award, Shield, Target } from 'lucide-react';
import { about, company } from '../../data/content.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function About() {
  return (
    <section id="about" data-theme="light" className="theme-light relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 xl:grid-cols-[0.72fr_1.28fr]">
        <Reveal className="max-w-xl">
          <SectionHeading
            eyebrow="01 / About"
            title={"Built on engineering.\nDriven by execution."}
            copy="Founded by Er. Shubham Vilas Bidve, Advait Infra brings PEB structure, fabrication, and civil engineering into one accountable construction practice."
          />
        </Reveal>
        <div className="space-y-6">
          <Reveal>
            <div className="border-l-2 border-cyanBrand bg-white p-7 text-primary shadow-soft md:p-10">
              <Award className="h-9 w-9 text-cyanBrand" aria-hidden="true" />
              <p className="mt-6 text-xl leading-9 text-secondary">{about.story}</p>
              <div className="mt-8 border-t border-ink/10 pt-7">
                <p className="font-heading text-2xl font-bold">{company.founder}</p>
                <p className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-secondary">{company.founderRole}</p>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ['Our Commitment', about.commitment, Shield],
              ['Our Vision', about.vision, Target]
            ].map(([title, copy, Icon], index) => (
              <Reveal key={title} delay={index * 0.08}>
                <article className="h-full border section-border bg-paper p-6 text-primary">
                  <Icon className="h-8 w-8 text-cyanBrand" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-7 text-secondary">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
