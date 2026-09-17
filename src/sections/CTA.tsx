import AuroraGlow from '../components/AuroraGlow'
import MagneticButton from '../components/MagneticButton'
import RevealText from '../components/RevealText'
import { WHATSAPP_URL } from '../lib/whatsapp'

export default function CTA() {
  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative flex min-h-[90svh] flex-col items-center justify-center gap-8 overflow-hidden bg-black px-6 py-32 text-center sm:px-10"
    >
      <AuroraGlow className="inset-0" variant="mixed" />

      <p className="font-display text-xs font-medium uppercase tracking-[0.5em] text-white/50">
        Si vous êtes arrivé jusque-là, c&apos;est que ça marche.
      </p>

      <RevealText
        as="h2"
        mode="word"
        lines={['On fait une vidéo', 'ou on continue à', 'écrire des paragraphes ?']}
        className="max-w-4xl font-display text-[clamp(2rem,6.4vw,4.8rem)] font-extrabold leading-[1.05] text-white"
      />

      <p className="font-display text-lg font-medium text-white/60">À vous de voir.</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          as="a"
          href="mailto:hello@upflow.studio"
          strength={0.5}
          className="bg-gradient-to-r from-violet to-violet-electric px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_-15px_rgba(138,63,252,0.5)]"
        >
          Lancer un projet
        </MagneticButton>
        <MagneticButton
          as="a"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          strength={0.5}
          className="border border-white/25 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white"
        >
          WhatsApp
        </MagneticButton>
      </div>
    </section>
  )
}
