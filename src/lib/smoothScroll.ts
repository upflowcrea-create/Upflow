import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis) return lenis;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  // On touch devices we keep native scrolling (better feel + battery) but still
  // drive GSAP ScrollTrigger off the native scroll position.
  if (prefersReducedMotion || isTouch) {
    ScrollTrigger.defaults({ scroller: window as unknown as Element });
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export { gsap, ScrollTrigger };
