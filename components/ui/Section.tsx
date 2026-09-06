import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Motion";

/**
 * Section primitives for the AcuNova layout system.
 *
 * Rebuilt, not inherited. Three things the previous version did that this one
 * deliberately does not:
 *
 * 1. **It forced an eyebrow on every section.** `SectionHeading` took a
 *    required `eyebrow` string, so every band on every page opened with the
 *    same gold dash-and-caps label. Repeating one head treatment down a page
 *    is a templated-editorial tell in its own right. Here the eyebrow is
 *    optional and off by default; the house rule is at most two per page.
 *
 * 2. **It padded every section identically** (`py-24 lg:py-32`). A page where
 *    the hero, a connective explainer and the closing CTA all get the same
 *    vertical space reads as flat — nothing is allowed its own moment. `size`
 *    below weights padding by the section's role instead.
 *
 * 3. **It hard-capped width at one value.** `width` now varies, because a
 *    prose section and a four-up photo grid do not want the same measure.
 */

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */

/** Vertical rhythm, weighted by what the section is for. */
const SIZE = {
  /** Hero-adjacent and closing moments — these get room. */
  pivotal: "py-24 lg:py-36",
  /** The default for a content band. */
  standard: "py-16 lg:py-24",
  /** Connective tissue: trust strips, notes, anything that links two ideas. */
  tight: "py-10 lg:py-14",
} as const;

/** Surface treatment. Dark is intentionally absent — the footer owns it. */
const TONE = {
  canvas: "",
  sunken: "bg-surface-sunken",
  surface: "bg-surface",
} as const;

const WIDTH = {
  /** Comfortable reading measure for prose-led sections. */
  prose: "max-w-200",
  /** The default content column. */
  content: "max-w-260",
  /** Grids and photo rows that want the full frame. */
  wide: "max-w-310",
} as const;

export function Section({
  id,
  children,
  size = "standard",
  tone = "canvas",
  width = "wide",
  bordered = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  size?: keyof typeof SIZE;
  tone?: keyof typeof TONE;
  width?: keyof typeof WIDTH;
  /** Hairline rule above the section — the separator language of this system. */
  bordered?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 sm:px-8 ${SIZE[size]} ${TONE[tone]} ${
        bordered ? "border-t border-line" : ""
      } ${className}`}
    >
      <div className={`mx-auto w-full ${WIDTH[width]}`}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section heads                                                       */
/* ------------------------------------------------------------------ */

/**
 * A small wide-tracked label. Use sparingly — two per page is the ceiling,
 * and most sections read better without one.
 *
 * Note there is no leading dash/rule glyph. The inherited version prefixed
 * every eyebrow with a gold hairline, which turned a quiet label into a
 * recurring decorative motif.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-label text-[0.66rem] font-medium text-ink-mute uppercase ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The default section head: heading hanging in its own space, optional lede
 * beneath, no eyebrow and no rule. Kept deliberately plain so the visual
 * interest in a section comes from its content, not its label.
 *
 * Headings are capped well below the hero's display size — a section head is
 * a signpost, not a second hero.
 */
export function SectionHead({
  eyebrow,
  title,
  body,
  align = "left",
  className = "",
}: {
  /** Off by default. At most two per page across all sections. */
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <header
      className={`${centered ? "mx-auto max-w-184 text-center" : "max-w-200"} ${className}`}
    >
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Reveal
        as="h2"
        className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.18] font-light text-ink text-balance"
      >
        {title}
      </Reveal>
      {body && (
        <Reveal
          as="p"
          delay={0.08}
          className={`mt-5 text-[1rem] leading-[1.75] text-ink-soft text-pretty ${
            centered ? "mx-auto max-w-[60ch]" : "max-w-[60ch]"
          }`}
        >
          {body}
        </Reveal>
      )}
    </header>
  );
}

/**
 * Back-compat alias. Several inherited surfaces still import
 * `SectionHeading` with a required `eyebrow`; this keeps them compiling while
 * they are rebuilt one at a time, and routes them through the new head so
 * they pick up the corrected sizing immediately.
 */
export function SectionHeading(props: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return <SectionHead {...props} />;
}

/* ------------------------------------------------------------------ */
/* Hairline rule                                                       */
/* ------------------------------------------------------------------ */

/** The separator language of this system: a hairline, never a shadow. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr aria-hidden className={`border-0 border-t border-line ${className}`} />;
}
