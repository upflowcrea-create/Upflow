import { useEffect, useRef } from "react";
import { gsap } from "../lib/smoothScroll";
import { usePrefersReducedMotion, useIsMobile } from "./useMediaQuery";

/** 3D tilt-toward-cursor effect for cards, desktop only. */
export function useTilt<T extends HTMLElement>(maxTilt = 10) {
  const ref = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || isMobile) return;

    gsap.set(el, { transformPerspective: 800, transformStyle: "preserve-3d" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: px * maxTilt,
        rotateX: -py * maxTilt,
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt, reducedMotion, isMobile]);

  return ref;
}
