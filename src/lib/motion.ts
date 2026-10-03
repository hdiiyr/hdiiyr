/** Shared motion tokens (seconds) so every sequence feels like the same hand. */
export const DUR = {
  slide: 1.0, // image column travel
  color: 0.9, // background / text colour change
  out: 0.42, // text leaving
  in: 0.72, // text entering
  hover: 0.2,
  flip: 0.95, // home cover → case-study hero
} as const;

export const EASE = {
  inOut: "expo.inOut",
  out: "expo.out",
  textOut: "power3.in",
  textIn: "power3.out",
  color: "power2.inOut",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Desktop showcase layout: vertical image column, wheel navigation. Keep in sync with showcase.css. */
export const DESKTOP_QUERY = "(min-width: 1024px) and (min-height: 560px)";

/** Case-study hero image box, shared by the CSS and the cover → hero transition. */
export function heroRect(vw: number, vh: number) {
  const desktop = vw >= 1024;
  const w = desktop ? Math.min(vw * 0.46, 760) : vw - 40;
  const h = w / 1.6;
  const cy = desktop ? vh * 0.5 : vh * 0.42;
  return { x: (vw - w) / 2, y: cy - h / 2, w, h };
}
