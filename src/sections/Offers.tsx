import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useSound } from '../lib/sound'
import GenerativeReel from '../components/GenerativeReel'
import RevealText from '../components/RevealText'

const OFFERS = [
  { label: 'Vidéo de présentation', detail: "Expliquez-vous avant qu'ils partent." },
  { label: 'Vidéo explicative', detail: 'Parce que 14 paragraphes, c\'est un peu long.' },
  { label: 'Campagne Ads', detail: 'Le problème. La solution. Et un peu de bruit.' },
]

export default function Offers() {
  const sectionRef = useRef<HTMLElement>(null)
  const { play } = useSound()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-offer-row]')

      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.03,
          scrollTrigger: { trigger: row, start: 'top 90%' },
        })
      })

      const mm = gsap.matchMedia()
      mm.add('(max-width: 767px)', () => {
        rows.forEach((row) => {
          ScrollTrigger.create({
            trigger: row,
            start: 'top 55%',
            end: 'bottom 45%',
            toggleClass: { targets: row, className: 'offer-active' },
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="offers"
      data-theme="light"
      ref={sectionRef}
      className="relative bg-white px-6 py-28 text-black sm:px-10 sm:py-40"
    >
      <p className="mb-4 font-display text-xs font-medium uppercase tracking-[0.5em] text-black/40">
        Vous avez une offre.
      </p>
      <RevealText
        as="h2"
        lines={['Nous, on a une idée.']}
        className="mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none text-black sm:mb-24"
      />

      <div className="divide-y divide-black/10 border-t border-black/10">
        {OFFERS.map((offer, i) => (
          <div
            key={offer.label}
            data-offer-row
            data-cursor="hover"
            onMouseEnter={() => play('hover')}
            className="group relative flex items-center justify-between gap-6 overflow-hidden py-8 sm:py-12"
          >
            <div className="offer-fill absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-violet-deep via-violet to-violet-electric transition-transform duration-500 ease-[var(--ease-flow)] group-hover:scale-x-100" />

            <div className="flex items-center gap-6 sm:gap-10">
              <span className="font-display text-sm text-black/30 transition-colors duration-500 group-hover:text-white/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,4.4vw,3.2rem)] font-extrabold uppercase text-black transition-all duration-500 ease-[var(--ease-flow)] group-hover:translate-x-3 group-hover:text-white">
                {offer.label}
              </h3>
            </div>

            <p className="hidden max-w-[24ch] text-right font-body text-sm font-light text-black/45 transition-colors duration-500 group-hover:text-white/70 sm:block">
              {offer.detail}
            </p>

            <div className="offer-reel relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg opacity-0 transition-opacity duration-500 ease-[var(--ease-flow)] group-hover:opacity-100 sm:block">
              <GenerativeReel className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
