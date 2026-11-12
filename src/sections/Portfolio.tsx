import type { CSSProperties } from "react";
import { useLayoutEffect, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Home, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTilt } from "../hooks/useTilt";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { gsap, getLenis } from "../lib/smoothScroll";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from "../lib/config";

type Item = (typeof PORTFOLIO_ITEMS)[number];

// Best projects first (rank), then newest.
const byRank = (a: Item, b: Item) => (a.rank ?? 99) - (b.rank ?? 99) || (b.date ?? "").localeCompare(a.date ?? "");
const ALL: Item[] = [...PORTFOLIO_ITEMS].sort(byRank);

// How many projects a tab shows before "Voir plus": the best 4 overall, the
// best 2 (one bento row) of a category.
const SHOWN = { all: 4, category: 2 };

type Slot = { item: Item; index: number; size: "big" | "small" };

// Bento layout: two projects per row, one big (2/3) and one small (1/3),
// alternating sides row after row. A vertical video always takes the small,
// tall slot, where it's shown whole over its blurred poster.
function buildRows(items: Item[]): Slot[][] {
  const rows: Slot[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 2).map((item, k) => ({ item, index: i + k }));
    if (pair.length === 1) {
      rows.push([{ ...pair[0], size: "big" }]);
      continue;
    }
    const smallFirst = (i / 2) % 2 === 1;
    let [a, b] = pair;
    if (smallFirst ? b.item.vertical && !a.item.vertical : a.item.vertical && !b.item.vertical) [a, b] = [b, a];
    rows.push(
      smallFirst
        ? [{ ...a, size: "small" }, { ...b, size: "big" }]
        : [{ ...a, size: "big" }, { ...b, size: "small" }],
    );
  }
  return rows;
}

// "de Maxance Pics" but "d'AuPropre" / "d'Aura Vitres": French elision before a vowel.
const clientOf = (title: string) => {
  const name = title.split(" — ")[0];
  return /^[aeiouyàâäéèêëîïôöùûüh]/i.test(name) ? `d'${name}` : `de ${name}`;
};

