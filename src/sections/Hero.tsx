import { useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap } from "../lib/smoothScroll";
import { getLenis } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { BRAND } from "../lib/config";

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
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !ready) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".hero-word");
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        ".hero__kicker",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          words,
          { autoAlpha: 0, yPercent: 120, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero__subtitle",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero__ctas > *",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(".hero__scrollcue", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.2");
    }, el);

    return () => ctx.revert();
  }, [ready]);

  // Ambient mouse parallax on the background blobs — desktop only, purely decorative.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || isMobile || reducedMotion) return;

    const blob1 = el.querySelector(".hero__blob--1");
    const blob2 = el.querySelector(".hero__blob--2");
    if (!blob1 || !blob2) return;

    const moveBlob1 = gsap.quickTo(blob1, "x", { duration: 1.2, ease: "power3.out" });
    const moveBlob1Y = gsap.quickTo(blob1, "y", { duration: 1.2, ease: "power3.out" });
    const moveBlob2 = gsap.quickTo(blob2, "x", { duration: 1.4, ease: "power3.out" });
    const moveBlob2Y = gsap.quickTo(blob2, "y", { duration: 1.4, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      moveBlob1(relX * 50);
      moveBlob1Y(relY * 50);
      moveBlob2(relX * -60);
      moveBlob2Y(relY * -60);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile, reducedMotion]);

  const renderLine = (line: string, gradient = false) =>
    line.split(" ").map((word, i) => (
      <span className="hero-word-wrap" key={i}>
        <span className={clsx("hero-word", gradient && "gradient-text")}>{word}</span>
      </span>
    ));

  return (
    <section id="top" ref={rootRef} className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__ring" />
      </div>

      <div className="hero__content container">
        <p className="hero__kicker eyebrow">
          {BRAND.name} — {BRAND.tagline}
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">{renderLine("MAKE YOUR")}</span>
          <span className="hero__title-line">{renderLine("BUSINESS MOVE.", true)}</span>
        </h1>

        <p className="hero__subtitle">
          Des vidéos qui expliquent.
          <br />
          Des vidéos qui attirent.
          <br />
          Des vidéos qui font bouger les choses.
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

      <button className="hero__scrollcue" onClick={() => scrollTo("#video")} aria-label="Défiler">
        <span className="hero__scrollcue-line" />
      </button>
    </section>
  );
}
