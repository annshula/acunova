import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Motion";
import { faqs } from "@/content/copy";
import { site } from "@/lib/site";

/**
 * The objection-handling beat.
 *
 * Native <details>/<summary> is kept from the inherited version, and that was
 * the right call: zero JavaScript, keyboard-accessible for free, and every
 * answer stays in the DOM so it is crawlable and matches the FAQPage JSON-LD
 * in components/Schema.tsx. Rebuilding that as a JS accordion would have been
 * a straight downgrade.
 *
 * What changed is everything around it. The inherited layout was a sticky
 * two-column split with the heading pinned beside a scrolling list, which on a
 * short list like this one left a large empty column on the left for most of
 * the scroll. It is a single centred column now, with the questions given room
 * to be read.
 *
 * The safety question is deliberately not buried in the middle of the list —
 * for a device in this category it is the real objection, and content/copy.ts
 * orders the entries accordingly.
 */
export default function Faq() {
  return (
    <Section id="faq" tone="sunken" size="standard" width="content" bordered>
      <SectionHead
        align="center"
        title="The questions we actually get."
        body="If yours isn't here, email us — a person answers, usually within a few hours."
      />

      <div className="mx-auto mt-12 max-w-200 lg:mt-16">
        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <li key={f.id}>
              <details className="faq-item group">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left">
                  <span className="text-[1rem] leading-snug font-medium text-ink transition-colors duration-200 group-hover:text-primary">
                    {f.q}
                  </span>
                  {/* Rotates to an x when open — see .faq-sign in globals.css */}
                  <span
                    aria-hidden
                    className="faq-sign relative mt-1 grid size-5 shrink-0 place-items-center text-ink-mute"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </summary>
                <div className="faq-body">
                  <div>
                    <p
                      className="max-w-[68ch] pb-6 text-[0.94rem] leading-[1.75] text-ink-soft"
                      // Answers are author-written and may carry a link; the
                      // same trust model as descriptionHtml in lib/product.ts.
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <Link
            href="/faq"
            className="text-[0.88rem] font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-primary"
          >
            See the full FAQ
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-[0.88rem] text-ink-soft transition-colors duration-200 hover:text-primary"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
