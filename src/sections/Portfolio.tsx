import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTilt } from "../hooks/useTilt";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
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
  const bodyRef = useRef<HTMLDivElement | null>(null);

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
    contentRef.current?.scrollTo({ top: 0 });
    setActiveIndex((i) => (i === null ? null : (i + 1) % PORTFOLIO_ITEMS.length));
  };
  const prev = () => {
    setOriginRect(null);
    contentRef.current?.scrollTo({ top: 0 });
    setActiveIndex((i) => (i === null ? null : (i - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length));
  };

  useScrollLock(activeIndex !== null);

  // Shared-element "grow from the card" transition: the clicked thumbnail's
  // video visually expands into the fullscreen lightbox video. The rest of
  // the content (title, description, extra videos, photos) sits below that
  // fullscreen video and only reveals as the visitor scrolls down to it.
  useLayoutEffect(() => {
    if (activeIndex === null || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      // Hide the body content immediately (before first paint) so it never
      // flashes visible while the video is still small/growing.
      const items = bodyRef.current?.querySelectorAll(":scope > *");
      if (items?.length) gsap.set(items, { autoAlpha: 0, y: 40 });

      // Wire up the reveal-on-scroll only once layout has settled at the
      // video's final size — setting it up while the grow animation still
      // has the video small would measure the body content as already
      // being in view (it sits right below a tiny video) and reveal it
      // immediately instead of waiting for a real scroll.
      const setupBodyReveal = () => {
        if (!items?.length) return;
        items.forEach((el) => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              scroller: contentRef.current,
              start: "top bottom",
            },
          });
        });
        ScrollTrigger.refresh();
      };

      if (originRect && mediaRef.current) {
        const target = mediaRef.current;
        const targetRect = target.getBoundingClientRect();

        // Animate real width/height/position (not transform scale) so the
        // video's own aspect ratio never gets stretched mid-transition —
        // it just grows cleanly from the card's rect to fill the screen.
        // All values are measured in px (not mixed with vw/vh units) so
        // GSAP can interpolate them smoothly.
        gsap.set(target, {
          position: "fixed",
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 16,
          zIndex: 5,
        });
        gsap.to(target, {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: 0,
          duration: 0.75,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(target, { clearProps: "position,top,left,width,height,zIndex" });
            setupBodyReveal();
          },
        });
      } else {
        setupBodyReveal();
      }
    }, contentRef);

    return () => ctx.revert();
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
              <div className="lightbox__scroll-hint" aria-hidden="true">
                <span>Scroll</span>
                <ChevronDown size={18} />
              </div>
            </div>

            <div ref={bodyRef} className="lightbox__body">
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
