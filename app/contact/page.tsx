import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icons";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Motion";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const title = "Contact";
const description = "Get in touch, a person replies, usually within 12 hours.";

/** ContactPage structured data — references the real Organization already defined once in components/Schema.tsx (home page) rather than redeclaring it, same pattern as app/about/page.tsx's AboutPageSchema. */
function ContactPageSchema() {
  const url = site.url;
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}/contact#page`,
    url: `${url}/contact`,
    name: "Contact AccuPenPro",
    description,
    about: { "@id": `${url}/#organization` },
    mainEntity: { "@id": `${url}/#organization` },
  };
  return (
    <script
      type="application/ld+json"
      // Content is fully author-controlled; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const policyLinks = [
  { label: "Shipping policy", href: "/shipping-policy" },
  { label: "Refund & return policy", href: "/refund-policy" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
  { label: "Claims policy", href: "/claims-policy" },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: absoluteUrl("/contact"),
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${site.name}`,
    description,
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactPageSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

      <Section className="pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <Reveal
              as="h1"
              delay={0.06}
              className="font-display text-[clamp(2rem,4.4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-ink text-balance"
            >
              Questions get answered by a person.
            </Reveal>
            <Reveal
              as="p"
              delay={0.14}
              className="mt-5 max-w-[46ch] text-[0.98rem] leading-[1.7] text-ink-soft text-pretty"
            >
              {site.promise.support}. Order questions, sizing, returns ,
              whatever it is, use the form or email us directly.
            </Reveal>

            <Reveal delay={0.22} className="mt-9 flex flex-col gap-5">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3.5 rounded-card border border-line bg-linen p-5 transition-colors duration-300 hover:border-ink/20"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                  <Icon name="check" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] tracking-[0.2em] text-ink-mute uppercase">
                    Email
                  </span>
                  <span className="block truncate text-[0.95rem] font-medium text-ink group-hover:text-gold">
                    {site.email}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-3.5 rounded-card border border-line bg-linen p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-parchment text-ink-mute">
                  <Icon name="map-pin" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] tracking-[0.2em] text-ink-mute uppercase">
                    Address
                  </span>
                  <span className="block text-[0.95rem] font-medium text-ink">
                    {site.address}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            className="rounded-card border border-line bg-parchment p-6 sm:p-8"
          >
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line bg-parchment">
        <SectionHeading
          align="center"
          eyebrow="Who you're reaching"
          title={site.legalName}
          body={`${site.address}. A real business with a real address, not a faceless storefront.`}
        />
        <p className="mx-auto mt-8 max-w-160 text-center text-[0.86rem] leading-relaxed text-ink-soft">
          Read more about who we are and what we do (and don't) claim about
          the product on our{" "}
          <a href="/about" className="text-gold underline underline-offset-4">
            About page
          </a>
          .
        </p>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading align="center" eyebrow="Policies" title="Every policy, in one place." />
        <nav
          aria-label="Company policies"
          className="mx-auto mt-10 flex max-w-160 flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {policyLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.86rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Section>
    </main>
  );
}
