import Link from "next/link";
import StaticImage from "@/components/ui/StaticImage";
import { Section, SectionHead } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { reliefAreas } from "@/content/copy";

/**
 * The four body-area photo cards, lifted out of the hero.
 *
 * Same reasoning as BenefitGrid: these were competing with the headline for
 * the first screen. Given their own section they can run larger, carry a real
 * caption, and link somewhere — each card now goes to /benefits, where that
 * area is actually explained, rather than being a decorative photo row.
 *
 * Photography is generated from the real product shot, so the device in every
 * frame is the one we ship.
 */
export default function ReliefAreas() {
  return (
    <Section tone="sunken" size="standard" bordered>
      <SectionHead
        align="center"
        eyebrow={reliefAreas.eyebrow}
        title="Four places people reach for it."
      />

      <Stagger
        as="ul"
        className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-16 lg:grid-cols-4"
      >
        {reliefAreas.items.map((area) => (
          <StaggerItem key={area.label} as="li">
            <Link href="/benefits" className="group block">
              <figure>
                <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-photo) bg-surface shadow-(--shadow-photo)">
                  {/* Local photo, pre-optimised AVIF/WebP pair from /public,
                      served via <picture> so it never hits Vercel's optimizer. */}
                  <StaticImage
                    src={area.image.src}
                    alt={area.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="font-label mt-4 text-center text-[0.66rem] font-medium text-ink-mute uppercase transition-colors duration-200 group-hover:text-primary">
                  {area.label}
                </figcaption>
              </figure>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
