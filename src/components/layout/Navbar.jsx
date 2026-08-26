import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { company } from '../../data/content.js';
import { Button } from '../ui/Button.jsx';

const links = [
  ['About', 'about'],
  ['Services', 'services'],
  ['Projects', 'projects'],
  ['Process', 'process'],
  ['Contact', 'contact']
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const readTheme = () => {
      const sampleY = 84;
      const elements = document.elementsFromPoint(window.innerWidth / 2, sampleY);
      const themed = elements
        .map((element) => element.closest?.('[data-theme]'))
        .find(Boolean);
      setTheme(themed?.dataset.theme === 'light' ? 'light' : 'dark');
    };

    readTheme();
    window.addEventListener('scroll', readTheme, { passive: true });
    window.addEventListener('resize', readTheme);
    return () => {
      window.removeEventListener('scroll', readTheme);
      window.removeEventListener('resize', readTheme);
    };
  }, []);

  const isLight = theme === 'light';

  return (
    <header data-nav-theme={theme} className="site-navbar fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Primary navigation">
        <button className="flex items-center gap-3 text-left" onClick={() => scrollToId('home')} aria-label={`${company.name} home`}>
          <img src={isLight ? '/logo-dark.svg' : '/logo.svg'} alt="Advait Infra" className="h-auto w-[136px] md:w-[154px]" />
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)} className={`nav-link text-[11px] font-black uppercase ${isLight ? 'text-[#111416]/72 hover:text-[#111416]' : 'text-white/70 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact'); }} className="min-h-11 px-5" icon={false}>
            Get a Quote
          </Button>
        </div>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center border backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyanBrand lg:hidden ${isLight ? 'border-black/12 bg-black/5 text-[#111416]' : 'border-white/16 bg-white/5 text-white'}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <div className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <aside className={`ml-auto h-full w-[min(420px,88vw)] bg-bg p-6 shadow-2xl transition ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between">
            <img src="/logo.svg" alt="Advait Infra" className="h-auto w-[140px]" />
            <button className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-10 grid gap-4">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => {
                  setOpen(false);
                  scrollToId(id);
                }}
                className="border-b border-white/10 py-4 text-left font-heading text-2xl font-semibold text-white"
              >
                {label}
              </button>
            ))}
            <Button href="#contact" onClick={(event) => { event.preventDefault(); setOpen(false); scrollToId('contact'); }} className="mt-4" icon={false}>
              Get a Quote
            </Button>
          </div>
        </aside>
      </div>
    </header>
  );
}
