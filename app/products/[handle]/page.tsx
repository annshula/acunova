import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductDetails } from "@/components/product/ProductDetails";
import PenStory from "@/components/product/PenStory";
import PenMoments from "@/components/product/PenMoments";
import PenVersus from "@/components/product/PenVersus";
import PenClose from "@/components/product/PenClose";
import ReviewsComing from "@/components/product/ReviewsComing";
import QualityTests from "@/components/product/QualityTests";
import BuildSection from "@/components/product/BuildSection";
import ProductReviews from "@/components/product/ProductReviews";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { pen as penCopy } from "@/content/product-pen";
import {
  buildPen,
  buildHeads,
  closeGeneric,
  pitchFor,
} from "@/content/pitches";
import { reviewSetForHandle } from "@/data/reviews";
import { getProductByHandle, products } from "@/lib/product";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { getProduct } from "@/lib/shopify";
import { pathForHandle } from "@/lib/catalog";

export const revalidate = 3600;

/**
 * Every product this store sells (lib/product.ts) gets a page. Handles are
 * whatever Shopify's currently are (data/product.json, refreshed by
 * `npm run shopify:sync-product`) — not hardcoded slugs. A product rename
 * upstream and a re-sync changes routes; there is nothing else to keep in
 * sync.
 */
export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  }
  const path = pathForHandle(product.handle);
  const { title } = product;
  const description = `${product.subtitle}. ${site.promise.shipping}. ${site.promise.returns}.`;
  const cover = product.gallery[0];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${title} · ${site.name}`,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      images: [
        {
          url: cover.src,
          width: cover.width,
          height: cover.height,
          alt: cover.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [cover.src],
    },
    other: {
      "product:brand": site.name,
      "product:availability": "in stock",
    },
  };
}

/**
 * The product detail page — the only page on the site with a buy button.
 * One sticky two-column split: gallery on the left, everything a shopper
 * needs to decide and buy on the right (title, price, pack picker, "Add to
 * bag"), specs and reviews underneath.
 *
 * The flagship product (the AccuPenPro pen) additionally mounts a full
 * marketing stack below the buy box — PenStory (dark history band),
 * PenMoments (when people reach for it), PenVersus (the pen vs pads vs
 * hands) and PenClose (risk-reversal CTA) — plus a verified-reviews
 * landing space. Every other listing keeps the plain purchase + spec
 * layout. Content for all of it lives in content/product-pen.ts, not in
 * the components.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  // Synced catalog data (data/product.json) — pricing, stock and photography.
  const liveProduct = await getProduct(handle);

  // Flagship product — the AccuPenPro pen — additionally keeps its comparison
  // section (Versus), its bespoke pitch and its full review dataset. Every
  // other listing gets the same playbook from a per-product pitch in
  // content/pitches.ts so no page is a copy-paste of another.
  const isFlagship = liveProduct.handle === penCopy.handle;
  const pitch = pitchFor(liveProduct.handle);
  const story = pitch?.story;
  const moments = pitch?.moments;

  // Only the pen has a review dataset (data/reviews.ts). Null for every
  // other handle — the scope guard in reviewSetForHandle enforces that.
  const reviewSet = reviewSetForHandle(liveProduct.handle);

  return (
    <main>
      <ProductSchema product={liveProduct} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: liveProduct.title, path: `/products/${liveProduct.handle}` },
        ]}
      />

      <div className="mx-auto w-full max-w-310 px-5 pt-20 sm:px-8 lg:pt-28">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.06em] text-ink-mute"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <span className="max-w-[20ch] truncate text-ink-soft">
            {product.title}
          </span>
        </nav>

        {/* Key facts / TL;DR — every line pulled straight from the real
            spec sheet, already shown in full (and visibly, for sighted
            visitors) further down in ProductDetails, so this block would be
            duplicate on-screen content. sr-only keeps it in the raw HTML,
            right at the top of the page, for answer engines and screen
            readers to get the load-bearing facts before the full narrative
            below, without a visible repeat of ProductDetails' own list. */}
        {liveProduct.specs.length > 0 && (
          <div className="sr-only">
            <h2>Key facts</h2>
            <ul>
              {liveProduct.specs.slice(0, 5).map((s) => (
                <li key={s.label}>
                  {s.label}: {s.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ProductPurchase
        product={liveProduct}
        rating={reviewSet?.summary}
        bestSeller={isFlagship}
      />

      {(isFlagship || pitch) && <PenStory story={story} />}
      {(isFlagship || pitch) && <PenMoments moments={moments} />}

      <ProductDetails product={liveProduct} />

      {/* The build, how the item is actually made. The pen explains its
          body, collar and cell; the head set explains the four tips.
          Header "The build" link scrolls here (#build). */}
      <BuildSection content={pitch?.kind === "heads" ? buildHeads : buildPen} />

      {/* Every product carries the QC band, the header & buy-box "Quality"
          links scroll here (#quality-test). */}
      <QualityTests product={liveProduct} />

      {isFlagship && <PenVersus />}

      {/* Risk-reversal close, flagship keeps its own copy, everything else
          uses the shared, product-neutral version. */}
      <PenClose content={isFlagship ? undefined : closeGeneric} />

      {/* Reviews: the pen gets the full customer-reviews feed (its own
          dataset); every other product shows the verified-only landing state
          until it has a real dataset of its own. */}
      {reviewSet ? (
        <ProductReviews
          reviews={reviewSet.reviews}
          summary={reviewSet.summary}
        />
      ) : (
        <ReviewsComing />
      )}
    </main>
  );
}
