/**
 * Single source of truth for anything a marketer might want to change without
 * touching a component. Swap the numbers here, not in the JSX.
 */

import { daysRange, defaultRegion } from "@/lib/shipping";

export const site = {
  name: "AccuPenPro",
  legalName: "AccuPenPro",
  tagline: "Balance · Relieve · Rejuvenate",
  domain: "accupenpro.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://accupenpro.com",
  email: "support@accupenpro.com",
  address: "Toronto, Ontario, Canada",
  // 120-160 chars: keep the acupressure pen keyword (the claims-safe head
  // term — see content/copy.ts hero comment) plus the "acupuncture pen"
  // search term people actually type (Google Trends: ~5x the volume of
  // "acupressure pen"), a CTA, and stop counting before it runs past ~160.
  description:
    "AccuPenPro acupressure pen, often searched as an acupuncture pen. Drug-free, no needles, 9 intensity levels, 5 heads. Shop now, free worldwide shipping.",
  locale: "en_US",
  currency: "USD",

  socials: {
    instagram: "https://www.instagram.com/accupenpro_official",
    tiktok: "https://tiktok.com/@accupenpro",
    facebook: "https://facebook.com/accupenpro",
    youtube: "https://youtube.com/@accupenpro_official",
  },

  /**
   * ⚠️ PLACEHOLDER SOCIAL PROOF — replace with figures you can evidence
   * before you take this live. Fabricated ratings are an FTC problem and
   * Google will strip rich results for unverifiable review markup. Nothing
   * in this object is emitted as schema.org markup until
   * `metrics.verified` is true.
   */
  metrics: {
    verified: false,
    rating: 4.9,
    reviewCount: 1024,
    unitsSold: 50000,
    countries: 34,
    /**
     * Shown in the product buy box as "1,400+ sold in the last 3 months".
     * Unlike the rest of this block it is NOT gated on `verified`, because it
     * renders as visible copy rather than schema.org markup — so it has to be
     * a figure the store can substantiate from its own orders for the last 90
     * days. It reads as a floor (`+`), so keep it at a count already cleared
     * rather than a rounding-up. A rolling window goes stale on its own:
     * recompute it from real order data instead of leaving one number sitting
     * here.
     */
    unitsSoldLast90Days: 1400,
  },

  promise: {
    shipping: "Free worldwide shipping",
    // Day range only — no country named here. The real, per-country transit
    // times (live CJDropshipping data, lib/shipping.ts) live on the About
    // page; product/cart surfaces resolve the shopper's own region silently
    // via useLocalization() instead of repeating a single figure for everyone.
    shippingDetail: `Dispatched in 1–3 business days · ${daysRange(defaultRegion)} days to arrive`,
    shippingFull: `Orders are processed within 1–3 business days, then tracked delivery typically takes ${daysRange(defaultRegion)} business days depending on where you are, worldwide. Full country-by-country transit times are on our About page.`,
    // Accurate scope: our supplier's dispute process only backs damaged,
    // missing, and wrong-item claims — there is no general change-of-mind
    // return, so the copy must never imply one. See
    // lib/account/order-status.ts's reasonNeedsDetail() for the same line.
    returns: "Free fix for damaged, missing, or wrong items",
    returnsDetail:
      "Send a photo within 30 days of delivery and we'll ship a free replacement or refund, and that covers damage, missing items, and mis-ships, not general change-of-mind returns.",
    // Verified, not promotional: the device's own rated hardware spec, not
    // a therapeutic claim. Nine intensity levels, four heads, one AA cell.
    hardware: "9 intensity levels · 5 interchangeable heads · one AA cell",
    support: "Human replies in under 12 hours",
  },
} as const;

export type Site = typeof site;
