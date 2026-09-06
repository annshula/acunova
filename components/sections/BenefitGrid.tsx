"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { benefitIcons } from "@/components/ui/LineIcons";
import { easeOut } from "@/components/ui/Motion";
import { heroBenefits } from "@/content/copy";

/**
 * The poster's 2x3 icon block, lifted out of the hero.
 *
 * It used to sit inside the fold alongside the headline and the relief-area
 * photo row, which gave the first screen three competing jobs. A hero makes
 * one promise; explanation belongs below it. This is the first thing you meet
 * after scrolling, on the light canvas, which also gives the icons the quiet
 * ground they need — thin line art disappears against a photograph.
 *
 * See content/copy.ts for the claim-wording note on these six labels: they
 * keep the poster's categories but are phrased as what people reach for the
 * pen for, not as outcomes it delivers.
 */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function BenefitGrid() {
  return (
    <Section size="standard" width="content">
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:gap-x-12"
      >
        {heroBenefits.map((b) => {
          const Icon = benefitIcons[b.icon];
          return (
            <motion.li
              key={b.label}
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <span className="h-8 w-8 text-accent">
                <Icon />
              </span>
              <span className="mt-4 max-w-[16ch] text-[0.88rem] leading-[1.45] font-medium text-ink">
                {b.label}
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
