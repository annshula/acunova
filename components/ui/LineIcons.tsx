/**
 * Thin line-art pictograms, drawn to match the brand poster's icon row.
 *
 * House style, so new icons stay consistent:
 *   - 24x24 viewBox, no fill, stroke="currentColor"
 *   - 1.25 stroke width, round caps and joins
 *   - simple silhouettes, no detail smaller than ~1.5 units
 *   - never more than one accent stroke at reduced opacity
 * They inherit colour from the parent, so they work on the canvas and on
 * the footer without variants.
 */

type IconProps = { className?: string };

const base = "h-full w-full";

const common = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Knee / joint — the "joints" pictogram. */
export function JointIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M9 3v4.2a3 3 0 0 1-.9 2.1l-1.2 1.2a3 3 0 0 0 0 4.3l1.2 1.2a3 3 0 0 1 .9 2.1V21" />
      <path d="M15 3v4.2a3 3 0 0 0 .9 2.1l1.2 1.2a3 3 0 0 1 0 4.3l-1.2 1.2a3 3 0 0 0-.9 2.1V21" />
      <circle cx="12" cy="12" r="2.1" opacity=".5" />
    </svg>
  );
}

/** Shoulders / upper back — the "muscle tension" pictogram. */
export function MuscleIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <circle cx="12" cy="5" r="2.4" />
      <path d="M5.5 20v-2.6A6.5 6.5 0 0 1 12 10.9a6.5 6.5 0 0 1 6.5 6.5V20" />
      <path d="M8.8 14.4c1 .8 1.6 2 1.6 3.4M15.2 14.4c-1 .8-1.6 2-1.6 3.4" opacity=".5" />
    </svg>
  );
}

/** Droplet — circulation. */
export function CirculationIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M12 3.2s5 5.3 5 8.8a5 5 0 0 1-10 0c0-3.5 5-8.8 5-8.8Z" />
      <path d="M9.6 12.6a2.6 2.6 0 0 0 2.4 3.2" opacity=".5" />
    </svg>
  );
}

/** Lotus — stress and calm. */
export function CalmIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M12 19.5c-3.9 0-7.2-2.2-8.4-5.2 1.2-.8 2.6-1.2 4.1-1.1" />
      <path d="M12 19.5c3.9 0 7.2-2.2 8.4-5.2-1.2-.8-2.6-1.2-4.1-1.1" />
      <path d="M12 19.5c-2.4-1.7-3.8-4.3-3.8-7.1 0-3 1.5-5.7 3.8-7.4 2.3 1.7 3.8 4.4 3.8 7.4 0 2.8-1.4 5.4-3.8 7.1Z" />
    </svg>
  );
}

/** Crescent moon — sleep. */
export function SleepIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
      <path d="M16.2 4.2h3M17.7 2.7v3" opacity=".5" />
    </svg>
  );
}

/** Leaf — general wellness. */
export function LeafIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M4.6 19.4c-1.6-5 1-11.2 6.2-13.3 2.4-1 5.1-1 7.6-.1.6 2.6.3 5.3-.8 7.7-2.4 5-8.4 7.4-13 5.7Z" />
      <path d="M5.6 18.4C8.9 15 12.6 12 16.7 9.6" opacity=".5" />
    </svg>
  );
}

/** The device itself — a slim pen, tip down. */
export function PenIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M14.6 2.6 21 9l-11 11-5.4 1.4L6 16 14.6 2.6Z" />
      <path d="m12.4 5.4 6.2 6.2" opacity=".5" />
    </svg>
  );
}

/** Shield with a tick — safety / guarantee. */
export function SafeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M12 21c4-1.6 6.6-5.3 6.6-9.6V5.6L12 3 5.4 5.6v5.8C5.4 15.7 8 19.4 12 21Z" />
      <path d="m9.2 11.8 2 2 3.6-3.8" opacity=".7" />
    </svg>
  );
}

/** Van — free shipping. */
export function ShippingIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M2.8 6.6h10.4v9.2H2.8z" />
      <path d="M13.2 9.6h3.6l2.8 3v3.2h-6.4z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="16.4" cy="18" r="1.7" />
    </svg>
  );
}

/** People — customer count. */
export function PeopleIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <circle cx="9.2" cy="8.4" r="2.9" />
      <path d="M3.6 19.2a5.6 5.6 0 0 1 11.2 0" />
      <path d="M16.2 6.1a2.9 2.9 0 0 1 0 5.6M17.4 14.2a5.6 5.6 0 0 1 3 5" opacity=".5" />
    </svg>
  );
}

/** Solid star for rating rows — the one filled icon in the set. */
export function StarSolidIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 2.8Z" />
    </svg>
  );
}

/** Half-filled star, for a 4.6-style average. */
export function StarHalfIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="acu-star-half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 2.8Z"
        fill="url(#acu-star-half)"
      />
    </svg>
  );
}

/** Named lookup for the benefit grid, so content stays data-driven. */
export const benefitIcons = {
  joint: JointIcon,
  muscle: MuscleIcon,
  circulation: CirculationIcon,
  calm: CalmIcon,
  sleep: SleepIcon,
  wellness: LeafIcon,
  pen: PenIcon,
  safe: SafeIcon,
  shipping: ShippingIcon,
  people: PeopleIcon,
} as const;

export type BenefitIconName = keyof typeof benefitIcons;
