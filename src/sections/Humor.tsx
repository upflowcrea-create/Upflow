import { useEffect, useRef } from "react";
import { gsap } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";
import { isTouchDevice } from "../lib/device";

export function Humor({ onCta }: { onCta: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.3);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const touch = isTouchDevice();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".humor__line1 .reveal-word",
        touch ? { autoAlpha: 0, y: 20 } : { autoAlpha: 0, y: 20, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          ...(touch ? {} : { filter: "blur(0px)" }),
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        },
      );

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 60%" } })
        .fromTo(".humor__or", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          ".humor__video-word",
          touch ? { scale: 0.4, autoAlpha: 0, rotate: -6 } : { scale: 0.4, autoAlpha: 0, filter: "blur(20px)", rotate: -6 },
          {
            scale: 1,
            autoAlpha: 1,
            ...(touch ? {} : { filter: "blur(0px)" }),
            rotate: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.55)",
          },
          "-=0.1",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  const line1 = "VOUS POURRIEZ AUSSI EXPLIQUER ÇA AVEC 17 SLIDES.";

  return (
    <div ref={rootRef} className="section humor">
      <div className="container humor__inner">
        <p className="humor__line1">
          {line1.split(" ").map((w, i) => (
            <span className="reveal-word-wrap" key={i}>
              <span className="reveal-word">{w}</span>
            </span>
          ))}
        </p>

        <p className="humor__or">
          Ou avec une <span className="humor__video-word gradient-text">vidéo</span>.
        </p>

        <button ref={ctaRef} className="btn btn-primary humor__cta" onClick={onCta}>
          Je préfère la vidéo →
        </button>
      </div>
    </div>
  );
}
