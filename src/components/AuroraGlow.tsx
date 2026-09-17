import clsx from 'clsx'

interface AuroraGlowProps {
  className?: string
  variant?: 'violet' | 'electric' | 'mixed'
}

export default function AuroraGlow({ className, variant = 'mixed' }: AuroraGlowProps) {
  return (
    <div className={clsx('pointer-events-none absolute -z-10 blur-[90px]', className)} aria-hidden>
      {(variant === 'violet' || variant === 'mixed') && (
        <div className="absolute left-0 top-0 h-[60vw] w-[60vw] max-w-[720px] max-h-[720px] rounded-full bg-violet/30" />
      )}
      {(variant === 'electric' || variant === 'mixed') && (
        <div className="absolute right-0 bottom-0 h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-electric/25" />
      )}
    </div>
  )
}
