import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Split by "words" (default) or "lines" (wraps each line in its own div). */
  splitBy?: "words";
  delay?: number;
};

/**
 * Kinetic-typography heading: splits text into words and reveals them
 * blur -> sharp, sliding up, staggered, as the block scrolls into view.
 */
export function RevealText({ children, as: Tag = "div", className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { autoAlpha: 0, yPercent: 110, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const content =
    typeof children === "string"
      ? children.split(" ").map((word, i) => (
          <span className="reveal-word-wrap" key={i}>
            <span className="reveal-word">{word}</span>
          </span>
        ))
      : children;

  const Component = Tag as any;

  return (
    <Component ref={ref} className={clsx("reveal-text", className)}>
      {content}
    </Component>
  );
}

export { ScrollTrigger };
