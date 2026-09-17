import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import RevealText from '../components/RevealText'

const STEPS = ['Call', 'Storyboard', 'Production', 'Livraison']

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleY: 0 })
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })

      const steps = gsap.utils.toArray<HTMLElement>('[data-process-step]')
      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          x: -24,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.04,
          scrollTrigger: { trigger: step, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section data-theme="light" ref={sectionRef} className="relative bg-white px-6 py-28 text-black sm:px-10 sm:py-40">
      <RevealText
        as="h2"
        lines={['Pas de magie.', 'Juste un bon process.']}
        className="mb-20 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.05] text-black sm:mb-28"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col gap-14 pl-10 sm:gap-20 sm:pl-14">
        <div className="absolute bottom-2 left-[3px] top-2 w-[2px] bg-black/10 sm:left-[5px]">
          <div ref={lineRef} className="h-full w-full origin-top bg-gradient-to-b from-violet to-violet-electric" />
        </div>

        {STEPS.map((step, i) => (
          <div key={step} data-process-step className="relative flex items-baseline gap-6 sm:gap-10">
            <span className="absolute -left-10 top-1 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-violet-electric sm:-left-14" />
            <span className="font-display text-sm text-black/30">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-[clamp(1.6rem,4.2vw,2.8rem)] font-extrabold uppercase text-black">
              {step}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
