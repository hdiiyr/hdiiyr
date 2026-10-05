"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { digits, indexLabel, type Locale } from "@/lib/i18n";
import { getUI } from "@/content/ui";
import { DESKTOP_QUERY, DUR, EASE, heroRect, prefersReducedMotion } from "@/lib/motion";
import { coverTransition } from "@/lib/transition";
import { ShowcaseGL, supportsWebGL } from "./ShowcaseGL";
import ProjectNavigation from "./ProjectNavigation";
import ProjectIndex from "./ProjectIndex";
import { ArrowForward } from "./icons";

export type Slide = {
  slug: string;
  href: string;
  title: string;
  category: string;
  oneLiner: string;
  concept: boolean;
  theme: { bg: string; title: string; ink: string; heroBg: string; heroText: string };
  cover: { src: StaticImageData; alt: string };
  detail: { src: StaticImageData; alt: string; rotate: number };
};

type Props = { locale: Locale; slides: Slide[] };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const themeVars = (t: Slide["theme"]) => ({ "--bg": t.bg, "--title": t.title, "--ink": t.ink });

/** Server render always starts on the first project; `?p=` is applied in the browser. */
const initial = 0;

// The URL never changes underneath the gallery without a navigation, so nothing to subscribe to.
const subscribeNone = () => () => {};
const readRequested = () => new URLSearchParams(window.location.search).get("p");
const isClient = () => true;
const isServer = () => false;

