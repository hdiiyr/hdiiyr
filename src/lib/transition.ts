/**
 * Tiny store for the home cover → case-study hero transition.
 * The home page starts it; TransitionLayer (in the layout, so it survives navigation)
 * draws the flying image; the case-study hero calls `reveal` once its own image is ready.
 */
export type CoverFlight = {
  slug: string;
  src: string;
  from: { x: number; y: number; w: number; h: number };
  to: { x: number; y: number; w: number; h: number };
};

type Listener = (flight: CoverFlight | null) => void;

let current: CoverFlight | null = null;
let landed = false;
let heroReady = false;
const listeners = new Set<Listener>();
const settleListeners = new Set<(slug: string) => void>();

function emit() {
  listeners.forEach((l) => l(current));
}

function maybeSettle() {
  if (current && landed && heroReady) {
    const slug = current.slug;
    settleListeners.forEach((l) => l(slug));
  }
}

export const coverTransition = {
  start(flight: CoverFlight) {
    current = flight;
    landed = false;
    heroReady = false;
    emit();
  },
  /** Called by the layer when the image reaches the hero box. */
  land() {
    landed = true;
    maybeSettle();
  },
  /** Called by the case-study hero when its image has loaded. */
  heroLoaded(slug: string) {
    if (current?.slug !== slug) return;
    heroReady = true;
    maybeSettle();
  },
  clear() {
    current = null;
    emit();
  },
  activeSlug: () => current?.slug ?? null,
  subscribe(l: Listener) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
  /** Fires once the flight has landed and the hero image is ready underneath it. */
  onSettle(l: (slug: string) => void) {
    settleListeners.add(l);
    return () => void settleListeners.delete(l);
  },
};
