import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { Reveal } from "@/components/ui/Motion";
import { footerNav } from "@/content/copy";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "Facebook", href: site.socials.facebook },
  { label: "YouTube", href: site.socials.youtube },
];

/**
 * The footer — the one other deliberately dark surface on the site (with the
 * hero and the drawers), rebuilt to the reference layout's shape: the brand
 * statement and signup down the left, the full link index across the right,
 * and the copyright + claim-policy disclaimer in the closing bar.
 *
 * Reads off the always-dark tokens (chalk/steel/ash/dim + slate-line), never
 * the flippable ink/line pair, so it can't drift light if a page's surfaces
 * change. The NewsletterForm keeps its default dark-surface treatment.
 *
 * The disclaimer is not footer boilerplate to shrink: it is the one
 * claim-policy statement that must be unmissable, and it stays intact here
 * on every page.
 */
export default function Footer() {
  return (
    <footer className="border-t border-slate-line bg-footer px-5 pt-16 pb-10 text-steel sm:px-8">
      <Reveal as="div" className="mx-auto max-w-310" y={16}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* --------------------------- brand --------------------------- */}
          <div>
            <Wordmark variant="light" className="h-11" />

            <p className="font-display mt-6 text-[1.6rem] leading-tight font-light text-chalk text-balance">
              Ten minutes, most evenings.
            </p>
            <p className="mt-4 max-w-[38ch] text-[0.82rem] leading-[1.7] text-ash">
              One device, honestly described. {site.promise.shipping}, and a
              free fix if anything arrives damaged or wrong.
            </p>

            <NewsletterForm />

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className="text-[0.76rem] text-steel transition-colors duration-300 hover:text-chalk"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------- link index ------------------------- */}
          <nav
            aria-label="Footer"
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="font-label text-[0.62rem] font-medium tracking-[0.26em] text-ash uppercase">
                  {col.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[0.82rem] text-steel transition-colors duration-300 hover:text-chalk"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* --------------------------- colophon --------------------------- */}
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.72rem] text-ash">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
          </p>
          {/* The disclaimer sits in the colophon on every page by design ,
              it is the one claim-policy statement that must be unmissable. */}
          <p className="max-w-[62ch] text-[0.68rem] leading-relaxed text-dim">
            AccuPenPro sells a consumer wellness device. It is not a medical
            device, it is not cleared by the FDA or Health Canada, and nothing
            on this site is a health claim or a treatment for any condition. Not
            for use with a pacemaker or during pregnancy.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
