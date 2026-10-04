import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/i18n";

export type Img = { src: StaticImageData; alt: Localized };
export type Figure = Img & { caption?: Localized };

/** Colours for one project. Home uses bg/title/text, the case-study hero uses hero*, the body uses paper*. */
export type ProjectTheme = {
  bg: string;
  title: string;
  text: string;
  heroBg: string;
  heroText: string;
  paper: string;
  paperText: string;
  accent: string;
};

/** A numbered design note, e.g. "01 Visible attachments — Image previews sit inside the composer…". */
export type Note = { title: Localized; body: Localized };

/** One chapter of a case study: a screen or a group of screens and the decisions behind them. */
export type Section = {
  id: string;
  kicker: Localized;
  title: Localized;
  lead?: Localized;
  notes?: Note[];
  figure: Figure;
  /** Edge-to-edge figure (used for wide boards). */
  full?: boolean;
};

export type Project = {
  slug: string;
  /** Concept projects are labelled as such everywhere and never presented as client work. */
  concept: boolean;
  title: Localized;
  category: Localized;
  oneLiner: Localized;
  /** The large statement under "About the project". */
  summary: Localized;
  theme: ProjectTheme;
  cover: Img;
  /** Small overlapping image on the home slide; `rotate` is in degrees. */
  detail: Img & { rotate: number };
  /** Facts shown in the case-study header. */
  facts: {
    platform: Localized;
    screens?: number;
    areas?: Localized<string[]>;
  };
  /** The project's main design focus, if there is one. */
  focus?: Note;
  /** Every field is optional: only what exists is rendered. */
  meta: {
    role?: Localized<string[]>;
    client?: Localized;
    year?: string;
    duration?: Localized;
    tools?: string[];
  };
  /** Only real, valid URLs. Leave undefined when there is none. */
  links?: { live?: string; figma?: string };
  /** Optional media; rendered only when provided. */
  media?: {
    video?: { src: string; poster?: StaticImageData; caption?: Localized };
    prototype?: { url: string; title: Localized };
  };
  /** Optional context, rendered as its own chapter when present. */
  problem?: Localized;
  goal?: Localized;
  constraints?: Localized<string[]>;
  sections: Section[];
  /** Optional outcome, rendered as its own chapter when present. */
  result?: Localized;
  learned?: Localized;
};

/** `null` means "not provided yet" and renders as a clearly marked placeholder. */
export type Maybe<T> = T | null;

export type SocialLink = { label: string; url: Maybe<string> };

export type ExperienceItem = {
  period: Maybe<Localized>;
  role: Maybe<Localized>;
  org: Maybe<Localized>;
  summary: Maybe<Localized>;
};
