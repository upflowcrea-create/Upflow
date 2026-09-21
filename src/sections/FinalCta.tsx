import { RevealText } from "../components/RevealText";
import { useMagnetic } from "../hooks/useMagnetic";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WHATSAPP_URL } from "../lib/config";

export function FinalCta({ onBookCall }: { onBookCall: () => void }) {
  const bookBtn = useMagnetic<HTMLButtonElement>(0.3);
  const waBtn = useMagnetic<HTMLAnchorElement>(0.3);
  const subRef = useScrollReveal<HTMLParagraphElement>({ y: 16, blur: 6 });

  return (
    <section className="section final-cta">
      <div className="final-cta__bg" aria-hidden="true">
        <div className="final-cta__blob" />
      </div>

      <div className="container final-cta__inner">
        <RevealText as="h2" className="final-cta__title">
          ALORS. ON FAIT BOUGER VOTRE PROJET ?
        </RevealText>

        <p ref={subRef} className="final-cta__sub">
          Pas besoin d'un brief de 48 pages.
          <br />
          Expliquez-moi simplement ce que vous voulez faire.
        </p>

        <div className="final-cta__buttons">
          <button ref={bookBtn} className="btn btn-primary" onClick={onBookCall}>
            Book a call →
          </button>
          <a
            ref={waBtn}
            className="btn btn-ghost"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
