import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

type Tint = { base: string; a: string; b: string };

// One continuous backdrop behind the whole page instead of a background per
// section: crossing into a section slowly re-tints it, so there's never a
// hard edge between two blocks of different color.
const TINTS: [string, Tint][] = [
  ["#top", { base: "#fff5fa", a: "#ff2e93", b: "#b026ff" }],
  ["#video", { base: "#faf5ff", a: "#8a2bff", b: "#ff2e93" }],
  ["#services", { base: "#fcf7ff", a: "#b026ff", b: "#47bfff" }],
  ["#portfolio", { base: "#f5f9ff", a: "#47bfff", b: "#8a2bff" }],
  [".humor", { base: "#fcf4ff", a: "#ff2e93", b: "#b026ff" }],
  ["#process", { base: "#fff6fb", a: "#ff2e93", b: "#47bfff" }],
  ["#pricing", { base: "#f9f5ff", a: "#8a2bff", b: "#ff2e93" }],
  ["#contact", { base: "#fff4fa", a: "#ff2e93", b: "#b026ff" }],
];

const toRgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export function PageBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const glowA = root.querySelector(".page-backdrop__glow--a");
    const glowB = root.querySelector(".page-backdrop__glow--b");
    // The scrolled navbar takes the same tint, so it doesn't sit on the page
    // as a flat white strip. Set on the navbar itself (not :root) so only
    // its own styles recalc while the color tweens.
    const navbar = document.querySelector(".navbar");

    const apply = (t: Tint) => {
      const opts = { duration: 1.4, ease: "sine.inOut", overwrite: "auto" as const };
      gsap.to(root, { backgroundColor: t.base, ...opts });
      gsap.to(glowA, { color: t.a, ...opts });
      gsap.to(glowB, { color: t.b, ...opts });
      if (navbar) gsap.to(navbar, { "--nav-tint": toRgba(t.base, 0.92), ...opts });
    };

    const triggers = TINTS.map(([selector, tint]) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 60%",
        refreshPriority: -1,
        onEnter: () => apply(tint),
        onEnterBack: () => apply(tint),
      });
    });

    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <div ref={ref} className="page-backdrop" aria-hidden="true">
      <div className="page-backdrop__glow page-backdrop__glow--a" />
      <div className="page-backdrop__glow page-backdrop__glow--b" />
    </div>
  );
}