export default function ProjectShowcase({ locale, slides: slidesProp }: Props) {
  // The URL is kept in sync through the router (see below), which re-renders the page with
  // fresh props on every change; the gallery keeps its own first copy so nothing restarts.
  const [slides] = useState(slidesProp);
  const ui = getUI(locale);
  const total = slides.length;
  const rtl = locale === "fa";
  const router = useRouter();
  const pathname = usePathname();

  // `?p=` from the address bar: null while hydrating (matches the server), then the real value.
  const requested = useSyncExternalStore(subscribeNone, readRequested, () => null);
  const hydrated = useSyncExternalStore(subscribeNone, isClient, isServer);
  const start = Math.max(0, requested ? slides.findIndex((x) => x.slug === requested) : initial);
  // null until the visitor moves; until then the gallery shows `start`.
  const [chosen, setActive] = useState<number | null>(null);
  const active = chosen ?? start;
  const [listOpen, setListOpen] = useState(false);
  const [glReady, setGlReady] = useState<boolean[]>(() => slides.map(() => false));
  // Covers within one step of anything shown so far load eagerly; the rest stay lazy.
  const [visited, setNear] = useState(() => new Set<number>());
  const isNear = (i: number) => Math.abs(i - active) <= 1 || visited.has(i);

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const detailRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Mutable motion state, read by the ticker every frame.
  const m = useRef({
    p: initial, // float position of the image column (in items)
    drag: 0, // extra offset while swiping (in items)
    index: initial, // where we are going / are
    shown: initial, // whose text is on screen
    pending: null as number | null,
    busy: false,
    leaving: false,
    desktop: false,
    reduced: false,
    gl: null as ShowcaseGL | null,
    glAlpha: 1,
    bend: 0,
    lastP: initial,
    lastT: 0,
    pointer: { x: 0, y: 0, tx: 0, ty: 0 },
    hover: slides.map(() => 1),
    hoverTarget: slides.map(() => 1),
    gray: slides.map((_, i) => (i === initial ? 0 : 1)) as number[],
    wheelAcc: 0,
    wheelLast: 0,
    wheelLocked: false,
    touch: null as null | { id: number; x: number; y: number; dragging: boolean },
    justDragged: false,
  });

  /* ---------- layout of the image column, every frame ---------- */
  const place = useCallback(() => {
    const s = m.current;
    const els = itemRefs.current;
    if (!els.length || !els[0]) return;
    const desktop = s.desktop;
    const size = desktop ? els[0].offsetHeight : els[0].offsetWidth;
    const gap = desktop ? Math.max(28, window.innerHeight * 0.036) : Math.max(12, window.innerWidth * 0.03);
    const step = size + gap;
    const sign = rtl ? -1 : 1;
    const pos = s.p + s.drag;
    els.forEach((el, i) => {
      if (!el) return;
      const d = i - pos;
      const dist = Math.min(Math.abs(d), 1);
      const tx = desktop ? s.pointer.x : d * step * sign;
      const ty = desktop ? d * step + s.pointer.y : 0;
      const scale = desktop ? 1 : 1 - dist * 0.1;
      el.style.transform = `translate3d(calc(-50% + ${tx.toFixed(2)}px), calc(-50% + ${ty.toFixed(2)}px), 0) scale(${scale.toFixed(4)})`;
      el.style.setProperty("--gray", dist.toFixed(3));
      s.gray[i] = dist;
    });
  }, [rtl]);

  /* ---------- ticker: pointer easing, velocity → bend, GL render ---------- */
  useEffect(() => {
    const s = m.current;
    s.lastT = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.max(8, now - s.lastT) / 1000;
      s.lastT = now;
      s.pointer.x += (s.pointer.tx - s.pointer.x) * 0.07;
      s.pointer.y += (s.pointer.ty - s.pointer.y) * 0.07;
      place();
      const pos = s.p + s.drag;
      const velocity = (pos - s.lastP) / dt;
      s.lastP = pos;
      const targetBend = s.reduced ? 0 : clamp(-velocity * 0.05, -0.2, 0.2);
      s.bend += (targetBend - s.bend) * 0.16;
      s.hover = s.hover.map((h, i) => h + (s.hoverTarget[i] - h) * 0.12);
      s.gl?.render(s.gray, s.bend, s.hover, s.glAlpha);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [place]);

  /* ---------- layout mode, reduced motion and the WebGL layer ---------- */
  useEffect(() => {
    const s = m.current;
    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setupGL = () => {
      s.gl?.destroy();
      s.gl = null;
      setGlReady(slides.map(() => false));
      if (!s.desktop || s.reduced || !canvasRef.current || !supportsWebGL()) return;
      try {
        s.gl = new ShowcaseGL(canvasRef.current, itemRefs.current, (i) =>
          setGlReady((prev) => prev.map((v, j) => (j === i ? true : v))),
        );
      } catch {
        s.gl = null; // DOM images stay visible.
      }
    };

    const update = () => {
      s.desktop = desktopMq.matches;
      s.reduced = motionMq.matches;
      s.drag = 0;
      s.pointer.tx = s.pointer.ty = 0;
      setupGL();
      place();
    };
    update();

    const onResize = () => {
      s.gl?.resize();
      place();
    };
    desktopMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    window.addEventListener("resize", onResize);
    return () => {
      desktopMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
      window.removeEventListener("resize", onResize);
      s.gl?.destroy();
      s.gl = null;
    };
  }, [place, slides]);

  /* ---------- start position + page colours (also after coming back from a case study) ---------- */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const s = m.current;
    if (start !== s.shown && s.index === s.shown) {
      // Deep link: move the column and text state straight to the requested project.
      s.p = s.index = s.shown = s.lastP = start;
      s.gray = slides.map((_, i) => (i === start ? 0 : 1));
    }
    const vars = themeVars(slides[start].theme);
    if (prefersReducedMotion() || start !== initial) gsap.set(root, vars);
    else gsap.to(root, { ...vars, duration: 0.5, ease: EASE.color, overwrite: "auto" });
    // A deep link hides the gallery until it is on the right project (see layout.tsx).
    if (hydrated) root.classList.remove("deep-link");
    const intro = window.setTimeout(() => rootRef.current?.classList.remove("is-intro"), 1600);
    return () => window.clearTimeout(intro);
  }, [slides, start, hydrated]);

  /* ---------- the transition between projects ---------- */
  const run = useCallback(
    (next: number) => {
      const s = m.current;
      const slide = slides[next];
      const root = document.documentElement;
      s.busy = true;
      s.index = next;
      rootRef.current?.classList.remove("is-intro");
      setNear((prev) => new Set([...prev, next - 1, next, next + 1]));

      const textEls = [metaRef.current, leadRef.current, ctaRef.current];
      const oldDetail = detailRefs.current[s.shown];
      const tl = gsap.timeline();

      if (s.reduced) {
        tl.to([titleRef.current, ...textEls, oldDetail], { autoAlpha: 0, duration: 0.18, ease: "none" })
          .add(() => {
            s.p = next;
            gsap.set(root, themeVars(slide.theme));
            setActive(next);
          });
        return;
      }

      tl.to(titleRef.current, { yPercent: -115, y: 0, duration: DUR.out, ease: EASE.textOut }, 0)
        .to(textEls, { y: -16, autoAlpha: 0, duration: DUR.out * 0.85, ease: EASE.textOut, stagger: 0.03 }, 0)
        .to(oldDetail, { autoAlpha: 0, y: 28, rotate: "+=4", duration: 0.45, ease: "power2.in" }, 0)
        .to(s, { p: next, duration: DUR.slide, ease: EASE.inOut }, 0.04)
        .to(root, { ...themeVars(slide.theme), duration: DUR.color, ease: EASE.color }, 0.04)
        .add(() => setActive(next), DUR.out);
    },
    [slides],
  );

  const go = useCallback(
    (target: number) => {
      const s = m.current;
      const next = clamp(target, 0, total - 1);
      if (s.leaving) return;
      if (s.busy) {
        s.pending = next;
        return;
      }
      if (next === s.index) return;
      run(next);
    },
    [run, total],
  );

  /** Relative step that queues correctly when clicked repeatedly mid-transition. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const s = m.current;
      go((s.busy && s.pending !== null ? s.pending : s.index) + dir);
    },
    [go],
  );

  /* Enter animation for the new text, then release the lock (and run any queued request). */
  useLayoutEffect(() => {
    const s = m.current;
    // Only when the project really changed (not on mount, nor on StrictMode's re-run).
    if (s.shown === active) return;
    const finish = () => {
      s.busy = false;
      const queued = s.pending;
      s.pending = null;
      if (queued !== null && queued !== s.index) run(queued);
    };

    const newDetail = detailRefs.current[active];
    const textEls = [metaRef.current, leadRef.current, ctaRef.current];
    const rotate = slides[active].detail.rotate;
    s.shown = active;

    if (s.reduced) {
      gsap.fromTo(
        [titleRef.current, ...textEls, newDetail],
        { autoAlpha: 0, y: 0, yPercent: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "none", onComplete: finish },
      );
      return;
    }

    gsap
      .timeline({ onComplete: finish })
      .fromTo(titleRef.current, { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: DUR.in, ease: EASE.textIn }, 0)
      .fromTo(textEls, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DUR.in, ease: EASE.textIn, stagger: 0.06 }, 0.1)
      .fromTo(
        newDetail,
        { autoAlpha: 0, y: -28, rotate: rotate - 5 },
        { autoAlpha: 1, y: 0, rotate, duration: 0.8, ease: "power3.out" },
        0.12,
      );
  }, [active, run, slides]);

  /*
   * Keep the URL in sync with the slide, through the router: Next.js restores history entries
   * from what it rendered, so a plain history.replaceState would be lost on Back.
   * Debounced so a burst of clicks makes one request.
   */
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", slides[active].theme.bg);
    const want = active === 0 ? null : slides[active].slug;
    if (new URLSearchParams(window.location.search).get("p") === want) return;
    // `pathname` has no base path, so this also works under /portfolio on GitHub Pages.
    const id = window.setTimeout(() => {
      if (!m.current.leaving) router.replace(want ? `${pathname}?p=${want}` : pathname, { scroll: false });
    }, 350);
    return () => window.clearTimeout(id);
  }, [active, slides, router, pathname]);

  /* ---------- wheel (desktop only; ignores trackpad inertia) ---------- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const s = m.current;
      if (!s.desktop || listOpen) return;
      e.preventDefault();
      const now = performance.now();
      const gap = now - s.wheelLast;
      s.wheelLast = now;
      if (s.wheelLocked && gap < 180) return;
      s.wheelLocked = false;
      if (gap > 300) s.wheelAcc = 0;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      s.wheelAcc += (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
      if (Math.abs(s.wheelAcc) < 40) return;
      const dir = s.wheelAcc > 0 ? 1 : -1;
      s.wheelAcc = 0;
      s.wheelLocked = true;
      if (s.busy) return;
      go(s.index + dir);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, listOpen]);

  /* ---------- keyboard (only while focus is inside the gallery) ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (listOpen || e.altKey || e.metaKey || e.ctrlKey) return;
    const s = m.current;
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const backward = rtl ? "ArrowRight" : "ArrowLeft";
    const nextKeys = s.desktop ? [forward, "ArrowDown", "PageDown"] : [forward];
    const prevKeys = s.desktop ? [backward, "ArrowUp", "PageUp"] : [backward];
    if (nextKeys.includes(e.key)) step(1);
    else if (prevKeys.includes(e.key)) step(-1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(total - 1);
    else return;
    e.preventDefault();
  };

  /* ---------- swipe (mobile layout; vertical page scroll stays native) ---------- */
  const onPointerDown = (e: React.PointerEvent) => {
    const s = m.current;
    if (s.desktop || s.busy || s.leaving || (e.pointerType === "mouse" && e.button !== 0)) return;
    s.touch = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = m.current;
    const t = s.touch;
    if (!t || t.id !== e.pointerId) return;
    const dx = e.clientX - t.x;
    const dy = e.clientY - t.y;
    if (!t.dragging) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        s.touch = null; // vertical scroll wins
        return;
      }
      if (Math.abs(dx) < 10) return;
      t.dragging = true;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Capture is a nicety; the swipe still works without it.
      }
    }
    const size = itemRefs.current[0]?.offsetWidth ?? window.innerWidth;
    let drag = (-dx * (rtl ? -1 : 1)) / size;
    const pos = s.index + drag;
    if (pos < 0 || pos > total - 1) drag *= 0.35; // rubber band at the ends
    s.drag = drag;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = m.current;
    const t = s.touch;
    s.touch = null;
    if (!t || t.id !== e.pointerId || !t.dragging) return;
    s.justDragged = true;
    window.setTimeout(() => (s.justDragged = false), 50);
    const drag = s.drag;
    s.p += drag;
    s.drag = 0;
    const dir = drag > 0.18 ? 1 : drag < -0.18 ? -1 : 0;
    const next = clamp(s.index + dir, 0, total - 1);
    if (next !== s.index) run(next);
    else gsap.to(s, { p: s.index, duration: 0.6, ease: EASE.out });
  };

  /* ---------- desktop pointer parallax + hover ---------- */
  const onPointerMoveStage = (e: React.PointerEvent) => {
    const s = m.current;
    if (!s.desktop || s.reduced || e.pointerType !== "mouse") return;
    const r = rootRef.current!.getBoundingClientRect();
    s.pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
    s.pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 14;
  };
  const onPointerLeaveStage = () => {
    const s = m.current;
    s.pointer.tx = s.pointer.ty = 0;
  };

  /* ---------- opening a case study: cover flies to the hero ---------- */
  const openProject = (e: { preventDefault: () => void }, index: number) => {
    const s = m.current;
    const item = itemRefs.current[index];
    const img = item?.querySelector("img");
    if (s.reduced || s.busy || s.leaving || index !== s.index || !item || !img) return; // plain navigation
    e.preventDefault();
    s.leaving = true;
    const slide = slides[index];
    const r = item.getBoundingClientRect();
    coverTransition.start({
      slug: slide.slug,
      src: img.currentSrc || img.src,
      from: { x: r.left, y: r.top, w: r.width, h: r.height },
      to: heroRect(window.innerWidth, window.innerHeight),
    });
    const others = itemRefs.current.filter((_, i) => i !== index);
    gsap
      .timeline()
      .to(titleRef.current, { yPercent: -115, y: 0, duration: DUR.out, ease: EASE.textOut }, 0)
      .to([metaRef.current, leadRef.current, ctaRef.current, railRef.current, detailRefs.current[index]], {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.in",
      }, 0)
      .to([...others, item], { autoAlpha: 0, duration: 0.3 }, 0)
      .to(s, { glAlpha: 0, duration: 0.3 }, 0)
      .to(
        document.documentElement,
        { "--bg": slide.theme.heroBg, "--ink": slide.theme.heroText, "--title": slide.theme.heroText, duration: DUR.flip, ease: EASE.inOut },
        0,
      )
      .add(() => router.push(slide.href), DUR.flip * 0.75);
  };

  const onCoverClick = (e: React.MouseEvent, index: number) => {
    const s = m.current;
    if (s.justDragged) {
      e.preventDefault();
      return;
    }
    if (index !== s.index) {
      e.preventDefault();
      go(index);
    }
  };

  const slide = slides[active];
  const counter = `${indexLabel(active + 1, locale)} / ${indexLabel(total, locale)}`;

  return (
    <section
      ref={rootRef}
      className="showcase is-intro"
      aria-roledescription={ui.showcase.roledescription}
      aria-label={ui.showcase.label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMoveStage}
      onPointerLeave={onPointerLeaveStage}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {ui.showcase.slide(digits(active + 1, locale), digits(total, locale), slide.title)}
      </p>
      <p className="sr-only">{ui.showcase.hint}</p>

      <div className="showcase__text">
        <p className="showcase__meta" ref={metaRef}>
          <span className="showcase__count">{counter}</span>
          <span className="showcase__cat">{slide.category}</span>
          {slide.concept && <span className="tag">{ui.concept}</span>}
        </p>
        <h2 className="showcase__title">
          <span className="mask">
            <span className="mask__inner" ref={titleRef}>
              {slide.title}
            </span>
          </span>
        </h2>
        <p className="showcase__lead" ref={leadRef}>
          {slide.oneLiner}
        </p>
        <div className="showcase__cta" ref={ctaRef}>
          <Link
            href={slide.href}
            className="cta"
            data-cursor={ui.showcase.view}
            onNavigate={(e) => openProject(e, active)}
          >
            <span className="link-line">{ui.showcase.view}</span>
            <ArrowForward />
          </Link>
        </div>
      </div>

      <div
        className="showcase__stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <ul className="showcase__track">
          {slides.map((s, i) => (
            <li
              key={s.slug}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="showcase__item"
              style={{ "--d": i - initial, "--gray": i === initial ? 0 : 1 } as React.CSSProperties}
              data-active={i === active}
              data-gl={glReady[i] ? "ready" : undefined}
              aria-hidden={i === active ? undefined : true}
              onPointerEnter={() => (m.current.hoverTarget[i] = 1.05)}
              onPointerLeave={() => (m.current.hoverTarget[i] = 1)}
            >
              <Link
                href={s.href}
                tabIndex={-1}
                draggable={false}
                onClick={(e) => onCoverClick(e, i)}
                onNavigate={(e) => openProject(e, i)}
                data-cursor={i === active ? ui.showcase.view : undefined}
              >
                <Image
                  src={s.cover.src}
                  alt={s.cover.alt}
                  sizes="(min-width: 1024px) 42vw, 80vw"
                  placeholder="blur"
                  draggable={false}
                  preload={i === initial}
                  loading={i === initial ? undefined : isNear(i) ? "eager" : "lazy"}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <canvas ref={canvasRef} className="showcase__gl" aria-hidden="true" />

      <div className="showcase__detail" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.slug}
            ref={(el) => {
              if (el) detailRefs.current[i] = el;
            }}
            className="showcase__detail-item"
            data-active={i === active}
            style={{ transform: `rotate(${s.detail.rotate}deg)` }}
          >
            <Image
              src={s.detail.src}
              alt=""
              sizes="(min-width: 1024px) 16vw, 30vw"
              loading={isNear(i) ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="showcase__rail" ref={railRef}>
        <ProjectNavigation
          locale={locale}
          titles={slides.map((s) => s.title)}
          active={active}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onSelect={go}
          onOpenList={() => setListOpen(true)}
        />
      </div>

      <ProjectIndex
        locale={locale}
        items={slides.map((s) => ({ slug: s.slug, title: s.title, category: s.category }))}
        active={active}
        open={listOpen}
        onClose={() => setListOpen(false)}
        onSelect={go}
      />
    </section>
  );
}
