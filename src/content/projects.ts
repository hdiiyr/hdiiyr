/**
 * Projects shown on the home gallery and as case studies at /[locale]/work/[slug].
 * Order here = order on the site. Swap these four concept projects for real work by
 * editing this file; images live in ./media/<slug>/ (rendered from design/mockups).
 */
import type { Project } from "./types";

import navaCover from "./media/nava/cover.webp";
import navaDetail from "./media/nava/detail.webp";
import navaD1 from "./media/nava/d1.webp";
import navaD2 from "./media/nava/d2.webp";
import navaWide from "./media/nava/wide.webp";

import daftarCover from "./media/daftar/cover.webp";
import daftarDetail from "./media/daftar/detail.webp";
import daftarD1 from "./media/daftar/d1.webp";
import daftarD2 from "./media/daftar/d2.webp";
import daftarWide from "./media/daftar/wide.webp";

import karvanCover from "./media/karvan/cover.webp";
import karvanDetail from "./media/karvan/detail.webp";
import karvanD1 from "./media/karvan/d1.webp";
import karvanD2 from "./media/karvan/d2.webp";
import karvanWide from "./media/karvan/wide.webp";

import bargCover from "./media/barg/cover.webp";
import bargDetail from "./media/barg/detail.webp";
import bargD1 from "./media/barg/d1.webp";
import bargD2 from "./media/barg/d2.webp";
import bargWide from "./media/barg/wide.webp";

const conceptResult = (fa: string, en: string) => ({
  fa: `این یک پروژه مفهومی است و هنوز با کاربر واقعی آزمایش نشده؛ بنابراین نتیجه‌ی عددی ندارد. ${fa}`,
  en: `This is a concept project and has not been tested with real users yet, so there are no results to report. ${en}`,
});

