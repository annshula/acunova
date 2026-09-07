import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { StarSolidIcon } from "@/components/ui/LineIcons";
import { reviews } from "@/content/copy";
import { penReviewSummary } from "@/data/reviews";
import { site } from "@/lib/site";

/**
 * The proof beat.
 *
 * Rebuilt, and it had two real problems worth recording.
 *
 * 1. **A hardcoded distribution that contradicted the page.** The inherited
 *    version shipped a fixed 90/10 five-to-four-star split with a comment
 *    explaining that it averaged to `site.metrics.rating` — of 4.9. That
 *    rating is 4.6 now, so the bar chart no longer matched the number printed
 *    next to it. The distribution is read from the real dataset here
 *    (`penReviewSummary`), so it cannot drift out of sync again.
 *
 * 2. **It printed unverified aggregates.** `site.metrics.verified` is false
 *    precisely because the rating and review count are not from a review
 *    platform. TrustBar already gates on that flag; this section did not, and
 *    rendered them regardless. It now gates the same way — when the flag is
 *    off you get the sample quotes and an honest note instead of a fabricated
 *    aggregate. Flip the flag when the numbers are real and the full standing
 *    appears with no code change.
 *
 * The marquee is also gone. Two rails scrolling in opposite directions is
 * motion for its own sake on a section people actually want to read, and it
 * made every quote a moving target.
 */
export default function Reviews() {
  const { metrics } = site;
  const verified = metrics.verified;

  return (
    <Section id="reviews" size="standard" width="content" bordered>
      <SectionHead
        align="center"
        title="What owners say."
        body="We publish every review we receive from a confirmed order, including the ones that sting."
      />

      {/* --------------------------- aggregate --------------------------- */}
      {verified ? (
        <Reveal className="mx-auto mt-12 max-w-184 rounded-card border border-line bg-surface p-8 lg:mt-16">
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
            <span className="font-display text-[2.75rem] leading-none font-light text-ink tabular-nums">
              {penReviewSummary.average.toFixed(1)}
            </span>
            <span className="text-[0.95rem] text-ink-mute">out of 5</span>
            <span className="flex gap-0.5 text-star" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <StarSolidIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(penReviewSummary.average) ? "" : "opacity-25"
                  }`}
                />
              ))}
            </span>
          </div>

          <p className="mt-2 text-center text-[0.85rem] text-ink-soft">
            {penReviewSummary.count.toLocaleString("en-US")} reviews ·{" "}
            {penReviewSummary.recommended}% would recommend
          </p>

          {/* Distribution read from the dataset, never hardcoded. */}
          <dl className="mx-auto mt-8 max-w-120 space-y-2">
            {penReviewSummary.distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <dt className="w-10 shrink-0 text-[0.78rem] text-ink-mute tabular-nums">
                  {d.stars}★
                </dt>
                <dd className="flex flex-1 items-center gap-3">
                  <span
                    aria-hidden
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                  >
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${d.percent}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-[0.75rem] text-ink-mute tabular-nums">
                    {d.percent}%
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : (
        <Reveal className="mx-auto mt-12 max-w-160 rounded-card border border-line bg-surface p-7 text-center lg:mt-16">
          <p className="text-[0.95rem] leading-[1.7] text-ink-soft">
            We don&rsquo;t publish a star rating yet. The quotes below are
            written examples of the feedback we&rsquo;re collecting, clearly
            labelled as such, we&rsquo;d rather show nothing than an average we
            can&rsquo;t evidence.
          </p>
        </Reveal>
      )}

      {/* ----------------------------- quotes ----------------------------- */}
      <Stagger className="mt-6 grid gap-5 sm:grid-cols-2">
        {reviews.map((r) => (
          <StaggerItem
            key={r.name}
            as="figure"
            className="rounded-card border border-line bg-surface p-7"
          >
            <span className="flex gap-0.5 text-star" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <StarSolidIcon
                  key={i}
                  className={`h-3.5 w-3.5 ${i < r.stars ? "" : "opacity-20"}`}
                />
              ))}
            </span>
            <blockquote className="mt-4 text-[0.95rem] leading-[1.7] text-ink text-pretty">
              {r.quote}
            </blockquote>
            <figcaption className="mt-5 text-[0.8rem] text-ink-mute">
              <span className="font-medium text-ink-soft">{r.name}</span>
              {" · "}
              {r.meta}
            </figcaption>
          </StaggerItem>
        ))}
      </Stagger>

      {!verified && (
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-[0.75rem] leading-relaxed text-ink-mute">
          Illustrative examples, not verified customer reviews. Nothing here is
          emitted as schema.org review markup, see
          components/ProductSchema.tsx.
        </p>
      )}
    </Section>
  );
}
