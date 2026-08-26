export function SectionHeading({ eyebrow, title, copy, light = false, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-cyanBrand" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className={`whitespace-pre-line font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] md:text-6xl ${light ? 'text-primary' : 'text-primary'}`}>
        {title}
      </h2>
      {copy && <p className="mt-5 text-lg leading-8 text-secondary">{copy}</p>}
    </div>
  );
}
