import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const PHRASES = ['Les gens ne lisent pas.', 'Ils scrollent.', 'Alors autant leur donner quelque chose à regarder.']

export default function WhyVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const phrases = phraseRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.set(phrases[0], { opacity: 1, scale: 1, filter: 'blur(0px)' })
      gsap.set(phrases.slice(1), { opacity: 0, scale: 1.08, filter: 'blur(10px)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          scrub: 0.5,
          pin: true,
        },
      })

      tl.to(phrases[0], { opacity: 0, scale: 0.92, filter: 'blur(10px)', duration: 1 })
        .to(phrases[1], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, '<')
        .to(phrases[1], { opacity: 0, scale: 0.92, filter: 'blur(10px)', duration: 1 }, '+=0.6')
        .to(phrases[2], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, '<')

      return () => {
        phrases.forEach((p) => gsap.set(p, { clearProps: 'all' }))
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section data-theme="dark" ref={sectionRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-black px-6 sm:px-10">
      {PHRASES.map((phrase, i) => (
        <div
          key={phrase}
          ref={(el) => {
            phraseRefs.current[i] = el
          }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center sm:px-10"
        >
          <p
            className={
              i === 2
                ? 'max-w-4xl font-display text-[clamp(1.8rem,5.2vw,3.6rem)] font-extrabold leading-tight text-white'
                : 'font-display text-[clamp(2.6rem,9vw,7rem)] font-extrabold leading-tight text-white'
            }
          >
            {phrase}
          </p>
        </div>
      ))}
    </section>
  )
}
