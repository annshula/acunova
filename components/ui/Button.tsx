import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";

/**
 * Buttons for the AccuPenPro system.
 *
 * Rebuilt. What the inherited version did that this one drops:
 *
 * - **The shimmer.** Every CTA carried a translated pseudo-gradient that swept
 *   across on hover. It is a signature effect, and a loud one on a brand whose
 *   whole register is calm.
 * - **Uppercase, letter-spaced labels.** `uppercase tracking-[0.14em]` on every
 *   button shouts. Wide-tracked caps still exist in this system, but as small
 *   labels and eyebrows — not as the voice of a call to action. Buttons are now
 *   sentence case at a normal measure, which also stops "Add to bag" and
 *   "Shop the pen" rendering wider than the content they sit under.
 * - **Absolute-positioned arrows.** The arrow was pinned to the right edge with
 *   hand-tuned per-size padding constants to keep the label optically centred.
 *   It is a flex child now, so the geometry holds at any size or label length
 *   with no magic numbers.
 * - **The `ghost` variant.** It was styled for a dark hero (`border-white/15`,
 *   `text-chalk`). There is no dark surface on this site outside the footer, so
 *   it rendered near-invisible wherever it was actually used.
 *
 * Colour rule, from .tastemaker/style-lock.md: `primary` (#0f846e) is the only
 * fill allowed under a white label — 4.62:1. The lighter `accent` is UI-safe
 * only and must never become a button fill.
 */

type Variant =
  /** The one loud element on a screen. Solid teal, white label. */
  | "primary"
  /** Paired with primary. Hairline box, ink label. */
  | "secondary"
  /** Lowest weight: a label and an arrow, no box. */
  | "quiet"
  /** For the footer and any dark surface. */
  | "onDark"
  /* ── back-compat aliases, so inherited call sites keep compiling ── */
  | "gold"
  | "outline"
  | "invert"
  | "ghost";

const SIZE = {
  sm: "h-9 px-4 text-[0.82rem] gap-1.5",
  md: "h-11 px-5 text-[0.88rem] gap-2",
  lg: "h-13 px-7 text-[0.95rem] gap-2.5",
} as const;

const STYLE: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  quiet:
    "bg-transparent px-0 text-ink hover:text-primary underline-offset-4 hover:underline",
  onDark:
    "border border-white/25 bg-transparent text-chalk hover:border-white/50 hover:bg-white/10",
  // aliases
  gold: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  invert:
    "border border-line-strong bg-surface text-ink hover:border-ink/40",
  ghost:
    "border border-white/25 bg-transparent text-chalk hover:border-white/50 hover:bg-white/10",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  withArrow = false,
  href,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  title,
  "aria-label": ariaLabel,
  target,
  rel,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZE;
  arrow?: boolean;
  /** Alias for `arrow`, kept for inherited call sites. */
  withArrow?: boolean;
  /** When present, renders an anchor; otherwise a button. */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  title?: string;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}) {
  const showArrow = arrow || withArrow;

  // Only transform and colour transition — never `all`, which would animate
  // layout properties on every state change.
  const classes = [
    "group inline-flex items-center justify-center rounded-full font-sans font-medium",
    "whitespace-nowrap leading-none",
    "transition-[background-color,border-color,color,transform] duration-200 ease-(--ease-out-soft)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    SIZE[size],
    STYLE[variant],
    disabled ? "pointer-events-none opacity-45" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        title={title}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      title={title}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
