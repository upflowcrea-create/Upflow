import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTilt } from "../hooks/useTilt";
import { gsap } from "../lib/smoothScroll";
import { PORTFOLIO_ITEMS } from "../lib/config";

function PortfolioCard({
  item,
  onOpen,
}: {
  item: (typeof PORTFOLIO_ITEMS)[number];
  onOpen: (rect: DOMRect) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useTilt<HTMLButtonElement>(9);

  return (
    <button
      ref={tiltRef}
      className={`portfolio-card ${item.featured ? "portfolio-card--featured" : ""}`}
      onClick={() => onOpen(mediaRef.current!.getBoundingClientRect())}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <div ref={mediaRef} className="portfolio-card__media">
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
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const open = (i: number, rect: DOMRect) => {
    setOriginRect(rect);
    setActiveIndex(i);
  };
  const close = () => {
    setActiveIndex(null);
    setOriginRect(null);
  };
  const next = () => {
    setOriginRect(null);
    setActiveIndex((i) => (i === null ? null : (i + 1) % PORTFOLIO_ITEMS.length));
  };
  const prev = () => {
    setOriginRect(null);
    setActiveIndex((i) => (i === null ? null : (i - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length));
  };

  useScrollLock(activeIndex !== null);

  // Shared-element "grow from the card" transition: the clicked thumbnail
  // visually expands into the lightbox's video instead of a generic popup.
  useLayoutEffect(() => {
    if (activeIndex === null || !originRect || !mediaRef.current) return;

    const target = mediaRef.current;
    const targetRect = target.getBoundingClientRect();
    const dx = originRect.left - targetRect.left;
    const dy = originRect.top - targetRect.top;
    const scaleX = originRect.width / targetRect.width;
    const scaleY = originRect.height / targetRect.height;

    gsap.set(target, { transformOrigin: "top left" });
    gsap.fromTo(
      target,
      { x: dx, y: dy, scaleX, scaleY },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.7, ease: "power3.inOut" },
    );

    const rest = contentRef.current?.querySelectorAll(
      ".lightbox__badge, .lightbox__category, .lightbox__title, .lightbox__description, .lightbox__extra-videos, .lightbox__photos",
    );
    if (rest?.length) {
      gsap.fromTo(
        rest,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.28, stagger: 0.05, ease: "power2.out" },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

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
            <PortfolioCard key={item.id} item={item} onOpen={(rect) => open(i, rect)} />
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

          <div
            ref={contentRef}
            className="lightbox__content"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={mediaRef} className="lightbox__media">
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

            {active.extraVideos && (
              <div className="lightbox__extra-videos">
                {active.extraVideos.map((clip, i) => (
                  <div className="lightbox__extra-video" key={i}>
                    <video poster={clip.poster} controls playsInline preload="metadata">
                      {clip.videoWebm && <source src={clip.videoWebm} type="video/webm" />}
                      <source src={clip.video} type="video/mp4" />
                    </video>
                    {clip.label && <p className="lightbox__extra-video-label">{clip.label}</p>}
                  </div>
                ))}
              </div>
            )}

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
