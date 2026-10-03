"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { coverTransition } from "@/lib/transition";
import { ArrowDown } from "./icons";

type Props = {
  slug: string;
  title: string;
  category: string;
  cover: { src: StaticImageData; alt: string };
  scrollLabel: string;
};

/**
 * Full-screen case-study opening. When arriving from the home gallery the cover is still
 * flying (TransitionLayer); the hero waits underneath and reveals itself once it lands.
 */
export default function CaseHero({ slug, title, category, cover, scrollLabel }: Props) {
  const [state, setState] = useState<"intro" | "waiting" | "in">(() =>
    coverTransition.activeSlug() === slug ? "waiting" : "intro",
  );

  useEffect(() => {
    if (state !== "waiting") return;
    return coverTransition.onSettle((settled) => {
      if (settled === slug) setState("in");
    });
  }, [state, slug]);

  const titleNode = (
    <span className="mask">
      <span className="mask__inner">{title}</span>
    </span>
  );

  return (
    <section className={`case-hero is-${state}`}>
      <div className="case-hero__media">
        <Image
          src={cover.src}
          alt={cover.alt}
          sizes="(min-width: 1024px) 46vw, 100vw"
          preload
          placeholder="blur"
          onLoad={() => coverTransition.heroLoaded(slug)}
          ref={(img) => {
            if (img?.complete && img.naturalWidth) coverTransition.heroLoaded(slug);
          }}
        />
      </div>
      <div className="case-hero__titles">
        <p className="case-hero__cat">{category}</p>
        <h1 className="case-hero__title">{titleNode}</h1>
      </div>
      <div className="case-hero__titles case-hero__titles--clip" aria-hidden="true">
        <p className="case-hero__cat">{category}</p>
        <p className="case-hero__title">{titleNode}</p>
      </div>
      <a className="case-hero__down" href="#case-content" aria-label={scrollLabel}>
        <ArrowDown />
      </a>
    </section>
  );
}
