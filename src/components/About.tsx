import Image from "next/image";
import { digits, type Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import Placeholder, { DraftBadge } from "./Placeholder";
import { ContactLinks } from "./Contact";
import Contact from "./Contact";
import Resume from "./Resume";

export default function About({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  const ph = ui.placeholder;
  const greeting = ui.about.greeting(site.firstName[locale]).split("\n");
  const initials = site.name[locale]
    .split(" ")
    .map((w) => w[0])
    .join(locale === "fa" ? "." : "");

  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero__portrait">
          {site.portrait ? (
            <Image src={site.portrait.src} alt={site.portrait.alt[locale]} fill sizes="52vw" preload placeholder="blur" />
          ) : (
            <div className="portrait-ph" role="img" aria-label={ui.about.portrait}>
              <span className="portrait-ph__initials" aria-hidden="true">
                {initials}
              </span>
              <span className="portrait-ph__label" aria-hidden="true">
                {ui.about.portrait}
              </span>
            </div>
          )}
        </div>

        <div className="about-hero__content">
          <h1 className="about-hero__title" id="about-title">
            {greeting.map((line) => (
              <span className="mask" key={line}>
                <span className="mask__inner">{line}</span>
              </span>
            ))}
          </h1>
          <div className="about-hero__bio">
            <p className="about-hero__role">{site.role?.[locale] ?? <Placeholder locale={locale}>{ph.role}</Placeholder>}</p>
            {site.bio ? <p>{site.bio[locale]}</p> : <Placeholder locale={locale} block>{ph.bio}</Placeholder>}
            <ContactLinks locale={locale} />
          </div>
        </div>
      </section>

      <div className="about-body">
        <section className="chapter" aria-labelledby="expertise-title">
          <h2 className="chapter__title" id="expertise-title" data-reveal="mask">
            <span className="mask">
              <span className="mask__inner">{ui.about.expertise}</span>
            </span>
            {site.expertisePlaceholder && <DraftBadge locale={locale} />}
          </h2>
          <ol className="big-list" data-reveal>
            {site.expertise[locale].map((item, i) => (
              <li key={item}>
                <span className="big-list__num">{digits(String(i + 1).padStart(2, "0"), locale)}</span>
                <span className="big-list__text">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="chapter" aria-labelledby="experience-title">
          <h2 className="chapter__title" id="experience-title" data-reveal="mask">
            <span className="mask">
              <span className="mask__inner">{ui.about.experience}</span>
            </span>
          </h2>
          <ol className="timeline">
            {site.experience.map((item, i) => (
              <li className="row timeline__item" key={i} data-reveal>
                <p className="row__label timeline__period">
                  {item.period?.[locale] ?? <Placeholder locale={locale}>{ph.period}</Placeholder>}
                </p>
                <div className="row__body">
                  <h3 className="timeline__role">
                    {item.role?.[locale] ?? <Placeholder locale={locale}>{ph.position}</Placeholder>}
                    <span className="timeline__org">
                      {item.org?.[locale] ?? <Placeholder locale={locale}>{ph.org}</Placeholder>}
                    </span>
                  </h3>
                  <p>{item.summary?.[locale] ?? <Placeholder locale={locale}>{ph.summary}</Placeholder>}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="chapter" aria-labelledby="approach-title">
          <h2 className="chapter__title" id="approach-title" data-reveal="mask">
            <span className="mask">
              <span className="mask__inner">{ui.about.approach}</span>
            </span>
            {site.approachPlaceholder && <DraftBadge locale={locale} />}
          </h2>
          {site.approach.map((a, i) => (
            <div className="row" key={a.title[locale]} data-reveal>
              <h3 className="row__label">
                {digits(i + 1, locale)}. {a.title[locale]}
              </h3>
              <div className="row__body">
                <p>{a.body[locale]}</p>
              </div>
            </div>
          ))}
        </section>

        <Contact locale={locale} id="contact" />
        <Resume locale={locale} />
      </div>
    </>
  );
}
