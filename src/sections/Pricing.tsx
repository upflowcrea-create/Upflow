import { ArrowUpRight, Clock } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useCardsReveal } from "../hooks/useCardsReveal";
import { FIRST_ORDER_PROMO, PARTNER, PRICING } from "../lib/config";

const discountOf = (plan: (typeof PRICING)[number]) =>
  plan.regularPrice ? Math.round((1 - parseInt(plan.price) / parseInt(plan.regularPrice)) * 100) : 0;
const maxDiscount = Math.max(...PRICING.map(discountOf));

export function Pricing({ onCta }: { onCta: () => void }) {
  const gridRef = useCardsReveal<HTMLDivElement>(".pricing-card", 5);

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <RevealText as="h2" className="pricing__heading" accent={2}>
          DES PRIX. PAS DE DEVIS À RALLONGE.
        </RevealText>
        <p className="pricing__promise">
          <Clock size={18} />
          <span>
            Votre vidéo livrée en <strong>7 jours max</strong>.
          </span>
        </p>

        {maxDiscount > 0 && (
          <div className="promo">
            <span className="promo__tag">{FIRST_ORDER_PROMO.tag}</span>
            <p className="promo__title">
              {FIRST_ORDER_PROMO.title} <span>Jusqu'à −{maxDiscount} % sur votre vidéo.</span>
            </p>
            <p className="promo__note">{FIRST_ORDER_PROMO.note}</p>
          </div>
        )}

        <div ref={gridRef} className="pricing__grid">
          {PRICING.map((plan) => (
            <div
              key={plan.id}
              id={plan.id}
              className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`}
            >
              {plan.delivery && (
                <p className="pricing-card__delivery">
                  <Clock size={14} /> {plan.delivery}
                </p>
              )}
              <p className="pricing-card__name">{plan.name}</p>
              <p className="pricing-card__subtitle">{plan.subtitle}</p>

              {plan.price ? (
                <p className="pricing-card__price">
                  {plan.prefix && <span className="pricing-card__prefix">{plan.prefix}</span>}
                  <span className="pricing-card__amounts">
                    {plan.regularPrice && (
                      <s className="pricing-card__regular">
                        <span className="sr-only">Au lieu de </span>
                        {plan.regularPrice}
                      </s>
                    )}
                    <span className="pricing-card__amount">{plan.price}</span>
                    {plan.regularPrice && <span className="pricing-card__discount">−{discountOf(plan)} %</span>}
                  </span>
                </p>
              ) : (
                <p className="pricing-card__price pricing-card__price--multi" />
              )}

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              {plan.href ? (
                <a
                  className="btn btn-ghost pricing-card__cta"
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta} <ArrowUpRight size={16} />
                </a>
              ) : (
                <button
                  className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"} pricing-card__cta`}
                  onClick={onCta}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>


        <p className="pricing__footnote">
          Besoin d'un format différent ?{" "}
          <button className="pricing__footnote-link" onClick={onCta}>
            Parlons-en.
          </button>
        </p>
        <p className="pricing__footnote">
          Besoin d'un site web aussi ? Notre partenaire{" "}
          <a className="pricing__footnote-link" href={PARTNER.url} target="_blank" rel="noopener">
            {PARTNER.name} ↗
          </a>
        </p>
      </div>
    </section>
  );
}
