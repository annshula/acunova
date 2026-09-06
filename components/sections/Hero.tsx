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
    desktopSrc: "/hero/inuse-desktop.png",
    mobileSrc: "/hero/inuse-mobile.png",
    alt: "",
  },
  {
    desktopSrc: "/hero/linen-desktop.png",
    mobileSrc: "/hero/linen-mobile.png",
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
        className="max-w-[34rem] sm:max-w-[42rem] lg:max-w-[48rem]"
      >
        <motion.p
          variants={item}
          className="font-label text-[0.68rem] font-medium text-ink-mute uppercase"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-mega mt-5 text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[1.06] text-ink">
          {hero.headline[0]}{" "}
          <span className="font-medium text-primary">{hero.headline[1]}</span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-[1.75] text-ink-soft text-pretty">
          {hero.sub}
        </p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button href={hero.ctaHref} size="lg" arrow variant="primary">
            {hero.cta}
          </Button>
          <Button href={hero.secondaryHref} size="lg" variant="secondary">
            {hero.secondary}
          </Button>
        </motion.div>

      </motion.div>
    </HeroFrame>
  );
}
