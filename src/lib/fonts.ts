import localFont from "next/font/local";

// All fonts are SIL Open Font License 1.1, self-hosted from src/fonts.

/**
 * Vazirmatn (Arabic-script subset) — Persian display and text.
 * No generated fallback face: Latin characters must fall through to the next family in
 * the CSS stack (Gloock for display, Manrope for text), not to a metric-matched Arial.
 */
export const vazirmatn = localFont({
  src: "../fonts/vazirmatn-arabic.woff2",
  weight: "100 900",
  variable: "--font-vazirmatn",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});

/** Gloock — English display serif. */
export const gloock = localFont({
  src: "../fonts/gloock-latin.woff2",
  weight: "400",
  variable: "--font-gloock",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** Manrope — English text, and Latin characters inside Persian text. */
export const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin.woff2", weight: "200 800" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const fontVariables = `${vazirmatn.variable} ${gloock.variable} ${manrope.variable}`;
