import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import { isTouchDevice } from "../lib/device";

type RevealOptions = {
  y?: number;
  blur?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  selector?: string;
};

/**
 * Reveals an element (or its direct children matching `selector`) with a
 * blur -> sharp + slide-up animation as it enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { y = 40, blur = 10, duration = 1, stagger = 0.08, start = "top 82%", selector } = options;
    const targets = selector ? el.querySelectorAll(selector) : el;
    // Filter animations are far costlier to composite than opacity/transform,
    // especially on a phone GPU — touch devices keep the slide/fade and skip
    // the blur instead of dropping frames trying to render it.
    const touch = isTouchDevice();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        touch ? { autoAlpha: 0, y } : { autoAlpha: 0, y, filter: `blur(${blur}px)` },
        {
          autoAlpha: 1,
          y: 0,
          ...(touch ? {} : { filter: "blur(0px)" }),
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
