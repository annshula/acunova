import type { Metadata } from "next";

import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { method } from "@/content/copy";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { shipping, daysRange, restOfWorldRegion, type ShippingRegion } from "@/lib/shipping";

const title = "About";

const shippingGroups: [string, ShippingRegion[]][] = Object.entries(
  shipping.regions.reduce<Record<string, ShippingRegion[]>>((acc, region) => {
    (acc[region.group] ??= []).push(region);
    return acc;
  }, {}),
);
const description = `${site.description} One product, made properly, no catalog to pad, nothing to upsell.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: absoluteUrl("/about"),
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${site.name}`,
    description,
  },
};

/** AboutPage structured data — references the real Organization already defined once in components/Schema.tsx (home page) rather than redeclaring it, so there's a single source of truth for the business entity. */
function AboutPageSchema() {
  const url = site.url;
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}/about#page`,
    url: `${url}/about`,
    name: "About AccuPenPro",
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

export default function AboutPage() {
  return (
    <main>
      <AboutPageSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <Section className="pt-20 lg:pt-28">
        <div className="mx-auto max-w-184 text-center">
          <Eyebrow>Who we are</Eyebrow>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-ink text-balance"
          >
            One device, made properly.
          </Reveal>
          <Reveal
            as="p"
            delay={0.14}
            className="mt-6 text-[1.02rem] leading-[1.7] text-ink-soft text-pretty"
          >
            {site.description} No sprawling catalog to get lost in, one device,
            the heads that fit it, sold honestly.
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-line bg-parchment">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{method.eyebrow}</Eyebrow>
            <Reveal
              as="h2"
              delay={0.06}
              className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.02] font-bold tracking-[-0.04em] text-ink text-balance"
            >
              {method.headline}
            </Reveal>
            <Reveal
              delay={0.14}
              className="mt-8 border-l-2 border-gold/60 pl-6"
            >
              <p className="text-[1rem] leading-[1.7] text-ink-soft text-pretty">
                {method.lede}
              </p>
            </Reveal>
          </div>

          <Stagger className="space-y-px overflow-hidden rounded-card border border-line bg-line">
            {method.paragraphs.map((p, i) => (
              <StaggerItem
                key={p.title}
                as="article"
                className="bg-linen p-7 lg:p-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[0.66rem] tracking-[0.2em] text-ink-mute tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.15rem] leading-tight font-semibold tracking-tight text-ink">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 pl-[1.66rem] text-[0.9rem] leading-[1.72] text-ink-soft text-pretty">
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section>
        <SectionHeading
          align="center"
          eyebrow="How we operate"
          title="What we promise, and what we won't."
          body="No subscriptions, no consumable pads to keep buying, no hundred-item catalog to get lost in. One device and the heads that fit it, priced honestly, backed by people who actually answer email."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-3">
          <StaggerItem
            as="article"
            className="rounded-card border border-line bg-linen p-7"
          >
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              {site.promise.shipping}
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              {site.promise.shippingFull}
            </p>
          </StaggerItem>
          <StaggerItem
            as="article"
            className="rounded-card border border-line bg-linen p-7"
          >
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              {site.promise.returns}
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              {site.promise.returnsDetail}
            </p>
          </StaggerItem>
          <StaggerItem
            as="article"
            className="rounded-card border border-line bg-linen p-7"
          >
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              {site.promise.support}
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              and a person answers, not a bot, not a ticket queue.
            </p>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section className="border-t border-line bg-parchment">
        <SectionHeading
          align="center"
          eyebrow="Shipping, honestly"
          title="Shipping timelines by region."
          body="Every order ships tracked and free, worldwide, on the fastest reliable route for where you are. Figures below reflect live carrier data for the regions we've priced individually; everywhere else uses a wider estimate until we have."
        />

        <Stagger className="mt-14 space-y-10">
          {shippingGroups.map(([group, regions]) => (
            <StaggerItem key={group} as="div">
              <h3 className="font-display text-[0.72rem] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                {group}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-3">
                {regions.map((region) => (
                  <article
                    key={region.code}
                    className="rounded-card border border-line bg-linen p-7 text-center"
                  >
                    <h4 className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
                      {region.label}
                    </h4>
                    <p className="mt-4 font-display text-[1.8rem] font-bold tracking-[-0.03em] text-ink tabular-nums">
                      {daysRange(region)}
                    </p>
                    <p className="mt-1 text-[0.78rem] text-ink-mute">
                      business days
                    </p>
                  </article>
                ))}
              </div>
            </StaggerItem>
          ))}
          <StaggerItem as="div">
            <h3 className="font-display text-[0.72rem] font-semibold tracking-[0.16em] text-ink-mute uppercase">
              Everywhere else
            </h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              <article className="rounded-card border border-line bg-linen p-7 text-center">
                <h4 className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
                  {restOfWorldRegion.label}
                </h4>
                <p className="mt-4 font-display text-[1.8rem] font-bold tracking-[-0.03em] text-ink tabular-nums">
                  {daysRange(restOfWorldRegion)}
                </p>
                <p className="mt-1 text-[0.78rem] text-ink-mute">
                  business days, estimated
                </p>
              </article>
            </div>
          </StaggerItem>
        </Stagger>

        <p className="mx-auto mt-8 max-w-160 text-center text-[0.76rem] leading-relaxed text-ink-mute">
          Tracked delivery, free on every order, worldwide, no minimum, no
          upsell for speed. Countries above have their own carrier-quoted
          window; everywhere else uses a wider estimate until we've priced
          that country individually, and updates as carrier performance
          changes.
        </p>
      </Section>

      <Section>
        <SectionHeading
          align="center"
          eyebrow="What we do and don't claim"
          title="A wellness device, described as one."
          body="The AccuPenPro pen is not cleared by the FDA or Health Canada as a medical device. Nothing on this site says or implies it treats, cures, heals, diagnoses or prevents any condition, and we've written a full policy explaining exactly where that line sits."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
          <StaggerItem
            as="article"
            className="rounded-card border border-line bg-linen p-7"
          >
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              What the hardware verifiably does
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              A metal tip delivers a low-intensity electrical pulse across
              nine selectable levels, combined with the physical pressure of
              the tip itself. That's the entire mechanism, and it's the same
              broad family of stimulation as the TENS units sold in any
              pharmacy.
            </p>
          </StaggerItem>
          <StaggerItem
            as="article"
            className="rounded-card border border-line bg-linen p-7"
          >
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              Who shouldn't use it
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              Anyone with a pacemaker or other implanted electronic device,
              anyone pregnant, and never over broken skin, a rash, or the
              front of the neck. Full safety detail is in our{" "}
              <a
                href="/faq#safety"
                className="text-gold underline underline-offset-4"
              >
                FAQ
              </a>
              .
            </p>
          </StaggerItem>
        </Stagger>
        <p className="mx-auto mt-8 max-w-160 text-center text-[0.76rem] leading-relaxed text-ink-mute">
          Read the full{" "}
          <a
            href="/claims-policy"
            className="text-gold underline underline-offset-4"
          >
            claims policy
          </a>{" "}
          for the complete line between what we say the hardware does and
          what acupressure is, as a tradition, not a treatment.
        </p>
      </Section>

      <Section className="border-t border-line bg-parchment">
        <SectionHeading
          align="center"
          eyebrow="Who you're buying from"
          title="A real business, reachable by email."
          body="We're a small team, not a faceless storefront. Here's how to find us and reach us."
        />
        <div className="mx-auto mt-14 grid max-w-160 gap-5 sm:grid-cols-2">
          <div className="rounded-card border border-line bg-linen p-7">
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              {site.legalName}
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              {site.address}
            </p>
          </div>
          <div className="rounded-card border border-line bg-linen p-7">
            <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
              Get in touch
            </h3>
            <p className="mt-2.5 text-[0.86rem] leading-[1.65] text-ink-soft">
              <a
                href={`mailto:${site.email}`}
                className="text-gold underline underline-offset-4"
              >
                {site.email}
              </a>
              , or use our{" "}
              <a
                href="/contact"
                className="text-gold underline underline-offset-4"
              >
                contact page
              </a>
              . {site.promise.support}.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          align="center"
          eyebrow="Policies"
          title="Every policy, in one place."
        />
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
