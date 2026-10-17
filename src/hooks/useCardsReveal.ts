import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

/**
 * Cards fly in from below with a slight alternating tilt, then settle flat.
 * Each card triggers on its own (batched), so on a phone where cards are
 * stacked vertically, a card animates when *it* scrolls into view rather
 * than all of them firing at once while most are still off-screen.
 */
export function useCardsReveal<T extends HTMLElement>(selector: string, tilt = 4) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = el.querySelectorAll<HTMLElement>(selector);
    const ctx = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 0, y: 70, rotate: (i: number) => (i % 2 ? tilt : -tilt) });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [selector, tilt]);

  return ref;
}
