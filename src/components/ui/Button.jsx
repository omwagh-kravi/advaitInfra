import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Button({ children, href, variant = 'primary', icon = true, className = '', onClick, type }) {
  const base =
    'group inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 text-xs font-black uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyanBrand';
  const styles =
    variant === 'primary'
      ? 'bg-cyanBrand text-white shadow-cyan hover:bg-white hover:text-ink'
      : 'border border-white/24 bg-white/5 text-white backdrop-blur hover:border-cyanBrand hover:bg-cyanBrand/10';
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      type={type}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      {icon && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />}
    </Component>
  );
}
