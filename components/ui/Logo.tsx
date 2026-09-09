import Link from "next/link";
import Image from "@/components/ui/Image";
import { site } from "@/lib/site";

/**
 * The AccuPenPro logo — a single flat artwork (mountain "A" mark, the pen
 * icon standing in for part of the "P", the dotted arc, and the tagline)
 * shipped as two pre-rendered PNGs rather than drawn as live type: the mark
 * itself has a photographic pen render baked in, which isn't something CSS
 * or an inline SVG can reproduce. `variant` picks which file, not an ink
 * colour: "dark" (the black-ink file) for light surfaces, "light" (the
 * white-ink file) for dark ones.
 */

export type LogoVariant = "dark" | "light";

const LOGO_SRC: Record<LogoVariant, string> = {
  dark: "/brand/accupen-logo-black.png",
  light: "/brand/accupen-logo-white.png",
};

/** Native pixel ratio of the source artwork (1774x887) — keeps next/image from guessing and box-shifting on load. */
const LOGO_RATIO = 887 / 1774;

/**
 * The full lockup: mark, wordmark and tagline together, exactly as
 * designed. There's no separate "tagline off" rendering here — the source
 * artwork always includes it — so `showTagline` only controls whether the
 * image is allowed to grow tall enough to keep that line legible.
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
      aria-label={`${site.name}, home`}
      className={`group inline-flex items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Image
        src={LOGO_SRC[variant]}
        alt={site.name}
        width={1774}
        height={887}
        priority
        skeleton={false}
        className={showTagline ? "h-16 w-auto sm:h-20" : "h-12 w-auto sm:h-14"}
        style={{ aspectRatio: `1774 / 887` }}
      />
    </Link>
  );
}

/**
 * Same artwork, not wrapped in a link — for surfaces (footer brand block)
 * that already provide their own home link or none at all.
 */
export function Wordmark({
  variant = "dark",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt={site.name}
      width={1774}
      height={887}
      skeleton={false}
      className={`h-10 w-auto ${className}`}
      style={{ aspectRatio: `1774 / 887` }}
    />
  );
}
