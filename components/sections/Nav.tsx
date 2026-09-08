"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ButtonHTMLAttributes } from "react";

import { AccountMenu } from "@/components/account/AccountMenu";
import { CurrencySelector } from "@/components/localization/CurrencySelector";
import { useCart } from "@/components/providers/CartProvider";
import { Logo } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { easeOut } from "@/components/ui/Motion";
import { useScrollLock } from "@/lib/scroll-lock";
import { productPath } from "@/lib/catalog";

/**
 * The site header.
 *
 * Rebuilt from scratch. It does blend into a hero, but the mechanism is the
 * opposite of the inherited one. That version decided from a hardcoded
 * pathname allowlist (`/` and `/benefits`) whether a page was "dark", which
 * went stale the instant those routes changed and rendered white nav text on
 * a white page — an invisible header.
 *
 * Here the hero tells the header, not the other way around: `HeroFrame`
 * reports its own position via an IntersectionObserver, and the header drops
 * its background while a hero is behind it so the two read as one frame. The
 * hero is WHITE, so nav type stays dark in both states — only the bar's own
 * background and shadow change. There is no bottom border in any state: a
 * hairline across the fold is exactly what breaks the single-frame effect.
 *
 * A page with no HeroFrame never fires the event and gets the solid bar by
 * default, so the safe state is also the default state and can't rot.
 *
 * Cart, currency and account are unchanged integration points — they are
 * Shopify/CJ plumbing, not design, and are deliberately left alone.
 */

const links = [
  { label: "Shop", href: "/shop" },
  { label: "How it works", href: "/#method" },
  { label: "Uses", href: "/benefits" },
];

/** Shared chrome for the small square icon buttons in the bar. */
export function iconButtonClass(onDark: boolean, className = "") {
  return [
    "grid size-9 place-items-center rounded-full",
    "transition-colors duration-200 ease-(--ease-out-soft)",
    onDark ? "text-chalk hover:bg-white/15" : "text-ink hover:bg-ink/[0.06]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function IconButton({
  children,
  onDark = false,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={iconButtonClass(onDark, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

function CartButton({
  onDark = false,
  onOpen,
}: {
  onDark?: boolean;
  onOpen?: () => void;
}) {
  const { itemCount, open } = useCart();
  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        open();
      }}
      aria-label={`Bag${itemCount ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ", empty"}`}
      className={iconButtonClass(onDark, "relative")}
    >
      <Icon name="bag" className="size-5" />
      {itemCount > 0 && (
        <span
          className={`absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 font-sans text-[0.6rem] font-semibold tabular-nums ${onDark ? "bg-chalk text-ink" : "bg-primary text-on-primary"}`}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // `overHero` is driven by HeroFrame, not by a pathname allowlist. The
  // inherited header hardcoded which routes were "dark", which went stale the
  // moment a route changed and rendered white text on a white page. A page
  // without a HeroFrame never fires the event, so it stays solid by default —
  // the safe state is also the default state.
  const [overHero, setOverHero] = useState(false);
  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOverHero = (e: Event) =>
      setOverHero((e as CustomEvent<boolean>).detail);
    window.addEventListener("accupenpro:overhero", onOverHero);
    return () => window.removeEventListener("accupenpro:overhero", onOverHero);
  }, []);

  // Blend only while a hero is behind the bar AND the page is still at rest.
  //
  // The `!scrolled` term is what makes the bar respond the instant you start
  // moving: it was previously blended for the entire hero, which on a
  // full-height fold meant the whole first screen went by with the bar
  // apparently doing nothing. Now the background fades in as soon as the page
  // moves, while the hero is still behind it — that motion is the cue that the
  // bar is a real, fixed surface.
  //
  // Never blended while the drawer is open: its close button needs a solid
  // bar behind it.
  const blend = overHero && !scrolled && !menuOpen;

  // Close the drawer on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-70 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-(--ease-out-soft) ${
          blend
            ? "bg-transparent"
            : `bg-canvas/85 backdrop-blur-xl ${
                scrolled ? "shadow-(--shadow-e1)" : ""
              }`
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="mx-auto flex h-full max-w-310 items-center justify-between gap-4 px-6 sm:px-0">
          <Logo variant="dark" />

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => {
              const active =
                l.href === pathname ||
                (l.href !== "/" &&
                  !l.href.startsWith("/#") &&
                  pathname.startsWith(l.href));
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-[0.9rem] transition-colors duration-200 ease-(--ease-out-soft) ${
                      active ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block">
              <CurrencySelector variant="bar" overHero={false} />
            </div>
            <div className="hidden sm:block">
              <AccountMenu variant="dropdown" overHero={false} />
            </div>
            <CartButton onOpen={() => setMenuOpen(false)} />
            <div className="hidden lg:block">
              <Button href={productPath} size="sm" variant="primary">
                Buy now
              </Button>
            </div>
            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden"
            >
              <Icon name="menu" className="size-5" />
            </IconButton>
          </div>
        </nav>
      </header>

      {/* ------------------------------ drawer ------------------------------ */}
      {/* A light sheet, not the inherited full-bleed dark panel. On a bright
          site a dark takeover is a jarring context switch, and it forced a
          second set of inverted styles for every control inside it. */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-80 bg-overlay lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: easeOut }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-90 flex w-[min(21rem,88vw)] flex-col bg-canvas shadow-(--shadow-e4) lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <div
                className="flex items-center justify-between border-b border-line px-5"
                style={{ height: "var(--nav-h)" }}
              >
                <Logo variant="dark" />
                <IconButton
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon name="close" className="size-4" />
                </IconButton>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="flex items-center justify-between rounded-lg py-3 text-[1.05rem] text-ink transition-colors duration-200 hover:bg-ink/4"
                      >
                        {l.label}
                        <Icon
                          name="chevron-right"
                          className="size-4 text-ink-mute"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer section, mirrors the reference drawer: a quiet,
                  centred icon row (currency, account + sign-out, bag) so the
                  full-width shop CTA underneath carries the weight. */}
              <div className="border-t border-line px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
                <div className="flex items-center justify-center gap-3">
                  <CurrencySelector variant="drawer" />
                  <AccountMenu variant="list" />
                  <CartButton onOpen={() => setMenuOpen(false)} />
                </div>

                <Button
                  href={productPath}
                  variant="primary"
                  arrow
                  className="mt-4 w-full"
                >
                  Shop the pen
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
