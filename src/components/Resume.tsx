import type { Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import type { ExperienceItem } from "@/content/types";
import Placeholder, { DraftBadge } from "./Placeholder";
import PrintButton from "./PrintButton";

function Entries({ items, locale, kind }: { items: ExperienceItem[]; locale: Locale; kind: "work" | "education" }) {
  const ph = getUI(locale).placeholder;
  return (
    <ol className="resume__entries">
      {items.map((item, i) => (
        <li key={i} className="resume__entry">
          <span className="resume__period">{item.period?.[locale] ?? <Placeholder locale={locale}>{ph.period}</Placeholder>}</span>
          <div>
            <p className="resume__role">
              {item.role?.[locale] ?? <Placeholder locale={locale}>{kind === "work" ? ph.position : ph.degree}</Placeholder>}
              {" · "}
              {item.org?.[locale] ?? <Placeholder locale={locale}>{kind === "work" ? ph.org : ph.school}</Placeholder>}
            </p>
            {kind === "work" && (
              <p className="resume__summary">{item.summary?.[locale] ?? <Placeholder locale={locale}>{ph.summary}</Placeholder>}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Printable résumé built from the same data as the About page. */
export default function Resume({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  const ph = ui.placeholder;

  return (
    <section className="resume" id="resume" aria-labelledby="resume-title">
      <div className="resume__bar">
        <div>
          <h2 className="chapter__title" id="resume-title">
            {ui.about.resume}
          </h2>
          <p className="resume__lead">{ui.about.resumeLead}</p>
        </div>
        <div className="resume__actions">
          <PrintButton label={ui.about.print} />
          {site.resumeFile && (
            <a className="pill pill--ghost" href={site.resumeFile} download>
              PDF
            </a>
          )}
        </div>
      </div>

      <div className="resume__sheet">
        <header className="resume__head">
          <div>
            <p className="resume__name">{site.name[locale]}</p>
            <p className="resume__title">{site.role?.[locale] ?? <Placeholder locale={locale}>{ph.role}</Placeholder>}</p>
          </div>
          <ul className="resume__contact">
            <li>{site.email ? <span dir="ltr">{site.email}</span> : <Placeholder locale={locale}>{ph.email}</Placeholder>}</li>
            <li>{site.location?.[locale] ?? <Placeholder locale={locale}>{ph.location}</Placeholder>}</li>
            {site.socials
              .filter((s) => s.url)
              .map((s) => (
                <li key={s.label} dir="ltr">
                  {s.url!.replace(/^https?:\/\//, "")}
                </li>
              ))}
          </ul>
        </header>

        <div className="resume__grid">
          <div className="resume__block resume__block--wide">
            <p>{site.bio?.[locale] ?? <Placeholder locale={locale}>{ph.bio}</Placeholder>}</p>
          </div>

          <div className="resume__block">
            <h3 className="label">{ui.about.experience}</h3>
            <Entries items={site.experience} locale={locale} kind="work" />
          </div>

          <div className="resume__block">
            <h3 className="label">{ui.about.expertise}</h3>
            <ul className="resume__tags">
              {site.expertise[locale].map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            {site.expertisePlaceholder && <DraftBadge locale={locale} />}

            <h3 className="label">{ui.about.education}</h3>
            <Entries items={site.education} locale={locale} kind="education" />

            <h3 className="label">{ui.about.selectedWork}</h3>
            <ul className="resume__work">
              {projects.map((p) => (
                <li key={p.slug}>
                  <strong>{p.title[locale]}</strong> — {p.category[locale]}
                  {p.concept && <em> ({ui.concept})</em>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
