import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "../lib/smoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { useScrollLock } from "../hooks/useScrollLock";
import { isTouchDevice } from "../lib/device";

const BRAND_WORDS = ["UP", "YOUR", "FLOW"];

// Glitch opening: 18 horizontal slices, each leaving at its own moment, to its own side.
// Deterministic (no Math.random) so the prerendered HTML matches the client.
const SLICE_COUNT = 18;
const SLICES = Array.from({ length: SLICE_COUNT }, (_, i) => {
  const r = Math.abs(Math.sin(i * 12.9898 + 4.1) * 43758.5453) % 1;
  return { delay: Math.round(r * 0.32 * 100) / 100, dir: (i * 7) % 3 === 0 ? -1 : 1 };
});

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const glitchRef = useRef<HTMLSpanElement | null>(null);
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
      // back to the site's colours (page background + Safari / Android bars)
      document.documentElement.classList.remove("is-loading");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#fbf3ff");
      const finish = () => setDone(true);
      let fallback: ReturnType<typeof setTimeout> | null = null;

      if (panel) {
        panel.addEventListener("transitionend", finish, { once: true });
        fallback = setTimeout(finish, 750); // the slices are gone after ~0.66 s
      } else {
        fallback = setTimeout(finish, 900);
      }

      return () => {
        if (fallback) clearTimeout(fallback);
        panel?.removeEventListener("transitionend", finish);
      };
    };

    const touch = isTouchDevice();

    // Safety net: whatever might stall the timeline on a given device (a
    // throttled tab, a dropped ticker frame, anything we haven't hit in
    // testing), the site must never be stuck showing 0% forever. Force the
    // exit once this fires if the timeline hasn't finished naturally.
    let exited = false;
    const finishOnce = () => {
      if (exited) return;
      exited = true;
      clearTimeout(safetyTimer);
      setTimeout(startExit, 120);
    };
    const safetyTimer = setTimeout(() => {
      tl.kill();
      finishOnce();
    }, 6000);

    const tl = gsap.timeline({ onComplete: finishOnce });

    tl.fromTo(
      root.querySelectorAll(".preloader__brand-word"),
      touch ? { autoAlpha: 0, yPercent: 100 } : { autoAlpha: 0, yPercent: 100, filter: "blur(10px)" },
      {
        autoAlpha: 1,
        yPercent: 0,
        ...(touch ? {} : { filter: "blur(0px)" }),
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
            const n = String(Math.round(counter.v));
            if (numberRef.current) numberRef.current.textContent = n;
            if (glitchRef.current) glitchRef.current.dataset.text = n;
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        reducedMotion ? 0 : "-=0.35",
      )
      // glitch burst at 100 %, like the signature glitch of the videos
      .call(() => {
        if (!reducedMotion) root.classList.add("preloader--burst");
      })
      .to({}, { duration: reducedMotion ? 0 : 0.5 })
      .to(
        [".preloader__number-row", ".preloader__kicker", ".preloader__bar-track"],
        { autoAlpha: 0, y: -10, duration: 0.35, ease: "power2.in" },
        "-=0.15",
      );

    return () => {
      exited = true;
      clearTimeout(safetyTimer);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className={`preloader ${exiting ? "preloader--exiting" : ""}`} aria-hidden="true">
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />
      {/* The opening: the black screen breaks into slices that glitch away (shown on exit). */}
      <div className="preloader__slices">
        {SLICES.map((sl, i) => (
          <div
            key={i}
            className="preloader__slice"
            style={{ "--i": i, "--d": `${sl.delay}s`, "--x": `${sl.dir * 100}%`, "--j": `${sl.dir * -6}%` } as CSSProperties}
          />
        ))}
      </div>
      <div className="preloader__scanlines" />
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
          {/* data-text feeds the two colour-split copies of the glitch (CSS ::before / ::after). */}
          <span ref={glitchRef} className="preloader__glitch" data-text="0">
            <span ref={numberRef} className="preloader__number">
              0
            </span>
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
