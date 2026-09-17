# Upflow

Site vitrine d'UPFLOW — studio de motion & vidéo. Pensé comme une expérience de scroll cinématographique : typographie massive, reveals progressifs, vidéo mise en scène du petit cadre au plein écran, et une direction artistique sombre construite autour du violet et du magenta de la marque.

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + ScrollTrigger pour les animations liées au scroll
- [Lenis](https://lenis.darkroom.engineering) pour le smooth scroll
- [Framer Motion](https://www.framer.com/motion/) pour le curseur magnétique

## Développement

```bash
npm install
npm run dev
```

```bash
npm run build   # build de production dans dist/
npm run lint    # oxlint
```

## Structure

```
src/
  components/   # Cursor, MagneticButton, RevealText, Preloader, Nav, GenerativeReel…
  sections/     # Hero, Manifesto, Showreel, Services, Work, CTA, Footer
  lib/          # setup GSAP + Lenis
```

Les visuels de projets (`GenerativeReel`) sont des placeholders génératifs en attendant les vraies vidéos/images des clients — à remplacer par les assets définitifs (`<video>` / images) dans `src/sections/Showreel.tsx` et `src/sections/Work.tsx`.
