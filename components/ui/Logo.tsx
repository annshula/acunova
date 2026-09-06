import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The AcuNova wordmark, drawn as type rather than shipped as a raster.
 *
 * The brand poster sets the name in wide-tracked caps with a stack of
 * three dots replacing the bowl of the "O", over the tagline
 * "BALANCE · RELIEVE · REJUVENATE". Rendering that from live text plus one
 * small SVG glyph means it stays sharp at any size, recolours for light
 * and dark surfaces without a second file, costs no image request, and
 * stays selectable and readable to a screen reader.
 *
 * `variant` picks the ink, not a different file: "dark" for the canvas,
 * "light" for the footer.
 */

export type LogoVariant = "dark" | "light";

/**
 * The dotted "O" — the one piece of the wordmark that is a drawing rather
 * than a letter. Sized in `em` so it tracks whatever font-size the
 * surrounding wordmark is set at.
 */
function DottedO({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`inline-block h-[0.92em] w-[0.92em] -mb-[0.07em] ${className}`}
      aria-hidden
      fill="none"
    >
      <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="6" r="1.15" fill="currentColor" />
      <circle cx="10" cy="10" r="1.15" fill="currentColor" />
      <circle cx="10" cy="14" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  variant = "dark",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  return (
    <span
      className={`font-display inline-flex items-center text-[1.15rem] leading-none font-medium tracking-[0.24em] uppercase ${
        variant === "light" ? "text-chalk" : "text-ink"
      } ${className}`}
    >
      {/* The name is split so the dotted glyph can stand in for the O
          while the full word stays readable to assistive tech. */}
      <span aria-hidden>ACUN</span>
      <DottedO className="mx-[0.04em] text-gold" />
      <span aria-hidden>VA</span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}

/** The three-word tagline that sits under the wordmark on the poster. */
export function Tagline({
  variant = "dark",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  return (
    <span
      className={`font-label block text-[0.5rem] leading-none font-medium tracking-[0.32em] uppercase ${
        variant === "light" ? "text-ash" : "text-ink-mute"
      } ${className}`}
    >
      Balance · Relieve · Rejuvenate
    </span>
  );
}

/**
 * The full lockup.
 *
 * `showTagline` is OFF by default and the header must never turn it on. The
 * nav bar is 68px tall; stacking the wordmark over a second line of tracked
 * caps inside that makes the lockup taller than the bar's comfortable optical
 * centre and reads as cramped. The tagline belongs in the footer, where it has
 * room, and on the /benefits eyebrow. If the header ever needs to say more
 * than the name, it should say it in a nav link, not under the logo.
 */
export function Logo({
  variant = "dark",
  showTagline = false,
  className = "",
}: {
  variant?: LogoVariant;
  /** Kept for API compatibility with the previous raster logo; unused. */
  priority?: boolean;
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex flex-col gap-1.5 ${className}`}
    >
      <Wordmark
        variant={variant}
        className="transition-opacity duration-300 group-hover:opacity-75"
      />
      {showTagline && <Tagline variant={variant} />}
    </Link>
  );
}

/**
 * Compact mark for tight spots (favicons in JSX, loading states). Renders
 * just the dotted glyph in the accent colour.
 */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <span className={`inline-block text-gold ${className}`}>
      <svg viewBox="0 0 20 20" className="h-full w-full" aria-hidden fill="none">
        <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="6" r="1.15" fill="currentColor" />
        <circle cx="10" cy="10" r="1.15" fill="currentColor" />
        <circle cx="10" cy="14" r="1.15" fill="currentColor" />
      </svg>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
