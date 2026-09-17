import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const TEXT =
  "Votre entreprise est géniale. Dommage qu'on ne comprenne rien. Alors on fait des vidéos. Pas des romans. Parce que personne ne lit les pavés — et que votre offre mérite mieux qu'un mur de texte."

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll<HTMLElement>('[data-word]')
      if (!words) return

      gsap.to(words, {
        color: '#ffffff',
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
      data-theme="dark"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-black px-6 py-32 sm:px-10"
    >
      <p
        ref={wordsRef}
        className="max-w-5xl text-center font-display text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.25]"
      >
        {words.map((word, i) => (
          <span key={i} data-word className="mx-[0.18em] inline-block text-white/15">
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
