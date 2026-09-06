import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Motion";
import { finalCta } from "@/content/copy";
import { productPath } from "@/lib/catalog";

/**
 * The close — archetype C2, "statement and action".
 *
 * Rebuilt. The inherited version leaned on two effects this system doesn't
 * have: a `.grain` turbulence overlay (now a no-op, it existed to hide banding
 * on large dark gradients that no longer exist) and a black radial wash behind
 * the type. On a near-white canvas that wash read as a grey smudge.
 *
 * The close now earns its weight from the kit photograph and generous space
 * instead — the last thing you see is the actual thing you'd be buying, which
 * is a better argument than a background effect.
 *
 * One ask, echoing the hook's promise. No second CTA competing with it.
 */
export default function FinalCta() {
  return (
    <section className="border-t border-line bg-surface px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-260 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="font-label text-[0.66rem] font-medium text-ink-mute uppercase">
            {finalCta.eyebrow}
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,2.9rem)] leading-[1.12] font-light text-ink text-balance">
            {finalCta.headline}
          </h2>
          <p className="mt-6 max-w-[46ch] text-[0.98rem] leading-[1.75] text-ink-soft text-pretty">
            {finalCta.sub}
          </p>
          <div className="mt-9">
            <Button href={productPath} size="lg" variant="primary" arrow>
              {finalCta.cta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)">
            <Image
              src="/product/kit-flatlay.png"
              alt="The AcuNova pen laid out with its interchangeable heads and storage case"
              width={1376}
              height={768}
              quality={82}
              sizes="(max-width: 1023px) 92vw, 560px"
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
