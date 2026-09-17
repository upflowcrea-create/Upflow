import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useSound } from '../lib/sound'
import { WHATSAPP_URL } from '../lib/whatsapp'

export default function WhatsAppButton() {
  const { play } = useSound()
  const [nearFooter, setNearFooter] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      onMouseEnter={() => play('hover')}
      onClick={() => play('click')}
      aria-label="Discuter sur WhatsApp"
      className={clsx(
        'group fixed bottom-5 right-5 z-40 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-violet to-violet-electric py-3.5 pl-3.5 pr-3.5 shadow-[0_12px_40px_-10px_rgba(138,63,252,0.6)] transition-[padding,opacity,transform] duration-500 ease-[var(--ease-flow)] hover:pr-6 sm:bottom-8 sm:right-8',
        nearFooter ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100',
      )}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-white">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Zm5.55 14.24c-.24.67-1.4 1.28-1.93 1.33-.5.05-1.02.24-3.43-.72-2.9-1.15-4.77-4.06-4.92-4.25-.14-.19-1.17-1.56-1.17-2.98 0-1.42.75-2.11 1.01-2.4.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.81 2 .88 2.14.07.15.12.32.02.51-.1.19-.15.32-.3.5-.14.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.38-.24.63-.15.26.1 1.65.78 1.94.92.28.15.47.22.54.34.07.13.07.72-.17 1.4Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-body text-sm font-medium uppercase tracking-[0.1em] text-white transition-[max-width] duration-500 ease-[var(--ease-flow)] group-hover:max-w-[220px]">
        Parlons de votre projet
      </span>
    </a>
  )
}
