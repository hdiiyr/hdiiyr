import Image from "next/image";
import Link from "next/link";
import { digits, indexLabel, localePath, type Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { projects } from "@/content/projects";
import type { Figure, Project } from "@/content/types";
import CaseHero from "./CaseHero";
import Contact from "./Contact";
import { ArrowForward, External } from "./icons";

function Chapter({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="chapter">
      <h2 className="chapter__title" data-reveal="mask">
        <span className="mask">
          <span className="mask__inner">{title}</span>
        </span>
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="row" data-reveal>
      <h3 className="row__label">{label}</h3>
      <div className="row__body">{children}</div>
    </div>
  );
}

function Fig({ figure, locale, full = false }: { figure: Figure; locale: Locale; full?: boolean }) {
  return (
    <figure className={`figure${full ? " figure--full" : ""}`} data-reveal>
      <div className="figure__media">
        <Image
          src={figure.src}
          alt={figure.alt[locale]}
          sizes={full ? "100vw" : "(min-width: 1440px) 1260px, calc(100vw - 2 * var(--gutter))"}
          placeholder="blur"
        />
      </div>
      {figure.caption && <figcaption className="figure__caption">{figure.caption[locale]}</figcaption>}
    </figure>
  );
}

export default function CaseStudy({ project, locale }: { project: Project; locale: Locale }) {
  const ui = getUI(locale);
  const t = ui.caseStudy;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const meta = project.meta;

  const metaItems: { label: string; value: React.ReactNode }[] = [];
  if (project.concept) metaItems.push({ label: t.meta.type, value: ui.concept });
  if (meta.role) metaItems.push({ label: t.meta.role, value: <List items={meta.role[locale]} /> });
  if (meta.scope) metaItems.push({ label: t.meta.scope, value: <List items={meta.scope[locale]} /> });
  if (meta.year) metaItems.push({ label: t.meta.year, value: digits(meta.year, locale) });
  if (meta.duration) metaItems.push({ label: t.meta.duration, value: meta.duration[locale] });
  if (meta.tools?.length) metaItems.push({ label: t.meta.tools, value: <List items={meta.tools} /> });
  const links = [
    project.links?.live && { href: project.links.live, label: t.live },
    project.links?.figma && { href: project.links.figma, label: t.figma },
  ].filter(Boolean) as { href: string; label: string }[];
  if (links.length)
    metaItems.push({
      label: t.meta.links,
      value: (
        <ul className="plain-list">
          {links.map((l) => (
            <li key={l.href}>
              <a className="link-line" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
                <External />
              </a>
            </li>
          ))}
        </ul>
      ),
    });

  const style = {
    "--paper": project.theme.paper,
    "--paper-text": project.theme.paperText,
    "--accent": project.theme.accent,
    "--hero-bg": project.theme.heroBg,
    "--hero-text": project.theme.heroText,
  } as React.CSSProperties;

  return (
    <article className="case" style={style}>
      <CaseHero
        slug={project.slug}
        title={project.title[locale]}
        category={project.category[locale]}
        cover={{ src: project.cover.src, alt: project.cover.alt[locale] }}
        scrollLabel={t.scrollDown}
      />

      <div className="case__body" id="case-content">
        <section className="case__intro" aria-labelledby="about-project">
          <h2 className="label" id="about-project" data-reveal>
            {t.about}
          </h2>
          <p className="case__statement" data-reveal>
            {project.summary[locale]}
          </p>
          <dl className="case__meta" data-reveal>
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt className="label">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          {project.concept && (
            <p className="case__note" data-reveal>
              {ui.conceptNote}
            </p>
          )}
        </section>

        <Chapter title={t.chapters.context}>
          <Row label={t.chapters.problem}>
            <p>{project.problem[locale]}</p>
          </Row>
          <Row label={t.chapters.goal}>
            <p>{project.goal[locale]}</p>
          </Row>
          <Row label={t.chapters.constraints}>
            <List items={project.constraints[locale]} className="bullets" />
          </Row>
        </Chapter>

        <Chapter title={t.chapters.decisions}>
          {project.decisions.map((d, i) => (
            <div className="decision" key={d.title[locale]}>
              <Row label={`${digits(i + 1, locale)}. ${d.title[locale]}`}>
                <p>{d.body[locale]}</p>
              </Row>
              <Fig figure={d.figure} locale={locale} />
            </div>
          ))}
        </Chapter>

        <Chapter title={t.chapters.solution}>
          <Row label={project.title[locale]}>
            <p>{project.solution.body[locale]}</p>
          </Row>
          <Fig figure={project.solution.figure} locale={locale} full />
        </Chapter>

        {project.media && (
          <Chapter title={t.chapters.media}>
            {project.media.video && (
              <figure className="figure" data-reveal>
                <div className="figure__media">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={project.media.video.src}
                    poster={project.media.video.poster?.src}
                  />
                </div>
                {project.media.video.caption && (
                  <figcaption className="figure__caption">{project.media.video.caption[locale]}</figcaption>
                )}
              </figure>
            )}
            {project.media.prototype && (
              <div className="figure" data-reveal>
                <iframe
                  className="figure__frame"
                  src={project.media.prototype.url}
                  title={project.media.prototype.title[locale]}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}
          </Chapter>
        )}

        <Chapter title={t.chapters.outcome}>
          <Row label={t.chapters.result}>
            <p>{project.result[locale]}</p>
          </Row>
          {project.learned && (
            <Row label={t.chapters.learned}>
              <p>{project.learned[locale]}</p>
            </Row>
          )}
        </Chapter>

        <Contact locale={locale} />
      </div>

      <section
        className="next-project"
        style={
          {
            "--next-bg": next.theme.bg,
            "--next-title": next.theme.title,
            "--next-text": next.theme.text,
          } as React.CSSProperties
        }
        aria-labelledby="next-project-title"
      >
        <p className="showcase__meta">
          <span className="showcase__count">
            {t.nextProject} · {indexLabel(projects.indexOf(next) + 1, locale)} / {indexLabel(projects.length, locale)}
          </span>
          <span>{next.category[locale]}</span>
          {next.concept && <span className="tag">{ui.concept}</span>}
        </p>
        <h2 className="showcase__title" id="next-project-title" data-reveal="mask">
          <span className="mask">
            <span className="mask__inner">
              <Link href={localePath(locale, `/work/${next.slug}`)}>{next.title[locale]}</Link>
            </span>
          </span>
        </h2>
        <p className="showcase__lead">{next.oneLiner[locale]}</p>
        <div className="next-project__actions">
          <Link className="cta" href={localePath(locale, `/work/${next.slug}`)}>
            <span className="link-line">{ui.showcase.view}</span>
            <ArrowForward />
          </Link>
          <Link className="link-line next-project__all" href={localePath(locale, `?p=${project.slug}`)}>
            {t.allProjects}
          </Link>
        </div>
      </section>
    </article>
  );
}

function List({ items, className = "plain-list" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
