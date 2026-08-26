import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress(triggerId = 'assembly-scroll') {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return undefined;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.35,
      onUpdate: (self) => setProgress(Number(self.progress.toFixed(4)))
    });

    return () => scrollTrigger.kill();
  }, [triggerId]);

  return progress;
}
