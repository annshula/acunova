import { site } from "@/lib/site";
import { faqs, howToUse } from "@/content/copy";
import { syncedAt } from "@/lib/catalog";

/**
 * Structured data for the home page — Organization, WebSite, the FAQPage
 * (the FAQ section lives on home) and a HowTo covering safe use. Product/
 * Offer markup lives on the product page itself
 * (components/ProductSchema.tsx), not here: the home page explains the
 * product, it does not sell it, and Google's guidance is that Product
 * structured data belongs on the page the product is actually transacted
 * on.
 *
 * The HowTo deliberately leads with the safety step rather than burying it,
 * because a rich result can surface any single step on its own.
 */
export default function Schema() {
  const url = site.url;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url,
      slogan: site.tagline,
      description: site.description,
      logo: {
        "@type": "ImageObject",
        url: `${url}/logo-512.webp`,
        width: 512,
        height: 512,
      },
      email: site.email,
      sameAs: Object.values(site.socials),
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${url}/#organization` },
      // No individual byline on this site — every page is brand-authored,
      // so the Organization is the honest `author` entity, not a fabricated
      // person.
      author: { "@id": `${url}/#organization` },
      about: { "@id": `${url}/#acupressure` },
      inLanguage: "en",
      // Real catalog sync timestamp (data/product.json), not a fabricated
      // "updated today" — moves only when `npm run shopify:sync-product` runs.
      dateModified: syncedAt,
    },
    {
      "@type": "Thing",
      "@id": `${url}/#acupressure`,
      name: "Acupressure",
      alternateName: "Acupoint pressure massage",
      sameAs: [
        "https://en.wikipedia.org/wiki/Acupressure",
        "https://www.wikidata.org/wiki/Q331046",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "HowTo",
      "@id": `${url}/#how-to-use`,
      name: "How to use an acupuncture pen safely",
      description:
        "How to fit a head, choose an intensity level and run a session with the AccuPenPro acupressure pen, a consumer wellness device, not a medical one.",
      // Sourced from content/copy.ts's howToUse — the same steps render as a
      // visible <ol> in components/sections/Method.tsx, so this rich-result
      // markup never claims content the page doesn't actually show.
      step: howToUse.map((s) => ({
        "@type": "HowToStep",
        name: s.title,
        text: s.body,
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is fully author-controlled; no user input reaches this string.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
