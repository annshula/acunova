import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { products } from "@/lib/product";
import { getProduct } from "@/lib/shopify";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const title = "Shop";
const description = `The AccuPenPro acupressure pen and the heads that fit it. ${site.promise.shipping}. ${site.promise.returns}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: absoluteUrl("/shop"),
    siteName: site.name,
    images: [
      {
        url: products[0].gallery[0].src,
        width: products[0].gallery[0].width,
        height: products[0].gallery[0].height,
        alt: products[0].gallery[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${site.name}`,
    description,
  },
};

/**
 * The listing — every product this store sells, one card each. This page
 * never sells anything itself; every card hands off to /products/[handle],
 * the only page with a buy button.
 */
export default async function ShopPage() {
  // Live Shopify pricing/stock for every product — same source BuyBox uses
  // on each product page, so "From $X" here never drifts from what checkout
  // actually charges.
  const liveProducts = await Promise.all(
    products.map((p) => getProduct(p.handle)),
  );

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
      />
      <div className="mx-auto w-full max-w-310 px-5 pt-20 pb-2 sm:px-8 lg:pt-28">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.06em] text-ink-mute"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-soft">Shop</span>
        </nav>

        <h1 className="font-display mt-7 text-[clamp(2rem,1.5rem+2.2vw,3.2rem)] leading-[1.1] font-light text-ink">
          Shop
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1rem] leading-[1.75] text-ink-soft text-pretty">
          One device, honestly described. Every version ships with the heads
          it lists, free, worldwide.
        </p>
      </div>

      <div className="mx-auto w-full max-w-310 px-5 pt-12 pb-24 sm:px-8 lg:pt-16 lg:pb-32">
        {/* auto-fill with a min track rather than a fixed column count: with a
            single product the card keeps a sane width instead of being
            stranded in a quarter-width cell, and the grid still fills out
            properly as the catalog grows. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(19rem,1fr))]">
          {liveProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
