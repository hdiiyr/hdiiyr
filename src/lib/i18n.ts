export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export type Localized<T = string> = Record<Locale, T>;

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "fa" ? "rtl" : "ltr");
export const otherLocale = (locale: Locale): Locale => (locale === "fa" ? "en" : "fa");

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Converts ASCII digits to Persian digits for the Persian locale. */
export function digits(value: string | number, locale: Locale) {
  const text = String(value);
  return locale === "fa" ? text.replace(/\d/g, (d) => FA_DIGITS[Number(d)]) : text;
}

/** Zero-padded index label, e.g. 1 → "01" / "۰۱". */
export const indexLabel = (n: number, locale: Locale) => digits(String(n).padStart(2, "0"), locale);

export const localePath = (locale: Locale, path = "") => `/${locale}${path}`;

/** Swaps the locale prefix of a pathname: /fa/work/nava → /en/work/nava. */
export function swapLocale(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
