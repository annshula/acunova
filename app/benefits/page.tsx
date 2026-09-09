import type { Metadata } from "next";
import StaticImage from "@/components/ui/StaticImage";
import Button from "@/components/ui/Button";
import { benefitIcons } from "@/components/ui/LineIcons";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { productPath } from "@/lib/catalog";

/**
 * /benefits — what people actually reach for the pen for, one area at a time.
 *
 * Rebuilt from scratch. The previous version of this route was inherited from
 * the reference build: full-bleed dark parallax bands driven by
 * ParallaxBenefit/ScrollSnapRoot, over video assets that no longer exist. None
 * of that survives — the dark treatment fights this brand's bright canvas, and
 * scroll-snap on a page of six sections is hostile on a trackpad.
 *
 * The shape here is alternating photo/text bands on the light canvas, which
 * lets each body area carry a real photograph rather than a colour block.
 *
 * ⚠️ CLAIM POLICY. This page is the single easiest place on the site to drift
 * into medical claims, because "benefits" invites it. Every heading below
 * describes an AREA OF THE BODY or a MOMENT, never an outcome. The body copy
 * describes what you do and how it feels, in the register of a hot shower or
 * a foam roller. Nothing here says the device relieves, improves, reduces or
 * treats anything — see content/copy.ts for the full policy.
 */

