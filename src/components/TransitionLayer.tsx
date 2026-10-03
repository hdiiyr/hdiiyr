"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { coverTransition, type CoverFlight } from "@/lib/transition";
import { DUR, EASE } from "@/lib/motion";

/** Draws the cover image while it flies from the home gallery to the case-study hero. */
export default function TransitionLayer() {
  const [flight, setFlight] = useState<CoverFlight | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => coverTransition.subscribe(setFlight), []);

  useEffect(() => {
    if (!flight || !box.current) return;
    const el = box.current;
    const { from, to } = flight;
    gsap.set(el, { x: from.x, y: from.y, width: from.w, height: from.h, autoAlpha: 1 });
    const tween = gsap.to(el, {
      x: to.x,
      y: to.y,
      width: to.w,
      height: to.h,
      duration: DUR.flip,
      ease: EASE.inOut,
      onComplete: () => coverTransition.land(),
    });

    const off = coverTransition.onSettle(() => {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.25,
        delay: 0.05,
        onComplete: () => coverTransition.clear(),
      });
    });

    // Safety net: never leave the overlay on screen if the hero never reports back.
    const timeout = window.setTimeout(() => coverTransition.clear(), 6000);

    return () => {
      tween.kill();
      off();
      window.clearTimeout(timeout);
    };
  }, [flight]);

  if (!flight) return null;

  return (
    <div className="flight" ref={box} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- already-loaded, already-optimized source */}
      <img src={flight.src} alt="" />
    </div>
  );
}
