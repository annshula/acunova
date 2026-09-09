import type { TocEntry } from "@/lib/toc";

/**
 * Jump-link table of contents for long-form blog posts only — the product
 * and home pages are short enough that a ToC would just be visual noise
 * (an SEO/AEO audit flagging "no ToC" on those is not actionable without
 * inventing structure that isn't there). A blog post with several <h2>
 * sections is the genuine long-form case, so BlogPostPage only mounts this
 * when the post has enough headings to be worth jumping around (see the
 * `entries.length` check at the call site).
 *
 * Plain anchor links to the heading ids lib/toc.ts already stamped onto the
 * body's <h2> elements — no client JS needed for the jump itself.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="mt-8 rounded-card border border-line bg-surface-sunken px-5 py-4"
    >
      <h2 className="font-label text-[0.62rem] font-medium tracking-[0.14em] text-ink-mute uppercase">
        In this article
      </h2>
      <ol className="mt-2.5 space-y-1.5 text-[0.86rem]">
        {entries.map((entry, i) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              {i + 1}. {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
