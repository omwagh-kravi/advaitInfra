# Advait Infra Website

Premium single-page React/Vite marketing website for Advait Infra, featuring a scroll-driven steel structure assembly scene.

## Stack

- React 18 + Vite
- Tailwind CSS
- React Three Fiber + Drei for the desktop 3D scene
- GSAP ScrollTrigger for scroll progress
- Framer Motion for section reveals and micro-interactions
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

The development server runs on the host reported by Vite, usually `http://localhost:5173/`.

## Production Build

```bash
npm run build
npm run preview
```

## Content Notes

All company facts, services, project names, stats, GSTIN values, contact information, and founder details are centralized in `src/data/content.js`.

Project images use stock placeholder URLs and are marked in code with `TODO` comments so they can be replaced with real client-provided photography. The contact form currently validates fields and opens a `mailto:` fallback; replace the marked TODO with a production endpoint when one is available.
