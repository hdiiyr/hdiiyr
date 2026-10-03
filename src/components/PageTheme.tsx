"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { DUR, EASE, prefersReducedMotion } from "@/lib/motion";
import type { ThemeVars } from "@/lib/theme";

/**
 * Sets the page colours on <html>. The server also prints them in a <style> tag so the
 * first paint is right; this keeps them right after client-side navigation.
 */
export default function PageTheme({ theme, animate = true }: { theme: ThemeVars; animate?: boolean }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const vars = { "--bg": theme.bg, "--ink": theme.ink, "--title": theme.title };
    if (!animate || prefersReducedMotion()) gsap.set(root, vars);
    else gsap.to(root, { ...vars, duration: DUR.color * 0.6, ease: EASE.color, overwrite: "auto" });
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.bg);
  }, [theme.bg, theme.ink, theme.title, animate]);

  return null;
}
