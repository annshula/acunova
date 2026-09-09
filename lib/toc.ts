/**
 * Table-of-contents extraction for long-form blog posts. Blog post `body` is
 * author-controlled HTML (content/blog.ts), same trust model as everywhere
 * else that HTML is rendered on this site — never user input.
 *
 * Only the post's <h2> headings are used: they are the real section
 * boundaries the body already renders, so the ToC can never list a jump
 * target that doesn't exist, and adding a post never means hand-maintaining
 * a second, separate outline.
 */

export type TocEntry = { id: string; text: string };

/** Same slug shape everywhere a heading needs an anchor id. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Every <h2>…</h2> heading in the body, in document order, each with its slug id. */
export function extractToc(html: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const seen = new Map<string, number>();
  const re = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const text = match[1].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    entries.push({ id, text });
  }
  return entries;
}

/** Stamps a matching `id="…"` onto every <h2> in the body, so the ToC's jump links resolve. Idempotent slugging — same rule as extractToc, so ids always line up. */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (full, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return full;
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    // Body headings never carry their own id today, but guard against double-adding one if that changes.
    if (/\sid=/.test(attrs)) return full;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}
