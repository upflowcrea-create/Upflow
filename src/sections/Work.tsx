import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import GenerativeReel from '../components/GenerativeReel'

const PROJECTS = [
  {
    title: 'Nova — App Onboarding',
    tag: 'Product / App',
    align: 'left' as const,
    rotate: -2.5,
  },
  {
    title: 'Kaon — Brand Film',
    tag: 'Marque / Film',
    align: 'right' as const,
    rotate: 3,
  },
  {
    title: 'Circuit — Aftermovie',
    tag: 'Sport / Événement',
    align: 'left' as const,
    rotate: -1.5,
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('[data-work-frame]')
      frames.forEach((frame, i) => {
        const speed = i % 2 === 0 ? -60 : -100
        gsap.to(frame, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.from(frame, {
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative bg-noir py-28 sm:py-40">
      <div className="mb-20 px-6 sm:px-10">
        <p className="font-display text-xs font-medium uppercase tracking-[0.5em] text-ivory/50">
          Selected work
        </p>
      </div>

      <div className="flex flex-col gap-32 sm:gap-48">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className={`relative flex flex-col gap-6 px-6 sm:px-10 ${
              project.align === 'right' ? 'items-end text-right' : 'items-start text-left'
            }`}
          >
            <div
              data-work-frame
              data-cursor="hover"
              style={{ rotate: `${project.rotate}deg` }}
              className={`relative aspect-[4/3] w-[92%] max-w-3xl overflow-hidden rounded-2xl shadow-[0_40px_120px_-20px_rgba(134,59,255,0.35)] sm:w-[70%] ${
                project.align === 'right' ? '-mr-6 sm:-mr-16' : '-ml-6 sm:-ml-16'
              }`}
            >
              <GenerativeReel className="h-full w-full" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ivory/45">
                {project.tag}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,4.2vw,3.2rem)] font-semibold leading-none text-ivory">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
