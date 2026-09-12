"use client";

import { motion } from "motion/react";
import Image from "@/components/ui/Image";
import { useState } from "react";
import { toast } from "sonner";
import {
  CheckIcon,
  GlobeIcon,
  MinusIcon,
  PlusIcon,
  ReturnIcon,
} from "@/components/ui/Icons";
import { easeOut } from "@/components/ui/Motion";
import { DeliveryPincodeCheck } from "@/components/product/DeliveryPincodeCheck";
import { useCart } from "@/components/providers/CartProvider";
import { useLocalizedAmount } from "@/components/providers/LocalizationProvider";
import { formatMoney } from "@/lib/money";
import { shopifyCheckout } from "@/lib/shopify-checkout";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/product";

/**
 * Ceiling on PACKS per order, not pens — a 2-pen pack can take an order to 20
 * pens. Raising it means raising the real quantity sent to the cart with it.
 */
const MAX_PACKS = 10;

/**
 * Pack sizes offered above the stepper — how many pens one pack carries.
 *
 * Both sizes buy the same SKU: a 2-pack is quantity 2, not a separate
 * variant, because fulfilment (CJDropshipping) maps per SKU and passes
 * quantity straight through, so a bundle modelled as its own variant would
 * need a CJ SKU that ships two units and there isn't one.
 *
 * **Pack size × packs, not one flat quantity.** These two controls answer
 * different questions and used to share a single counter: the pills set
 * `quantity` to 1 or 2 and the stepper incremented that same number, so
 * pressing "+" from a 2-pack silently dropped the pack selection (at 3, no
 * pill was highlighted at all) and the headline price never moved, because it
 * was rendered from the per-unit amount. Now the pills choose the pack size
 * and the stepper multiplies how many of that pack are wanted — which is what
 * this surface always claimed to do, and what the reference build did with
 * its 1/2-band variants.
 *
 * `BUNDLE_DISCOUNT` mirrors the Shopify automatic discount "2-Pack Bundle -
 * 20% off" (minimum quantity 2, scoped to this variant). It is display only:
 * the real reduction is applied by Shopify at checkout, so the figure shown
 * here and the figure charged come from the same rule rather than this
 * component inventing one.
 */
const BUNDLE_MIN_QTY = 2;
const BUNDLE_DISCOUNT = 0.2;

const PACKS: ReadonlyArray<{ size: number; label: string; badge?: string }> = [
  { size: 1, label: "1 pen" },
  { size: 2, label: "2 pens", badge: "Save 20%" },
];

/**
 * The purchase surface — gallery lives beside this in the product page, this
 * is everything else: price, stock, the pack picker, quantity and the two
 * ways to check out.
 *
 * Two quantities, kept apart on purpose: `packSize` (the pills) is how many
 * pens one pack carries and `packs` (the stepper) is how many packs. The
 * headline price is their product — the live localized amount for the
 * selection — so both controls move it. See the PACKS doc above for why they
 * used to share one counter and what that broke.
 *
 * `selectedId`/`onSelectId` are controlled by the parent (ProductPurchase)
 * rather than owned here, so picking a variant can also move ProductGallery's
 * main image to match it — a plain internal useState couldn't reach outside
 * this component to do that.
 */
