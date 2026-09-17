import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function PurpleWipe() {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(barRef.current, { scaleX: 0 })
      gsap.to(barRef.current, {
        scaleX: 1,
        duration: 1.1,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="relative flex h-24 items-center justify-center overflow-hidden sm:h-32">
      <div className="absolute h-16 w-16 rounded-full bg-violet-electric/30 blur-3xl sm:h-24 sm:w-24" />
      <div
        ref={barRef}
        className="h-[2px] w-full origin-center bg-gradient-to-r from-transparent via-violet-electric to-transparent"
      />
    </div>
  )
}
