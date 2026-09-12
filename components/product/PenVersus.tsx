import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Motion";
import { CheckIcon } from "@/components/ui/Icons";
import { pen } from "@/content/product-pen";
import { cn } from "@/lib/utils";

/**
 * "What you're actually buying" comparison for the pen page. First
 * column (this pen) is visually promoted; every cell is a real material
 * practical fact about the pen vs. stick-on TENS pads and bare hands
 * sold under the same name. Copy in content/product-pen.ts (versus).
 */
export default function PenVersus() {
  const v = pen.versus;

  return (
    <Section
      id="versus"
      className="overflow-hidden border-b border-line bg-ivory"
    >
      <SectionHeading
        align="center"
        eyebrow={v.eyebrow}
        title={v.heading}
        body={v.lede}
      />

      {/* A real comparison matrix rather than three stacked cards: the point
          of this section is reading *across* the three options on one
          attribute at a time, which cards force you to do from memory. The
          pen's column is tinted the whole way down so it stays findable
          without needing a border or a badge pinned to it.

          Below `sm` the matrix collapses to one stack per option — a 3-column
          table at 390px would either scroll sideways or squeeze every cell to
          two words. */}
      <Reveal className="mt-12 lg:mt-16">
        <div className="hidden sm:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {v.heading} — {v.columns.join(", ")} compared
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[1%]" />
                {v.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "px-5 pt-9 pb-5 align-bottom lg:px-6",
                      // relative so the badge can pin to this cell's own
                      // top-right corner rather than sitting in the flow and
                      // pushing the heading down.
                      i === 0 && "relative rounded-t-card bg-accent-soft/25",
                    )}
                  >
                    {i === 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center gap-1.5 rounded-tr-card rounded-bl-card bg-gold px-3 py-1.5 text-[0.6rem] font-semibold tracking-wide text-on-accent uppercase">
                        <CheckIcon className="h-3 w-3" />
                        This one
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-display block text-[1.02rem] leading-tight font-semibold tracking-[-0.02em]",
                        i === 0 ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {col}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {v.rows.map((row, rowIndex) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-t border-line py-5 pr-6 align-top text-[0.62rem] font-medium tracking-[0.16em] whitespace-nowrap text-ink-mute uppercase"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "border-t border-line px-5 py-5 align-top text-[0.85rem] leading-[1.55] lg:px-6",
                        colIndex === 0
                          ? "bg-accent-soft/25 font-medium text-ink"
                          : "text-ink-soft",
                        colIndex === 0 &&
                          rowIndex === v.rows.length - 1 &&
                          "rounded-b-card",
                      )}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one block per option, same data, no horizontal scroll. */}
        <div className="flex flex-col gap-8 sm:hidden">
          {v.columns.map((col, colIndex) => (
            <div
              key={col}
              className={cn(
                "rounded-card px-5 py-6",
                colIndex === 0 && "relative overflow-hidden bg-accent-soft/25 pt-9",
              )}
            >
              {colIndex === 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center gap-1.5 rounded-bl-card bg-gold px-3 py-1.5 text-[0.6rem] font-semibold tracking-wide text-on-accent uppercase">
                  <CheckIcon className="h-3 w-3" />
                  This one
                </span>
              )}
              <h3
                className={cn(
                  "font-display text-[1.02rem] leading-tight font-semibold tracking-[-0.02em]",
                  colIndex === 0 ? "text-ink" : "text-ink-soft",
                )}
              >
                {col}
              </h3>
              <dl className="mt-4 flex flex-col gap-3.5">
                {v.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-[0.6rem] font-medium tracking-[0.16em] text-ink-mute uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={cn(
                        "mt-1 text-[0.84rem] leading-[1.55]",
                        colIndex === 0
                          ? "font-medium text-ink"
                          : "text-ink-soft",
                      )}
                    >
                      {row.values[colIndex]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal
        as="p"
        delay={0.1}
        className="mx-auto mt-10 max-w-184 text-center text-[0.95rem] leading-[1.7] text-ink-soft text-pretty"
      >
        {v.close}
      </Reveal>
    </Section>
  );
}
