import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import AuroraGlow from '../components/AuroraGlow'
import RevealText from '../components/RevealText'
import MagneticButton from '../components/MagneticButton'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: 22,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(glowRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-10 pt-32 sm:px-10 sm:pt-40"
    >
      <div ref={glowRef} className="absolute inset-0 -z-10">
        <AuroraGlow className="inset-0" variant="mixed" />
      </div>

      <div ref={contentRef} className="flex flex-1 flex-col justify-center">
        <p className="mb-6 font-display text-xs font-medium uppercase tracking-[0.5em] text-ivory/50 sm:mb-8">
          Upflow — Motion &amp; Video Studio
        </p>

        <RevealText
          as="h1"
          mode="line"
          lines={['Make it move.', 'Make it clear.', 'Make it convert.']}
          className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-semibold leading-[0.98] text-ivory"
          start="top 95%"
          stagger={0.14}
        />

        <div className="mt-10 flex flex-wrap items-center gap-6 sm:mt-14">
          <MagneticButton
            className="bg-ivory px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-noir"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a project
          </MagneticButton>
          <p className="max-w-[22ch] font-body text-sm font-light leading-relaxed text-ivory/55">
            Vidéo &amp; motion design pour apps, SaaS, marques et événements sportifs.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-ivory/40">
        <span className="font-body text-[0.7rem] uppercase tracking-[0.3em]">Scroll to explore</span>
        <span className="relative h-16 w-px overflow-hidden bg-ivory/15">
          <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-ivory" />
        </span>
      </div>
    </section>
  )
}
