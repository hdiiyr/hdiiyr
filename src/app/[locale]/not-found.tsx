"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import PageTheme from "@/components/PageTheme";
import { ArrowForward } from "@/components/icons";

const theme = { bg: "#151514", ink: "#f2efe8", title: "#f2efe8" };

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "fa";
  const ui = getUI(locale);

  return (
    <main id="main" className="status-page">
      <PageTheme theme={theme} animate={false} />
      <p className="status-page__code" aria-hidden="true">
        {locale === "fa" ? "۴۰۴" : "404"}
      </p>
      <h1 className="status-page__title">{ui.notFound.title}</h1>
      <p className="status-page__body">{ui.notFound.body}</p>
      <Link className="cta" href={localePath(locale)}>
        <span className="link-line">{ui.notFound.cta}</span>
        <ArrowForward />
      </Link>
    </main>
  );
}
