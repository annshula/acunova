import StaticImage from "@/components/ui/StaticImage";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { method, howToUse } from "@/content/copy";

/**
 * The mechanism beat — what the device actually does, and where the claims
 * stop.
 *
 * Rebuilt, and it was carrying a live bug: the inherited version played a
 * `<video>` sourced from `/media/current*.mp4` with a `/poster/method` poster.
 * Those files were part of the reference brand's asset set and were deleted
 * with the rest of it, so the section rendered a broken media element on the
 * home page. It is a real photograph now.
 *
 * Also gone: the "1 2 3 4 5 6 7 8 9" watermark behind the heading. It was a
 * leftover from an earlier draft that claimed nine intensity levels — a spec
 * this product does not have (see the catalog: it varies by head count, not by
 * a nine-step dial). Leaving decorative type on the page asserting a false
 * spec is worse than having no decoration.
 *
 * Its job is credibility, not persuasion, so it leads with what the hardware
 * verifiably does, labels the tradition as tradition, and then says out loud
 * what the brand will not claim.
 */
export default function Method() {
  return (
    <Section id="method" tone="sunken" size="standard" bordered>
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow={method.eyebrow}
            title={method.headline}
            body={method.lede}
          />

          <Reveal
            delay={0.16}
            className="mt-10 overflow-hidden rounded-photo shadow-(--shadow-photo)"
          >
            <StaticImage
              src="/lifestyle/arms-joints.png"
              alt="The AccuPenPro pen being used on the forearm, showing the tip in contact with the skin"
              width={928}
              height={1152}
              className="h-auto w-full object-cover"
            />
          </Reveal>

          <Reveal
            as="p"
            delay={0.22}
            className="mt-7 text-[0.94rem] leading-[1.75] text-ink-soft"
          >
            {method.body}
          </Reveal>

          <Reveal
            as="p"
            delay={0.26}
            className="mt-5 text-[0.75rem] leading-relaxed text-ink-mute"
          >
            Background reading:{" "}
            <a
              href="https://en.wikipedia.org/wiki/Acupressure"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              acupressure
            </a>
            ,{" "}
            <a
              href="https://en.wikipedia.org/wiki/Transcutaneous_electrical_nerve_stimulation"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              transcutaneous electrical nerve stimulation
            </a>
            .
          </Reveal>
        </div>

        {/* The three-part statement: what it does, what the tradition is, and
            what we refuse to claim. Hairline-divided, no cards. */}
        <Stagger className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {method.paragraphs.map((p, i) => (
            <StaggerItem key={p.title} as="article" className="p-7 lg:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-label text-[0.64rem] text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.05rem] leading-snug font-medium text-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 pl-7 text-[0.92rem] leading-[1.75] text-ink-soft text-pretty">
                {p.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Running a session actually is a sequence (check safety, fit a head,
          start low, keep it short), unlike the three-part statement above —
          hence <ol>, not another <ul>. Mirrors the HowTo JSON-LD in
          components/Schema.tsx one-for-one (content/copy.ts's howToUse is
          the single source both read from), so the rich-result markup
          reflects something a visitor can actually read on the page. */}
      <Reveal delay={0.1} className="mt-14 lg:mt-20">
        <h3 className="font-label text-[0.64rem] font-medium text-ink-mute uppercase">
          Running a session, in order
        </h3>
        <Stagger
          as="ol"
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {howToUse.map((step, i) => (
            <StaggerItem
              key={step.title}
              as="li"
              className="rounded-card border border-line bg-surface p-6"
            >
              <span className="font-label text-[0.64rem] text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 text-[0.95rem] leading-snug font-medium text-ink">
                {step.title}
              </h4>
              <p className="mt-2.5 text-[0.85rem] leading-[1.65] text-ink-soft">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </Section>
  );
}
