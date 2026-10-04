/**
 * Projects shown on the home gallery and as case studies at /[locale]/work/[slug].
 * Order here = order on the site. Text follows the portfolio document (UI_Design_Portfolio_EN);
 * images are rendered from design/mockups/<slug>.html into ./media/<slug>/.
 *
 * Role, client, year and tools are not in the source document, so they are left out;
 * add them under `meta` and they appear in the case-study header.
 */
import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/i18n";
import type { Figure, Note, Project } from "./types";

import mauCover from "./media/mau/cover.webp";
import mauDetail from "./media/mau/detail.webp";
import mauStart from "./media/mau/start.webp";
import mauAccess from "./media/mau/access.webp";
import mauInput from "./media/mau/input.webp";
import mauResponse from "./media/mau/response.webp";

import deltaCover from "./media/delta/cover.webp";
import deltaDetail from "./media/delta/detail.webp";
import deltaLanding from "./media/delta/landing.webp";
import deltaCourses from "./media/delta/courses.webp";
import deltaConsultants from "./media/delta/consultants.webp";
import deltaEditorial from "./media/delta/editorial.webp";
import deltaMedia from "./media/delta/media.webp";
import deltaAbout from "./media/delta/about.webp";

import eyeCover from "./media/extraeye/cover.webp";
import eyeDetail from "./media/extraeye/detail.webp";
import eyeThemes from "./media/extraeye/themes.webp";
import eyeResponsive from "./media/extraeye/responsive.webp";
import eyePlans from "./media/extraeye/plans.webp";

import bonbanCover from "./media/bonban/cover.webp";
import bonbanDetail from "./media/bonban/detail.webp";
import bonbanIntro from "./media/bonban/intro.webp";
import bonbanAdvice from "./media/bonban/advice.webp";
import bonbanProgress from "./media/bonban/progress.webp";

import jewelryCover from "./media/jewelry/cover.webp";
import jewelryDetail from "./media/jewelry/detail.webp";
import jewelryDiscovery from "./media/jewelry/discovery.webp";
import jewelryEditorial from "./media/jewelry/editorial.webp";

import banziCover from "./media/banzi/cover.webp";
import banziDetail from "./media/banzi/detail.webp";
import banziIntro from "./media/banzi/intro.webp";
import banziIdentity from "./media/banzi/identity.webp";
import banziTask from "./media/banzi/task.webp";
import banziCapture from "./media/banzi/capture.webp";

const l = (fa: string, en: string): Localized => ({ fa, en });
const note = (title: Localized, body: Localized): Note => ({ title, body });
const fig = (src: StaticImageData, alt: Localized, caption?: Localized): Figure => ({ src, alt, caption });

const mobileUI = l("رابط موبایل", "Mobile interface");

