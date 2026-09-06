import Link from "next/link";
import { LogoMark, Wordmark, Tagline } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { Reveal } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import { footerNav } from "@/content/copy";
import { site } from "@/lib/site";
import { productPath } from "@/lib/catalog";

/**
 * The footer — archetype Ft4, "statement close".
 *
 * Rebuilt. The inherited footer was Ft3, the four-column
 * Shop / Help / Account / Company index with a social row underneath. That
 * exact shape is the single most recognisable generated-site footer there is,
 * and this site has nowhere near enough destinations to justify it — it was
 * four columns of three links padding out a hub that isn't a hub.
 *
 * This version leads with one closing line and the actual ask, then puts every
 * link in a single compact row beneath. It also drops the inherited `light`
 * prop, which switched the whole footer to a light treatment on /benefits
 * because that route used to be dark top-to-bottom. It isn't any more, so the
 * branch was dead weight carrying a second full set of colour overrides.
 *
 * This is the one dark surface on the site, and that is deliberate: it closes
 * the page rather than competing with it.
 */

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "Facebook", href: site.socials.facebook },
  { label: "YouTube", href: site.socials.youtube },
];

/** Flattened from the inherited four columns into one row of real links. */
const flatLinks = footerNav.flatMap((col) => col.links);

export default function Footer() {
  return (
    <footer className="bg-footer text-steel">
      {/* ------------------------- statement close ------------------------- */}
      <div className="mx-auto max-w-310 px-5 pt-20 pb-16 sm:px-8 lg:pt-28 lg:pb-20">
        <Reveal as="div" className="max-w-[24ch]">
          <p className="font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1] font-light text-chalk text-balance">
            Ten minutes, most evenings.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[46ch] text-[0.95rem] leading-[1.7] text-ash">
            {site.promise.shipping}. {site.promise.returns}. Dispatched within
            1&ndash;3 business days.
          </p>
          <Button href={productPath} variant="onDark" arrow>
            Shop the pen
          </Button>
        </div>
      </div>

      {/* --------------------------- newsletter ---------------------------- */}
      <div className="border-t border-slate-line">
        <div className="mx-auto grid max-w-310 gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.95rem] font-medium text-chalk">
              Point guides and honest answers, occasionally.
            </p>
            <p className="mt-1.5 text-[0.85rem] leading-[1.6] text-dim">
              No launch spam. Unsubscribe in one click.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* ------------------------------ links ------------------------------ */}
      <div className="border-t border-slate-line">
        <div className="mx-auto max-w-310 px-5 py-10 sm:px-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {flatLinks.map((l) => (
              <li key={`${l.href}-${l.label}`}>
                <Link
                  href={l.href}
                  className="text-[0.84rem] text-ash transition-colors duration-200 ease-(--ease-out-soft) hover:text-chalk"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------------------- colophon ----------------------------- */}
      <div className="border-t border-slate-line">
        <div className="mx-auto flex max-w-310 flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <div>
                <Wordmark variant="light" className="text-[1.05rem]" />
                <Tagline variant="light" className="mt-1" />
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.82rem] text-ash transition-colors duration-200 ease-(--ease-out-soft) hover:text-chalk"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-[62ch] lg:text-right">
            <p className="text-[0.75rem] text-dim">
              &copy; {new Date().getFullYear()} {site.legalName}. All rights
              reserved.
            </p>
            {/* The disclaimer sits in the colophon on every page by design —
                it is the one claim-policy statement that must be unmissable. */}
            <p className="mt-3 text-[0.72rem] leading-relaxed text-dim">
              AcuNova sells a consumer wellness device. It is not a medical
              device, it is not cleared by the FDA or Health Canada, and nothing
              on this site is a health claim or a treatment for any condition.
              Not for use with a pacemaker or during pregnancy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
