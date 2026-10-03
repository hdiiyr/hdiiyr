import type { Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { site } from "@/content/site";
import Placeholder from "./Placeholder";
import { External } from "./icons";

/** Email and social links. Missing values render as placeholders, never as dead links. */
export function ContactLinks({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  return (
    <div className="contact-links">
      <div className="contact-links__group">
        <h3 className="label">{ui.contact.email}</h3>
        {site.email ? (
          <a className="contact-links__email link-line" href={`mailto:${site.email}`} dir="ltr">
            {site.email}
          </a>
        ) : (
          <Placeholder locale={locale}>{ui.placeholder.email}</Placeholder>
        )}
      </div>
      <div className="contact-links__group">
        <h3 className="label">{ui.contact.socials}</h3>
        <ul className="contact-links__socials">
          {site.socials.map((s) => (
            <li key={s.label}>
              {s.url ? (
                <a className="link-line" href={s.url} target="_blank" rel="noopener noreferrer" dir="ltr">
                  {s.label}
                  <External />
                </a>
              ) : (
                <span className="contact-links__off" dir="ltr">
                  {s.label}
                  <span className="sr-only"> — {ui.placeholder.notSet}</span>
                  <span className="contact-links__off-note" aria-hidden="true" dir="auto">
                    {ui.placeholder.notSet}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Contact({ locale, id }: { locale: Locale; id?: string }) {
  const ui = getUI(locale);
  return (
    <section className="contact" id={id} aria-labelledby={`${id ?? "contact"}-title`}>
      <h2 className="chapter__title" id={`${id ?? "contact"}-title`} data-reveal="mask">
        <span className="mask">
          <span className="mask__inner">{ui.contact.heading}</span>
        </span>
      </h2>
      <div className="row" data-reveal>
        <h3 className="row__label">{ui.contact.lead}</h3>
        <div className="row__body">
          <p>{ui.contact.body}</p>
          <ContactLinks locale={locale} />
        </div>
      </div>
    </section>
  );
}
