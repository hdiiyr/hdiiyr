import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import About from "@/components/About";
import PageTheme from "@/components/PageTheme";
import { themeStyle } from "@/lib/theme";
import Reveal from "@/components/Reveal";

const theme = { bg: "#151514", ink: "#f2efe8", title: "#f2efe8" };

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const ui = getUI(locale);
  return {
    title: ui.meta.aboutTitle,
    description: ui.meta.aboutDescription(site.name[locale]),
    alternates: { canonical: localePath(locale, "/about"), languages: { fa: "/fa/about", en: "/en/about" } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main" className="about">
      <style>{themeStyle(theme)}</style>
      <PageTheme theme={theme} />
      <Reveal />
      <About locale={locale} />
    </main>
  );
}
