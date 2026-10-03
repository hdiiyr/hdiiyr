"use client";

import type { Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { Chevron, ListIcon } from "./icons";

type Props = {
  locale: Locale;
  titles: string[];
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onOpenList: () => void;
};

/** Previous / next, one dot per project, and the project index trigger. */
export default function ProjectNavigation({ locale, titles, active, onPrev, onNext, onSelect, onOpenList }: Props) {
  const ui = getUI(locale).showcase;
  const atStart = active === 0;
  const atEnd = active === titles.length - 1;

  return (
    <div className="rail">
      <button type="button" className="rail__step rail__step--prev" onClick={onPrev} disabled={atStart} aria-label={ui.prev}>
        <Chevron />
      </button>
      <ol className="rail__dots">
        {titles.map((title, i) => (
          <li key={title}>
            <button
              type="button"
              className="rail__dot"
              onClick={() => onSelect(i)}
              aria-label={ui.goTo(title)}
              aria-current={i === active ? "true" : undefined}
            />
          </li>
        ))}
      </ol>
      <button type="button" className="rail__step rail__step--next" onClick={onNext} disabled={atEnd} aria-label={ui.next}>
        <Chevron />
      </button>
      <button type="button" className="rail__list" onClick={onOpenList} aria-haspopup="dialog">
        <ListIcon />
        <span>{ui.list}</span>
      </button>
    </div>
  );
}
