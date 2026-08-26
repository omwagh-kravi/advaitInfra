import { motion } from 'framer-motion';
import { projects } from '../../data/content.js';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

function imageUrl(query) {
  return `https://source.unsplash.com/900x640/?${encodeURIComponent(query)}`;
}

export function Projects() {
  return (
    <section id="projects" data-theme="light" className="theme-light fine-grid px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="03 / Portfolio" title="Industrial projects deserve architectural presence." copy="A portfolio system ready for real photography from the Advait Infra project archive." />
        </Reveal>
        <div className="mt-14 grid auto-rows-[minmax(360px,auto)] gap-6 md:grid-cols-6">
          {projects.map((project, index) => (
            <Reveal
              key={project.name}
              delay={index * 0.06}
              className={`${index === 0 ? 'md:col-span-4 md:row-span-2' : index === 3 ? 'md:col-span-6' : 'md:col-span-2'}`}
            >
              <motion.article
                whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}
                className="group relative flex h-full min-h-[360px] overflow-hidden bg-ink text-white shadow-soft"
              >
                {/* TODO: replace with real client-provided photo */}
                <img
                  src={imageUrl(project.query)}
                  alt={`${project.name} construction project placeholder`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
                <div className="relative mt-auto w-full p-6 md:p-8">
                  <div className="mb-12 flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-white/62">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-cyanBrand">{project.category}</span>
                  </div>
                  <span className="inline-flex border border-cyanBrand/30 bg-cyanBrand/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyanBrand">
                    {project.category}
                  </span>
                  <h3 className="mt-4 font-heading text-3xl font-bold tracking-[-0.03em] md:text-5xl">{project.name}</h3>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