export const projects: Project[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "mau",
    concept: false,
    title: l("MAU", "MAU"),
    category: l("وب‌اپلیکیشن · رابط گفت‌وگومحور", "Web app · Conversational UI"),
    oneLiner: l(
      "رابطی گفت‌وگومحور برای ارزیابی بناهای تاریخی.",
      "A conversation-led heritage assessment interface.",
    ),
    summary: l(
      "یک فضای کاری دسکتاپ که تصاویر بنا، اسناد و کاربری‌های پیشنهادی را در یک گفت‌وگو کنار هم می‌آورد.",
      "A desktop workspace that brings building images, documents and proposed uses into a single conversation.",
    ),
    theme: {
      bg: "#133a2f",
      title: "#efe3c8",
      text: "#f3eee2",
      heroBg: "#efe7d6",
      heroText: "#133a2f",
      paper: "#f7f3ea",
      paperText: "#1b2a24",
      accent: "#b9873c",
    },
    cover: {
      src: mauCover,
      alt: l(
        "دو صفحه‌ی دسکتاپ MAU: شروع گفت‌وگو و پاسخ ارزیابی با جدول اولویت",
        "Two MAU desktop screens: an empty conversation and an assessment response with a priority table",
      ),
    },
    detail: { src: mauDetail, rotate: -4, alt: l("صفحه‌ی ورود MAU", "MAU sign-in screen") },
    facts: {
      platform: l("دسکتاپ · راست‌به‌چپ", "Desktop · RTL"),
      screens: 5,
      areas: { fa: ["رابط گفت‌وگومحور", "راست‌به‌چپ"], en: ["Conversational UI", "RTL"] },
    },
    focus: note(
      l("از ورودی تا بینش", "From input to insight"),
      l(
        "یک درخواست اولیه‌ی روشن، پیوست‌های قابل‌دیدن و پاسخ ارزیابی ساخت‌یافته.",
        "A clear first prompt, visible attachments and a structured assessment response.",
      ),
    ),
    meta: {},
    sections: [
      {
        id: "start",
        kicker: l("شروع / گفت‌وگوی خالی", "Start / Empty conversation"),
        title: l("شروع از یک گفت‌وگوی خالی", "Starting from an empty conversation"),
        figure: fig(
          mauStart,
          l("صفحه‌ی شروع MAU با کادر نوشتن و پیشنهادهای آماده", "MAU start screen with the composer and suggested prompts"),
          l("شروع / گفت‌وگوی خالی", "Start / empty conversation"),
        ),
      },
      {
        id: "access",
        kicker: l("دسترسی به حساب", "Account access"),
        title: l("اولین برداشتی یکدست", "A consistent first impression"),
        lead: l(
          "ورود و ثبت‌نام با یک چیدمان دوبخشی مشترک، به یک هویت بصری واحد وصل می‌شوند.",
          "A shared split layout connects sign-in and registration through the same visual identity.",
        ),
        notes: [
          note(
            l("ورود", "Sign in"),
            l(
              "پنل فرمِ ساده و کم‌حاشیه، ورود به حساب را از سطح فضاسازِ برند جدا نگه می‌دارد.",
              "A restrained form panel keeps account access visually separate from the atmospheric brand surface.",
            ),
          ),
          note(
            l("ساخت حساب", "Create account"),
            l(
              "همان ترکیب در ثبت‌نام ادامه پیدا می‌کند؛ با ترازبندی آشنای فیلدها و جای ثابت دکمه‌ها.",
              "The same composition carries into registration, with familiar field alignment and action placement.",
            ),
          ),
        ],
        figure: fig(
          mauAccess,
          l("صفحه‌های ورود و ساخت حساب MAU کنار هم", "MAU sign-in and create-account screens side by side"),
          l("ورود · ساخت حساب", "Sign in · Create account"),
        ),
        full: true,
      },
      {
        id: "input",
        kicker: l("گفت‌وگو / ورودی", "Conversation / Input"),
        title: l("به گفت‌وگو زمینه بدهید", "Give the conversation context"),
        notes: [
          note(
            l("پیوست‌های قابل‌دیدن", "Visible attachments"),
            l(
              "پیش‌نمایش تصاویر داخل کادر نوشتن و کنار درخواست کاربر می‌نشیند.",
              "Image previews sit inside the composer alongside the user’s request.",
            ),
          ),
          note(
            l("فضای کاری پایدار", "A persistent workspace"),
            l(
              "نوار کناری سمت راست، گفت‌وگوهای فعلی و قبلی را همیشه در دید نگه می‌دارد.",
              "The right-hand sidebar keeps current and previous conversations within view.",
            ),
          ),
        ],
        figure: fig(
          mauInput,
          l("کادر نوشتن MAU با تصاویر پیوست‌شده", "MAU composer with attached images"),
          l("کادر نوشتن / حالت پیوست", "Message composer / attachment state"),
        ),
      },
      {
        id: "response",
        kicker: l("گفت‌وگو / پاسخ", "Conversation / Response"),
        title: l("ارزیابی را قابل‌مرور کنید", "Make the assessment scannable"),
        notes: [
          note(
            l("شواهد در دید می‌مانند", "Evidence stays visible"),
            l(
              "تصاویر و اسناد بارگذاری‌شده به همان درخواستی که با آن فرستاده شده‌اند، متصل می‌مانند.",
              "Uploaded images and documents remain attached to the originating request.",
            ),
          ),
          note(
            l("پیشنهادهای رتبه‌بندی‌شده", "Ranked recommendations"),
            l(
              "یک جدول، هر کاربری پیشنهادی را با اولویت و توضیحی کوتاه کنار هم می‌گذارد.",
              "A table pairs each suggested use with its priority and a concise explanation.",
            ),
          ),
          note(
            l("ادامه در همان‌جا", "Continue in place"),
            l("کادر سؤال بعدی درست زیر پاسخ قرار می‌گیرد.", "A follow-up composer sits directly below the response."),
          ),
        ],
        figure: fig(
          mauResponse,
          l("پاسخ ارزیابی MAU با جدول اولویت کاربری‌ها", "MAU assessment response with a ranked table of uses"),
          l("پاسخ ارزیابی / جدول اولویت", "Assessment response / priority table"),
        ),
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "delta-konkur",
    concept: false,
    title: l("دلتا کنکور", "Delta Konkur"),
    category: l("وب‌سایت · پلتفرم آموزشی", "Website · Education platform"),
    oneLiner: l(
      "پلتفرمی آموزشی با چند مسیر برای کشف دوره، مشاور و محتوا.",
      "An education platform with multiple paths to discovery.",
    ),
    summary: l(
      "مرور دوره‌ها، پروفایل مشاوران و رسانه‌های آموزشی، یک زبان بصری بازیگوش و ساختار صفحه‌ی یکدست دارند.",
      "Course browsing, consultant profiles and educational media share a playful visual language and a consistent page structure.",
    ),
    theme: {
      bg: "#d4ecec",
      title: "#2346b8",
      text: "#17234a",
      heroBg: "#2346b8",
      heroText: "#eaf4f4",
      paper: "#f2f6f8",
      paperText: "#17234a",
      accent: "#e07a1f",
    },
    cover: {
      src: deltaCover,
      alt: l(
        "سه صفحه از دلتا کنکور: صفحه‌ی اصلی، کاتالوگ دوره‌ها و فهرست مشاوران",
        "Three Delta Konkur pages: the landing page, course catalog and consultant directory",
      ),
    },
    detail: { src: deltaDetail, rotate: 3, alt: l("بخش آغازین صفحه‌ی اصلی دلتا کنکور", "Top of the Delta Konkur landing page") },
    facts: {
      platform: l("وب · دسکتاپ", "Web · Desktop"),
      screens: 9,
      areas: {
        fa: ["کشف", "دوره‌ها", "مشاوران", "مقالات", "پادکست‌ها", "درباره ما"],
        en: ["Discovery", "Courses", "Consultants", "Articles", "Podcasts", "About"],
      },
    },
    meta: {},
    sections: [
      {
        id: "landing",
        kicker: l("پلتفرم آموزشی", "Education platform"),
        title: l("دروازه‌ای به پلتفرم یادگیری", "A gateway to the learning platform"),
        lead: l(
          "صفحه‌ی اصلی، پلتفرم را با بخش‌های جداگانه برای آدم‌ها، محتوا و دوره‌هایش معرفی می‌کند.",
          "The landing page introduces the platform through distinct sections for its people, content and courses.",
        ),
        notes: [
          note(
            l("کشف لایه‌لایه", "Layered discovery"),
            l(
              "بخش آغازین و میان‌برهای دسته‌بندی، کاربر را به مشاوران و محتوای آموزشی می‌رسانند.",
              "A hero and category shortcuts lead into consultants and editorial content.",
            ),
          ),
          note(
            l("ریتم مشترک", "Shared rhythm"),
            l(
              "کارت‌های گرد، جزئیات تصویرسازی‌شده و سطوح پاستلی در همه‌ی بخش‌ها تکرار می‌شوند.",
              "Rounded cards, illustrated details and pastel surfaces recur across sections.",
            ),
          ),
          note(
            l("قدم بعدی روشن", "Clear next steps"),
            l("بخش‌های مشاوره و تماس در ادامه‌ی صفحه می‌آیند.", "Consultation and contact areas appear further down the page."),
          ),
        ],
        figure: fig(
          deltaLanding,
          l("صفحه‌ی اصلی کامل دلتا کنکور در سه ستون", "The full Delta Konkur landing page in three columns"),
          l("صفحه‌ی کامل / توالی آغازین", "Full page / opening sequence"),
        ),
      },
      {
        id: "courses",
        kicker: l("پلتفرم آموزشی", "Education platform"),
        title: l("مرور کتابخانه‌ی دوره‌ها", "Browse a course library"),
        lead: l(
          "یک بخش دسته‌بندی تصویرسازی‌شده، فهرستی تکرارشونده از کارت‌های دوره را معرفی می‌کند. صفحه‌ی هر دوره هم معرفی، اطلاعات مدرس و سرفصل‌های بازشونده را کنار هم می‌آورد.",
          "An illustrated category area introduces a repeatable catalog of course cards. A dedicated course page combines an introduction, instructor information and expandable lesson content.",
        ),
        notes: [
          note(
            l("پیدا کردن مسیر", "Find a direction"),
            l("دسته‌بندی‌ها، فیلترها و جست‌وجو قاب کاتالوگ را می‌سازند.", "Categories, filter controls and search frame the catalog."),
          ),
          note(
            l("مقایسه در یک نگاه", "Compare at a glance"),
            l(
              "ساختار تکراری کارت‌ها به هر دوره جای آشنایی در شبکه می‌دهد.",
              "A repeated card structure gives each course a familiar place in the grid.",
            ),
          ),
          note(
            l("زمینه کنار محتوا", "Context beside content"),
            l("پنل مدرس کنار اطلاعات اصلی دوره قرار می‌گیرد.", "An instructor panel sits alongside the main course information."),
          ),
          note(
            l("گزینه‌های مرتبط", "Related options"),
            l(
              "ردیفی از دوره‌های مرتبط، کشف را تا انتهای صفحه ادامه می‌دهد.",
              "A supporting course row extends discovery near the end of the page.",
            ),
          ),
        ],
        figure: fig(
          deltaCourses,
          l("کاتالوگ دوره‌ها و صفحه‌ی یک دوره", "The course catalog and a course page"),
          l("کاتالوگ · اطلاعات و سرفصل‌ها", "Catalog · Information & curriculum"),
        ),
      },
      {
        id: "consultants",
        kicker: l("پلتفرم آموزشی", "Education platform"),
        title: l("پیدا کردن مشاور", "Find a consultant"),
        lead: l(
          "فهرستی آدم‌محور با کارت‌های پرتره‌ی تکرارشونده در یک لیست قابل‌فیلتر. صفحه‌ی پروفایل هر کارت را به معرفی کامل‌تر و مسیری برای مشاوره تبدیل می‌کند.",
          "A people-focused directory uses repeated portrait cards within a filterable listing. A profile page expands a card into a fuller introduction and a path to consultation.",
        ),
        notes: [
          note(
            l("اول آدم‌ها", "People first"),
            l(
              "بخش معرفی و کارت‌های پرتره، مشاوران را در مرکز توجه می‌گذارند.",
              "The introductory section and portrait cards make consultants the focus.",
            ),
          ),
          note(
            l("ظرفی متمایز", "A distinct container"),
            l(
              "سطحی با الهام از دفترچه، جست‌وجو، فیلترها و نتایج را کنار هم جمع می‌کند.",
              "A notebook-inspired surface groups search, filters and results.",
            ),
          ),
          note(
            l("معرفی شخصی", "Personal introduction"),
            l("بنر، پرتره و بیوگرافی، سلسله‌مراتب پروفایل را می‌سازند.", "A banner, portrait and biography establish the profile hierarchy."),
          ),
          note(
            l("کشف پیوسته", "Connected discovery"),
            l(
              "کارت‌های مشاوران مرتبط، پروفایل را دوباره به کل تیم وصل می‌کنند.",
              "Related consultant cards connect the profile back to the wider team.",
            ),
          ),
        ],
        figure: fig(
          deltaConsultants,
          l("فهرست مشاوران و صفحه‌ی پروفایل یک مشاور", "The consultant directory and a consultant profile"),
          l("فهرست مشاوران · پروفایل", "Directory · Profile"),
        ),
      },
      {
        id: "editorial",
        kicker: l("محتوا / کشف", "Editorial / Discovery"),
        title: l("خانه‌ای برای محتوای آموزشی", "A home for learning content"),
        lead: l(
          "مقاله‌ها و پادکست‌ها بخش‌های جداگانه‌ای در یک مقصد محتوایی مشترک دارند. صفحه‌ی مقاله، متن بلند را زیر یک معرفی تصویری برجسته و در سطحی متمرکز برای خواندن قرار می‌دهد.",
          "Articles and podcasts occupy separate sections within a shared editorial destination. A single-article view places a long-form text panel beneath a prominent visual introduction.",
        ),
        notes: [
          note(
            l("شبکه‌ی مقالات", "Article grid"),
            l(
              "کارت‌های تصویری مقالات در یک شبکه‌ی منظم می‌آیند و فیلترها و صفحه‌بندی قاب مجموعه‌اند.",
              "Image-led article cards use a regular grid, with filters and pagination framing the collection.",
            ),
          ),
          note(
            l("فهرست پادکست", "Podcast list"),
            l(
              "ردیف‌های فشرده‌ی پادکست الگوی متمایزی می‌سازند و همان زبان جست‌وجو و فیلتر را حفظ می‌کنند.",
              "Compact podcast rows create a distinct pattern while retaining the same search and filter language.",
            ),
          ),
          note(
            l("پنل متن جدا", "A contained text panel"),
            l(
              "یک سطح سفید با گوشه‌های گرد، مقاله را از بقیه‌ی صفحه جدا می‌کند.",
              "A rounded white surface separates the article from the surrounding page.",
            ),
          ),
        ],
        figure: fig(
          deltaEditorial,
          l("فهرست مقالات و پادکست‌ها و صفحه‌ی یک مقاله", "The article and podcast listing and a single article"),
          l("مقالات و پادکست‌ها · صفحه‌ی مقاله", "Articles & podcasts · Article page"),
        ),
      },
      {
        id: "media",
        kicker: l("رسانه / پادکست", "Media / Podcast"),
        title: l("اول تماشا", "Watch first"),
        lead: l(
          "صفحه‌ای رسانه‌محور که پخش‌کننده، توضیحات و موارد مرتبط را در یک مقصد جمع می‌کند.",
          "A media-led page brings the player, descriptive content and related items into one destination.",
        ),
        notes: [
          note(
            l("رسانه در مرکز", "Media takes the lead"),
            l(
              "پخش‌کننده‌ی بزرگ نقطه‌ی تمرکز اصلی است و زیر آن، پنلی توضیحات را کنار فهرست رسانه‌های مرتبط می‌گذارد.",
              "A large player creates the primary focal point. Below it, a supporting panel pairs descriptive text with a list of related media.",
            ),
          ),
        ],
        figure: fig(
          deltaMedia,
          l("صفحه‌ی پخش پادکست و ویدئو در دلتا کنکور", "The Delta Konkur podcast and video player page"),
          l("صفحه‌ی کامل / پخش‌کننده", "Full page / player detail"),
        ),
      },
      {
        id: "about",
        kicker: l("درباره / داستان برند", "About / Brand story"),
        title: l("هویتی مشترک در سراسر سایت", "A shared identity across the site"),
        lead: l(
          "صفحه‌ی درباره‌ی ما همان زبان بصری را به داستان پلتفرم، تصاویر تیم و فرم تماس می‌برد.",
          "The about page extends the same visual language into the platform story, team imagery and a contact form.",
        ),
        notes: [
          note(
            l("نشانه‌های آشنا", "Recognizable motifs"),
            l(
              "گرادیان‌های نرم، سطوح گرد و جزئیات دفترچه‌ای این صفحه را به کاتالوگ و فهرست مشاوران وصل می‌کنند.",
              "Soft gradients, rounded surfaces and notebook details connect this page to the catalog and directory.",
            ),
          ),
          note(
            l("حضور انسانی", "A human presence"),
            l(
              "عکس‌های تیم، معرفی را محکم می‌کند و پیوستگی با صفحه‌های مشاوران را بیشتر می‌کند.",
              "Team photography anchors the introduction and adds continuity with the consultant pages.",
            ),
          ),
        ],
        figure: fig(
          deltaAbout,
          l("صفحه‌ی درباره‌ی ما در دلتا کنکور", "The Delta Konkur about page"),
          l("درباره‌ی ما", "About"),
        ),
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "extra-eye",
    concept: false,
    title: l("Extra Eye", "Extra Eye"),
    category: l("وب‌سایت · لندینگ محصول", "Website · Product landing page"),
    oneLiner: l("خانه‌ای برای مدیریت دوربین‌ها از راه دور.", "A home for remote camera management."),
    summary: l(
      "لندینگ محصولی که اپلیکیشن را معرفی می‌کند، گزینه‌های اشتراک را توضیح می‌دهد و بازدیدکننده را تا نصب همراهی می‌کند.",
      "A product landing page that introduces the app, explains subscription options and guides visitors toward installation.",
    ),
    theme: {
      bg: "#4146d8",
      title: "#e3e4ff",
      text: "#ffffff",
      heroBg: "#e9eaff",
      heroText: "#2b2fb0",
      paper: "#f4f5fc",
      paperText: "#1d1e33",
      accent: "#4146d8",
    },
    cover: {
      src: eyeCover,
      alt: l(
        "لندینگ Extra Eye در تم تیره و روشن، همراه با نسخه‌ی تبلت",
        "The Extra Eye landing page in dark and light themes, with the tablet layout",
      ),
    },
    detail: { src: eyeDetail, rotate: -3, alt: l("بخش آغازین لندینگ Extra Eye", "Opening section of the Extra Eye landing page") },
    facts: {
      platform: l("دسکتاپ و تبلت", "Desktop & tablet"),
      screens: 4,
    },
    focus: note(
      l("تم و چیدمان", "Theme & layout"),
      l(
        "نمایش روشن و تیره، همراه با چیدمان‌های متناظر برای تبلت.",
        "Light and dark presentations, with corresponding tablet layouts.",
      ),
    ),
    meta: {},
    sections: [
      {
        id: "themes",
        kicker: l("مقایسه‌ی تم", "Theme comparison"),
        title: l("یک چیدمان، دو تم بصری", "One layout, two visual themes"),
        lead: l(
          "بخش آغازین در هر دو نمایش روشن و تیره، از یک ساختار محتوایی مشترک استفاده می‌کند.",
          "The opening sequence uses the same content structure in light and dark presentations.",
        ),
        figure: fig(
          eyeThemes,
          l("صفحه‌ی کامل Extra Eye در تم روشن و تیره کنار هم", "The full Extra Eye page in light and dark themes side by side"),
          l("روشن · تیره", "Light · Dark"),
        ),
      },
      {
        id: "responsive",
        kicker: l("چیدمان واکنش‌گرا", "Responsive layout"),
        title: l("بومی باریک‌تر", "A narrower canvas"),
        lead: l(
          "محتوای پشت‌سرهم و کارت‌های اشتراکِ عمودی، صفحه را برای نمای تبلت آماده می‌کنند.",
          "Stacked content and vertically arranged subscription cards adapt the landing page to a tablet viewport.",
        ),
        notes: [
          note(
            l("محتوا روی هم می‌نشیند", "Content stacks"),
            l(
              "تصویر اصلی، تیتر و دکمه‌ی اصلی، معرفی عمودی صفحه را می‌سازند.",
              "The hero artwork, headline and primary action form a vertical introduction.",
            ),
          ),
          note(
            l("هویت مشترک", "A common identity"),
            l(
              "سطوح آبی برند، تصاویر گوشی و فرم‌های تکرارشونده هر دو تم را به هم وصل می‌کنند.",
              "Blue brand surfaces, phone imagery and recurring shapes connect both themes.",
            ),
          ),
        ],
        figure: fig(
          eyeResponsive,
          l("نسخه‌های دسکتاپ و تبلت Extra Eye در هر دو تم", "Extra Eye desktop and tablet layouts in both themes"),
          l("دسکتاپ روشن و تیره · تبلت روشن و تیره", "Desktop light & dark · Tablet light & dark"),
        ),
      },
      {
        id: "plans",
        kicker: l("ویژگی‌ها / اشتراک‌ها", "Features / Subscriptions"),
        title: l("روایتی ساخت‌یافته از محصول", "A structured product story"),
        lead: l(
          "توضیح ویژگی‌ها به انتخاب اشتراک‌ها در کنار هم می‌رسد و بعد راهنمای نصب و اطلاعات تکمیلی می‌آید.",
          "Feature explanations lead into side-by-side subscription choices, followed by installation guidance and supporting information.",
        ),
        notes: [
          note(
            l("مقایسه‌ی پلن‌ها", "Compare plans"),
            l(
              "سه کارت تکرارشونده ویژگی‌ها، مدت‌زمان‌ها و دکمه‌ی خرید را نشان می‌دهند.",
              "Three repeated cards present features, duration choices and a purchase action.",
            ),
          ),
          note(
            l("پشتیبانی از تصمیم", "Support the decision"),
            l(
              "راهنمای نصب، نظرها و پرسش‌های پرتکرار بعد از بخش‌های محصول می‌آیند.",
              "Installation guidance, testimonials and frequently asked questions follow the product sections.",
            ),
          ),
          note(
            l("یک لندینگ پیوسته", "A continuous landing page"),
            l(
              "ناوبری، معرفی ویژگی‌ها، انتخاب پلن و لینک‌های دانلود در یک صفحه‌ی بلند کنار هم‌اند.",
              "Navigation, feature discovery, plan selection and download links share one long-form page.",
            ),
          ),
        ],
        figure: fig(
          eyePlans,
          l("صفحه‌ی کامل تم تیره Extra Eye در سه ستون", "The full dark-theme Extra Eye page in three columns"),
          l("تیره / صفحه‌ی کامل · مقایسه‌ی اشتراک‌ها", "Dark / full page · Subscription comparison"),
        ),
        full: true,
      },
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "bonban",
    concept: false,
    title: l("بن‌بان", "Bonban"),
    category: l("اپلیکیشن موبایل · مراقبت از گیاه", "Mobile app · Plant care"),
    oneLiner: l("مراقبت از گیاه، همیشه دم دست.", "Plant care, close at hand."),
    summary: l(
      "رابطی موبایل برای بررسی وضعیت گیاه، دیدن توصیه‌های نگهداری و گرفتن عکس از گیاه یا محیط اطرافش.",
      "A mobile interface for checking plant condition, exploring care advice and capturing images of a plant or its surroundings.",
    ),
    theme: {
      bg: "#e4f1df",
      title: "#138a43",
      text: "#173a24",
      heroBg: "#138a43",
      heroText: "#eef8ea",
      paper: "#f4f8f2",
      paperText: "#173a24",
      accent: "#138a43",
    },
    cover: {
      src: bonbanCover,
      alt: l(
        "سه صفحه از بن‌بان: خوش‌آمدگویی، خانه با وضعیت گیاه و دوربین",
        "Three Bonban screens: welcome, home with plant status, and the camera",
      ),
    },
    detail: { src: bonbanDetail, rotate: 4, alt: l("صفحه‌ی خانه‌ی بن‌بان", "Bonban home screen") },
    facts: {
      platform: l("اپلیکیشن موبایل", "Mobile app"),
      screens: 9,
    },
    focus: note(
      l("مشاهده و مراقبت", "Observe & care"),
      l(
        "داشبورد گیاه، ورودی دوربین، شاخص‌های مراقبت و کارهای عملی را به هم وصل می‌کند.",
        "A plant dashboard connects camera input, care indicators and practical tasks.",
      ),
    ),
    meta: {},
    sections: [
      {
        id: "intro",
        kicker: mobileUI,
        title: l("آشنایی آرام", "A gentle introduction"),
        notes: [
          note(
            l("هویتی طبیعی", "A natural identity"),
            l("تصاویر گیاه و رنگ سبز، جهت بصری اپ را تعیین می‌کنند.", "Plant imagery and green accents establish the visual direction."),
          ),
          note(
            l("نقطه‌ی ورود متمرکز", "A focused entry point"),
            l(
              "صفحه‌ی حساب فقط یک فیلد شماره‌ی تلفن دارد و کنارش دکمه‌ی ثبت‌نام برجسته است.",
              "The account screen pairs one phone-number field with a prominent registration action.",
            ),
          ),
        ],
        figure: fig(
          bonbanIntro,
          l("صفحه‌های شروع، خوش‌آمدگویی و ساخت حساب بن‌بان", "Bonban splash, welcome and create-account screens"),
          l("شروع · خوش‌آمدگویی · ساخت حساب", "Splash · Welcome · Create account"),
        ),
        full: true,
      },
      {
        id: "advice",
        kicker: mobileUI,
        title: l("از وضعیت گیاه تا توصیه‌ی مراقبت", "From plant status to care advice"),
        notes: [
          note(
            l("وضعیت در یک نگاه", "Status at a glance"),
            l("شاخص‌های مراقبت مستقیم روی تصویر گیاه انتخاب‌شده می‌نشینند.", "Care indicators sit directly over the selected plant image."),
          ),
          note(
            l("توصیه هر وقت لازم شد", "Advice on demand"),
            l(
              "بخش‌های بازشونده راهنما را نشان می‌دهند و بقیه‌ی موضوع‌ها را جمع نگه می‌دارند.",
              "Expandable sections reveal guidance while keeping other topics compact.",
            ),
          ),
          note(
            l("یک کار مشخص", "A concrete task"),
            l(
              "ابزار سنجش نور، از جای فعلی گیاه و جاهای جایگزین عکس می‌خواهد.",
              "The light-assessment tool asks for photos of the plant location and alternative spaces.",
            ),
          ),
        ],
        figure: fig(
          bonbanAdvice,
          l("خانه‌ی بن‌بان، توصیه‌ی بازشده و شروع ابزار مراقبت", "Bonban home, expanded advice and the care tool"),
          l("خانه / نمای کلی · توصیه‌ی بازشده · ابزار مراقبت", "Home / overview · Expanded advice · Care tool"),
        ),
        full: true,
      },
      {
        id: "progress",
        kicker: mobileUI,
        title: l("پیشرفت کار را نشان بده", "Show progress through the task"),
        notes: [
          note(
            l("تغییر وضعیت قابل‌دیدن", "Visible state changes"),
            l(
              "با انجام هر عکس، نشانگرهای خالی به تیک سبز تبدیل می‌شوند.",
              "Outlined markers become green checkmarks as photo tasks are completed.",
            ),
          ),
          note(
            l("بازخورد پایان کار", "Completion feedback"),
            l("در پایان، یک بنر تأیید بالای ابزار ظاهر می‌شود.", "The completed view adds a confirmation banner above the tool."),
          ),
          note(
            l("حفظ زمینه", "Keep the context"),
            l(
              "گیاه انتخاب‌شده و دسته‌ی مراقبت در تمام مراحل دیده می‌شوند.",
              "The selected plant and care category remain visible throughout the sequence.",
            ),
          ),
        ],
        figure: fig(
          bonbanProgress,
          l("سه مرحله‌ی ابزار مراقبت بن‌بان: شروع‌نشده، یک قدم، تمام‌شده", "Three stages of the Bonban care tool: not started, one step, complete"),
          l("شروع‌نشده · یک قدم انجام‌شده · کار تمام‌شده", "Not started · One step complete · Task complete"),
        ),
        full: true,
      },
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: "jewelry-store",
    concept: false,
    title: l("فروشگاه جواهر", "Jewelry Store"),
    category: l("وب‌سایت · فروشگاه آنلاین", "Website · Online storefront"),
    oneLiner: l("ویترینی تصویری برای طلا و جواهر.", "A visual storefront for gold and jewelry."),
    summary: l(
      "صفحه‌ای دسکتاپ که عکاسی مجله‌ای، کشف محصول و خرید بر پایه‌ی مجموعه‌ها را کنار هم می‌آورد.",
      "A desktop landing page that combines editorial photography, product discovery and collection-led shopping.",
    ),
    theme: {
      bg: "#141c4f",
      title: "#e7d3a1",
      text: "#eef0fa",
      heroBg: "#efe6d2",
      heroText: "#141c4f",
      paper: "#f6f3ec",
      paperText: "#1a1d33",
      accent: "#b08a3e",
    },
    cover: {
      src: jewelryCover,
      alt: l(
        "صفحه‌ی فروشگاه جواهر در دو ستون: معرفی، محصولات، ویترین و هدیه",
        "The jewelry storefront in two columns: hero, products, showcase and gift section",
      ),
    },
    detail: { src: jewelryDetail, rotate: -2, alt: l("پرتره‌ی طاق‌دار در فروشگاه جواهر", "Arched portrait from the jewelry storefront") },
    facts: {
      platform: l("وب · دسکتاپ", "Desktop web"),
      screens: 1,
      areas: {
        fa: ["مرور مجموعه‌ها", "کارت‌های محصول", "روایت برند"],
        en: ["Collection browsing", "Product cards", "Brand storytelling"],
      },
    },
    meta: {},
    sections: [
      {
        id: "discovery",
        kicker: l("کشف محصول", "Product discovery"),
        title: l("مجموعه را در مرکز توجه بگذار", "Bring the collection into focus"),
        lead: l(
          "ویترین محصولات، عکس، قیمت، انتخاب رنگ و دکمه‌ی افزودن به سبد را در الگوی کارت تکرارشونده کنار هم می‌آورد.",
          "A product showcase uses photography, pricing, color choices and add-to-cart actions within a repeatable card pattern.",
        ),
        figure: fig(
          jewelryDiscovery,
          l("صفحه‌ی کامل فروشگاه جواهر در سه ستون", "The full jewelry storefront in three columns"),
          l("صفحه‌ی کامل · ویترین محصولات", "Full page · Product showcase"),
        ),
        full: true,
      },
      {
        id: "editorial",
        kicker: l("ترکیب‌بندی مجله‌ای", "Editorial composition"),
        title: l("از محصول تا داستان برند", "From product to brand story"),
        lead: l(
          "عکس و متن به‌تناوب می‌آیند و میان بخش‌های محصول‌محور و برندمحور ریتم می‌سازند.",
          "Alternating photography and text create a rhythm between product-led and brand-led sections.",
        ),
        notes: [
          note(
            l("فرم، قاب تصویر است", "Shape frames the image"),
            l(
              "پرتره‌ی طاق‌دار، جزئیات جواهر و دکمه‌ی خرید، معرفی یک مجموعه را به لحظه‌ای مجله‌ای تبدیل می‌کنند.",
              "An arched portrait, jewelry detail and shopping action turn a collection introduction into a distinct editorial moment.",
            ),
          ),
          note(
            l("رنگ، داستان را نگه می‌دارد", "Color holds the story"),
            l(
              "پنل متن سرمه‌ای، نظر مشتری را کنار عکس پرتره محکم و دیدنی می‌کند.",
              "A deep blue text panel gives the testimonial a strong visual anchor beside the portrait photography.",
            ),
          ),
        ],
        figure: fig(
          jewelryEditorial,
          l("بخش‌های مجموعه، هدیه، ویترین و نظر مشتری", "Collection, gift, showcase and testimonial sections"),
          l("معرفی مجموعه · بخش نظر مشتری", "Collection feature · Testimonial section"),
        ),
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: "banzi",
    concept: false,
    title: l("بان‌زی", "Banzi"),
    category: l("اپلیکیشن موبایل · مراقبت از حیوان خانگی", "Mobile app · Pet care"),
    oneLiner: l("همراهی برای مراقبت روزانه از حیوان خانگی.", "A companion for everyday pet care."),
    summary: l(
      "تجربه‌ای موبایل که وضعیت حیوان، راهنمای مراقبت، کارهای مبتنی بر عکس و جریان تشخیص را در یک اپ جمع می‌کند.",
      "A mobile experience that brings pet status, care guidance, photo-based tasks and a recognition flow into one app.",
    ),
    theme: {
      bg: "#fbe7d4",
      title: "#c9520f",
      text: "#3a2414",
      heroBg: "#d4621c",
      heroText: "#fff4ea",
      paper: "#fdf6ef",
      paperText: "#3a2414",
      accent: "#d4621c",
    },
    cover: {
      src: banziCover,
      alt: l(
        "سه صفحه از بان‌زی: معرفی، خانه با وضعیت حیوان و نتیجه‌ی تشخیص",
        "Three Banzi screens: introduction, home with pet status, and a recognition result",
      ),
    },
    detail: { src: banziDetail, rotate: 3, alt: l("صفحه‌ی خوش‌آمدگویی بان‌زی", "Banzi welcome screen") },
    facts: {
      platform: l("اپلیکیشن موبایل", "Mobile app"),
      screens: 12,
    },
    focus: note(
      l("مراقبتی که دلنشین است", "Care feels approachable"),
      l(
        "رنگ نارنجی گرم، تصویرسازی‌های بازیگوش و الگوهای آشنای موبایل، تجربه را شکل می‌دهند.",
        "Warm orange accents, playful illustrations and familiar mobile patterns shape the experience.",
      ),
    ),
    meta: {},
    sections: [
      {
        id: "intro",
        kicker: mobileUI,
        title: l("حال‌وهوا را قبل از ثبت‌نام بساز", "Set the tone before sign-up"),
        notes: [
          note(
            l("اولین تماس دوستانه", "Friendly first contact"),
            l("تصویرسازی‌های سه‌بعدی بزرگ، پیام‌های آغازین را می‌رسانند.", "Large 3D illustrations carry the opening messages."),
          ),
          note(
            l("هر صفحه یک ایده", "One idea per screen"),
            l("جمله‌های کوتاه، اپ را در سه صفحه‌ی پشت‌سرهم معرفی می‌کنند.", "Short statements introduce the app across a three-screen sequence."),
          ),
          note(
            l("قدم بعدی پیدا", "A visible next step"),
            l(
              "نقطه‌های پیشرفت و دکمه‌های نارنجی مسیر معرفی را مشخص می‌کنند.",
              "Progress dots and orange actions mark the path through the introduction.",
            ),
          ),
        ],
        figure: fig(
          banziIntro,
          l("سه صفحه‌ی معرفی بان‌زی با تصویرسازی سه‌بعدی", "Banzi’s three introduction screens with 3D illustrations"),
          l("معرفی ۰۱ · ۰۲ · ۰۳", "Introduction 01 · 02 · 03"),
        ),
        full: true,
      },
      {
        id: "identity",
        kicker: l("هویت / دسترسی به حساب", "Identity / Account access"),
        title: l("اولین تعاملی گرم", "A warm first interaction"),
        lead: l(
          "صفحه‌های شروع و ثبت‌نام، نقش پنجه و رنگ نارنجی را به‌عنوان نشانه‌های مشترک معرفی می‌کنند.",
          "The splash and registration screens introduce a shared paw motif and orange accent color.",
        ),
        notes: [
          note(
            l("پنجه و رنگ", "Paw & color"),
            l(
              "نماد تصویرسازی‌شده و رنگ تأکیدی، برند را به صفحه‌های کاربردی وصل می‌کنند.",
              "The illustrated symbol and accent color connect branding with the functional screens.",
            ),
          ),
          note(
            l("اقدامی روشن", "A clear action"),
            l(
              "ثبت‌نام با شماره‌ی تلفن همان دکمه‌ی گرد صفحه‌های معرفی را دارد.",
              "Phone-number registration uses the same rounded action treatment as the onboarding screens.",
            ),
          ),
        ],
        figure: fig(
          banziIdentity,
          l("صفحه‌های شروع، خوش‌آمدگویی و ساخت حساب بان‌زی", "Banzi splash, welcome and create-account screens"),
          l("شروع / هویت · ساخت حساب", "Splash / identity · Create account"),
        ),
        full: true,
      },
      {
        id: "task",
        kicker: mobileUI,
        title: l("یک کار مراقبتی، قدم‌به‌قدم", "Break a care task into steps"),
        notes: [
          note(
            l("انتخاب حوزه‌ی مراقبت", "Choose a care area"),
            l(
              "نوار فشرده‌ی دسته‌ها، خواب، تغذیه، بهداشت و سلامت را معرفی می‌کند.",
              "A compact category strip introduces sleep, nutrition, hygiene and health.",
            ),
          ),
          note(
            l("ثبت زمینه", "Capture context"),
            l(
              "کار مربوط به خواب، از جای فعلی خواب و یک جای جایگزین عکس می‌خواهد.",
              "The sleep task asks for a photo of the current sleeping area and an alternative.",
            ),
          ),
          note(
            l("تأیید هر قدم", "Confirm each step"),
            l("نشانگرهای نارنجی، پیشرفت را در فهرست کارها نشان می‌دهند.", "Orange completion markers show progress within the checklist."),
          ),
        ],
        figure: fig(
          banziTask,
          l("سه مرحله‌ی یک کار مراقبتی در بان‌زی", "Three stages of a Banzi care task"),
          l("شروع کار · در حال انجام · تمام‌شده", "Task start · In progress · Complete"),
        ),
        full: true,
      },
      {
        id: "capture",
        kicker: mobileUI,
        title: l("بگیر، تشخیص بده، ادامه بده", "Capture, recognize, continue"),
        notes: [
          note(
            l("نمای دوربین اختصاصی", "A dedicated camera view"),
            l("کنترل‌های عکاسی دور یک پیش‌نمایش تمام‌صفحه قرار می‌گیرند.", "Capture controls sit around a full-screen image preview."),
          ),
          note(
            l("نتیجه‌ای متمرکز", "A focused result"),
            l(
              "کارت نتیجه در وسط، حیوان تشخیص‌داده‌شده و اقدام بعدی را نشان می‌دهد.",
              "A centered result card presents the recognized pet and a next action.",
            ),
          ),
          note(
            l("بازگشت به مراقبت", "Return to care"),
            l(
              "صفحه‌ی خانه وضعیت حیوان، دکمه‌ی دوربین و توصیه‌های بازشونده را کنار هم دارد.",
              "The home interface combines pet status, a camera action and expandable advice.",
            ),
          ),
        ],
        figure: fig(
          banziCapture,
          l("دوربین، نتیجه‌ی تشخیص و خانه‌ی بان‌زی", "Banzi camera, recognition result and home"),
          l("دوربین · نتیجه‌ی تشخیص · خانه", "Camera · Recognition · Home"),
        ),
        full: true,
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
