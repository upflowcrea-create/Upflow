import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onEnterHover = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot, { scale: 0, duration: 0.25 })
    }
    const onLeaveHover = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.25 })
    }

    const onEnterPage = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }
    const onLeavePage = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnterPage)
    document.addEventListener('mouseleave', onLeavePage)

    const hoverables = () => Array.from(document.querySelectorAll('[data-cursor="hover"]'))
    const attach = () => {
      hoverables().forEach((el) => {
        el.addEventListener('mouseenter', onEnterHover)
        el.addEventListener('mouseleave', onLeaveHover)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnterPage)
      document.removeEventListener('mouseleave', onLeavePage)
      hoverables().forEach((el) => {
        el.removeEventListener('mouseenter', onEnterHover)
        el.removeEventListener('mouseleave', onLeaveHover)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/60 opacity-0 mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory opacity-0"
      />
    </>
  )
}
