import { site } from "@/lib/site";
import { faqs } from "@/content/copy";

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
      about: { "@id": `${url}/#acupressure` },
      inLanguage: "en",
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
        "How to fit a head, choose an intensity level and run a session with the AcuNova acupressure pen, a consumer wellness device, not a medical one.",
      step: [
        {
          "@type": "HowToStep",
          name: "Check the safety list first",
          text: "Do not use the pen if you have a pacemaker, an implanted defibrillator or any other implanted electronic device, or if you are pregnant. Do not use it over broken skin, an open wound, a rash, the front of the neck, or the eyes. With a heart condition, epilepsy, a metal implant near the area, or any ongoing medical condition, ask your doctor before using it at all.",
        },
        {
          "@type": "HowToStep",
          name: "Fit the head that suits the area",
          text: "Screw the rounded ball head on for broad muscle such as the shoulders or calves, the ridged head to knead across a muscle, the fine point for a single specific point, and the flat spoon head for larger areas like the lower back and thighs.",
        },
        {
          "@type": "HowToStep",
          name: "Start at level 1 and work up",
          text: "Hold the tip against the point, switch on at level 1, and step up only until the pulse is clearly felt and still comfortable. The level stays on the front display so the same setting can be repeated next time.",
        },
        {
          "@type": "HowToStep",
          name: "Keep sessions short",
          text: "Five to fifteen minutes across a few points, once or twice a day, is a sensible session. Longer is not better. If a spot goes numb, sore or red, stop and move on.",
        },
      ],
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
