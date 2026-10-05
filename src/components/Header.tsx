"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, otherLocale, swapLocale, type Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = (usePathname() ?? `/${locale}`).replace(/(.)\/$/, "$1");
  const ui = getUI(locale);
  const home = localePath(locale);
  const about = localePath(locale, "/about");
  const isWork = pathname === home || pathname.startsWith(`${home}/work`);
  const isAbout = pathname.startsWith(about);
  const target = otherLocale(locale);

  return (
    <header className="site-header">
      <Link href={home} className="site-header__brand">
        {site.name[locale]}
      </Link>
      <nav aria-label={locale === "fa" ? "ناوبری اصلی" : "Main"}>
        <ul className="site-header__nav">
          <li>
            <Link href={home} className="link-line" aria-current={isWork ? "page" : undefined}>
              {ui.nav.work}
            </Link>
          </li>
          <li>
            <Link href={about} className="link-line" aria-current={isAbout ? "page" : undefined}>
              {ui.nav.about}
            </Link>
          </li>
          <li>
            <Link href={`${about}#contact`} className="link-line">
              {ui.nav.contact}
            </Link>
          </li>
          <li>
            <Link
              href={swapLocale(pathname, target)}
              className="site-header__lang"
              hrefLang={target}
              lang={target}
              aria-label={ui.languageName}
            >
              {ui.languageShort}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
