import type { Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";

/** A clearly marked stand-in for information that has not been provided yet. */
export default function Placeholder({ children, locale, block = false }: { children: React.ReactNode; locale: Locale; block?: boolean }) {
  const Tag = block ? "p" : "span";
  return (
    <Tag className={`ph${block ? " ph--block" : ""}`}>
      <span className="ph__badge">{getUI(locale).placeholder.badge}</span>
      <span className="ph__text">{children}</span>
    </Tag>
  );
}

/** Small badge that marks a whole section as sample content. */
export function DraftBadge({ locale }: { locale: Locale }) {
  return <span className="ph__badge ph__badge--section">{getUI(locale).placeholder.badge}</span>;
}
