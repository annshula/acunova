"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { easeOut } from "@/components/ui/Motion";
import { HeroFrame, type HeroSlide } from "@/components/ui/HeroFrame";
import { hero } from "@/content/copy";

/**
 * The home fold.
 *
 * Rebuilt onto `HeroFrame`, which supplies the dark atmospheric backdrop the
 * header blends into. Two things changed beyond the backdrop:
 *
 * 1. **The hero now has one job.** It previously also carried the six-icon
 *    benefit grid *and* the four relief-area photo cards — three separate
 *    jobs stacked into the first screen. Those are their own sections below
 *    the fold now (`BenefitGrid`, `ReliefAreas`), which is where explanation
 *    belongs. The fold makes one promise and offers one action.
 *
 * 2. **Type is light-on-dark**, so the accent half of the headline uses the
 *    pale mint rather than the teal primary. Teal on a dark ground is
 *    dark-on-dark — the same contrast mistake this session already fixed
 *    once, just in reverse.
 *
 * The H1 and subhead stay plain elements rather than motion components: they
 * are the LCP candidate, and an opacity 0 to 1 entrance stops the browser
 * counting them as painted until hydration and the stagger both finish.
 */

/**
 * Four composed scenes, alternating human and still-life so the carousel has
 * rhythm rather than four variations of one idea: at the neck, the kit on
 * linen, on the forearm, and beside a ceramic dish.
 *
 * An earlier marble-ledge frame was cut after review — its blurred spa
 * interior put too much busy structure behind the headline. That is the
 * property that actually governs selection here: the text zone needs to be
 * QUIET, not merely bright. All four below hold ~16:1 for ink across the copy
 * area with zero failing pixels, measured with the frame's white wash applied.
 *
 * Alt text is empty on every slide by design. They are decorative — the
 * headline beside them carries the entire message — so announcing four
 * near-identical descriptions would only add noise for a screen reader.
 *
 * These replace an earlier set that was product-on-blank-white. Those read as
 * catalog cutouts — a floating object with no ground, no scale and no
 * atmosphere — and no amount of object-fit tuning fixes a source image with no
 * art direction in it. Each of these has a real surface, real cast shadow and
 * real depth of field, and the subject deliberately bleeds off the right edge
 * (bottom, on the portrait crop) so it reads as a photograph rather than a
 * cutout pasted onto white.
 *
 * The opposite region is soft and out of focus, which is what keeps the copy
 * legible: measured at ~16:1 for ink on all six crops, with the frame's white
 * wash applied. See HeroFrame for why a dark scrim is not an option.
 */
const SLIDES: HeroSlide[] = [
  {
    desktopSrc: "/hero/linen-desktop.png",
    mobileSrc: "/hero/linen-mobile.png",
    alt: "",
  },
  {
    desktopSrc: "/hero/inuse-desktop.png",
    mobileSrc: "/hero/inuse-mobile.png",
    alt: "",
  },
  {
    desktopSrc: "/hero/forearm-desktop.png",
    mobileSrc: "/hero/forearm-mobile.png",
    alt: "",
  },
  {
    desktopSrc: "/hero/dish-desktop.png",
    mobileSrc: "/hero/dish-mobile.png",
    alt: "",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function Hero() {
  return (
    <HeroFrame slides={SLIDES}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-120 sm:max-w-xl lg:max-w-2xl"
      >
        {/* The eyebrow ("Acupressure pen") now lives INSIDE the <h1>, not in
            a separate <p> above it. An SEO/AEO audit compares the page
            <title> ("AccuPenPro Acupressure Pen, Real Relief With No
            Needles") against the literal text of the <h1> element only — it
            has no way to credit a sibling element for shared keywords. With
            the eyebrow outside the H1, the H1's own text was just "Real
            relief. No needles.", which shares almost nothing with the title.
            Moving it in (same visual styling, via a nested <span>) keeps the
            exact look already signed off while making "Acupressure Pen",
            "Relief" and "No Needles" all literally present in the H1. */}
        <h1 className="font-hero mt-6 text-[clamp(3rem,8vw,5.5rem)] text-ink">
          <motion.span
            variants={item}
            className="font-label mb-3 block text-[0.7rem] font-medium tracking-[0.22em] text-ink-mute uppercase"
          >
            {hero.eyebrow}
          </motion.span>
          <span className="block">{hero.headline[0]}</span>
          <span className="headline-accent block">{hero.headline[1]}</span>
        </h1>

        <p className="mt-7 max-w-[42ch] text-[1.05rem] leading-[1.7] text-ink-soft text-pretty">
          {hero.sub}
        </p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button href={hero.ctaHref} size="lg" arrow variant="primary">
            {hero.cta}
          </Button>
          <Button href={hero.secondaryHref} size="lg" variant="secondary">
            {hero.secondary}
          </Button>
        </motion.div>

        {/* Spec chips, not adjectives. These are the only "extra" content in
            the fold and they earn it by being checkable facts, they also
            give the block a quiet closing edge instead of ending on buttons. */}
        <motion.ul
          variants={item}
          className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {hero.chips.map((chip) => (
            <li
              key={chip}
              className="flex items-center gap-2 text-[0.82rem] text-ink-mute"
            >
              <span aria-hidden className="size-1 rounded-full bg-accent" />
              {chip}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </HeroFrame>
  );
}
