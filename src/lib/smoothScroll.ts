import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis) return lenis;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  // Without this, a dropped frame (common on lower-end phones) makes GSAP's
  // ticker "catch up" on the next tick, producing a visible stutter in every
  // timed animation on the page. Scroll-driven work isn't affected either
  // way since it's driven by scroll position, not ticker time.
  gsap.ticker.lagSmoothing(0);

  // On touch devices we keep native scrolling (better feel + battery) but still
  // drive GSAP ScrollTrigger off the native scroll position.
  if (prefersReducedMotion || isTouch) {
    ScrollTrigger.defaults({ scroller: window as unknown as Element });
    if (isTouch && !prefersReducedMotion) {
      // Mobile browsers resize the visual viewport as the address bar
      // hides/shows mid-scroll, which desyncs ScrollTrigger's pin math
      // (a pinned section — like the video reveal — stalls partway through
      // its scrub animation instead of completing). This is GSAP's own
      // fix for exactly that class of mobile pinning bug. allowNestedScroll
      // keeps it from hijacking touch scroll inside the booking modal and
      // the portfolio lightbox, which scroll their own content natively.
      ScrollTrigger.normalizeScroll({ allowNestedScroll: true });
    }
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

  return lenis;
}

export function getLenis() {
  return lenis;
}

/**
 * Keeps ScrollTrigger's pin/scrub measurements correct even when layout
 * settles late (web fonts, images, video metadata). A stale measurement is
 * what makes a pinned section (like the video reveal) feel "stuck" — the
 * scroll distance ScrollTrigger reserved no longer matches the real page.
 */
export function setupScrollTriggerRefresh() {
  // A scroll-locked overlay (the preloader, a modal, the mobile menu) sets
  // body to position:fixed, which collapses the document's scrollable
  // height to the viewport size. Refreshing while that's in effect makes
  // ScrollTrigger measure every pinned section (like the video reveal)
  // against that wrong, collapsed height — and since nothing else refreshes
  // it afterward, that corrupt measurement sticks around, leaving a big gap
  // where the pinned section should be. Retry instead of refreshing blind.
  const refresh = () => {
    if (document.body.style.position === "fixed") {
      window.setTimeout(refresh, 150);
      return;
    }
    ScrollTrigger.refresh();
  };

  const timers = [300, 1000, 2500].map((delay) => window.setTimeout(refresh, delay));

  window.addEventListener("load", refresh);
  document.fonts?.ready?.then(refresh).catch(() => {});

  // Mobile browsers fire "resize" purely from the address bar hiding/showing
  // while scrolling — the width never changes, only the height. Refreshing
  // on those is what was corrupting the pinned video-reveal mid-scroll on
  // mobile (it kept re-measuring the pin against a moving target). Only a
  // real layout change (width change, i.e. orientation/window resize)
  // should trigger a refresh; ScrollTrigger.normalizeScroll already handles
  // the address-bar case on touch devices.
  let lastWidth = window.innerWidth;
  let resizeTimer: ReturnType<typeof setTimeout>;
  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, 200);
  };
  window.addEventListener("resize", onResize);

  return () => {
    timers.forEach(clearTimeout);
    clearTimeout(resizeTimer);
    window.removeEventListener("load", refresh);
    window.removeEventListener("resize", onResize);
  };
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export { gsap, ScrollTrigger };
