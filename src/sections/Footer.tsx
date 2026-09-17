const YEAR = new Date().getFullYear()

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-6 py-10 sm:px-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Upflow" className="h-5 w-5 opacity-80" />
          <span className="font-display text-sm uppercase tracking-[0.25em] text-ivory/60">
            Upflow Studio
          </span>
        </div>

        <div className="flex items-center gap-8">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              data-cursor="hover"
              className="font-body text-xs font-medium uppercase tracking-[0.2em] text-ivory/45 transition-colors hover:text-ivory"
            >
              {social.label}
            </a>
          ))}
        </div>

        <p className="font-body text-xs font-light text-ivory/35">© {YEAR} Upflow. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
