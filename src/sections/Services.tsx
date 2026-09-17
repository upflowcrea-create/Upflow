import { useScrollReveal } from "../hooks/useScrollReveal";
import { RevealText } from "../components/RevealText";
import { SERVICES } from "../lib/config";

function ServiceCard({ service, index, onCta }: { service: (typeof SERVICES)[number]; index: number; onCta: () => void }) {
  const ref = useScrollReveal<HTMLDivElement>({ selector: ".reveal-child", y: 30, blur: 8, stagger: 0.08 });

  return (
    <div ref={ref} className={`service-card ${index % 2 === 1 ? "service-card--alt" : ""}`}>
      <div className="service-card__index reveal-child">{service.n}</div>

      <div className="service-card__body">
        <h3 className="service-card__title reveal-child">
          {service.title.map((line, i) => (
            <span key={i} className="service-card__title-line">
              {line}
            </span>
          ))}
        </h3>

        <p className="service-card__desc reveal-child">{service.description}</p>

        <ul className="service-card__usage reveal-child">
          {service.usage.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>

        <div className="service-card__tags reveal-child">
          {service.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>

        {service.note && <p className="service-card__note reveal-child">{service.note}</p>}

        <button className="btn btn-primary service-card__cta reveal-child" onClick={onCta}>
          {service.cta}
        </button>
      </div>
    </div>
  );
}

export function Services({ onCta }: { onCta: () => void }) {
  const introRef = useScrollReveal<HTMLDivElement>({ selector: ".service-intro-item", y: 24, stagger: 0.12 });

  return (
    <section id="services" className="section services">
      <div className="container">
        <RevealText as="h2" className="services__heading">
          OK. MAIS TU FAIS QUOI ?
        </RevealText>

        <div ref={introRef} className="services__intro-grid">
          {SERVICES.map((s) => (
            <div className="service-intro-item" key={s.id}>
              <span className="service-intro-item__n">{s.n}</span>
              <p className="service-intro-item__label">{s.label}</p>
              <p className="service-intro-item__short">{s.short}</p>
            </div>
          ))}
        </div>

        <div className="services__cards">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onCta={onCta} />
          ))}
        </div>
      </div>
    </section>
  );
}
