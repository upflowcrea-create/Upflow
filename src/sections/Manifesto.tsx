import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const TEXT =
  "UPFLOW est un studio de motion et vidéo. Nous transformons des idées complexes en récits visuels clairs, pensés pour capter l'attention, expliquer l'essentiel et convertir dès la première seconde."

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll<HTMLElement>('[data-word]')
      if (!words) return

      gsap.to(words, {
        color: '#f5f2ee',
        stagger: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${words.length * 42}`,
          scrub: 0.4,
          pin: true,
          pinSpacing: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = TEXT.split(' ')

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-noir px-6 py-32 sm:px-10"
    >
      <p
        ref={wordsRef}
        className="max-w-5xl text-center font-display text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.25]"
      >
        {words.map((word, i) => (
          <span key={i} data-word className="mx-[0.18em] inline-block text-ivory/15">
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
