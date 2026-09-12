import Image from "@/components/ui/Image";

import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { CatalogImage, CatalogVideo, Product } from "@/lib/product";

type Entry = {
  key: string;
  eyebrow: string;
  title: string;
  description?: string;
  image?: CatalogImage | null;
  video?: CatalogVideo | null;
};

/**
 * The Shopify feature-highlight photos for these three labels are square
 * (800x800) product shots, cropped hard by this section's 4:3 `object-cover`
 * box — the auto-sensing display and the head tips end up clipped at the
 * edges. These three real studio photos (public/product/) replace the
 * synced image for these labels only; every other feature (currently just
 * "Free tracked shipping") keeps whatever Shopify sends.
 */
const LOCAL_FEATURE_IMAGES: Record<string, CatalogImage & { fit?: "cover" | "contain" }> = {
  "Auto point-sensing": {
    src: "/product/pen-tip-closeup.png",
    alt: "Close-up of the AccuPenPro pen's intensity display and control button",
    width: 2048,
    height: 2048,
  },
  "Five heads in the box": {
    // The whole kit in one frame: the fitted ball tip on the pen plus the
    // four that screw on in its place. Cropped to 4:3 from
    // pen-heads-layout.png (originally 1856x2304 portrait, mostly empty
    // background) so the object-cover box shows every head rather than
    // clipping the outermost ones.
    src: "/product/pen-heads-layout-crop.png",
    alt: "The AccuPenPro pen with its four interchangeable heads laid out beneath it",
    width: 1856,
    height: 1392,
  },
};

/**
 * Feature highlights and the spec sheet.
 *
 * Rebuilt, and the thing it fixes is the worst spacing problem on the site.
 * The inherited version gave **every row `h-svh`** — a full viewport height
 * each — with the text fading in and back out on that row's own scroll
 * progress. With seven specs that is seven full screens to get past a spec
 * sheet, and on a phone it is punishing: you scroll a whole screen to read one
 * line like "Weight — 60 g". The cinematic treatment made sense for the
 * reference brand's story sections; a specification is a reference table and
 * should be scannable in one screen, not performed.
 *
 * It is now: features as a compact visual grid (they have real images and
 * deserve them), then specs as a genuine two-column `<dl>`. The whole run is
 * roughly one screen instead of seven.
 *
 * Dropping the per-row `useScroll` also removes seven scroll listeners and the
 * client-component boundary — this is a server component now.
 */
export function ProductDetails({ product }: { product: Product }) {
  // Shipping isn't a property of the product — BuyBox's guarantee list already
  // covers it, so repeating it here would pad a section about the object.
  const features = product.features
    .filter((f) => f.icon !== "ship")
    .map((f) => ({ ...f, image: LOCAL_FEATURE_IMAGES[f.label] ?? f.image }));
  const specs = product.specs;

  if (features.length === 0 && specs.length === 0) return null;

  return (
    <Section
      id="details"
      aria-label={`${product.title} highlights and specification`}
      size="standard"
      bordered
    >
      <SectionHead
        title="Every detail, plainly."
        body="What the device is actually made of and what it actually does, described the way a spec sheet should be."
      />

      {/* ---------------------------- features ---------------------------- */}
      {features.length > 0 && (
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem
              key={f.label}
              as="article"
              className="overflow-hidden rounded-card border border-line bg-surface"
            >
              {f.image && (
                <div className="relative aspect-4/3 overflow-hidden bg-surface-sunken">
                  <Image
                    src={f.image.src}
                    alt={f.image.alt}
                    fill
                    quality={82}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 380px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-[0.98rem] leading-snug font-medium text-ink">
                  {f.label}
                </h3>
                <p className="mt-2.5 text-[0.87rem] leading-[1.65] text-ink-soft">
                  {f.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* ------------------------------ specs ------------------------------ */}
      {specs.length > 0 && (
        <Reveal
          delay={0.1}
          className="mt-14 overflow-hidden rounded-card border border-line bg-surface lg:mt-20"
        >
          <h3 className="font-label border-b border-line px-6 py-4 text-[0.64rem] font-medium text-ink-mute uppercase lg:px-8">
            Specification
          </h3>
          <dl className="divide-y divide-line">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid gap-1.5 px-6 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6 lg:px-8"
              >
                <dt className="text-[0.85rem] text-ink-mute">{s.label}</dt>
                <dd>
                  <p className="text-[0.95rem] font-medium text-ink">
                    {s.value}
                  </p>
                  {s.description && (
                    <p className="mt-1.5 max-w-[68ch] text-[0.87rem] leading-[1.65] text-ink-soft">
                      {s.description}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </Section>
  );
}
