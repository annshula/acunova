"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { avifSrc, webpSrc } from "@/lib/image-formats";

export type HeroSlide = {
  desktopSrc: string;
  mobileSrc: string;
  /** Empty string marks it decorative — correct when the copy carries the meaning. */
  alt: string;
};

/**
 * The shared hero frame: a bright white carousel that the header sits inside
 * as one continuous surface.
 *
 * **Single-frame effect.** The header has no background and no border while a
 * hero is behind it, and this section is white, so the two read as one panel
 * rather than a bar stacked on a photo. That is why the images are composed on
 * white and why there is no scrim: a scrim would darken the top band and
 * reintroduce the visible seam the border used to make.
 *
 * **Why the frame talks to the header.** A page with no HeroFrame never fires
 * the event, so the header keeps its solid background by default. The safe
 * state is the default state — unlike the inherited version, which decided
 * from a hardcoded pathname allowlist and rendered white-on-white the moment
 * a route's design changed.
 *
 * **Responsive art direction.** Two real crops per slide, not one image
 * cropped by CSS. The landscape frame reserves the left two-thirds for the
 * headline; the portrait frame reserves the upper half. Swapped with
 * `<source media>` so the browser downloads only what it needs.
 *
 * **Motion.** Auto-advance is slow (7s), pauses on hover, on focus within, and
 * whenever the tab is hidden, and is disabled outright under
 * `prefers-reduced-motion`. Embla handles the gesture and keyboard behaviour;
 * this only drives the timer.
 */
export function HeroFrame({
  slides,
  children,
  minHeight = "min-h-svh",
  autoplayMs = 7000,
}: {
  slides: HeroSlide[];
  children: React.ReactNode;
  /**
   * Defaults to exactly one viewport.
   *
   * The header is `position: fixed` (out of flow) and transparent while this
   * frame is behind it, so the frame starts at the top of the viewport on its
   * own — no negative margin needed, which means centring the copy with
   * `justify-center` lines it up with the true middle of the visible viewport.
   * The nav clearance lives in the content wrapper's symmetric top/bottom
   * padding instead of in a taller, off-screen section box.
   *
   * svh, not vh: vh jumps on mobile as the browser chrome shows and hides.
   */
  minHeight?: string;
  autoplayMs?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 38 });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  // Tell the header this frame is behind it. See the component doc above.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const emit = (over: boolean) =>
      window.dispatchEvent(
        new CustomEvent("accupenpro:overhero", { detail: over }),
      );

    const observer = new IntersectionObserver(
      ([entry]) => emit(entry.isIntersecting),
      // Shrink the observed band to the header's own strip, so the handoff
      // happens as the hero passes under the bar rather than when it fully
      // leaves the viewport.
      { rootMargin: "-68px 0px -100% 0px", threshold: 0 },
    );
    observer.observe(el);
    emit(true);
    return () => {
      observer.disconnect();
      emit(false);
    };
  }, []);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla || slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      if (document.hidden) return;
      embla.scrollNext();
    };
    const id = window.setInterval(tick, autoplayMs);
    return () => window.clearInterval(id);
  }, [embla, slides.length, paused, autoplayMs]);

  const goTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  return (
    <section
      ref={ref}
      data-hero-frame
      className={`relative isolate flex flex-col bg-surface ${minHeight}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ------------------------------ slides ------------------------------ */}
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div
              key={s.desktopSrc}
              className="relative h-full min-w-0 flex-[0_0_100%] bg-surface"
            >
              {/* AVIF -> WebP cascade, art-directed per breakpoint. The hero
                  rasters ship pre-optimised from /public (see
                  scripts/export-formats.mjs) via a plain <picture> so they
                  never route through Vercel's /_next/image optimizer; the .png
                  on the <img> is the last-resort fallback. Desktop sources
                  come first so a ≥768px browser takes them over the default
                  mobile sources below. */}
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={avifSrc(s.desktopSrc)}
                  type="image/avif"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={webpSrc(s.desktopSrc)}
                  type="image/webp"
                />
                <source srcSet={avifSrc(s.mobileSrc)} type="image/avif" />
                <source srcSet={webpSrc(s.mobileSrc)} type="image/webp" />
                <img
                  src={s.mobileSrc}
                  alt={s.alt}
                  // Intrinsic size of the mobile crop this <img> actually
                  // points at (all four /hero/*-mobile.png sources share it) —
                  // CSS overrides the rendered box, but the browser still
                  // needs real dimensions to reserve layout space pre-decode.
                  width={768}
                  height={1376}
                  // Only the first slide is a real LCP candidate.
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-bottom md:object-right"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {/* A soft white wash over the text zone only, left on desktop, top on
          mobile. It lifts contrast where the copy sits without darkening the
          top band, which is what keeps the header seamless. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_42%,rgba(255,255,255,0.25)_72%,rgba(255,255,255,0)_100%)] md:bg-[linear-gradient(to_right,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_38%,rgba(255,255,255,0.30)_62%,rgba(255,255,255,0)_82%)]"
      />

      {/* ------------------------------ content ----------------------------- */}
      {/* A flex child, deliberately, NOT another min-h-svh box. The section
          owns the height; this fills it and centres within it. Giving this
          div its own viewport height (as an earlier pass did) stacks a second
          screen onto the first and the fold overshoots.

          Padding is SYMMETRIC, nav-h on top clears the fixed transparent
          header, and the same nav-h on the bottom keeps the box balanced so
          justify-center lines the copy up with the true middle of the visible
          viewport. Any asymmetry (a top margin to clear the bar, an uneven py)
          drags the block off-centre. */}
      <div className="relative mx-auto flex w-full max-w-310 flex-1 flex-col justify-center px-6 py-[calc(var(--nav-h)+var(--marquee-h)+2rem)] sm:px-0 lg:py-[calc(var(--nav-h)+var(--marquee-h)+3rem)]">
        {children}
      </div>

      {/* ------------------------------- dots ------------------------------- */}
      {slides.length > 1 && (
        <div className="absolute right-5 bottom-10 z-10 flex gap-2.5 sm:right-8 lg:bottom-14">
          {slides.map((s, i) => (
            <button
              key={s.desktopSrc}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              aria-current={i === selected}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-(--ease-out-soft) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                i === selected
                  ? "w-7 bg-primary"
                  : "w-1.5 bg-ink/25 hover:bg-ink/45"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
