import { useEffect, useRef } from "react";
import { gsap } from "../lib/smoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { RevealText } from "../components/RevealText";
import { SERVICES } from "../lib/config";

function ServiceCard({ service, index, onCta }: { service: (typeof SERVICES)[number]; index: number; onCta: () => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const fromSide = index % 2 === 1 ? 1 : -1;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(card, { autoAlpha: 1 });
        return;
      }

      const number = card.querySelector(".service-card__index");
      const titleLines = card.querySelectorAll(".service-card__title-line");
      const desc = card.querySelector(".service-card__desc");
      const usage = card.querySelectorAll(".service-card__usage li");
      const tags = card.querySelectorAll(".tag-pill");
      const cta = card.querySelector(".service-card__cta");

      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%" } });

      tl.fromTo(
        card,
        { autoAlpha: 0, x: fromSide * 70, rotate: fromSide * -3, scale: 0.94 },
        { autoAlpha: 1, x: 0, rotate: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      )
        .fromTo(
          number,
          { autoAlpha: 0, scale: 0.3, rotate: fromSide * -20 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.8)" },
          "-=0.65",
        )
        .fromTo(
          titleLines,
          { autoAlpha: 0, yPercent: 100, filter: "blur(10px)" },
          { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.55",
        )
        .fromTo(desc, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(
          usage,
          { autoAlpha: 0, scale: 0.7, y: 8 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(2)" },
          "-=0.35",
        )
        .fromTo(
          tags,
          { autoAlpha: 0, scale: 0.7, y: 8 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "back.out(2)" },
          "-=0.3",
        );

      tl.fromTo(
        cta,
        { autoAlpha: 0, scale: 0.85, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" },
        "-=0.2",
      );
    }, card);

    return () => ctx.revert();
  }, [reducedMotion, fromSide]);

  return (
    <div ref={cardRef} className={`service-card ${index % 2 === 1 ? "service-card--alt" : ""}`}>
      <div className="service-card__index">{service.n}</div>

      <div className="service-card__body">
        <h3 className="service-card__title">
          {service.title.map((line, i) => (
            <span key={i} className="service-card__title-line">
              {line}
            </span>
          ))}
        </h3>

        <p className="service-card__desc">{service.description}</p>

        <ul className="service-card__usage">
          {service.usage.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>

        <div className="service-card__tags">
          {service.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>

        <button className="btn btn-primary service-card__cta" onClick={onCta}>
          {service.cta}
        </button>
      </div>
    </div>
  );
}

function ServicesIntro() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(".service-intro-item", { autoAlpha: 1 });
        return;
      }

      const items = el.querySelectorAll(".service-intro-item");

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 50, scale: 0.85, rotate: -4 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );

      gsap.fromTo(
        el.querySelectorAll(".service-intro-item__n"),
        { autoAlpha: 0, x: -12 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={introRef} className="services__intro-grid">
      {SERVICES.map((s) => (
        <div className="service-intro-item" key={s.id}>
          <span className="service-intro-item__n">{s.n}</span>
          <p className="service-intro-item__label">{s.label}</p>
          <p className="service-intro-item__short">{s.short}</p>
        </div>
      ))}
    </div>
  );
}

export function Services({ onCta }: { onCta: () => void }) {
  return (
    <section id="services" className="section services">
      <div className="container">
        <RevealText as="h2" className="services__heading">
          OK. MAIS TU FAIS QUOI ?
        </RevealText>

        <ServicesIntro />

        <div className="services__cards">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onCta={onCta} />
          ))}
        </div>
      </div>
    </section>
  );
}
