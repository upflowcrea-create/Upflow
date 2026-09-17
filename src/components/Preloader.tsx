import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      },
    })

    tl.to(counterRef.current, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counterRef.current.value)),
    })
      .to('[data-preloader-label]', { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }, '-=0.15')
      .to(
        panelRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.05,
          ease: 'expo.inOut',
        },
        '-=0.1',
      )
      .set(rootRef.current, { display: 'none' })

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-noir"
        style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        <div data-preloader-label className="flex flex-col items-center gap-5">
          <img src="/favicon.svg" alt="" className="h-10 w-10 opacity-90" />
          <div className="font-display text-sm font-medium uppercase tracking-[0.4em] text-ivory/60">
            Upflow Studio
          </div>
        </div>
        <div
          data-preloader-label
          className="font-display text-[clamp(3rem,10vw,7rem)] font-semibold tabular-nums leading-none text-ivory"
        >
          {count}
        </div>
      </div>
    </div>
  )
}
