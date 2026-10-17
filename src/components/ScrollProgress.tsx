import { useEffect, useRef } from "react";
import { gsap } from "../lib/smoothScroll";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
