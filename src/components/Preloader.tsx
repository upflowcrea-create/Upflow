import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import Logo from './Logo'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      },
    })

    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 0.7, scale: 1, duration: 0.7, ease: 'power2.out' },
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7, rotate: -18 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)' },
        '<0.05',
      )
      .to(logoRef.current, { rotate: 10, duration: 0.35, ease: 'power2.inOut' }, '+=0.05')
      .to(logoRef.current, { rotate: 0, scale: 1.08, duration: 0.35, ease: 'power2.inOut' })
      .to([logoRef.current, glowRef.current], { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' }, '+=0.05')
      .to(
        panelRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' },
        '-=0.1',
      )
      .set(rootRef.current, { display: 'none' })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div
        ref={panelRef}
        className="absolute inset-0 flex items-center justify-center bg-black"
        style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        <div ref={glowRef} className="absolute h-64 w-64 rounded-full bg-violet-electric/40 blur-[80px]" />
        <Logo ref={logoRef} className="relative h-16 w-16 sm:h-20 sm:w-20" />
      </div>
    </div>
  )
}
