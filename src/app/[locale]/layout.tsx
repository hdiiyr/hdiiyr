import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import TransitionLayer from "@/components/TransitionLayer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#22384a",
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const ui = getUI(locale);
  const name = site.name[locale];
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
    title: { default: ui.meta.homeTitle(name), template: `%s — ${name}` },
    description: ui.meta.homeDescription(name),
    applicationName: name,
    authors: [{ name }],
    openGraph: {
      type: "website",
      siteName: name,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ui = getUI(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVariables} data-locale={locale}>
      <head>
        {/* Deep links (?p=…) keep the gallery hidden until it has moved to that project. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(/[?&]p=/.test(location.search)&&/\\/(fa|en)\\/?$/.test(location.pathname))document.documentElement.classList.add("deep-link")`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {ui.skip}
        </a>
        <Header locale={locale} />
        {children}
        <TransitionLayer />
        <Cursor />
      </body>
    </html>
  );
}
