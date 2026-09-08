import StaticImage from "@/components/ui/StaticImage";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { showcase } from "@/content/copy";
import { getProduct } from "@/lib/shopify";

/**
 * The Solution beat — what the thing actually is, shown rather than described.
 *
 * Rebuilt, and two inherited components are gone with it:
 *
 * - **`Tilt`** wrapped the hero object in a pointer-tracked 3D rotation with a
 *   specular sheen. It is a signature effect, it fires on every pointer move,
 *   and it does nothing to explain a product whose whole pitch is "calm".
 * - **`ImageComparison`** was a drag-to-reveal before/after slider. That earned
 *   its place on the reference brand (raw ore vs polished stone). Here there is
 *   no before and after — it was reduced to sliding between two photos of the
 *   same object, which is interaction for its own sake.
 *
 * What replaces them is the thing itself: the heads macro, at size, because
 * the interchangeable heads are the single most concrete answer to "what am I
 * actually buying". Specs stay in a real <dl>.
 */
export default async function Showcase() {
  const product = await getProduct();

  return (
    <Section id="showcase" size="pivotal">
      <SectionHead
        eyebrow={showcase.eyebrow}
        title={showcase.headline}
        body={showcase.body}
      />

      {/* ---------------------------- the object ---------------------------- */}
      <Reveal
        delay={0.12}
        className="mt-14 overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo) lg:mt-20"
      >
        <StaticImage
          src="/product/heads-macro.png"
          alt="The four interchangeable AccuPenPro heads in a row: rounded ball, multi-point, fine point and flat spoon"
          width={1376}
          height={768}
          className="h-auto w-full object-cover"
        />
      </Reveal>

      <Reveal
        as="p"
        delay={0.18}
        className="mt-5 text-center text-[0.78rem] tracking-[0.02em] text-ink-mute"
      >
        Interchangeable heads, the contact area is what changes how a session
        feels, more than the dial does.
      </Reveal>

      {/* ---------------------------- the points ---------------------------- */}
      <Stagger className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-3 lg:mt-28">
        {showcase.points.map((p, i) => (
          <StaggerItem key={p.title} as="article">
            <p className="font-label text-[0.64rem] font-medium text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-[1.05rem] leading-snug font-medium text-ink">
              {p.title}
            </h3>
            <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink-soft">
              {p.body}
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* ------------------------- in use + spec sheet ------------------------ */}
      <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal
          as="figure"
          className="relative overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)"
        >
          <StaticImage
            src="/lifestyle/desk.png"
            alt="The AccuPenPro pen resting on a desk beside a closed laptop and a cup of tea"
            width={1376}
            height={768}
            className="h-full min-h-75 w-full object-cover"
          />
        </Reveal>

        <Reveal
          delay={0.08}
          className="rounded-card border border-line bg-surface p-7 lg:p-9"
        >
          <h3 className="font-label text-[0.64rem] font-medium text-ink-mute uppercase">
            Specification
          </h3>
          <dl className="mt-6 divide-y divide-line">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-6 py-3.5"
              >
                <dt className="shrink-0 text-[0.8rem] text-ink-mute">
                  {s.label}
                </dt>
                <dd className="text-right text-[0.85rem] font-medium text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[0.75rem] leading-relaxed text-ink-mute">
            A wellness device, not a medical one: not FDA or Health Canada
            cleared, and not for use with a pacemaker or during pregnancy. The
            full list is in the{" "}
            <a
              href="/faq"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              FAQ
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
