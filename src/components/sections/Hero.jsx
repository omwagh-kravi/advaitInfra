import { ChevronDown, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button.jsx';
import { company } from '../../data/content.js';

function rangeProgress(value, start, end) {
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero({ progress = 0 }) {
  const exit = rangeProgress(progress, 0.12, 0.22);
  const style = {
    opacity: 1 - exit,
    transform: `translateY(${-44 * exit}px) scale(${1 - 0.02 * exit})`,
    visibility: exit >= 1 ? 'hidden' : 'visible',
    pointerEvents: exit > 0.85 ? 'none' : 'auto'
  };

  return (
    <section id="home" className="w-full px-5 pt-24 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-[0.52fr_0.48fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hero-copy max-w-3xl transition-[opacity,transform,visibility] duration-300"
          style={style}
        >
          <div className="mb-7 inline-flex items-center gap-3 border border-white/14 bg-white/6 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyanBrand backdrop-blur">
            <HardHat className="h-4 w-4" aria-hidden="true" />
            ADVAIT INFRA · EST. 2016
          </div>
          <h1 className="hero-title max-w-[9.3ch] font-heading text-[clamp(3rem,14vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white md:text-[clamp(3.8rem,7vw,6.5rem)] xl:text-[clamp(4rem,7vw,8.5rem)] xl:leading-[0.88]">
            WE DON'T JUST BUILD STRUCTURES.
            <span className="block text-white/58">We Engineer Possibility.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-semibold uppercase tracking-[0.16em] text-white/58 md:text-lg">
            PEB Structures · Civil Construction · MEP · Turnkey Solutions
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact'); }}>
              Start a Project
            </Button>
            <Button variant="secondary" href="#projects" onClick={(event) => { event.preventDefault(); scrollToId('projects'); }}>
              Explore Our Work
            </Button>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-px bg-white/12 text-xs uppercase tracking-[0.2em] text-white/52 sm:grid-cols-3">
            {['PEB / Structural System', 'Engineered in Ahmednagar', company.tagline].map((label) => (
              <div key={label} className="bg-bg/70 p-3">{label}</div>
            ))}
          </div>
        </motion.div>
        <div className="hidden md:block" aria-hidden="true" />
      </div>
      <button
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/50"
        onClick={() => scrollToId('stats')}
        style={{
          opacity: 1 - rangeProgress(progress, 0.08, 0.18),
          visibility: progress >= 0.18 ? 'hidden' : 'visible'
        }}
      >
        Scroll
        <ChevronDown className="h-5 w-5 animate-bounce text-cyanBrand" />
      </button>
    </section>
  );
}
