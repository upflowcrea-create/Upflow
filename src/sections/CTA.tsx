import AuroraGlow from '../components/AuroraGlow'
import MagneticButton from '../components/MagneticButton'
import RevealText from '../components/RevealText'

export default function CTA() {
  return (
    <section
      id="contact"
      data-theme="light"
      className="relative flex min-h-[90svh] flex-col items-center justify-center gap-10 overflow-hidden bg-white px-6 py-32 text-center text-black sm:px-10"
    >
      <AuroraGlow className="inset-0 opacity-60" variant="mixed" />

      <p className="font-display text-xs font-medium uppercase tracking-[0.5em] text-black/50">
        Un projet en tête ?
      </p>

      <RevealText
        as="h2"
        mode="word"
        lines={['On fait bouger', 'votre marque.']}
        className="max-w-4xl font-display text-[clamp(2.4rem,7.5vw,6rem)] font-extrabold leading-[1] text-black"
      />

      <MagneticButton
        as="a"
        href="mailto:hello@upflow.studio"
        strength={0.5}
        className="mt-4 bg-gradient-to-r from-violet to-violet-electric px-10 py-5 text-sm font-medium uppercase tracking-[0.25em] text-white shadow-[0_20px_60px_-15px_rgba(138,63,252,0.5)]"
      >
        hello@upflow.studio
      </MagneticButton>
    </section>
  )
}
