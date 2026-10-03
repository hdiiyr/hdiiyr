"use client";

import { useEffect, useRef } from "react";
import { indexLabel, type Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { Close } from "./icons";

type Item = { slug: string; title: string; category: string };

type Props = {
  locale: Locale;
  items: Item[];
  active: number;
  open: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
};

/** Quick project index in a native modal dialog (focus trap, Esc and focus return come free). */
export default function ProjectIndex({ locale, items, active, open, onClose, onSelect }: Props) {
  const ui = getUI(locale).showcase;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="index"
      aria-labelledby="project-index-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="index__inner">
        <div className="index__head">
          <h2 id="project-index-title" className="index__title">
            {ui.listTitle}
          </h2>
          <button type="button" className="index__close" onClick={onClose} aria-label={ui.close}>
            <Close />
          </button>
        </div>
        <ol className="index__list">
          {items.map((item, i) => (
            <li key={item.slug}>
              <button
                type="button"
                className="index__item"
                aria-current={i === active ? "true" : undefined}
                onClick={() => {
                  onSelect(i);
                  onClose();
                }}
              >
                <span className="index__num">{indexLabel(i + 1, locale)}</span>
                <span className="index__name">{item.title}</span>
                <span className="index__cat">{item.category}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </dialog>
  );
}
