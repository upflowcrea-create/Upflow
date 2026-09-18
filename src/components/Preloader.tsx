import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/smoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { useScrollLock } from "../hooks/useScrollLock";

const BRAND_WORDS = ["UP", "YOUR", "FLOW"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useScrollLock(!done);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const counter = { v: 0 };
    const countDuration = reducedMotion ? 0.35 : 2.1;
    const brandDuration = reducedMotion ? 0.2 : 0.65;

    const startExit = () => {
      // Fire onDone as the reveal starts so the hero animates in while the
      // panels are still wiping away — one continuous motion, not two beats.
      onDone();
      setExiting(true);

      const panel = root.querySelector(".preloader__panel--top");
      const finish = () => setDone(true);
      let fallback: ReturnType<typeof setTimeout> | null = null;

      if (panel) {
        panel.addEventListener("transitionend", finish, { once: true });
        fallback = setTimeout(finish, 1200);
      } else {
        fallback = setTimeout(finish, 900);
      }

      return () => {
        if (fallback) clearTimeout(fallback);
        panel?.removeEventListener("transitionend", finish);
      };
    };

    const tl = gsap.timeline({ onComplete: () => setTimeout(startExit, 120) });

    tl.fromTo(
      root.querySelectorAll(".preloader__brand-word"),
      { autoAlpha: 0, yPercent: 100, filter: "blur(10px)" },
      {
        autoAlpha: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: brandDuration,
        stagger: 0.08,
        ease: "power3.out",
      },
    )
      .to(
        counter,
        {
          v: 100,
          duration: countDuration,
          ease: "power2.out",
          onUpdate: () => {
            if (numberRef.current) numberRef.current.textContent = String(Math.round(counter.v));
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        reducedMotion ? 0 : "-=0.35",
      )
      .to(
        [".preloader__number-row", ".preloader__kicker", ".preloader__bar-track"],
        { autoAlpha: 0, y: -10, duration: 0.35, ease: "power2.in" },
        "-=0.15",
      );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className={`preloader ${exiting ? "preloader--exiting" : ""}`} aria-hidden="true">
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />
      <div className="preloader__content">
        <div className="preloader__kicker">
          <span className="preloader__brand">
            {BRAND_WORDS.map((word, i) => (
              <span className="preloader__brand-word-wrap" key={i}>
                <span className="preloader__brand-word gradient-text">{word}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="preloader__number-row">
          <span ref={numberRef} className="preloader__number">
            0
          </span>
          <span className="preloader__percent">%</span>
        </div>
        <div className="preloader__bar-track">
          <div ref={barRef} className="preloader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