export const projects: Project[] = [
  {
    slug: "nava",
    concept: true,
    title: { fa: "نوا", en: "Nava" },
    category: { fa: "اپلیکیشن موبایل · طراحی محصول", en: "Mobile app · Product design" },
    oneLiner: {
      fa: "اپلیکیشن موسیقی و پادکستی که از روز اول برای شنونده‌ی فارسی‌زبان و راست‌به‌چپ طراحی شده.",
      en: "A music and podcast app designed from day one for Persian, right-to-left listening.",
    },
    summary: {
      fa: "بیشتر اپلیکیشن‌های پخش، فارسی را بعداً به خودشان اضافه کرده‌اند. نوا سؤال را برعکس می‌پرسد: اگر شنیدن از اول راست‌به‌چپ طراحی شود، چه شکلی پیدا می‌کند؟",
      en: "Most streaming apps bolt Persian on later. Nava asks the opposite question: what does listening look like when it is designed right-to-left from the start?",
    },
    theme: {
      bg: "#22384a",
      title: "#d9e6e3",
      text: "#f4f8f7",
      heroBg: "#d4e2de",
      heroText: "#1d3142",
      paper: "#f3f6f5",
      paperText: "#1d3142",
      accent: "#d8603f",
    },
    cover: {
      src: navaCover,
      alt: {
        fa: "سه صفحه از اپلیکیشن نوا: خانه، صفحه‌ی پخش و جست‌وجو",
        en: "Three Nava screens: home, now playing and search",
      },
    },
    detail: {
      src: navaDetail,
      rotate: -4,
      alt: { fa: "صفحه‌ی پخش نوا", en: "Nava’s now-playing screen" },
    },
    meta: {
      scope: {
        fa: ["تحقیق اولیه", "طراحی تجربه کاربری", "طراحی رابط کاربری", "سیستم کامپوننت"],
        en: ["Early research", "UX design", "UI design", "Component system"],
      },
    },
    problem: {
      fa: "شنونده‌ی فارسی‌زبان هر روز با رابط‌هایی کار می‌کند که برای چپ‌به‌راست ساخته شده‌اند: نوار پیشرفت از سمت اشتباه پر می‌شود، فلش‌ها برعکس‌اند و عنوان فارسی کنار متن لاتین به‌هم می‌ریزد.",
      en: "Persian listeners use interfaces built for left-to-right every day: progress bars fill from the wrong side, arrows point backwards and Persian titles break next to Latin text.",
    },
    goal: {
      fa: "طراحی تجربه‌ی پخشی که در آن جهت، تایپوگرافی و اعداد فارسی بخشی از سیستم باشند، نه وصله‌ای که بعداً اضافه شود.",
      en: "Design a playback experience where direction, typography and Persian numerals are part of the system rather than a later patch.",
    },
    constraints: {
      fa: ["استفاده با یک دست روی گوشی‌های بزرگ", "عنوان‌های دوزبانه در یک فهرست", "اینترنت ناپایدار و نیاز به پخش آفلاین"],
      en: ["One-handed use on large phones", "Bilingual titles in the same list", "Unstable connections and offline playback"],
    },
    decisions: [
      {
        title: { fa: "کنترل‌ها در دسترس شست", en: "Controls within thumb reach" },
        body: {
          fa: "دکمه‌های اصلی پخش به نیمه‌ی پایین صفحه آمدند و مینی‌پلیر سه حالت گرفت تا بدون جابه‌جا کردن گوشی بشود قطعه را عوض کرد.",
          en: "The main playback controls moved to the lower half of the screen, and the mini player gained three states so you can change tracks without shifting your grip.",
        },
        figure: {
          src: navaD1,
          alt: { fa: "صفحه‌ی پخش و حالت‌های مینی‌پلیر با محدوده‌ی دسترسی شست", en: "Now playing and mini-player states with the thumb zone marked" },
          caption: { fa: "حالت‌های مینی‌پلیر و محدوده‌ی دسترسی شست", en: "Mini-player states and the thumb zone" },
        },
      },
      {
        title: { fa: "کامپوننت‌هایی که جهت را می‌فهمند", en: "Components that understand direction" },
        body: {
          fa: "نوار پیشرفت، اسلایدر صدا و فهرست فصل‌های پادکست از راست شروع می‌شوند. آیکون‌های جهت‌دار با زبان آینه می‌شوند و بقیه ثابت می‌مانند.",
          en: "The progress bar, volume slider and podcast chapters start from the right. Directional icons mirror with the language; the rest stay put.",
        },
        figure: {
          src: navaD2,
          alt: { fa: "برگه‌ی کامپوننت‌های راست‌به‌چپ نوا", en: "Sheet of Nava’s right-to-left components" },
          caption: { fa: "بخشی از برگه‌ی کامپوننت‌ها", en: "Part of the component sheet" },
        },
      },
    ],
    solution: {
      body: {
        fa: "نتیجه، یک جریان پنج‌صفحه‌ای است: انتخاب سلیقه، خانه، جست‌وجو، پلی‌لیست و صفحه‌ی پخش؛ همه روی یک سیستم رنگ و تایپوگرافی مشترک.",
        en: "The result is a five-screen flow — taste picker, home, search, playlist and now playing — on one shared colour and type system.",
      },
      figure: {
        src: navaWide,
        alt: { fa: "پنج صفحه‌ی اصلی نوا کنار هم", en: "Nava’s five main screens side by side" },
        caption: { fa: "جریان اصلی، از شروع تا پخش", en: "The main flow, from onboarding to playback" },
      },
    },
    result: conceptResult(
      "قدم بعدی، تست کاربردپذیری با پنج شنونده و مقایسه‌ی زمان انجام کارهای اصلی با یک اپلیکیشن رایج است.",
      "The next step is a usability test with five listeners, comparing task time against a popular app.",
    ),
    learned: {
      fa: "راست‌به‌چپ فقط آینه کردن صفحه نیست؛ باید برای هر کامپوننت جداگانه تصمیم گرفت که جهتش معنا دارد یا نه.",
      en: "Right-to-left is not just mirroring the screen; each component needs its own decision about whether its direction carries meaning.",
    },
  },
  {
    slug: "daftar",
    concept: true,
    title: { fa: "دفتر", en: "Daftar" },
    category: { fa: "وب‌اپلیکیشن · داشبورد مالی", en: "Web app · Finance dashboard" },
    oneLiner: {
      fa: "فاکتور، دریافت و گزارش مالیاتی برای فریلنسرها، در یک دفتر ساده و آرام.",
      en: "Invoices, payments and tax-ready reports for freelancers, in one calm ledger.",
    },
    summary: {
      fa: "فریلنسرها معمولاً حساب‌وکتاب را بین صفحه‌گسترده، پیام‌رسان و حافظه پخش می‌کنند. دفتر تلاش می‌کند همه‌ی این‌ها را به یک مرور هفتگی کوتاه تبدیل کند.",
      en: "Freelancers usually spread their bookkeeping across spreadsheets, chat apps and memory. Daftar tries to turn it all into one short weekly review.",
    },
    theme: {
      bg: "#efece4",
      title: "#1f5d4c",
      text: "#26302c",
      heroBg: "#1f5d4c",
      heroText: "#f4f1e8",
      paper: "#f7f5ef",
      paperText: "#1e2622",
      accent: "#b9822a",
    },
    cover: {
      src: daftarCover,
      alt: {
        fa: "داشبورد دسکتاپ دفتر همراه با نسخه‌ی موبایل برای ثبت هزینه",
        en: "Daftar’s desktop dashboard with the mobile expense capture",
      },
    },
    detail: {
      src: daftarDetail,
      rotate: 3,
      alt: { fa: "جزئیات فاکتور و لینک پرداخت در موبایل", en: "Invoice detail and payment link on mobile" },
    },
    meta: {
      scope: {
        fa: ["طراحی تجربه کاربری", "طراحی داشبورد", "نسخه‌ی موبایل", "مصورسازی داده"],
        en: ["UX design", "Dashboard design", "Mobile companion", "Data visualisation"],
      },
    },
    problem: {
      fa: "پیگیری فاکتورهای معوق، جدا کردن هزینه‌های کاری از شخصی و آماده کردن اطلاعات مالیاتی، کارهایی هستند که فریلنسرها تا آخرین لحظه عقب می‌اندازند.",
      en: "Chasing overdue invoices, separating work and personal expenses and preparing tax figures are the jobs freelancers postpone until the last minute.",
    },
    goal: {
      fa: "فضایی که وضعیت مالی را در یک نگاه نشان دهد و ساخت و ارسال فاکتور را به چند قدم کوتاه برساند.",
      en: "A workspace that shows the financial picture at a glance and reduces creating and sending an invoice to a few short steps.",
    },
    constraints: {
      fa: ["تاریخ شمسی و مبلغ به تومان", "کاربرانی که حسابدار نیستند", "استفاده هم روی دسکتاپ و هم روی موبایل"],
      en: ["Jalali dates and amounts in Toman", "Users who are not accountants", "Use on both desktop and mobile"],
    },
    decisions: [
      {
        title: { fa: "فاکتور با پیش‌نمایش زنده", en: "Invoices with a live preview" },
        body: {
          fa: "فرم و نسخه‌ی چاپی کنار هم دیده می‌شوند؛ هر تغییری بلافاصله در فاکتور نهایی پیداست و جایی برای حدس زدن نمی‌ماند.",
          en: "The form and the printed version sit side by side; every change shows up in the final invoice immediately, leaving nothing to guess.",
        },
        figure: {
          src: daftarD1,
          alt: { fa: "فرم ساخت فاکتور کنار پیش‌نمایش چاپی", en: "Invoice form next to its print preview" },
          caption: { fa: "فرم فاکتور و پیش‌نمایش هم‌زمان", en: "Invoice form and live preview" },
        },
      },
      {
        title: { fa: "گزارشی که فریلنسر می‌فهمد", en: "Reports a freelancer understands" },
        body: {
          fa: "به‌جای جدول‌های حسابداری، چند کارت ساده: درآمد در برابر هزینه، دسته‌بندی‌ها، تخمین مالیات و یادآوری فاکتورهای معوق.",
          en: "Instead of accounting tables, a few simple cards: income against expenses, categories, a tax estimate and overdue-invoice reminders.",
        },
        figure: {
          src: daftarD2,
          alt: { fa: "کارت‌های گزارش ماهانه‌ی دفتر", en: "Daftar’s monthly report cards" },
          caption: { fa: "کارت‌های گزارش ماهانه", en: "Monthly report cards" },
        },
      },
    ],
    solution: {
      body: {
        fa: "داشبورد دسکتاپ برای مرور هفتگی و اپلیکیشن موبایل برای ثبت سریع هزینه، هر دو روی یک داده‌ی مشترک.",
        en: "A desktop dashboard for the weekly review and a mobile app for quick expense capture, both on the same data.",
      },
      figure: {
        src: daftarWide,
        alt: { fa: "فهرست فاکتورها، صفحه‌ی مشتری‌ها و نسخه‌ی موبایل دفتر", en: "Daftar’s invoice list, clients page and mobile app" },
        caption: { fa: "فاکتورها، مشتری‌ها و نسخه‌ی موبایل", en: "Invoices, clients and the mobile app" },
      },
    },
    result: conceptResult(
      "قدم بعدی، مصاحبه با چند فریلنسر درباره‌ی روال فعلی‌شان و آزمودن جریان ساخت فاکتور با پروتوتایپ است.",
      "The next step is interviewing a few freelancers about their current routine and testing the invoice flow with a prototype.",
    ),
    learned: {
      fa: "در محصولات مالی، آرامش بصری خودش یک ویژگی است؛ هر رنگ هشدار باید دلیل داشته باشد.",
      en: "In finance products, visual calm is a feature in itself; every warning colour needs a reason.",
    },
  },
  {
    slug: "karvan",
    concept: true,
    title: { fa: "کاروان", en: "Karvan" },
    category: { fa: "اپلیکیشن موبایل · سفر و رزرو", en: "Mobile app · Travel & booking" },
    oneLiner: {
      fa: "برنامه‌ریزی سفر در ایران، از انتخاب مقصد تا بلیت قطار، در یک مسیر.",
      en: "Planning a trip in Iran, from picking a destination to the train ticket, in one flow.",
    },
    summary: {
      fa: "برای یک سفر چندروزه در ایران، معمولاً باید بین چند سایت بلیت، صفحه‌های شبکه‌های اجتماعی و پیام دوستان جابه‌جا شد. کاروان این تکه‌ها را در یک برنامه‌ی روزبه‌روز کنار هم می‌گذارد.",
      en: "A multi-day trip in Iran usually means hopping between ticket sites, social media pages and friends’ messages. Karvan puts those pieces together in a day-by-day plan.",
    },
    theme: {
      bg: "#a84d33",
      title: "#fbe6d4",
      text: "#fff7ef",
      heroBg: "#f2dcc8",
      heroText: "#7e3520",
      paper: "#faf3ec",
      paperText: "#3a2117",
      accent: "#1f4e52",
    },
    cover: {
      src: karvanCover,
      alt: {
        fa: "سه صفحه از کاروان: کشف مقصد، برنامه‌ی سفر و بلیت قطار",
        en: "Three Karvan screens: explore, itinerary and train ticket",
      },
    },
    detail: {
      src: karvanDetail,
      rotate: -3,
      alt: { fa: "بلیت قطار در اپلیکیشن کاروان", en: "A train ticket in the Karvan app" },
    },
    meta: {
      scope: {
        fa: ["طراحی تجربه کاربری", "طراحی رابط کاربری", "سیستم تصویرسازی"],
        en: ["UX design", "UI design", "Illustration system"],
      },
    },
    problem: {
      fa: "اطلاعات سفر پراکنده است و برنامه‌ریزی گاهی از خود سفر خسته‌کننده‌تر می‌شود؛ مخصوصاً وقتی ساعت رسیدن قطار با زمان ورود به اقامتگاه جور نیست.",
      en: "Travel information is scattered, and planning can be more tiring than the trip itself — especially when the train’s arrival doesn’t match the lodge’s check-in time.",
    },
    goal: {
      fa: "برنامه‌ای که بشود آن را مثل یک فهرست ساده جابه‌جا کرد و خودش زمان‌های رفت‌وآمد را حساب کند.",
      en: "A plan you can rearrange like a simple list, which works out the travel times on its own.",
    },
    constraints: {
      fa: ["اینترنت ضعیف در مسیرهای بین‌شهری", "نبود عکس باکیفیت و مجاز از همه‌ی مقصدها", "رزرو از چند تأمین‌کننده‌ی مختلف"],
      en: ["Weak connections on intercity routes", "No licensed, high-quality photos for every destination", "Bookings from several different providers"],
    },
    decisions: [
      {
        title: { fa: "برنامه‌ای که شکل می‌گیرد", en: "An itinerary you can reshape" },
        body: {
          fa: "توقف‌ها با کشیدن جابه‌جا می‌شوند و زمان رفت‌وآمد بین آن‌ها خودکار به‌روز می‌شود؛ تداخل‌ها همان لحظه با رنگ نشان داده می‌شوند.",
          en: "Stops move by dragging and the travel time between them updates automatically; conflicts are flagged in colour straight away.",
        },
        figure: {
          src: karvanD1,
          alt: { fa: "ساخت برنامه‌ی روزبه‌روز سفر", en: "Building a day-by-day itinerary" },
          caption: { fa: "ساخت برنامه‌ی روزبه‌روز", en: "Building the day-by-day plan" },
        },
      },
      {
        title: { fa: "تصویرسازی به‌جای عکس تکراری", en: "Illustration instead of stock photos" },
        body: {
          fa: "به‌جای عکس‌های استوک، یک سیستم تصویرسازی ساده برای هر منطقه ساخته شد که سبک است، آفلاین کار می‌کند و هویت یکدستی دارد.",
          en: "Instead of stock photos, a simple illustration system was built for each region: light, offline-friendly and consistent.",
        },
        figure: {
          src: karvanD2,
          alt: { fa: "شش تصویرسازی مقصد با راهنمای رنگ و تایپوگرافی", en: "Six destination illustrations with a colour and type guide" },
          caption: { fa: "سیستم تصویرسازی مقصدها", en: "The destination illustration system" },
        },
      },
    ],
    solution: {
      body: {
        fa: "پنج صفحه‌ی اصلی: کشف مقصد، جزئیات مقصد، برنامه‌ی سفر، رزرو اقامتگاه و بلیت؛ با تصویرسازی‌هایی که در همه‌ی آن‌ها تکرار می‌شوند.",
        en: "Five core screens — explore, destination, itinerary, lodge booking and ticket — tied together by the same illustrations.",
      },
      figure: {
        src: karvanWide,
        alt: { fa: "پنج صفحه‌ی اصلی کاروان کنار هم", en: "Karvan’s five main screens side by side" },
        caption: { fa: "مسیر کامل، از انتخاب مقصد تا بلیت", en: "The full path, from destination to ticket" },
      },
    },
    result: conceptResult(
      "قدم بعدی، آزمودن ساخت برنامه با چند گروه مسافر و بررسی این است که محاسبه‌ی خودکار زمان‌ها چقدر به آن‌ها اعتماد می‌دهد.",
      "The next step is testing itinerary building with a few groups of travellers to see how much the automatic timing earns their trust.",
    ),
  },
  {
    slug: "barg",
    concept: true,
    title: { fa: "برگ", en: "Barg" },
    category: { fa: "اپلیکیشن موبایل · کتاب‌خوان", en: "Mobile app · E-reader" },
    oneLiner: {
      fa: "کتاب‌خوانی که حروف‌چینی فارسی را جدی می‌گیرد.",
      en: "An e-reader that takes Persian typesetting seriously.",
    },
    summary: {
      fa: "خواندن متن فارسی روی گوشی اغلب با فاصله‌های نامنظم، تراز ناقص و فونت نامناسب همراه است. برگ از تایپوگرافی شروع می‌کند و بقیه‌ی تجربه را دور آن می‌سازد.",
      en: "Reading Persian on a phone often comes with uneven spacing, broken justification and poor fonts. Barg starts from typography and builds the rest of the experience around it.",
    },
    theme: {
      bg: "#d9d2ec",
      title: "#2c2457",
      text: "#2c2457",
      heroBg: "#2c2457",
      heroText: "#e6e0f5",
      paper: "#f6f4fb",
      paperText: "#241d45",
      accent: "#b7791f",
    },
    cover: {
      src: bargCover,
      alt: {
        fa: "سه صفحه از برگ: کتاب‌خانه، صفحه‌ی خواندن و هایلایت‌ها",
        en: "Three Barg screens: library, reader and highlights",
      },
    },
    detail: {
      src: bargDetail,
      rotate: 4,
      alt: { fa: "صفحه‌ی خواندن با تنظیمات تایپوگرافی", en: "Reader view with typography settings" },
    },
    meta: {
      scope: {
        fa: ["طراحی تجربه کاربری", "تایپوگرافی", "طراحی رابط کاربری"],
        en: ["UX design", "Typography", "UI design"],
      },
    },
    problem: {
      fa: "حروف‌چینی بیشتر کتاب‌خوان‌ها برای لاتین تنظیم شده؛ نیم‌فاصله، کشیدگی و تراز دوطرفه در فارسی درست کار نمی‌کنند و خواندن طولانی خسته‌کننده می‌شود.",
      en: "Most e-readers are tuned for Latin typesetting; zero-width non-joiners, kashida and full justification misbehave in Persian, and long reading becomes tiring.",
    },
    goal: {
      fa: "صفحه‌ای که خواندنش به آرامی یک کتاب خوب چاپی باشد و خواننده بتواند آن را به سلیقه‌ی خودش تنظیم کند.",
      en: "A page as calm to read as a well-printed book, which readers can tune to their own taste.",
    },
    constraints: {
      fa: ["صفحه‌ی کوچک و نور محیطی متفاوت", "فایل‌های کتاب با کیفیت‌های متفاوت", "خوانندگانی با نیازهای بینایی مختلف"],
      en: ["Small screens and changing ambient light", "Book files of varying quality", "Readers with different visual needs"],
    },
    decisions: [
      {
        title: { fa: "تایپوگرافی در اختیار خواننده", en: "Typography in the reader’s hands" },
        body: {
          fa: "اندازه، فاصله‌ی سطرها و سه تم کاغذی، کرم و شب با پیش‌نمایش زنده تنظیم می‌شوند؛ پیش‌فرض‌ها برای فارسی انتخاب شده‌اند، نه برای لاتین.",
          en: "Size, line spacing and three themes — paper, sepia and night — adjust with a live preview; the defaults are chosen for Persian, not Latin.",
        },
        figure: {
          src: bargD1,
          alt: { fa: "یک صفحه‌ی کتاب در سه تم کاغذی، کرم و شب", en: "One book page in paper, sepia and night themes" },
          caption: { fa: "یک صفحه در سه تم", en: "One page, three themes" },
        },
      },
      {
        title: { fa: "هایلایت‌هایی که دوباره سراغشان می‌روید", en: "Highlights you come back to" },
        body: {
          fa: "هر هایلایت با یادداشت، فصل و تاریخ ذخیره می‌شود و می‌شود از آن یک کارت نقل‌قول برای اشتراک ساخت.",
          en: "Each highlight is saved with its note, chapter and date, and can become a quote card to share.",
        },
        figure: {
          src: bargD2,
          alt: { fa: "انتخاب متن، فهرست یادداشت‌ها و کارت نقل‌قول", en: "Text selection, notes list and a quote card" },
          caption: { fa: "از انتخاب متن تا کارت نقل‌قول", en: "From selection to quote card" },
        },
      },
    ],
    solution: {
      body: {
        fa: "پنج صفحه‌ی اصلی: شروع، کتاب‌خانه، جزئیات کتاب، خواندن و هدف مطالعه؛ همه با یک زبان بصری آرام و کاغذی.",
        en: "Five core screens — onboarding, library, book detail, reader and reading goal — in one calm, paper-like visual language.",
      },
      figure: {
        src: bargWide,
        alt: { fa: "پنج صفحه‌ی اصلی برگ کنار هم", en: "Barg’s five main screens side by side" },
        caption: { fa: "جریان اصلی برگ", en: "Barg’s main flow" },
      },
    },
    result: conceptResult(
      "قدم بعدی، آزمودن پیش‌فرض‌های تایپوگرافی با خوانندگان در جلسه‌های خواندن طولانی است.",
      "The next step is testing the typography defaults with readers during long reading sessions.",
    ),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { index: i, next: projects[(i + 1) % projects.length] };
}
