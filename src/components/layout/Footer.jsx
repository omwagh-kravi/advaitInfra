import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { company, services } from '../../data/content.js';

export function Footer() {
  return (
    <footer data-theme="dark" className="theme-dark relative z-10 border-t section-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_0.8fr_1fr] md:px-8">
        <div>
          <img src="/logo.svg" alt="Advait Infra" className="h-auto w-[154px]" />
          <p className="mt-5 max-w-sm text-white/68">{company.tagline}. {company.subBrand}.</p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#home" aria-label="Social profile placeholder" className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/75 hover:border-cyanBrand hover:text-cyanBrand">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Services</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/64">
            {services.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Contact</h2>
          <p className="mt-5 text-sm leading-7 text-white/64">{company.address}</p>
          <p className="mt-4 text-sm text-white/64">{company.email}</p>
          <p className="mt-2 text-sm text-white/64">{company.phones.join(' | ')}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
        GSTIN: {company.gstin} · {company.legalEntity} · © 2026 Advait Infra. Built with excellence.
      </div>
    </footer>
  );
}
