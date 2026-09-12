import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { EraExplorer } from "@/components/product/EraExplorer";
import { pen } from "@/content/product-pen";
import { sources, type StoryContent } from "@/content/pitches";

/**
 * The emotional engine of the product pages: a full-bleed dark band right
 * after the buy box that sells the *why* before a spec has a chance to.
 *
 * Instead of a static photo, the right column is an interactive "era
 * explorer" (components/product/EraExplorer.tsx): a story the shopper can
 * scrub through, each chapter with its own purpose-made visual (see each
 * era's `image` in content/pitches.ts / content/product-pen.ts). Every
 * fact in the copy is a real mineral property or history/tradition framed as
 * such, nothing here claims a physiological outcome.
 */
export default function PenStory({
  story,
}: {
  /** Story copy — pass a per-product pitch (content/pitches.ts) or default to the flagship pen copy. */
  story?: StoryContent;
}) {
  const s = story ?? pen.story;

  return (
    <section
      aria-label="Acupressure, an old practice on a battery"
      className="relative overflow-hidden bg-ink text-white"
    >
      <div className="relative mx-auto w-full max-w-310 px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <Reveal
              as="p"
              className="flex items-center gap-3 text-[0.63rem] font-medium tracking-[0.28em] text-gold uppercase"
            >
              <span aria-hidden className="h-px w-7 bg-gold/50" />
              {s.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.02em] text-balance"
            >
              {s.heading}
            </Reveal>
            <Reveal
              as="p"
              delay={0.14}
              className="mt-6 max-w-[46ch] text-[1.02rem] leading-[1.7] text-white/70 text-pretty"
            >
              {s.lede}
            </Reveal>

            <Stagger
              as="div"
              className="mt-9 flex flex-wrap gap-x-8 gap-y-5"
              stagger={0.08}
            >
              {s.stats.map((st) => (
                <StaggerItem key={st.value} as="div">
                  <span className="font-display block text-[clamp(1.15rem,2vw,1.5rem)] leading-none font-semibold tracking-[-0.01em] text-white tabular-nums">
                    {st.value}
                  </span>
                  <span className="mt-1.5 block max-w-[16ch] text-[0.7rem] leading-normal text-white/50">
                    {st.label}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.18} className="block">
            <EraExplorer eras={s.eras} />
          </Reveal>
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.7rem] text-white/40">
          <span className="font-label tracking-[0.18em] uppercase">
            Sources
          </span>
          {sources.map((src, i) => (
            <span key={src.href} className="inline-flex items-center gap-2.5">
              {i > 0 && (
                <span aria-hidden className="text-white/20">
                  /
                </span>
              )}
              <a
                href={src.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline decoration-white/25 underline-offset-2 transition-colors hover:text-white/90"
              >
                {src.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
