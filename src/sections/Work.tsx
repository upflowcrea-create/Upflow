import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import GenerativeReel from '../components/GenerativeReel'

const PROJECTS = [
  { title: 'Nova', category: 'Motion Design / 3D' },
  { title: 'Kaon', category: 'Film de marque / Motion' },
  { title: 'Circuit', category: 'Sport / Aftermovie' },
  { title: 'Athlon', category: 'Campagne / Ads' },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-work-item]')
      items.forEach((item) => {
        const frame = item.querySelector('[data-work-frame]')
        const accent = item.querySelector('[data-work-accent]')

        gsap.set(accent, { scaleY: 0 })

        gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%' } })
          .to(accent, { scaleY: 1, duration: 0.5, ease: 'power3.out' })
          .from(frame, { opacity: 0, scale: 0.94, duration: 1, ease: 'power3.out' }, '-=0.2')

        gsap.to(frame, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" data-theme="dark" ref={sectionRef} className="relative bg-black py-28 sm:py-40">
      <div className="mb-20 px-6 sm:px-10">
        <p className="font-display text-xs font-medium uppercase tracking-[0.5em] text-white/50">
          Selected work
        </p>
      </div>

      <div className="flex flex-col gap-28 sm:gap-40">
        {PROJECTS.map((project, i) => (
          <div key={project.title} data-work-item className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 sm:px-10">
            <div className="flex items-center gap-4">
              <span
                data-work-accent
                className="h-6 w-[3px] origin-top bg-gradient-to-b from-violet to-violet-electric"
              />
              <span className="font-display text-sm text-white/40">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <div
              data-work-frame
              data-cursor="hover"
              className="relative aspect-video w-full overflow-hidden rounded-2xl"
            >
              <GenerativeReel className="h-full w-full" />
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-display text-[clamp(1.8rem,4.6vw,3.4rem)] font-extrabold uppercase leading-none text-white">
                {project.title}
              </h3>
              <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-white/45">
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
