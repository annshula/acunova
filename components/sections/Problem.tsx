import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { problem } from "@/content/copy";

/**
 * The Problem / stakes beat of the page's narrative arc.
 *
 * This is the shortest, sharpest section on the page by design — it exists
 * to make the reader recognise their own evening before the product is
 * introduced, then get out of the way. Two rules it follows:
 *
 *   1. It shows the broken state rather than describing it. Each card is a
 *      concrete thing the reader already does and the specific way it runs
 *      out, not a paragraph about "muscle tension being a challenge."
 *   2. It never names a condition. "Your thumbs give out" is an observation
 *      about hands; "your sciatica flares" would be a medical claim about a
 *      reader we have never examined. See the claim policy in
 *      content/copy.ts.
 *
 * Section head is S1 (hanging) — no eyebrow. Eyebrows are capped at two per
 * page and the hero and relief-area rows already spend both.
 */
export default function Problem() {
  return (
    <Section tone="sunken" size="standard" bordered>
      <div className="mx-auto max-w-200 text-center">
        <Reveal
          as="h2"
          className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.2] font-light text-ink text-balance"
        >
          {problem.headline}
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="mx-auto mt-6 max-w-[58ch] text-[1rem] leading-[1.75] text-ink-soft text-pretty"
        >
          {problem.body}
        </Reveal>
      </div>

      <Stagger
        as="ul"
        className="mx-auto mt-14 grid max-w-260 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 lg:mt-16"
      >
        {problem.states.map((state) => (
          <StaggerItem
            key={state.doing}
            as="li"
            className="bg-surface p-7 lg:p-8"
          >
            {/* The thing you already do. */}
            <p className="font-label text-[0.62rem] font-medium text-ink-mute uppercase">
              {state.doing}
            </p>
            {/* The specific way it runs out — the actual stake. */}
            <p className="mt-4 text-[1.05rem] leading-[1.45] font-medium text-ink text-balance">
              {state.breaks}
            </p>
            <p className="mt-3 text-[0.88rem] leading-[1.65] text-ink-soft">
              {state.detail}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
