import { forwardRef } from 'react'

interface LogoProps {
  className?: string
}

// Placeholder redraw of the UPFLOW mark (hexagon + swoosh/spark) pending the brand's source file.
const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo({ className }, ref) {
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={className} aria-label="Upflow" role="img">
      <defs>
        <linearGradient id="upflow-hex" x1="10%" y1="5%" x2="95%" y2="95%">
          <stop offset="0%" stopColor="#1b063d" />
          <stop offset="55%" stopColor="#5b20d6" />
          <stop offset="100%" stopColor="#8a3ffc" />
        </linearGradient>
      </defs>
      <polygon points="96,50 73,91 27,91 4,50 27,9 73,9" fill="url(#upflow-hex)" />
      <g transform="translate(50 52) rotate(-6)">
        <rect x="-24" y="-26" width="48" height="48" rx="12" fill="#fff" />
        <g stroke="#1b063d" strokeWidth="5.5" strokeLinecap="round">
          <line x1="-14" y1="10" x2="4" y2="-8" />
          <line x1="-6" y1="16" x2="12" y2="-2" />
        </g>
        <path
          d="M16 -16 L18.6 -10.6 L24 -8 L18.6 -5.4 L16 0 L13.4 -5.4 L8 -8 L13.4 -10.6 Z"
          fill="#1b063d"
        />
      </g>
    </svg>
  )
})

export default Logo
