import { Section, SectionHead } from "@/components/ui/Section";
import { benefitIcons } from "@/components/ui/LineIcons";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { guarantee } from "@/content/copy";

/**
 * The policy band — what every order actually includes.
 *
 * Rebuilt. The inherited version wrapped each item in a bordered card with a
 * hover lift and a blurred accent glow that bloomed from the corner. That card
 * treatment is the generic feature-grid tell, and the glow was pure decoration
 * on what is meant to read as a plain statement of policy.
 *
 * Every claim here restates an established policy from lib/site.ts rather than
 * being copy invented for this section, so it reads as fact and is styled that
 * way: hairline-divided columns, no boxes, no hover motion.
 */

/** Maps content icon keys onto the line-icon set. */
const ICONS = {
  device: benefitIcons.pen,
  ship: benefitIcons.shipping,
  shield: benefitIcons.safe,
  fit: benefitIcons.safe,
} as const;

export default function Guarantee() {
  return (
    <Section tone="surface" size="standard" bordered>
      <SectionHead
        align="center"
        title={guarantee.headline}
        body={guarantee.body}
      />

      <Stagger
        as="ul"
        className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
      >
        {guarantee.items.map((f) => {
          const Icon = ICONS[f.icon as keyof typeof ICONS] ?? benefitIcons.safe;
          return (
            <StaggerItem
              key={f.label}
              as="li"
              className="bg-surface p-7 lg:p-8"
            >
              <span className="block h-6 w-6 text-accent" aria-hidden>
                <Icon />
              </span>
              <h3 className="mt-5 text-[0.95rem] leading-snug font-medium text-ink">
                {f.label}
              </h3>
              <p className="mt-2.5 text-[0.85rem] leading-[1.6] text-ink-soft">
                {f.body}
              </p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
