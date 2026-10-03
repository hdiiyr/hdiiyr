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

export default async function HomePage({ params, searchParams }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { p } = await searchParams;
  const requested = typeof p === "string" ? projects.findIndex((x) => x.slug === p) : -1;
  const initial = Math.max(0, requested);
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

  const first = slides[initial].theme;

  return (
    <main id="main" className="page-home">
      <style>{themeStyle({ bg: first.bg, ink: first.ink, title: first.title })}</style>
      <h1 className="sr-only">
        {site.name[locale]} — {ui.showcase.label}
      </h1>
      <ProjectShowcase locale={locale} slides={slides} initial={initial} />
    </main>
  );
}
