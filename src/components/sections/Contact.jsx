import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { company, services } from '../../data/content.js';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  message: ''
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!/^[0-9+\-\s()]{8,}$/.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!form.projectType) nextErrors.projectType = 'Choose a project type.';
    if (!form.message.trim()) nextErrors.message = 'Tell us a little about the project.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // TODO: replace mailto fallback with a production form endpoint.
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry from ${form.name}`)}&body=${encodeURIComponent(`${form.message}\n\nPhone: ${form.phone}\nEmail: ${form.email}\nProject Type: ${form.projectType}`)}`;
      setSubmitted(true);
    }
  }

  return (
    <section id="contact" data-theme="dark" className="theme-dark noise relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal>
          <SectionHeading light eyebrow="06 / Contact" title={"Let's Build\nWhat's Next."} copy="Share the scope, site, and project type. Advait Infra will shape the next step with you." />
          <form className="mt-10 grid gap-5" onSubmit={submit} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input value={form.name} onChange={(event) => update('name', event.target.value)} className="field" autoComplete="name" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input value={form.phone} onChange={(event) => update('phone', event.target.value)} className="field" autoComplete="tel" />
              </Field>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} className="field" autoComplete="email" />
              </Field>
              <Field label="Project Type" error={errors.projectType}>
                <select value={form.projectType} onChange={(event) => update('projectType', event.target.value)} className="field">
                  <option value="">Select service</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <textarea value={form.message} onChange={(event) => update('message', event.target.value)} className="field min-h-36 resize-y" />
            </Field>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit">Send Enquiry</Button>
              {submitted && <p className="text-sm font-semibold text-cyanBrand">Opening your email app with the enquiry details.</p>}
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="border border-white/12 bg-white/7 p-7 backdrop-blur-xl md:p-9">
            <h3 className="font-heading text-2xl font-bold">Advait Infra</h3>
            <p className="mt-2 text-white/56">{company.legalEntity}</p>
            <div className="mt-8 space-y-6">
              <Info icon={Phone}>
                {company.phones.map((phone) => (
                  <a key={phone} className="block hover:text-cyanBrand" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                ))}
              </Info>
              <Info icon={Mail}>
                <a className="hover:text-cyanBrand" href={`mailto:${company.email}`}>{company.email}</a>
              </Info>
              <Info icon={MapPin}>
                <span>{company.address}</span>
              </Info>
            </div>
            <div className="mt-8 flex min-h-64 items-center justify-center border border-cyanBrand/20 bg-blueprint bg-[size:32px_32px] p-6 text-center">
              <div>
                <MapPin className="mx-auto h-10 w-10 text-cyanBrand" aria-hidden="true" />
                <p className="mt-4 font-heading text-xl font-bold">Ahmednagar, Maharashtra</p>
                <p className="mt-2 text-sm leading-6 text-white/58">Google Map placeholder for MIDC Nimblak location</p>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/78">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-caution">{error}</span>}
    </label>
  );
}

function Info({ icon: Icon, children }) {
  return (
    <div className="flex gap-4 text-white/72">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-cyanBrand" aria-hidden="true" />
      <div className="leading-7">{children}</div>
    </div>
  );
}
