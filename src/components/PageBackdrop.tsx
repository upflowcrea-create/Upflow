import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

// One continuous backdrop behind the whole page instead of a background per
// section: crossing into a section slowly re-tints it, so there's never a
// hard edge between two blocks of color. Only the flat base color tweens —
// re-coloring the big gradient glows would repaint them every frame.
const TINTS: [selector: string, color: string][] = [
  ["#top", "#fbf3ff"],
  ["#video", "#f7f1ff"],
  ["#services", "#faf3ff"],
  ["#portfolio", "#f6f0fd"],
  [".humor", "#fcf2fe"],
  ["#process", "#fbf3ff"],
  ["#pricing", "#f7f0ff"],
  ["#faq", "#faf3ff"],
  ["#contact", "#fcf2fe"],
];

export function PageBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const layers = root.querySelectorAll<HTMLElement>(".page-backdrop__layer");

    const apply = (color: string) => {
      gsap.to(root, { backgroundColor: color, duration: 1.4, ease: "sine.inOut", overwrite: "auto" });
    };

    const ctx = gsap.context(() => {
      TINTS.forEach(([selector, color]) => {
        const el = document.querySelector(selector);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          refreshPriority: -1,
          onEnter: () => apply(color),
          onEnterBack: () => apply(color),
        });
      });

      // Each glow layer drifts at its own speed and direction as the page
      // scrolls (on top of the glows' own slow CSS float), so the backdrop
      // visibly moves with you. Transform-only, on fixed layers: cheap.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const parallax = [
          { yPercent: -45, xPercent: 8 },
          { yPercent: 35, xPercent: -10 },
          { yPercent: -25, xPercent: -14 },
        ];
        layers.forEach((layer, i) =>
          gsap.to(layer, {
            ...parallax[i],
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 1.2, refreshPriority: -1 },
          }),
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="page-backdrop" aria-hidden="true">
      {["a", "b", "c"].map((k) => (
        <div className="page-backdrop__layer" key={k}>
          <div className={`page-backdrop__glow page-backdrop__glow--${k}`} />
        </div>
      ))}
    </div>
  );
}
