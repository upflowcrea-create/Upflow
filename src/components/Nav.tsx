import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { gsap } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { useSound } from '../lib/sound'
import { useSectionTheme } from '../lib/useSectionTheme'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import MobileMenu from './MobileMenu'

const LINKS = [
  { label: 'Projets', href: '#work' },
  { label: 'Offres', href: '#offers' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { enabled, toggle, play } = useSound()
  const theme = useSectionTheme()
  const isDark = theme === 'dark' && !menuOpen

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
    // Animate `top`, not a transform: a transform on this element (even at rest)
    // would create a stacking context and complicate compositing beneath it.
    gsap.to(navRef.current, {
      top: hidden ? -120 : 0,
      duration: 0.6,
      ease: 'power3.inOut',
    })
  }, [hidden])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    play('click')
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const textColor = isDark ? 'text-white' : 'text-black'
  const borderColor = isDark ? 'border-white' : 'border-black'

  return (
    <>
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 flex flex-nowrap items-center justify-between gap-3 px-4 py-4 transition-colors duration-500 sm:px-10 sm:py-5"
      >
        <a
          href="#top"
          data-cursor="hover"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          onMouseEnter={() => play('hover')}
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#top')
          }}
        >
          <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
          <span
            className={clsx(
              'hidden font-display text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-500 sm:inline',
              textColor,
            )}
          >
            Upflow
          </span>
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.href}
              data-cursor="hover"
              onMouseEnter={() => play('hover')}
              onClick={() => scrollTo(link.href)}
              className={clsx(
                'font-body text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5',
                textColor,
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            data-cursor="hover"
            onClick={toggle}
            className={clsx(
              'hidden whitespace-nowrap font-body text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 lg:inline-block',
              textColor,
            )}
          >
            Son&nbsp;: {enabled ? 'ON' : 'OFF'}
          </button>

          <div className="hidden lg:block">
            <MagneticButton
              className={clsx(
                'whitespace-nowrap border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-500',
                textColor,
                borderColor,
              )}
              onClick={() => scrollTo('#contact')}
            >
              Lancer un projet
            </MagneticButton>
          </div>

          <button
            type="button"
            data-cursor="hover"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={clsx(
                'h-px w-5 transition-all duration-300',
                menuOpen ? 'translate-y-[3px] rotate-45 bg-white' : `${isDark ? 'bg-white' : 'bg-black'}`,
              )}
            />
            <span
              className={clsx(
                'h-px w-5 transition-all duration-300',
                menuOpen ? '-translate-y-[3px] -rotate-45 bg-white' : `${isDark ? 'bg-white' : 'bg-black'}`,
              )}
            />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} onNavigate={scrollTo} />
    </>
  )
}
