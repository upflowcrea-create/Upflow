import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PRICING } from "../lib/config";

export function Pricing({ onCta }: { onCta: () => void }) {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: ".pricing-card", y: 30, blur: 8, stagger: 0.1 });

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <RevealText as="h2" className="pricing__heading">
          DES PRIX. PAS DE DEVIS À RALLONGE.
        </RevealText>

        <div ref={gridRef} className="pricing__grid">
          {PRICING.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`}>
              <p className="pricing-card__name">{plan.name}</p>
              <p className="pricing-card__subtitle">{plan.subtitle}</p>

              {plan.price ? (
                <p className="pricing-card__price">
                  {plan.prefix && <span className="pricing-card__prefix">{plan.prefix}</span>}
                  <span className="pricing-card__amount">{plan.price}</span>
                </p>
              ) : (
                <p className="pricing-card__price pricing-card__price--multi" />
              )}

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"} pricing-card__cta`}
                onClick={onCta}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing__footnote">
          Besoin d'un format différent ?{" "}
          <button className="pricing__footnote-link" onClick={onCta}>
            Parlons-en.
          </button>
        </p>
      </div>
    </section>
  );
}
