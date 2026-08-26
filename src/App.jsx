import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { Stats } from './components/sections/Stats.jsx';
import { About } from './components/sections/About.jsx';
import { Services } from './components/sections/Services.jsx';
import { WhyUs } from './components/sections/WhyUs.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Process } from './components/sections/Process.jsx';
import { TrustBand } from './components/sections/TrustBand.jsx';
import { Contact } from './components/sections/Contact.jsx';
import { FallbackStructure } from './components/three/FallbackStructure.jsx';
import { useIsMobile } from './hooks/useIsMobile.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';
import { useScrollProgress } from './hooks/useScrollProgress.js';

const SteelStructureScene = lazy(() => import('./components/three/SteelStructureScene.jsx'));

function rangeProgress(value, start, end) {
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}

function overlayStyle(progress, start, holdStart, holdEnd, end) {
  const enter = rangeProgress(progress, start, holdStart);
  const exit = rangeProgress(progress, holdEnd, end);
  const opacity = Math.min(enter, 1 - exit);
  const y = 28 * (1 - enter) - 20 * exit;
  return {
    opacity,
    transform: `translateY(${y}px)`,
    visibility: opacity <= 0.01 ? 'hidden' : 'visible',
    pointerEvents: 'none'
  };
}

function AssemblyChapter() {
  const progress = useScrollProgress('build-story');
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const isConstrained = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const useFallback = reducedMotion || isConstrained;

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section id="build-story" data-theme="dark" className={`theme-dark relative ${reducedMotion ? 'min-h-screen' : 'h-[640svh]'}`}>
      <div className="story-viewport sticky overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0 technical-grid opacity-75" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_22%,rgba(28,167,224,0.13),transparent_32rem),linear-gradient(90deg,rgba(8,10,11,0.96)_0%,rgba(8,10,11,0.72)_37%,rgba(8,10,11,0.18)_72%,rgba(8,10,11,0.9)_100%)]" />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full transition-opacity duration-300 md:w-[72vw]"
          style={{ opacity: 1 - rangeProgress(progress, 0.975, 1) }}
        >
          {useFallback ? (
            <div className="flex h-full items-center justify-center px-5 pt-24 opacity-90">
              <FallbackStructure complete={reducedMotion} />
            </div>
          ) : (
            <Suspense fallback={<Loader ready={ready} />}>
              <SteelStructureScene progress={progress} compact={isMobile} onReady={() => setReady(true)} />
            </Suspense>
          )}
        </div>

        {!ready && !useFallback && <Loader ready={ready} />}

        <div className="relative z-30 flex h-full items-center">
          <Hero progress={progress} />
        </div>

        <ConstructionStageOverlay progress={progress} />
        <HudOverlay progress={progress} />
        <FinalReveal progress={progress} />
      </div>
    </section>
  );
}

function Loader({ ready }) {
  return (
    <div className={`absolute inset-0 z-30 flex items-center justify-center bg-bg transition duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-[min(360px,82vw)] text-center">
        <p className="font-heading text-2xl font-bold tracking-[0.14em] text-white">ADVAIT INFRA</p>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.26em] text-cyanBrand">Assembling Experience</p>
        <div className="mt-7 h-px overflow-hidden bg-white/12">
          <div className="h-full w-4/5 bg-cyanBrand" />
        </div>
      </div>
    </div>
  );
}

function ConstructionStageOverlay({ progress }) {
  const stages = [
    { start: 0.04, holdStart: 0.1, holdEnd: 0.14, end: 0.18, label: '01 / Foundation', title: 'Every Structure\nStarts Here.', copy: 'Precision foundations establish\nthe geometry for everything above.' },
    { start: 0.16, holdStart: 0.2, holdEnd: 0.28, end: 0.32, label: '02 / Columns', title: 'Steel Rises.', copy: 'Primary columns lock into\nthe foundation system.' },
    { start: 0.3, holdStart: 0.34, holdEnd: 0.43, end: 0.47, label: '03 / Primary Frame', title: 'The Form Takes Shape.', copy: 'Columns and tapered rafters create\nthe repeating PEB portal frame.' },
    { start: 0.45, holdStart: 0.49, holdEnd: 0.58, end: 0.62, label: '04 / Structural Grid', title: 'The System Connects.', copy: 'Purlins, girts and bracing connect\neach primary structural frame.' },
    { start: 0.6, holdStart: 0.64, holdEnd: 0.7, end: 0.74, label: '05 / Scale', title: 'Engineered In Repetition.', copy: 'Every frame extends the structure,\ncreating strength through precision.' },
    { start: 0.72, holdStart: 0.76, holdEnd: 0.82, end: 0.86, label: '06 / Envelope', title: 'The Structure\nCloses.', copy: 'Roofing and wall systems transform\nthe steel skeleton into architecture.' },
    { start: 0.84, holdStart: 0.88, holdEnd: 0.92, end: 0.955, label: '07 / Completion', title: 'From Frame\nTo Facility.', copy: 'The complete industrial structure\ntakes its final form.' }
  ];
  const activeStage = stages.find((stage) => progress >= stage.start && progress <= stage.end);

  if (!activeStage) return null;

  return (
    <div
      key={activeStage.label}
      className="story-overlay pointer-events-none absolute left-[clamp(1.25rem,6vw,7.5rem)] bottom-[clamp(6.9rem,13vh,10.6rem)] z-30 w-[min(520px,calc(100vw-40px))] transition-[opacity,transform,visibility] duration-300 md:w-[min(520px,36vw)]"
      style={overlayStyle(progress, activeStage.start, activeStage.holdStart, activeStage.holdEnd, activeStage.end)}
    >
      <p className="text-xs font-black uppercase tracking-[0.26em] text-cyanBrand">{activeStage.label}</p>
      <h2 className="stage-title mt-4 max-w-[7.5ch] whitespace-pre-line font-heading text-[clamp(2.7rem,5vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
        {activeStage.title}
      </h2>
      <p className="mt-6 whitespace-pre-line text-base font-semibold uppercase leading-7 tracking-[0.12em] text-white/66 md:text-lg">
        {activeStage.copy}
      </p>
    </div>
  );
}

function HudOverlay({ progress }) {
  const visible = progress > 0.12 && progress < 0.965;
  return (
    <div className={`pointer-events-none absolute bottom-6 left-5 right-5 z-20 hidden items-end justify-between text-white/55 transition duration-300 md:flex ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyanBrand">Structural Assembly</p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Scroll Controls Construction</p>
      <p className="text-xs font-black uppercase tracking-[0.2em]">Frame {String(Math.max(1, Math.round(progress * 16))).padStart(2, '0')} / 16</p>
    </div>
  );
}

function FinalReveal({ progress }) {
  const visible = progress > 0.948;
  return (
    <div className={`pointer-events-none absolute inset-x-5 bottom-24 z-30 mx-auto max-w-7xl transition duration-700 md:bottom-20 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <p className="max-w-4xl whitespace-pre-line font-heading text-[clamp(2.7rem,7vw,7.8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
        ENGINEERED.
        {'\n'}FABRICATED.
        {'\n'}DELIVERED.
      </p>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.25em] text-cyanBrand md:text-base">From Foundation To Future. Advait Infra.</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <AssemblyChapter />
        <div className="relative z-10">
        <Stats />
        <About />
        <Services />
        <WhyUs />
        <Projects />
        <Process />
        <TrustBand />
        <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
