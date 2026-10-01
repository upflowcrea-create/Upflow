import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import { isTouchDevice } from "../lib/device";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Split by "words" (default) or "lines" (wraps each line in its own div). */
  splitBy?: "words";
  delay?: number;
  /** How many trailing words get the animated brand-gradient treatment. */
  accent?: number;
};

// Each plain word flashes through the brand colors as it lands, then
// settles back to ink.
const COLOR_WAVE = ["#ff2e93", "#b026ff", "#8a2bff", "#120a1e"];

/**
 * Kinetic-typography heading: splits text into words and reveals them
 * blur -> sharp, sliding up, staggered, as the block scrolls into view.
 */
export function RevealText({ children, as: Tag = "div", className, delay = 0, accent = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".reveal-word");

    // Filter (blur) animations are much cheaper to skip than to render well
    // on a phone GPU, especially staggered across every word in a heading.
    const touch = isTouchDevice();

    const plainWords = el.querySelectorAll<HTMLElement>(".reveal-word:not(.reveal-word--accent)");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay, scrollTrigger: { trigger: el, start: "top 85%" } });
      tl.fromTo(
        words,
        touch ? { autoAlpha: 0, yPercent: 110 } : { autoAlpha: 0, yPercent: 110, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          yPercent: 0,
          ...(touch ? {} : { filter: "blur(0px)" }),
          duration: 1,
          stagger: 0.045,
          ease: "power4.out",
        },
      );
      if (plainWords.length) {
        tl.fromTo(
          plainWords,
          { color: COLOR_WAVE[0] },
          {
            keyframes: { color: COLOR_WAVE },
            duration: 1.3,
            stagger: 0.07,
            ease: "none",
            clearProps: "color",
          },
          0,
        );
      }
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, accent]);

  const content =
    typeof children === "string"
      ? children.split(" ").map((word, i, all) => (
          <span className="reveal-word-wrap" key={i}>
            <span className={clsx("reveal-word", i >= all.length - accent && "reveal-word--accent")}>{word}</span>
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