export function BuyBox({
  product,
  selectedId,
  onSelectId,
}: {
  product: Product;
  selectedId: string;
  onSelectId: (id: string) => void;
}) {
  /** How many pens one pack carries — the "1 pen" / "2 pens" pills. */
  const [packSize, setPackSize] = useState(1);
  /** How many packs — the stepper beside the buy buttons. */
  const [packs, setPacks] = useState(1);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);
  const { add } = useCart();

  const selected =
    product.variants.find((v) => v.id === selectedId) ?? product.variants[0];

  const selectedPrice = useLocalizedAmount(
    selected.id,
    selected.price.amount,
    selected.price.currencyCode,
    selected.compareAtPrice?.amount ?? null,
  );

  // The real count never reaches this component at all — lib/product.ts
  // derives this boolean server-side from Shopify's actual inventory, so
  // there's nothing confidential in the client bundle to accidentally render.
  const lowStock = selected.lowStock;
  // A sold-out variant can't be ordered — buying it would be rejected by the
  // cart API, so the whole purchase surface is disabled and labelled instead.
  const outOfStock = !selected.availableForSale;

  // The one number the headline price and both buy buttons quote: pens per
  // pack × how many packs.
  const pensTotal = packSize * packs;

  // What the shopper actually pays for that selection. The Shopify rule
  // ("2-Pack Bundle - 20% off") is a minimum-quantity one, so it applies to
  // every basket at or above its threshold, not only to an exact 2 — mirror
  // that here so the price shown can never quote more than checkout charges.
  //
  // `selectedPrice.amount` is the localized amount from useLocalizedAmount (the
  // synced Shopify presentment price for the shopper's market), so scaling it
  // keeps the headline in the shopper's own currency instead of re-deriving a
  // number from the default-market price.
  const packDiscount = pensTotal >= BUNDLE_MIN_QTY ? BUNDLE_DISCOUNT : 0;
  const cartTotal = selectedPrice.amount * pensTotal * (1 - packDiscount);
  const compareAtTotal =
    selectedPrice.compareAtAmount != null
      ? selectedPrice.compareAtAmount * pensTotal
      : null;

  const save =
    selectedPrice.compareAtAmount != null &&
    selectedPrice.amount < selectedPrice.compareAtAmount
      ? Math.round(
          (1 - selectedPrice.amount / selectedPrice.compareAtAmount) * 100,
        )
      : 0;

  return (
    <div>
      {/* --------------------------------- price -------------------------------- */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <motion.span
          key={selected.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="font-display text-[2.2rem] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums"
        >
          {/* The live total for the current selection — pack size × packs,
              less the bundle discount — not the per-unit price. Always a
              real, displayable figure: selectedPrice.amount falls back to the
              server-rendered default-market price before localization
              resolves (see useLocalizedAmount), so the price is present in the
              initial HTML rather than a blank skeleton. */}
          {formatMoney(cartTotal, selectedPrice.currencyCode)}
        </motion.span>
        {compareAtTotal != null && (
          <span className="text-[1.05rem] text-ink-mute line-through tabular-nums">
            {formatMoney(compareAtTotal, selectedPrice.currencyCode)}
          </span>
        )}
        {save >= 45 ? (
          <span className="rounded-full bg-gold px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-on-accent uppercase">
            Buy 1, get 1 free
          </span>
        ) : (
          save > 0 && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.7rem] font-semibold text-gold">
              Save {save}%
            </span>
          )
        )}
      </div>

      {/* --------------------------------- chips --------------------------------- */}
      <ul className="mt-4 flex flex-wrap items-center gap-1.5">
        {outOfStock ? (
          <li className="inline-flex h-7 items-center gap-1.5 rounded-full border border-red-600/25 bg-red-500/10 px-2.5 text-[0.72rem] font-medium text-red-700">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Out of stock
          </li>
        ) : lowStock ? (
          <li className="inline-flex h-7 items-center gap-1.5 rounded-full border border-amber-600/25 bg-amber-500/10 px-2.5 text-[0.72rem] font-medium text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Low stock, order soon
          </li>
        ) : (
          <li className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line px-2.5 text-[0.72rem] font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            In stock
          </li>
        )}
        <li className="inline-flex h-7 items-center rounded-full border border-line px-2.5 text-[0.72rem] font-medium text-ink-soft">
          {product.material}
        </li>
      </ul>

      {/* ------------------------------ variant picker ----------------------------- */}
      {product.variants.length > 1 && (
        <VariantPicker
          product={product}
          selectedId={selected.id}
          onSelect={onSelectId}
        />
      )}

      {/* --------------------------------- packs ---------------------------------- */}
      {!outOfStock && (
        <fieldset className="mt-8">
          <legend className="mb-2.5 text-[0.68rem] font-semibold tracking-[0.2em] text-ink-mute uppercase">
            Pack size
          </legend>
          <div className="flex flex-wrap gap-2">
            {PACKS.map((pack) => {
              // Active follows the pack choice only, so the stepper can move
              // without the pills appearing to lose the selection.
              const active = packSize === pack.size;
              return (
                <button
                  key={pack.size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPackSize(pack.size)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-linen text-ink-soft hover:border-ink/30",
                  )}
                >
                  <span>{pack.label}</span>
                  {pack.badge && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-wide uppercase",
                        active
                          ? "bg-white/15 text-white"
                          : "bg-accent-soft text-gold-deep",
                      )}
                    >
                      {pack.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* -------------------------------- quantity --------------------------------- */}
      {/* Counts PACKS, not pens — the readout stays the pack count and the
          headline price carries the pen total, so the two never disagree about
          what the number between the arrows means. */}
      <div className="mt-7 flex items-center gap-3">
        <div className="inline-flex h-14 shrink-0 items-center rounded-full bg-parchment">
          <button
            type="button"
            onClick={() => setPacks((n) => Math.max(1, n - 1))}
            disabled={packs <= 1}
            aria-label="Decrease number of packs"
            className="grid h-full w-12 place-items-center rounded-l-full text-ink transition-colors hover:bg-line disabled:opacity-35"
          >
            <MinusIcon className="size-4" />
          </button>
          <span
            aria-live="polite"
            aria-label={`${packs} ${packs === 1 ? "pack" : "packs"} of ${packSize} ${packSize === 1 ? "pen" : "pens"}, ${pensTotal} pens in total`}
            className="w-8 text-center text-[0.95rem] font-medium text-ink tabular-nums"
          >
            {packs}
          </span>
          <button
            type="button"
            onClick={() => setPacks((n) => Math.min(MAX_PACKS, n + 1))}
            disabled={packs >= MAX_PACKS}
            aria-label="Increase number of packs"
            className="grid h-full w-12 place-items-center rounded-r-full text-ink transition-colors hover:bg-line disabled:opacity-35"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>

        <button
          type="button"
          disabled={outOfStock}
          onClick={() => {
            if (outOfStock) return;
            add(
              selected.id,
              pensTotal,
              Math.round(selectedPrice.amount * 100),
              selectedPrice.currencyCode,
            );
            toast.success("Added to cart", {
              description: product.title,
              icon: (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <CheckIcon className="size-3" />
                </span>
              ),
            });
          }}
          className="flex h-14 w-full flex-1 items-center justify-center gap-2.5 rounded-full bg-gold font-display text-[0.88rem] font-semibold tracking-widest whitespace-nowrap text-on-accent uppercase transition-colors duration-200 hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {outOfStock
            ? "Out of stock"
            : `Add to bag · ${formatMoney(
                cartTotal,
                selectedPrice.currencyCode,
              )}`}
        </button>
      </div>

      <button
        type="button"
        disabled={buying || outOfStock}
        onClick={async () => {
          setBuying(true);
          setBuyError(null);
          const result = await shopifyCheckout(
            [
              {
                variantId: selected.id,
                qty: pensTotal,
                priceCents: Math.round(selectedPrice.amount * 100),
              },
            ],
            selectedPrice.currencyCode,
          );
          if (result.ok) {
            window.location.href = result.checkoutUrl;
            return;
          }
          setBuyError(result.error);
          setBuying(false);
        }}
        className="mt-2.5 flex h-13 w-full items-center justify-center rounded-full bg-ink font-display text-[0.85rem] font-semibold tracking-widest text-white uppercase transition-colors duration-300 hover:bg-ink/85 disabled:opacity-50"
      >
        {buying ? "Taking you to checkout…" : "Buy it now"}
      </button>
      {buyError && (
        <p className="mt-2 text-center text-[0.78rem] text-red-700">
          {buyError}
        </p>
      )}

      {/* --------------------------- delivery estimate ---------------------------- */}
      <div className="mt-5">
        <DeliveryPincodeCheck />
      </div>

      {/* ------------------------------- guarantees ------------------------------- */}
      <ul className="mt-6 flex flex-col gap-2.5 text-[0.8rem] text-ink-soft">
        <Guarantee icon={<GlobeIcon />}>{site.promise.shipping}</Guarantee>
        <Guarantee icon={<ReturnIcon />}>{site.promise.returns}</Guarantee>
        <Guarantee icon={<CheckIcon />}>{site.promise.hardware}</Guarantee>
        <Guarantee icon={<CheckIcon />}>{site.promise.support}</Guarantee>
      </ul>
    </div>
  );
}

function Guarantee({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span className="h-4 w-4 shrink-0 text-gold/80">{icon}</span>
      {children}
    </li>
  );
}

/**
 * A variant title of "Gold-plated · 10mm" splits into two independently
 * pickable axes (finish, size); a title with no " · " — "3 heads", "Size
 * 6" — is a single flat axis. Parsed from the title rather than carried as
 * separate fields because every product in lib/product.ts already encodes it
 * that way, and duplicating it as structured data would just be two sources
 * of truth to keep in sync.
 */
function splitVariantTitle(title: string): {
  axis1: string;
  axis2: string | null;
} {
  const [axis1, axis2] = title.split(" · ");
  return { axis1, axis2: axis2 ?? null };
}

/** A pack-count axis ("1 pen" / "2 pens") reads oddly under a "Size" legend — every value naming the product itself (not a measurement) means this is a quantity choice, not a fit choice. */
const PACK_COUNT_RE = /\b(pens?|sets?|heads?|kits?|pieces?)\b/i;

/** "2mm" < "3mm" < "10mm" < "12mm" — plain string sort would put "10mm" before "2mm". */
function bySizeAscending(a: string, b: string) {
  const na = parseFloat(a);
  const nb = parseFloat(b);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b, undefined, { numeric: true });
}

const pillClass = (active: boolean) =>
  `rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
    active
      ? "border-ink bg-ink text-white"
      : "border-line bg-linen text-ink-soft hover:border-ink/30"
  }`;

/**
 * Amazon-style picker: a product whose variants carry two axes (finish,
 * size) gets a row of image swatches for the first axis and a row of pills
 * for the second, with the current value of each named beside its label —
 * not the old single flat list of every SKU as its own full-width row.
 */
function VariantPicker({
  product,
  selectedId,
  onSelect,
}: {
  product: Product;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const parsed = product.variants.map((v) => ({
    v,
    ...splitVariantTitle(v.title),
  }));
  const selected = parsed.find((p) => p.v.id === selectedId) ?? parsed[0];
  const isTwoAxis = parsed.some((p) => p.axis2 !== null);

  if (!isTwoAxis) {
    const sortedFlat = [...parsed].sort((a, b) =>
      bySizeAscending(a.axis1, b.axis1),
    );
    const isPackCount = sortedFlat.every(({ axis1 }) =>
      PACK_COUNT_RE.test(axis1),
    );
    return (
      <fieldset className="mt-8">
        <legend className="mb-2.5 text-[0.68rem] font-semibold tracking-[0.2em] text-ink-mute uppercase">
          {isPackCount ? "Quantity" : "Size"}
        </legend>
        <div className="flex flex-wrap gap-2">
          {sortedFlat.map(({ v, axis1 }) => {
            const dealPct =
              v.compareAtPrice && v.compareAtPrice.amount > v.price.amount
                ? Math.round(
                    (1 - v.price.amount / v.compareAtPrice.amount) * 100,
                  )
                : 0;
            return (
              <button
                key={v.id}
                type="button"
                disabled={!v.availableForSale}
                aria-pressed={v.id === selectedId}
                title={v.availableForSale ? undefined : "Out of stock"}
                onClick={() => onSelect(v.id)}
                className={cn(
                  pillClass(v.id === selectedId),
                  "inline-flex items-center gap-1.5",
                  !v.availableForSale && "cursor-not-allowed opacity-40",
                )}
              >
                {axis1}
                {isPackCount && dealPct >= 20 && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-wide uppercase",
                      dealPct >= 45
                        ? "bg-gold text-on-accent"
                        : "bg-accent-soft text-gold",
                    )}
                  >
                    {dealPct >= 45 ? "1 free" : `−${dealPct}%`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const axis1Order: string[] = [];
  const groups = new Map<string, typeof parsed>();
  for (const p of parsed) {
    if (!groups.has(p.axis1)) {
      groups.set(p.axis1, []);
      axis1Order.push(p.axis1);
    }
    groups.get(p.axis1)!.push(p);
  }
  const axis2Options = [...(groups.get(selected.axis1) ?? [])].sort((a, b) =>
    bySizeAscending(a.axis2 ?? "", b.axis2 ?? ""),
  );
  const axis2IsPackCount = axis2Options.every(
    ({ axis2 }) => axis2 != null && PACK_COUNT_RE.test(axis2),
  );

  const pickAxis1 = (axis1: string) => {
    const group = groups.get(axis1)!;
    const sameSize = group.find(
      (p) => p.axis2 === selected.axis2 && p.v.availableForSale,
    );
    const fallback = group.find((p) => p.v.availableForSale) ?? group[0];
    onSelect((sameSize ?? fallback).v.id);
  };

  return (
    <>
      <fieldset className="mt-8">
        <div className="mb-2.5 flex items-baseline justify-between">
          <legend className="text-[0.68rem] font-semibold tracking-[0.2em] text-ink-mute uppercase">
            Style
          </legend>
          <span className="text-[0.8rem] font-medium text-ink">
            {selected.axis1}
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {axis1Order.map((axis1) => {
            const rep = groups.get(axis1)![0].v;
            const isSelected = axis1 === selected.axis1;
            const groupAvailable = groups
              .get(axis1)!
              .some((p) => p.v.availableForSale);
            return (
              <button
                key={axis1}
                type="button"
                aria-label={axis1}
                aria-pressed={isSelected}
                disabled={!groupAvailable}
                title={groupAvailable ? undefined : "Out of stock"}
                onClick={() => pickAxis1(axis1)}
                // A plain `border-*` colour utility can't be trusted here — an
                // unlayered `* { border-color }` reset in globals.css always
                // beats it regardless of specificity (same cascade-layer issue
                // documented on the pincode input's focus ring). `ring-*` uses
                // box-shadow instead of border-color, so it isn't affected.
                className={`relative size-14 shrink-0 overflow-hidden rounded-lg border border-line transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-ink ring-offset-2"
                    : "hover:ring-1 hover:ring-ink/40 hover:ring-offset-1"
                } ${groupAvailable ? "" : "cursor-not-allowed opacity-40"}`}
              >
                <Image
                  src={rep.image}
                  alt={axis1}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
                {isSelected && (
                  <span className="absolute right-0.5 bottom-0.5 grid size-4 place-items-center rounded-full bg-ink text-white">
                    <CheckIcon className="size-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <div className="mb-2.5 flex items-baseline justify-between">
          <legend className="text-[0.68rem] font-semibold tracking-[0.2em] text-ink-mute uppercase">
            {axis2IsPackCount ? "Quantity" : "Size"}
          </legend>
          <span className="text-[0.8rem] font-medium text-ink">
            {selected.axis2}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {axis2Options.map(({ v, axis2 }) => (
            <button
              key={v.id}
              type="button"
              disabled={!v.availableForSale}
              aria-pressed={v.id === selectedId}
              title={v.availableForSale ? undefined : "Out of stock"}
              onClick={() => onSelect(v.id)}
              className={cn(
                pillClass(v.id === selectedId),
                !v.availableForSale && "cursor-not-allowed opacity-40",
              )}
            >
              {axis2}
            </button>
          ))}
        </div>
      </fieldset>
    </>
  );
}
