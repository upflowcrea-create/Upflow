import { Fragment, useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap } from "../lib/smoothScroll";
import { getLenis } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";
import { isTouchDevice } from "../lib/device";

function scrollTo(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Hero({ onBookCall, ready }: { onBookCall: () => void; ready: boolean }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const workBtn = useMagnetic<HTMLButtonElement>(0.25);
  const talkBtn = useMagnetic<HTMLButtonElement>(0.25);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !ready) return;

    const touch = isTouchDevice();

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".hero-word");
      const tl = gsap.timeline({ delay: 0.1 });

      const counter = { v: 0 };
      const countEl = el.querySelector(".hero__count");

      tl.fromTo(
        words,
        touch ? { autoAlpha: 0, yPercent: 120 } : { autoAlpha: 0, yPercent: 120, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          yPercent: 0,
          ...(touch ? {} : { filter: "blur(0px)" }),
          duration: 1.1,
          stagger: 0.05,
          ease: "power4.out",
        },
      )
        .fromTo(
          el.querySelectorAll(".hero-word:not(.gradient-text)"),
          { color: "#f04dff" },
          {
            keyframes: { color: ["#f04dff", "#b72ad8", "#7a28bb", "#3d1366"] },
            duration: 1.4,
            stagger: 0.08,
            ease: "none",
            clearProps: "color",
          },
          "<",
        )
        // The "30 secondes" sticker pops in tilted, and its number counts up.
        .fromTo(
          ".hero__subtitle",
          { autoAlpha: 0, scale: 0.6, rotate: -14, y: 24 },
          { autoAlpha: 1, scale: 1, rotate: -2, y: 0, duration: 0.9, ease: "back.out(1.8)" },
          "-=0.6",
        )
        .to(
          counter,
          {
            v: 30,
            duration: 1.3,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              if (countEl) countEl.textContent = String(counter.v);
            },
          },
          "<0.15",
        )
        .fromTo(
          ".hero__ctas > *",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=1",
        );
    }, el);

    return () => ctx.revert();
  }, [ready]);

  const renderLine = (line: string, gradient = false) =>
    line.split(" ").map((word, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        <span className="hero-word-wrap">
          <span className={clsx("hero-word", gradient && "gradient-text")}>{word}</span>
        </span>
      </Fragment>
    ));

  return (
    <section id="top" ref={rootRef} className="hero">
      <div className="hero__content container">
        <h1 className="hero__title hero__title--long">
          {/* What the page is about, for search engines and screen readers; the visible line is the joke. */}
          <span className="visually-hidden">UPFLOW, studio de vidéo motion design et 3D. </span>
          <span className="hero__title-line">{renderLine("TU PARLES BEAUCOUP, HEIN ?")}</span>{" "}
          <span className="hero__title-line">{renderLine("ÇA VA ALLER, RESPIRE.", true)}</span>
        </h1>

        <p className="hero__subtitle">
          <span className="hero__timer" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <circle className="hero__timer-track" cx="18" cy="18" r="15" />
              <circle className="hero__timer-ring" cx="18" cy="18" r="15" pathLength="100" />
              <line className="hero__timer-hand" x1="18" y1="18" x2="18" y2="9" />
              <circle className="hero__timer-pin" cx="18" cy="18" r="2.2" />
            </svg>
          </span>
          <span>
            J'ai que{" "}
            {/* Siblings, not nested: Safari won't paint a clipped gradient through an inline-block child. */}
            <span className="hero__count">30</span> <span className="hero__seconds">secondes</span>
            .
          </span>
        </p>

        <div className="hero__ctas">
          <button ref={workBtn} className="btn btn-primary" onClick={() => scrollTo("#video")}>
            Voir le travail ↓
          </button>
          <button ref={talkBtn} className="btn btn-ghost" onClick={onBookCall}>
            Parler du projet →
          </button>
        </div>
      </div>
    </section>
  );
}
