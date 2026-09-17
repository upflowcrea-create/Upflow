import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export interface MediaSource {
  type: 'video' | 'image'
  src: string
  poster?: string
}

export interface ProjectMedia {
  desktop: MediaSource
  /** Falls back to `desktop` when a project has no dedicated vertical cut. */
  mobile?: MediaSource
}

interface ResponsiveMediaProps {
  media: ProjectMedia
  className?: string
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}

/** Picks a dedicated mobile crop when the project provides one, plays video
 * only while it's on screen, and pauses it the moment it scrolls away. */
export default function ResponsiveMedia({ media, className }: ResponsiveMediaProps) {
  const isMobile = useIsMobile()
  const source = (isMobile && media.mobile) || media.desktop
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (source.type !== 'video') return
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [source])

  return (
    <div ref={containerRef} className={clsx('relative overflow-hidden', className)}>
      {source.type === 'video' ? (
        <video
          ref={videoRef}
          key={source.src}
          className="h-full w-full object-cover"
          src={source.src}
          poster={source.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          key={source.src}
          className="h-full w-full object-cover"
          src={source.src}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}
