import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { blogAuthor, type BlogPost } from "@/content/blog";

/**
 * BlogPosting structured data — the schema.org type Google documents for
 * article rich results. Mirrors the Organization block in components/
 * Schema.tsx rather than referencing it by @id: cross-page @id references
 * do not merge for Google, each page's graph is read independently.
 */
export default function BlogPostingSchema({ post }: { post: BlogPost }) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const imageUrl = absoluteUrl(post.coverImage.src);

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    abstract: post.quickAnswer,
    image: [imageUrl],
    // Matches the same real-world entity components/Schema.tsx's
    // Organization graph links "Acupressure" to on the home page — this
    // block previously carried a copy-pasted "Iron(III) oxide" identifier
    // (Fe2O3, the wrong Wikidata id) that had nothing to do with the topic.
    about: {
      "@type": "Thing",
      name: "Acupressure",
      alternateName: "Acupoint pressure massage",
      sameAs: [
        "https://en.wikipedia.org/wiki/Acupressure",
        "https://www.wikidata.org/wiki/Q331046",
      ],
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: [post.targetKeyword, ...post.tags].join(", "),
    author: { "@type": "Organization", name: blogAuthor, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo-512.webp`,
        width: 512,
        height: 512,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully author-controlled; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
