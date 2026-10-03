import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { getUI } from "@/content/ui";

export const metadata: Metadata = {
  title: "۴۰۴ — صفحه پیدا نشد / Page not found",
};

/** 404 for URLs outside /fa and /en (the locale layouts cannot render those). */
export default function GlobalNotFound() {
  const fa = getUI("fa");
  const en = getUI("en");
  return (
    <html lang="fa" dir="rtl" className={fontVariables}>
      <body>
        <main id="main" className="status-page" style={{ "--bg": "#151514", "--ink": "#f2efe8" } as React.CSSProperties}>
          <p className="status-page__code" aria-hidden="true">
            ۴۰۴
          </p>
          <h1 className="status-page__title">{fa.notFound.title}</h1>
          <p className="status-page__body">{fa.notFound.body}</p>
          <div className="status-page__links">
            <Link className="pill" href="/fa">
              {fa.notFound.cta}
            </Link>
            <Link className="pill pill--ghost" href="/en" lang="en" dir="ltr">
              {en.notFound.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