function PortfolioCard({
  item,
  size,
  onOpen,
}: {
  item: Item;
  size: "big" | "small";
  onOpen: (rect: DOMRect) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useTilt<HTMLButtonElement>(9);
  const isTouch = useMediaQuery("(pointer: coarse)");

  // Touch devices have no hover, so the preview never autoplayed — instead,
  // play it while the card is mostly in view (like a feed preview) and pause
  // once it scrolls away, so battery/bandwidth aren't spent off-screen.
  useEffect(() => {
    if (!isTouch) return;
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!media || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(media);
    return () => observer.disconnect();
  }, [isTouch]);

  // Markup always says preload="none" so the prerendered HTML is the same on
  // every device; desktops then switch to fetching metadata for hover previews.
  useEffect(() => {
    if (!isTouch && videoRef.current) videoRef.current.preload = "metadata";
  }, [isTouch]);

  const [client, kind] = item.title.split(" — ");
  const mmss = item.duration ? `00:${String(item.duration).padStart(2, "0")}` : null;

  return (
    <button
      ref={tiltRef}
      className={`portfolio-card portfolio-card--${size}${item.vertical ? " portfolio-card--vertical" : ""}`}
      style={item.vertical && item.poster ? ({ "--poster": `url(${item.poster})` } as CSSProperties) : undefined}
      onClick={() => onOpen(mediaRef.current!.getBoundingClientRect())}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <div ref={mediaRef} className="portfolio-card__media">
        {item.video ? (
          <video ref={videoRef} poster={item.poster} muted loop playsInline preload="none">
            <source src={item.previewVideo ?? item.video} type="video/mp4" />
          </video>
        ) : (
          <div className="portfolio-card__placeholder" />
        )}
      </div>

      <span className="portfolio-card__chip">
        <Play size={11} fill="currentColor" strokeWidth={0} />
        {mmss}
        {item.vertical && <span className="portfolio-card__chip-sep">9:16</span>}
      </span>
      {item.badge && <span className="portfolio-card__badge">{item.badge}</span>}

      <div className="portfolio-card__info">
        <span className="portfolio-card__kind">{kind}</span>
        <span className="portfolio-card__client">{client}</span>
        {item.stat && (
          <span className="portfolio-card__stat">
            <strong>{item.stat.value}</strong> {item.stat.label}
          </span>
        )}
        {item.tagline && <span className="portfolio-card__tagline">{item.tagline}</span>}
      </div>
      <span className="portfolio-card__play" aria-hidden="true">
        <Play size={16} fill="currentColor" strokeWidth={0} />
      </span>
      <span className="portfolio-card__go" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </button>
  );
}

export function Portfolio() {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: ".portfolio-card", y: 40, blur: 6, stagger: 0.06 });
  const [tab, setTab] = useState<"all" | (typeof PORTFOLIO_CATEGORIES)[number]["id"]>("all");
  const [expanded, setExpanded] = useState(false);
  // The current tab's projects (best first); the lightbox browses all of them.
  const ITEMS = useMemo(() => (tab === "all" ? ALL : ALL.filter((item) => item.group === tab)), [tab]);
  const limit = tab === "all" ? SHOWN.all : SHOWN.category;
  const rows = useMemo(() => buildRows(expanded ? ITEMS : ITEMS.slice(0, limit)), [ITEMS, expanded, limit]);
  const hidden = ITEMS.length - limit;
  const pickTab = (id: typeof tab) => {
    setTab(id);
    setExpanded(false);
  };
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
  const goHome = () => {
    close();
    // useScrollLock's cleanup restores the exact scroll position the page
    // was at before the lightbox opened; deferring this scroll-to-top lets
    // that cleanup run first instead of being overwritten by it. Scrolling
    // through Lenis (instead of window.scrollTo) matters here: Lenis tracks
    // its own internal scroll position, and a native scrollTo desyncs it,
    // which corrupts ScrollTrigger's pin math for the video section further
    // down the page (it was rendering translated to a stale offset, leaving
    // a big blank gap where the video should be).
    setTimeout(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };
  const next = () => {
    setOriginRect(null);
    contentRef.current?.scrollTo({ top: 0 });
    setActiveIndex((i) => (i === null ? null : (i + 1) % ITEMS.length));
  };
  const prev = () => {
    setOriginRect(null);
    contentRef.current?.scrollTo({ top: 0 });
    setActiveIndex((i) => (i === null ? null : (i - 1 + ITEMS.length) % ITEMS.length));
  };

  useScrollLock(activeIndex !== null);

  // While a project is open, pause the page's own videos (e.g. the UPFLOW
  // presentation, which a visitor may have unmuted) so two soundtracks never
  // play at once, then resume the ones that were playing when it closes.
  const isOpen = activeIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    const paused = [...document.querySelectorAll<HTMLVideoElement>("main video")].filter(
      (v) => !v.paused && !v.closest(".lightbox"),
    );
    paused.forEach((v) => v.pause());
    return () => paused.forEach((v) => v.play().catch(() => {}));
  }, [isOpen]);

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
          const tween = gsap.to(el, {
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
          // Refresh only this lightbox's own triggers, never the global
          // ScrollTrigger.refresh(): the lightbox is still scroll-locked
          // here (body is position:fixed), which collapses the document's
          // scrollable height, so a global refresh would recalculate every
          // other pinned section (like the video reveal) against that
          // wrong, collapsed height and corrupt its pin math.
          tween.scrollTrigger?.refresh();
        });
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

  const active = activeIndex !== null ? ITEMS[activeIndex] : null;
  // Prev/next arrows only make sense once there is more than one project.
  const hasSiblings = ITEMS.length > 1;

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container portfolio__panel">
        <div className="portfolio__head">
          <div className="portfolio__collage" aria-hidden="true">
            {ALL.map((item) => item.poster && <img key={item.id} src={item.poster} alt="" loading="lazy" />)}
          </div>
          <RevealText as="h2" className="portfolio__heading" accent={1} dark>
            DES TRUCS QUE J'AI FAITS.
          </RevealText>
          <p className="portfolio__sub">
            Du script à l'animation. Cliquez sur un projet pour voir la vidéo, le storyboard et le site du client.
          </p>
        </div>

        <div className="portfolio__tabs" role="tablist" aria-label="Catégories de projets">
          {[{ id: "all" as const, label: "Tout" }, ...PORTFOLIO_CATEGORIES].map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={tab === c.id}
              className={`portfolio__tab${tab === c.id ? " is-active" : ""}`}
              onClick={() => pickTab(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="portfolio__grid">
          {rows.map((row) => (
            <div className="portfolio__row" key={row[0].item.id}>
              {row.map(({ item, index, size }) => (
                <PortfolioCard key={item.id} item={item} size={size} onOpen={(rect) => open(index, rect)} />
              ))}
            </div>
          ))}
        </div>

        {hidden > 0 && (
          <div className="portfolio__more">
            <button className="portfolio__more-btn" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Voir moins" : `Voir plus de projets (${hidden})`}
              <ChevronDown size={18} className={expanded ? "is-flipped" : undefined} />
            </button>
          </div>
        )}
      </div>

      {active && (
        <div className="lightbox" onClick={close}>
          <button className="lightbox__home" onClick={goHome} aria-label="Retour à l'accueil">
            <Home size={20} />
          </button>
          <button className="lightbox__close" onClick={close} aria-label="Fermer">
            <X size={22} />
          </button>
          {hasSiblings && (
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
          )}

          {/* Keyed by project: switching with the arrows mounts fresh <video>
              elements. Reusing them only swapped their <source>, which
              browsers ignore, so the previous project's video kept playing
              under the new title. */}
          <div
            key={active.id}
            ref={contentRef}
            className="lightbox__content"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={mediaRef}
              className={`lightbox__media${active.vertical ? " lightbox__media--vertical" : ""}`}
              style={active.vertical && active.poster ? ({ "--poster": `url(${active.poster})` } as CSSProperties) : undefined}
            >
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
              {active.website && (
                <a className="lightbox__website" href={active.website} target="_blank" rel="noopener">
                  Voir le site {clientOf(active.title)}
                  <span className="lightbox__website-domain">{new URL(active.website).hostname.replace(/^www\./, "")}</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
              {active.date && (
                <a className="lightbox__page-link" href={`/projets/${active.id}/`}>
                  Page du projet →
                </a>
              )}

              {active.extraVideos && (
                <div className="lightbox__extra-videos">
                  {active.extraVideos.map((clip, i) => (
                    <div className={`lightbox__extra-video${clip.vertical ? " lightbox__extra-video--vertical" : ""}`} key={i}>
                      <video poster={clip.poster} controls playsInline preload="metadata">
                        {clip.videoWebm && <source src={clip.videoWebm} type="video/webm" />}
                        <source src={clip.video} type="video/mp4" />
                      </video>
                      {clip.vertical ? (
                        <div className="lightbox__extra-video-info">
                          <p className="eyebrow">Format vertical · 9:16</p>
                          {clip.label && <p className="lightbox__extra-video-title">{clip.label}</p>}
                        </div>
                      ) : (
                        clip.label && <p className="lightbox__extra-video-label">{clip.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {active.storyboard && (
                <div className="lightbox__storyboard">
                  <p className="lightbox__storyboard-title eyebrow">Le storyboard</p>
                  <div
                    className={`lightbox__storyboard-grid${active.vertical ? " lightbox__storyboard-grid--vertical" : ""}`}
                  >
                    {active.storyboard.map((src, i) => (
                      <a key={src} href={src} target="_blank" rel="noreferrer" className="lightbox__board">
                        <img src={src} alt={`${active.title} — storyboard, planche ${i + 1}`} loading="lazy" />
                        <span className="lightbox__board-n">{String(i + 1).padStart(2, "0")}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {active.photos && (
                <div className="lightbox__photos">
                  {active.photos.map((src, i) => (
                    <img key={src} src={src} alt={`${active.title} — photo ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {hasSiblings && (
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
          )}
        </div>
      )}
    </section>
  );
}
