import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTilt } from "../hooks/useTilt";
import { PORTFOLIO_ITEMS } from "../lib/config";

function PortfolioCard({ item, onOpen }: { item: (typeof PORTFOLIO_ITEMS)[number]; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tiltRef = useTilt<HTMLButtonElement>(9);

  return (
    <button
      ref={tiltRef}
      className={`portfolio-card ${item.featured ? "portfolio-card--featured" : ""}`}
      onClick={onOpen}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <div className="portfolio-card__media">
        {item.video ? (
          <video ref={videoRef} poster={item.poster} muted loop playsInline preload="metadata">
            {item.videoWebm && <source src={item.videoWebm} type="video/webm" />}
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <div className="portfolio-card__placeholder" />
        )}
      </div>

      {item.badge && <span className="portfolio-card__badge">{item.badge}</span>}

      <div className="portfolio-card__overlay">
        <span className="portfolio-card__category">{item.category}</span>
        <span className="portfolio-card__title">
          {item.title}
          <ArrowUpRight size={20} />
        </span>
      </div>
    </button>
  );
}

export function Portfolio() {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: ".portfolio-card", y: 40, blur: 6, stagger: 0.06 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % PORTFOLIO_ITEMS.length));
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length));

  useScrollLock(activeIndex !== null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  const active = activeIndex !== null ? PORTFOLIO_ITEMS[activeIndex] : null;

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <RevealText as="h2" className="portfolio__heading">
          DES TRUCS QUE J'AI FAITS.
        </RevealText>

        <div ref={gridRef} className="portfolio__grid">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.id} item={item} onOpen={() => setActiveIndex(i)} />
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" onClick={close}>
          <button className="lightbox__close" onClick={close} aria-label="Fermer">
            <X size={22} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Projet précédent"
          >
            <ChevronLeft size={26} />
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox__media">
              {active.video ? (
                <video poster={active.poster} controls autoPlay playsInline>
                  {active.videoWebm && <source src={active.videoWebm} type="video/webm" />}
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                <div className="lightbox__placeholder" />
              )}
            </div>

            {active.badge && <p className="lightbox__badge">{active.badge}</p>}
            <p className="lightbox__category eyebrow">{active.category}</p>
            <h3 className="lightbox__title">{active.title}</h3>
            {active.description && <p className="lightbox__description">{active.description}</p>}

            {active.photos && (
              <div className="lightbox__photos">
                {active.photos.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </div>
            )}
          </div>

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Projet suivant"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}