const title = "What people use it for";
const description =
  "The four areas people reach for an acupressure pen most, what a session actually involves, and the safety list that decides whether it is for you at all.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/benefits" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: absoluteUrl("/benefits"),
    siteName: site.name,
    images: [
      {
        url: absoluteUrl("/lifestyle/neck-shoulders.png"),
        width: 928,
        height: 1152,
        alt: `${site.name} acupressure pen in use`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${site.name}`,
    description,
  },
};

const bands = [
  {
    index: "01",
    label: "Neck & shoulders",
    heading: "The spot you already reach for.",
    body: "Nine hours at a screen and your shoulders end up somewhere around your ears. This is where almost everyone starts, and it is the area a pen handles better than your own hands, you can hold a steady pressure on the ridge of the shoulder for two minutes without your thumb giving out.",
    note: "Work the back and top of the neck only. Never the front or sides.",
    image: {
      src: "/lifestyle/neck-shoulders.png",
      alt: "A woman using the AccuPenPro pen at the base of her neck while seated at a desk",
      width: 928,
      height: 1152,
    },
  },
  {
    index: "02",
    label: "Arms & joints",
    heading: "Forearms, after a day of typing.",
    body: "The muscular top third of the forearm is badly under-rated if you spend the day on a keyboard. A three-point head at a low setting, a minute each side, and the tightness you had stopped noticing becomes obvious by its absence.",
    note: "Go a level lower around the elbow, there is bone close to the surface.",
    image: {
      src: "/lifestyle/arms-joints.png",
      alt: "The AccuPenPro pen being used on the forearm just below the elbow",
      width: 928,
      height: 1152,
    },
  },
  {
    index: "03",
    label: "Back",
    heading: "The part your hands can't reach.",
    body: "The strip between the shoulder blade and the spine is where a bad night on the wrong pillow collects, and it is the one place your own hands genuinely cannot get to. A 170 mm handle is most of the reason this device exists rather than a thumb.",
    note: "Stay off the spine itself and off the bony ridge of the blade.",
    image: {
      src: "/lifestyle/back.png",
      alt: "Reaching behind to use the AccuPenPro pen on the lower back beside the spine",
      width: 928,
      height: 1152,
    },
  },
  {
    index: "04",
    label: "Knees & legs",
    heading: "Calves and knees, after a run.",
    body: "Broad muscle takes a broader head and a higher setting comfortably, calves and thighs are the areas where a five-point head earns its place, covering ground quickly. Around the knee, drop back to a smaller head and a lower level.",
    note: "Work the muscle around the joint, not directly on the kneecap.",
    image: {
      src: "/lifestyle/knees-legs.png",
      alt: "Using the AccuPenPro pen on the outer side of the knee while seated",
      width: 928,
      height: 1152,
    },
  },
];

const moments = [
  { icon: "muscle" as const, label: "End of a desk day" },
  { icon: "joint" as const, label: "After the gym" },
  { icon: "calm" as const, label: "Winding down" },
  { icon: "sleep" as const, label: "A bad night's sleep" },
  { icon: "pen" as const, label: "In a hotel room" },
  { icon: "wellness" as const, label: "A ten-minute reset" },
];

export default function BenefitsPage() {
  return (
    <main className="bg-canvas">
      {/* ------------------------------- intro ------------------------------- */}
      <section className="mx-auto max-w-310 px-5 pt-20 pb-16 sm:px-8 lg:pt-28">
        <div className="max-w-200">
          <p className="font-label text-[0.68rem] font-medium text-ink-mute uppercase">
            {site.tagline}
          </p>
          <h1 className="font-mega mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.75] text-ink-soft text-pretty">
            {description}
          </p>
        </div>
      </section>

      {/* ------------------------------- bands ------------------------------- */}
      {bands.map((band, i) => (
        <section
          key={band.label}
          className={`border-t border-line ${i % 2 === 1 ? "bg-surface-sunken" : ""}`}
        >
          <div
            className={`mx-auto grid max-w-310 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24 ${
              i % 2 === 1 ? "lg:[&>figure]:order-last" : ""
            }`}
          >
            <figure className="relative aspect-4/5 overflow-hidden rounded-photo bg-surface-sunken shadow-(--shadow-photo) lg:aspect-3/4">
              <StaticImage
                src={band.image.src}
                alt={band.image.alt}
                fill
                className="object-cover"
              />
            </figure>

            <div>
              <p className="font-label flex items-center gap-3 text-[0.64rem] font-medium text-ink-mute uppercase">
                <span className="text-accent tabular-nums">{band.index}</span>
                {band.label}
              </p>
              <h2 className="font-display mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.15] font-light text-ink text-balance">
                {band.heading}
              </h2>
              <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.75] text-ink-soft text-pretty">
                {band.body}
              </p>
              <p className="mt-6 border-l-2 border-accent/50 pl-4 text-[0.86rem] leading-[1.6] text-ink-mute">
                {band.note}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* ------------------------------ moments ------------------------------ */}
      <section className="border-t border-line py-16 lg:py-24">
        <div className="mx-auto max-w-260 px-5 sm:px-8">
          <h2 className="font-display max-w-[20ch] text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.2] font-light text-ink text-balance">
            The ten minutes it tends to fit into.
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-10">
            {moments.map((m) => {
              const Icon = benefitIcons[m.icon];
              return (
                <li
                  key={m.label}
                  className="flex flex-col items-center text-center"
                >
                  <span className="h-7 w-7 text-accent">
                    <Icon />
                  </span>
                  <span className="mt-3.5 max-w-[16ch] text-[0.86rem] leading-[1.4] font-medium text-ink">
                    {m.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------ safety ------------------------------- */}
      {/* Deliberately on this page and not only in the FAQ: a "benefits" page
          is exactly where a reader is most primed to skip the caveats. */}
      <section className="border-t border-line bg-surface-sunken py-16 lg:py-24">
        <div className="mx-auto max-w-200 px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.2] font-light text-ink">
            Who this isn&rsquo;t for.
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.75] text-ink-soft">
            It is a consumer wellness device, not a medical one. It is not
            cleared by the FDA or Health Canada, and nothing on this page is a
            claim to treat or prevent anything.
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.95rem] leading-[1.65] text-ink-soft">
            <li>
              <strong className="font-medium text-ink">Do not use it</strong>{" "}
              with a pacemaker or any implanted electronic device, or during
              pregnancy.
            </li>
            <li>
              <strong className="font-medium text-ink">Do not use it</strong>{" "}
              over broken skin, the front or sides of the neck, or near the
              eyes.
            </li>
            <li>
              <strong className="font-medium text-ink">
                Ask a doctor first
              </strong>{" "}
              if you have a heart condition, epilepsy, a metal implant nearby,
              or reduced sensation in the area.
            </li>
          </ul>
          <p className="mt-6 text-[0.9rem] leading-[1.65] text-ink-mute">
            Persistent pain, pain that radiates into a limb, or pain with
            numbness or weakness is a reason to see a doctor, not to turn the
            level up.
          </p>
        </div>
      </section>

      {/* -------------------------------- cta -------------------------------- */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="mx-auto max-w-160 px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] font-light text-ink text-balance">
            Put the pressure somewhere useful.
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.7] text-ink-soft">
            {site.promise.shipping}. {site.promise.returns}.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={productPath} arrow variant="gold">
              Shop the pen
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
