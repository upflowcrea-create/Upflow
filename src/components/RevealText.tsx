import { createElement, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import clsx from 'clsx'

interface RevealTextProps {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  mode?: 'line' | 'word'
  className?: string
  lineClassName?: string
  delay?: number
  start?: string
  stagger?: number
  once?: boolean
}

export default function RevealText({
  lines,
  as = 'div',
  mode = 'line',
  className,
  lineClassName,
  delay = 0,
  start = 'top 88%',
  stagger = 0.09,
  once = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const targets = container.querySelectorAll<HTMLElement>('[data-reveal-unit]')

      gsap.set(targets, { yPercent: 115, opacity: 0 })

      ScrollTrigger.create({
        trigger: container,
        start,
        once,
        onEnter: () => {
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger,
            delay,
          })
        },
      })
    }, container)

    return () => ctx.revert()
  }, [delay, start, stagger, once])

  return createElement(
    as,
    { ref: containerRef, className },
    lines.map((line, i) =>
      mode === 'line' ? (
        <span key={i} className={clsx('mask-line', lineClassName)}>
          <span data-reveal-unit className="inline-block will-change-transform">
            {line}
          </span>
        </span>
      ) : (
        <span key={i} className={clsx('block', lineClassName)}>
          {line.split(' ').map((word, j) => (
            <span key={j} className="mask-word mr-[0.28em] last:mr-0">
              <span data-reveal-unit className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </span>
      ),
    ),
  )
}
