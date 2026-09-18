import { useEffect } from "react";

/**
 * Locks page scroll while `active` is true, using the position:fixed body
 * technique rather than overflow:hidden alone — this also prevents touch
 * scroll-through on mobile and avoids layout quirks that overflow:hidden
 * can trigger on a heavily-scrolled page with fixed-position panels.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}
