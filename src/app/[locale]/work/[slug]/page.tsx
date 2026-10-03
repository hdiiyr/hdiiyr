import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getProject, projects } from "@/content/projects";
import { getUI } from "@/content/ui";
import CaseStudy from "@/components/CaseStudy";
import PageTheme from "@/components/PageTheme";
import { themeStyle } from "@/lib/theme";
import Reveal from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const ui = getUI(locale);
  const title = project.concept ? `${project.title[locale]} (${ui.concept})` : project.title[locale];
  return {
    title,
    description: project.oneLiner[locale],
    alternates: {
      canonical: localePath(locale, `/work/${slug}`),
      languages: { fa: `/fa/work/${slug}`, en: `/en/work/${slug}` },
    },
    openGraph: {
      title,
      description: project.oneLiner[locale],
      images: [
        {
          url: project.cover.src.src,
          width: project.cover.src.width,
          height: project.cover.src.height,
          alt: project.cover.alt[locale],
        },
      ],
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const theme = { bg: project.theme.heroBg, ink: project.theme.heroText, title: project.theme.heroText };

  return (
    <main id="main">
      <style>{themeStyle(theme)}</style>
      <PageTheme theme={theme} />
      <Reveal />
      <CaseStudy project={project} locale={locale} />
    </main>
  );
}
