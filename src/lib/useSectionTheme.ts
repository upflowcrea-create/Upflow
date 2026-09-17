import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/** Reads which section currently sits behind the fixed nav/cursor from each
 * section's `data-theme`, instead of relying on mix-blend-mode (which proved
 * unreliable across viewports and against animated backgrounds). */
export function useSectionTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))
    let ticking = false

    const check = () => {
      const y = 12
      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= y && rect.bottom > y) {
          const next = el.dataset.theme as Theme
          setTheme((prev) => (prev === next ? prev : next))
          break
        }
      }
      ticking = false
    }

    check()
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(check)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return theme
}
