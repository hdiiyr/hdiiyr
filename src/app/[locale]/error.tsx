"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getUI } from "@/content/ui";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "fa";
  const ui = getUI(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="status-page">
      <h1 className="status-page__title">{ui.error.title}</h1>
      <p className="status-page__body">{ui.error.body}</p>
      <button type="button" className="pill" onClick={() => retry()}>
        {ui.error.retry}
      </button>
    </main>
  );
}
