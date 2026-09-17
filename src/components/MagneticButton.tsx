import { motion, useMotionValue, useSpring } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import clsx from 'clsx'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className,
  strength = 0.4,
  as = 'button',
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = as === 'a' ? motion.a : motion.button

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block">
      <Tag
        {...(as === 'a' ? { href } : { onClick, type: 'button' as const })}
        data-cursor="hover"
        style={{ x: springX, y: springY }}
        className={clsx(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-colors',
          className,
        )}
      >
        {children}
      </Tag>
    </div>
  )
}
