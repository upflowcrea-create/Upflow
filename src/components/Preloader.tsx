import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/smoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { useScrollLock } from "../hooks/useScrollLock";
import { Logo } from "./Logo";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useScrollLock(!done);

  useEffect(() => {
    const counter = { v: 0 };
    const duration = reducedMotion ? 0.35 : 2.1;

    const startExit = () => {
      // Fire onDone as the reveal starts so the hero animates in while the
      // panels are still wiping away — one continuous motion, not two beats.
      onDone();
      setExiting(true);

      const panel = rootRef.current?.querySelector(".preloader__panel--top");
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

    tl.to(counter, {
      v: 100,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) numberRef.current.textContent = String(Math.round(counter.v));
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    }).to(
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
          <Logo height={22} />
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
