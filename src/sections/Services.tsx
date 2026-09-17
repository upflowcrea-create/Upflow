import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import GenerativeReel from '../components/GenerativeReel'
import RevealText from '../components/RevealText'

const SERVICES = [
  { label: 'Apps', detail: 'Onboarding, démos, motion produit' },
  { label: 'SaaS', detail: 'Vidéos explicatives, feature reveals' },
  { label: 'Startups', detail: 'Pitch, teaser, image de marque' },
  { label: 'Marques', detail: 'Films de marque, contenu social' },
  { label: 'Produits', detail: 'Lancements, showcases 3D & motion' },
  { label: 'Événements sportifs', detail: 'Aftermovies, capsules live' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-service-row]')
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.03,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative bg-noir px-6 py-28 sm:px-10 sm:py-40">
      <RevealText
        as="h2"
        lines={['Ce que nous créons.']}
        className="mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-none text-ivory sm:mb-24"
      />

      <div className="divide-y divide-ivory/10 border-t border-ivory/10">
        {SERVICES.map((service, i) => (
          <div
            key={service.label}
            data-service-row
            data-cursor="hover"
            className="group relative flex items-center justify-between gap-6 overflow-hidden py-7 sm:py-9"
          >
            <div className="absolute inset-0 -z-10 origin-left scale-x-0 bg-ivory/[0.04] transition-transform duration-500 ease-[var(--ease-flow)] group-hover:scale-x-100" />

            <div className="flex items-center gap-6 sm:gap-10">
              <span className="font-display text-sm text-ivory/30">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[clamp(1.4rem,3.6vw,2.6rem)] font-medium text-ivory transition-transform duration-500 ease-[var(--ease-flow)] group-hover:translate-x-3">
                {service.label}
              </h3>
            </div>

            <p className="hidden max-w-[26ch] text-right font-body text-sm font-light text-ivory/45 sm:block">
              {service.detail}
            </p>

            <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg opacity-0 transition-all duration-500 ease-[var(--ease-flow)] group-hover:opacity-100 sm:block">
              <GenerativeReel className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
