import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(frameRef.current, {
        clipPath: 'inset(16% 16% 16% 16% round 2.5rem)',
      })
      gsap.set(reelRef.current, { scale: 1.25 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 0.6,
          pin: true,
        },
      })

      tl.to(frameRef.current, {
        clipPath: 'inset(0% 0% 0% 0% round 0rem)',
        ease: 'none',
      })
        .to(reelRef.current, { scale: 1, ease: 'none' }, '<')
        .to(labelRef.current, { opacity: 0, yPercent: -30, ease: 'none' }, '<')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-noir">
      <div ref={frameRef} className="absolute inset-0">
        <div ref={reelRef} className="absolute inset-0 h-full w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/videos/showreel.mp4"
            poster="/videos/showreel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="absolute inset-0 bg-noir/15" />

        <button
          type="button"
          onClick={toggleSound}
          data-cursor="hover"
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-ivory/30 bg-noir/40 px-4 py-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-ivory backdrop-blur-sm transition-colors hover:border-ivory/70 sm:bottom-10 sm:right-10"
        >
          {muted ? 'Activer le son' : 'Couper le son'}
        </button>
      </div>

      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <p className="font-display text-xs font-medium uppercase tracking-[0.5em] text-ivory/60">
          Notre présentation
        </p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.02] text-ivory">
          Une histoire se raconte en mouvement.
        </h2>
      </div>
    </section>
  )
}
