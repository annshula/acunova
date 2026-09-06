import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Motion";
import { comparison } from "@/content/copy";

/**
 * The pen against the two things people are already doing: pressing by hand,
 * and sticking on TENS pads.
 *
 * Still a real semantic <table> — that part of the inherited version was
 * right, and styled <div> rows would have been a downgrade for screen readers
 * and for anyone copying a row out. What changed is the treatment: the
 * inherited head forced an eyebrow, the header row sat on a contrasting fill,
 * and the first column was sticky with its own background, which on a narrow
 * screen produced a visible seam down the table as it scrolled.
 *
 * Now: hairline rules, no fills, our column marked with a single accent edge
 * rather than a highlighted block. The honest framing matters here — the last
 * row says plainly what the pen is *not*, which is the row most comparison
 * tables leave out.
 */
export default function Comparison() {
  return (
    <Section size="standard" tone="canvas" bordered>
      <SectionHead title={comparison.headline} body={comparison.body} />

      <Reveal
        delay={0.12}
        className="mt-12 overflow-x-auto rounded-card border border-line bg-surface lg:mt-14"
      >
        <table className="w-full min-w-175 border-collapse text-left text-[0.86rem]">
          <caption className="sr-only">
            {comparison.headline} — {comparison.columns.join(", ")}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[22%] p-5">
                <span className="sr-only">Comparison criterion</span>
              </th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`p-5 align-bottom text-[0.9rem] font-medium ${
                    i === 0
                      ? "border-b-2 border-primary text-ink"
                      : "text-ink-mute"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-line last:border-b-0"
              >
                <th
                  scope="row"
                  className="p-5 align-top text-[0.78rem] leading-snug font-normal text-ink-mute"
                >
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={`${row.label}-${i}`}
                    className={`p-5 align-top leading-[1.55] ${
                      i === 0 ? "font-medium text-ink" : "text-ink-soft"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal
        as="p"
        delay={0.18}
        className="mt-6 max-w-[62ch] text-[0.82rem] leading-relaxed text-ink-mute"
      >
        Some TENS units have been through FDA clearance for specific uses. Most
        consumer devices in this category, including this one, have not — which
        is why nothing here is framed as a treatment.
      </Reveal>
    </Section>
  );
}
