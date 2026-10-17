// Read once, non-reactively — matches the same check used in smoothScroll.ts.
// Animating a CSS `filter: blur()` is far more expensive to composite than
// opacity/transform, and doubly so on a live <video> element (the browser
// has to re-filter every decoded frame). Mobile GPUs have much less headroom
// for that than desktop, so touch devices get the cheaper version of these
// reveal/zoom effects instead of dropping frames trying to render the rich one.
export const isTouchDevice = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
