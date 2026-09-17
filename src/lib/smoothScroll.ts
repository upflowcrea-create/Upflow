import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './gsap'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useSmoothScroll(enabled = true) {
  const ref = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })

    lenisInstance = lenis
    ref.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis')

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
      document.documentElement.classList.remove('lenis')
    }
  }, [enabled])

  return ref
}
