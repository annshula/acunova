import { avifSrc, webpSrc } from "@/lib/image-formats";
import { cn } from "@/lib/utils";

/**
 * Renders a LOCAL, pre-optimised image (an AVIF + WebP pair shipped from
 * /public) as a plain <picture> — never next/image, so it never routes through
 * Vercel's paid /_next/image optimizer. That is the same trade the codebase
 * already makes for local review photos (ProductReviews.tsx) and the era
 * frames (EraExplorer.tsx): we pre-optimise once at build time, serve the file
 * as-is, and skip the optimizer entirely.
 *
 * Format cascade (browser picks the first it supports):
 *   <source type="image/avif"> → <source type="image/webp"> → <img src=source>
 *
 * The source raster (usually the .png) is kept as the <img> fallback for the
 * tiny sliver of browsers with no <picture>/WebP support. `src` is any local
 * path; the .avif/.webp siblings are derived from it by extension swap (see
 * lib/image-formats.ts). Remote/CDN-hosted imagery should keep using
 * components/ui/Image.tsx (Shopify art goes through its CDN loader).
 *
 * API mirrors the parts of next/image the local call sites used:
 *   - `fill` → absolute-fills the nearest positioned ancestor (caller supplies
 *     the aspect box, exactly like next/image fill).
 *   - `width`/`height` → set as attributes so the browser reserves the aspect
 *     ratio before decode (no CLS), matching next/image's intrinsic mode.
 *   - `priority` → eager + high fetch priority for an above-the-fold image.
 *   - `skeleton` → adds the shared `.skeleton` shimmer background while the
 *     pixels decode (default on, like components/ui/Image.tsx). Set false for
 *     anything with real transparency.
 *
 * A server-safe plain element — no "use client" needed.
 */
export default function StaticImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  skeleton = true,
  className,
}: {
  src: string;
  alt: string;
  /** Intrinsic width — only meaningful when not `fill`. */
  width?: number;
  /** Intrinsic height — only meaningful when not `fill`. */
  height?: number;
  /** Absolute-fill the nearest positioned ancestor (caller supplies the box). */
  fill?: boolean;
  /** Treat as an LCP candidate: eager loading + high fetch priority. */
  priority?: boolean;
  /** Set false for anything with real transparency — see components/ui/Image.tsx. */
  skeleton?: boolean;
  className?: string;
}) {
  return (
    <picture>
      <source srcSet={avifSrc(src)} type="image/avif" />
      <source srcSet={webpSrc(src)} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={cn(
          skeleton && "skeleton",
          fill && "absolute inset-0 h-full w-full",
          className,
        )}
      />
    </picture>
  );
}
