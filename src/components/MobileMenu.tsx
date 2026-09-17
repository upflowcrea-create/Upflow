import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { useSound } from '../lib/sound'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { label: string; href: string }[]
  onNavigate: (href: string) => void
}

export default function MobileMenu({ open, onClose, links, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { enabled, toggle, play } = useSound()

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const lenis = getLenis()
    const items = panel.querySelectorAll('[data-menu-item]')

    if (open) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
      gsap.set(panel, { display: 'flex' })
      const tl = gsap.timeline()
      tl.fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.inOut' })
      tl.fromTo(
        items,
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out' },
        '-=0.3',
      )
    } else {
      gsap.to(panel, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(panel, { display: 'none' })
          document.body.style.overflow = ''
          lenis?.start()
        },
      })
    }
  }, [open])

  return (
    <div
      ref={panelRef}
      style={{ display: 'none', clipPath: 'inset(0% 0% 100% 0%)' }}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-black px-6 pb-10 pt-24 md:hidden"
    >
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <div key={link.href} className="mask-line">
            <button
              data-menu-item
              onClick={() => {
                play('click')
                onNavigate(link.href)
              }}
              className="block py-3 text-left font-display text-4xl font-extrabold uppercase text-white"
            >
              {link.label}
            </button>
          </div>
        ))}
      </nav>

      <div data-menu-item className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => {
            play('click')
            onNavigate('#contact')
          }}
          className="w-full rounded-full bg-gradient-to-r from-violet to-violet-electric py-4 text-center font-body text-sm font-medium uppercase tracking-[0.2em] text-white"
        >
          Lancer un projet
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={toggle}
            className="font-body text-xs font-medium uppercase tracking-[0.2em] text-white/60"
          >
            Son&nbsp;: {enabled ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="font-body text-xs font-medium uppercase tracking-[0.2em] text-white/60"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
