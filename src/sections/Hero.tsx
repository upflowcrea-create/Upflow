import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import RevealText from '../components/RevealText'
import MagneticButton from '../components/MagneticButton'
import Logo from '../components/Logo'

const MARQUEE_WORDS = ['VIDÉO', 'MOTION', '3D', 'ADS']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: 18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(markRef.current, {
        yPercent: -14,
        rotate: 8,
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
      data-theme="light"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-white px-6 pb-10 pt-32 text-black sm:px-10 sm:pt-40"
    >
      <div
        ref={markRef}
        className="pointer-events-none absolute -right-24 -top-16 hidden h-[34rem] w-[34rem] sm:-right-16 sm:top-0 sm:block"
      >
        <div className="mark-glow absolute inset-10 rounded-full bg-violet-electric/25 blur-[90px]" />
        <svg viewBox="0 0 200 200" className="mark-ring absolute inset-0 h-full w-full">
          <polygon
            points="192,100 146,182 54,182 8,100 54,18 146,18"
            fill="none"
            stroke="url(#hero-ring)"
            strokeWidth="1.4"
          />
          <defs>
            <linearGradient id="hero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1b063d" />
              <stop offset="100%" stopColor="#8a3ffc" />
            </linearGradient>
          </defs>
        </svg>
        <svg viewBox="0 0 200 200" className="mark-ring-reverse absolute inset-16 h-[68%] w-[68%] opacity-70">
          <polygon
            points="192,100 146,182 54,182 8,100 54,18 146,18"
            fill="none"
            stroke="#5b20d6"
            strokeWidth="1"
          />
        </svg>
        <Logo className="absolute inset-0 m-auto h-16 w-16 drop-shadow-[0_0_30px_rgba(138,63,252,0.45)]" />
      </div>

      <div ref={contentRef} className="flex flex-1 flex-col justify-center">
        <p className="mb-6 font-display text-xs font-medium uppercase tracking-[0.5em] text-black/50 sm:mb-8">
          Upflow — Studio motion &amp; vidéo
        </p>

        <RevealText
          as="h1"
          mode="line"
          lines={["Votre client n'a", 'pas 20 minutes.', 'Il a 3 secondes.', 'Bon courage.']}
          className="font-display text-[clamp(2.2rem,7.4vw,6.2rem)] font-extrabold leading-[0.98] text-black"
          start="top 95%"
          stagger={0.14}
        />

        <div className="mt-10 flex flex-wrap items-center gap-6 sm:mt-14">
          <MagneticButton
            className="bg-black px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Lancer un projet
          </MagneticButton>
          <p className="max-w-[24ch] font-body text-sm font-light leading-relaxed text-black/55">
            On transforme vos idées compliquées en vidéos qu&apos;on comprend du premier coup.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="no-scrollbar overflow-hidden border-y border-black/10 py-4">
          <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-10">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span
                key={i}
                className="font-display text-3xl font-extrabold uppercase tracking-tight text-black/10 sm:text-5xl"
                style={{ WebkitTextStroke: i % 4 === 0 ? '1.5px rgba(91,32,214,0.5)' : undefined }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-black/40">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.3em]">Défiler pour découvrir</span>
          <span className="relative h-16 w-px overflow-hidden bg-black/15">
            <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-violet" />
          </span>
        </div>
      </div>
    </section>
  )
}
