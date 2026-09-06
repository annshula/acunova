import Link from "next/link";
import Image from "@/components/ui/Image";
import { formatMoney, type Product } from "@/lib/product";

/**
 * A product tile for the shop grid.
 *
 * Rebuilt. The inherited card carried a hardcoded "BEST SELLER" pill in raw
 * hex — `bg-[#f4c542]` on `text-[#1c1917]`, a yellow from the previous brand
 * that bypassed the token system entirely and clashed badly with the teal.
 * Worse, it was keyed to a single hardcoded handle, so it was really a
 * "this is the flagship" flag dressed up as social proof. With one product in
 * the catalog, labelling it best seller says nothing; the badge is gone.
 *
 * Any badge here now comes from real catalog state (a genuine discount) and is
 * drawn from the palette, so it can never drift off-system again.
 */
export function ProductCard({ product }: { product: Product }) {
  const cheapest = product.variants.reduce((min, v) =>
    v.price.amount < min.price.amount ? v : min,
  );
  const cover = product.gallery[0];

  // A real, computed saving — not a decorative label.
  const compareAt = cheapest.compareAtPrice?.amount;
  const savingPct =
    compareAt && compareAt > cheapest.price.amount
      ? Math.round((1 - cheapest.price.amount / compareAt) * 100)
      : 0;

  return (
    <article className="h-full">
      <Link
        href={`/products/${product.handle}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-300 ease-(--ease-out-soft) hover:border-line-strong hover:shadow-(--shadow-e3)"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-surface-sunken">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 380px"
            className="object-cover transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-[1.03]"
          />
          {savingPct > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[0.66rem] font-medium text-on-primary">
              Save {savingPct}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="line-clamp-2 text-[0.98rem] leading-snug font-medium text-ink">
            {product.title}
          </h2>
          {product.subtitle && (
            <p className="mt-1.5 line-clamp-1 text-[0.82rem] text-ink-mute">
              {product.subtitle}
            </p>
          )}

          <div className="mt-auto flex items-baseline gap-2.5 pt-5">
            <span className="text-[1.05rem] font-medium text-ink tabular-nums">
              {formatMoney(cheapest.price)}
            </span>
            {compareAt && compareAt > cheapest.price.amount && (
              <span className="text-[0.85rem] text-ink-mute line-through tabular-nums">
                {formatMoney({
                  amount: compareAt,
                  currencyCode: cheapest.price.currencyCode,
                })}
              </span>
            )}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-primary">
            View details
            <span
              aria-hidden
              className="transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
