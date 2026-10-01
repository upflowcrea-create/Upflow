import { useEffect, useRef } from "react";

/**
 * Toggles an `is-inview` class on the element while it's on screen, so its
 * looping CSS animations only run when someone can actually see them.
 */
export function useInViewClass<T extends HTMLElement>(rootMargin = "100px") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("is-inview", entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
