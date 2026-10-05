import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import ProjectShowcase, { type Slide } from "@/components/ProjectShowcase";
import { themeStyle } from "@/lib/theme";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: { canonical: localePath(locale), languages: { fa: "/fa", en: "/en" } },
  };
}

/**
 * Fully static (works as a static export): the page always renders the first project and the
 * gallery itself jumps to `?p=<slug>` in the browser.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ui = getUI(locale);

  const slides: Slide[] = projects.map((project) => ({
    slug: project.slug,
    href: localePath(locale, `/work/${project.slug}`),
    title: project.title[locale],
    category: project.category[locale],
    oneLiner: project.oneLiner[locale],
    concept: project.concept,
    theme: {
      bg: project.theme.bg,
      title: project.theme.title,
      ink: project.theme.text,
      heroBg: project.theme.heroBg,
      heroText: project.theme.heroText,
    },
    cover: { src: project.cover.src, alt: project.cover.alt[locale] },
    detail: { src: project.detail.src, alt: project.detail.alt[locale], rotate: project.detail.rotate },
  }));

  const first = slides[0].theme;

  return (
    <main id="main" className="page-home">
      <style>{themeStyle({ bg: first.bg, ink: first.ink, title: first.title })}</style>
      <h1 className="sr-only">
        {site.name[locale]} — {ui.showcase.label}
      </h1>
      <ProjectShowcase locale={locale} slides={slides} />
    </main>
  );
}
