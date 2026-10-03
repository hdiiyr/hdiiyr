export type ThemeVars = { bg: string; ink: string; title: string };

/** Server-printed page colours, so the first paint is right before any JS runs. */
export const themeStyle = (t: ThemeVars) => `:root{--bg:${t.bg};--ink:${t.ink};--title:${t.title}}`;
