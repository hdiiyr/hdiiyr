/**
 * Personal information — edit this file to make the site yours.
 *
 * `null` means "not provided yet": the site shows a clearly marked placeholder
 * instead of inventing anything. Links with `url: null` render as plain text, never
 * as a link that goes nowhere.
 */
import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/i18n";
import type { ExperienceItem, Maybe, SocialLink } from "./types";

export const site = {
  name: { fa: "ابوالفضل ایرانی", en: "Abolfazl Irani" } as Localized,
  /** Short first name used in the About greeting. */
  firstName: { fa: "ابوالفضل", en: "Abolfazl" } as Localized,

  role: null as Maybe<Localized>,
  location: null as Maybe<Localized>,
  /** Two or three sentences for the About hero. */
  bio: null as Maybe<Localized>,

  /** Import an image and set it here, e.g. `import portrait from "./media/portrait.jpg"`. */
  portrait: null as Maybe<{ src: StaticImageData; alt: Localized }>,

  email: null as Maybe<string>,
  socials: [
    { label: "LinkedIn", url: null },
    { label: "Dribbble", url: null },
    { label: "Behance", url: null },
    { label: "GitHub", url: null },
  ] as SocialLink[],

  /** Path inside /public to a real résumé PDF, e.g. "/resume.pdf". No file → no download button. */
  resumeFile: null as Maybe<string>,

  /** Sample entries — marked as placeholders on the page until replaced. */
  expertisePlaceholder: true,
  expertise: {
    fa: ["طراحی تجربه کاربری", "طراحی رابط کاربری", "سیستم طراحی", "پروتوتایپ تعاملی", "تحقیق کاربر"],
    en: ["UX design", "UI design", "Design systems", "Interactive prototyping", "User research"],
  } as Localized<string[]>,

  experience: [
    { period: null, role: null, org: null, summary: null },
    { period: null, role: null, org: null, summary: null },
  ] as ExperienceItem[],

  education: [{ period: null, role: null, org: null, summary: null }] as ExperienceItem[],

  approachPlaceholder: true,
  approach: [
    {
      title: { fa: "از مسئله شروع می‌کنم", en: "I start from the problem" },
      body: {
        fa: "قبل از هر صفحه‌ای، می‌خواهم بدانم چه کسی، کجا و چرا از محصول استفاده می‌کند.",
        en: "Before any screen, I want to know who uses the product, where, and why.",
      },
    },
    {
      title: { fa: "زود و کم‌هزینه آزمایش می‌کنم", en: "I test early and cheaply" },
      body: {
        fa: "پروتوتایپ ساده و گفت‌وگوی کوتاه با کاربر، جلوی تصمیم‌های گران را می‌گیرد.",
        en: "A rough prototype and a short conversation with a user prevent expensive decisions.",
      },
    },
    {
      title: { fa: "با تیم هم‌زبانم", en: "I speak the team’s language" },
      body: {
        fa: "طراحی را طوری تحویل می‌دهم که توسعه‌دهنده بتواند بدون حدس زدن پیاده‌اش کند.",
        en: "I hand over design so developers can build it without guessing.",
      },
    },
  ] as { title: Localized; body: Localized }[],
};

export type Site = typeof site;
