"use client";

import Counter from "@/components/ui/Counter";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { benefitIcons, StarSolidIcon } from "@/components/ui/LineIcons";
import { useLocalization } from "@/components/providers/LocalizationProvider";
import { site } from "@/lib/site";
import { daysRange, regionForCountry } from "@/lib/shipping";
import { syncedAt } from "@/lib/catalog";

function formatSyncedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * The credibility strip — the poster's bottom bar, rebuilt to only state
 * things this business can actually evidence.
 *
 * ⚠️ The honesty gate, and why this component looks the way it does.
 *
 * The printed poster ends on "4.6/5 Average Rating · 50,000+ Happy
 * Customers". Neither figure comes from a review platform — `site.metrics`
 * says so itself, in a comment, and keeps `verified: false`. Shipping an
 * invented rating is an FTC problem in the US, gets rich results stripped by
 * Google, and is the single fastest way a proof band destroys the trust it
 * was added to build.
 *
 * So the rating tile is **gated**, not hardcoded: while `metrics.verified`
 * is false it renders a real, checkable policy fact instead. Flip that flag
 * the day the numbers come from a real platform and the rating tile lights
 * up on its own — no code change, no forgotten TODO. Everything else in
 * this strip is verifiable today: the markets we actually ship to, the
 * dispatch window from live carrier data, and the returns policy as written.
 *
 * Deliberately typographic — no imagery, no cards, no colour blocks. It
 * should read as fact, not as marketing.
 */
export default function TrustBar() {
  const { metrics } = site;
  const { country, defaultCountry } = useLocalization();
  const shippingRegion = regionForCountry(country ?? defaultCountry?.isoCode);

  const ShippingIcon = benefitIcons.shipping;
  const SafeIcon = benefitIcons.safe;
  const PenIcon = benefitIcons.pen;
  const PeopleIcon = benefitIcons.people;

  return (
    <section
      aria-label="What every order includes"
      className="relative z-10 border-y border-line bg-surface"
    >
      <Stagger className="mx-auto grid max-w-310 grid-cols-1 divide-y divide-line px-5 sm:grid-cols-2 sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:divide-x">
        {/* 1, Rating, but only once it is real. */}
        {metrics.verified ? (
          <Item
            icon={<StarSolidIcon />}
            headline={
              <>
                <Counter to={metrics.rating} decimals={1} />
                <span className="text-ink-mute"> / 5</span>
              </>
            }
            label={`from ${metrics.reviewCount.toLocaleString("en-US")} verified buyers`}
            aside={
              <span className="flex gap-0.5 text-star" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarSolidIcon
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.round(metrics.rating) ? "" : "opacity-25"
                    }`}
                  />
                ))}
              </span>
            }
          />
        ) : (
          <Item
            icon={<PeopleIcon />}
            headline={<>Real reviews only</>}
            label="we publish ratings when they come from confirmed orders, not before"
          />
        )}

        {/* 2, Free shipping. True: five live Shopify markets. */}
        <Item
          icon={<ShippingIcon />}
          headline={<>Free</>}
          label="tracked shipping to the US, Canada, UK, Australia and India"
        />

        {/* 3, Dispatch window, from live carrier data (lib/shipping.ts). */}
        <Item
          icon={<PenIcon />}
          headline={<>1–3 days</>}
          label={`to dispatch · ${daysRange(shippingRegion)} days to arrive`}
        />

        {/* 4, The returns policy exactly as written in lib/site.ts. */}
        <Item
          icon={<SafeIcon />}
          headline={<>30 days</>}
          label="to report a damaged, missing or wrong item, we replace it free"
        />
      </Stagger>

      {/* Key facts / TL;DR summary + a real <time> element — the same
          pattern the product page's "Key facts" card already uses (see
          app/products/[handle]/page.tsx), surfaced on the home page too. The
          strip above states four checkable facts already, so this line is
          redundant for a sighted visitor and reads as clutter — sr-only
          keeps it in the raw HTML for answer engines and screen readers
          (the page's real last-updated date is now visible in the markup,
          not only inside the JSON-LD's dateModified) without showing on
          screen. syncedAt is the real Shopify catalog sync timestamp
          (data/product.json), not a fabricated "updated today". */}
      <p className="sr-only">
        <span className="font-medium">Key facts:</span> 9 intensity levels,
        4 interchangeable heads, one AA battery, free worldwide shipping.
        Page last updated{" "}
        <time dateTime={syncedAt}>{formatSyncedDate(syncedAt)}</time>.
      </p>
    </section>
  );
}

function Item({
  icon,
  headline,
  label,
  aside,
}: {
  icon: React.ReactNode;
  headline: React.ReactNode;
  label: string;
  aside?: React.ReactNode;
}) {
  return (
    <StaggerItem
      as="div"
      className="flex flex-col items-center gap-2.5 px-4 py-9 text-center lg:py-11"
    >
      <span className="h-6 w-6 text-accent" aria-hidden>
        {icon}
      </span>
      <p className="font-display text-[1.5rem] leading-none font-light text-ink tabular-nums">
        {headline}
      </p>
      {aside}
      <p className="max-w-[26ch] text-[0.78rem] leading-normal text-ink-soft">
        {label}
      </p>
    </StaggerItem>
  );
}
