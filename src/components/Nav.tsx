import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import MagneticButton from './MagneticButton'

const LINKS = [
  { label: 'Studio', href: '#manifesto' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      const y = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHidden(y > lastY && y > 160)
          lastY = y
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.to(navRef.current, {
      yPercent: hidden ? -140 : 0,
      duration: 0.6,
      ease: 'power3.inOut',
    })
  }, [hidden])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-10"
    >
      <a
        href="#top"
        data-cursor="hover"
        className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-ivory"
        onClick={(e) => {
          e.preventDefault()
          scrollTo('#top')
        }}
      >
        <img src="/favicon.svg" alt="Upflow" className="h-6 w-6" />
        Upflow
      </a>

      <div className="hidden items-center gap-10 md:flex">
        {LINKS.map((link) => (
          <button
            key={link.href}
            data-cursor="hover"
            onClick={() => scrollTo(link.href)}
            className="font-body text-sm font-medium uppercase tracking-[0.15em] text-ivory/80 transition-colors hover:text-ivory"
          >
            {link.label}
          </button>
        ))}
      </div>

      <MagneticButton
        className="border border-ivory/70 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-ivory"
        onClick={() => scrollTo('#contact')}
      >
        Let&apos;s talk
      </MagneticButton>
    </nav>
  )
}
