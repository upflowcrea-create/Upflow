import clsx from 'clsx'

interface GenerativeReelProps {
  className?: string
  label?: string
}

/**
 * Stand-in "footage" for a Motion & Video Studio site with no source media yet:
 * a slow, layered gradient field rather than a static image, so empty media
 * slots still read as intentional motion design once real reels are dropped in.
 */
export default function GenerativeReel({ className, label }: GenerativeReelProps) {
  return (
    <div className={clsx('relative overflow-hidden bg-noir-soft', className)}>
      <div className="reel-field" />
      <div className="reel-field-2" />
      <div className="absolute inset-0 bg-noir/25" />
      {label && (
        <div className="absolute bottom-4 left-4 font-display text-[0.65rem] uppercase tracking-[0.35em] text-ivory/50 sm:bottom-6 sm:left-6">
          {label}
        </div>
      )}
    </div>
  )
}
