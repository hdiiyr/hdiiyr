"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Decorative cursor follower for mouse devices only. The native cursor and focus
 * styles stay untouched; elements opt in to a label with data-cursor="…".
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(hasFinePointer() && !prefersReducedMotion());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ring.current;
    if (!enabled || !el) return;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let visible = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        visible = true;
      }
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      el.classList.toggle("is-link", !!(e.target as Element | null)?.closest("a, button"));
    };
    const leave = () => {
      visible = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor${label ? " has-label" : ""}`} ref={ring} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}
