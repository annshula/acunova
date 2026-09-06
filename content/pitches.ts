/**
 * Shared conversion content for every product page — the same playbook as
 * the flagship AcuNova pen, rolled out to every listing in the store.
 *
 * Structure:
 *  - `quality`  — the "put to the test" QC section (mounted on every PDP,
 *    targeted from the header "Quality" link).
 *  - `sources`  — outbound reference links for the acupressure/TENS
 *    background. Real, reputable pages → good for credibility AND for the
 *    backlink profile (they're the one thing we never fake).
 *  - `pitches`  — per-handle hook/story/moments so every product gets its
 *    own hero copy instead of a copy-pasted page.
 *
 * Register (same as the rest of the site, see content/copy.ts for the claim
 * policy in full): hard claims are hardware facts or in-house QC framing;
 * the acupressure story is history and tradition, labelled as such; no
 * medical claims, no invented sales figures, no fake reviews, no fabricated
 * third-party certification or clearance.
 */

export type Stat = { value: string; label: string };

export type StoryContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  claim: string;
  caption: string;
  stats: Stat[];
  eras: { title: string; body: string; image: { src: string; alt: string } }[];
};

export type MomentsContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  items: { title: string; body: string }[];
};

export type CloseContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  cta: string;
  note: string;
};

export type ReviewLandingContent = {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
};

export type Pitch = {
  handle: string;
  /** "pen" | "heads" — used in any copy that must match the object. */
  kind: "pen" | "heads";
  story: StoryContent;
  moments: MomentsContent;
};

/* ------------------------------------------------------------------ */
/* Sources — cited in the story band footer. Real links = backlinks.   */
/* ------------------------------------------------------------------ */
export const sources = [
  {
    label: "Acupressure (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/Acupressure",
  },
  {
    label: "Transcutaneous electrical nerve stimulation (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/Transcutaneous_electrical_nerve_stimulation",
  },
  {
    label: "Acupuncture: what the evidence says (NCCIH)",
    href: "https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",
  },
  {
    label: "Meridian (Chinese medicine)",
    href: "https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)",
  },
];

/* ------------------------------------------------------------------ */
/* The history, told once, reused everywhere (it's the same practice). */
/* ------------------------------------------------------------------ */
export const acupressureEras: StoryContent["eras"] = [
  {
    title: "The points were written down",
    body: "Classical Chinese medicine mapped a set of points along channels it called meridians, and wrote them down. Whatever you make of the underlying theory, that map has been in continuous use ever since — it is still what every acupressure chart is drawn from today.",
    image: {
      src: "/story/era-1-origins.webp",
      alt: "An old acupressure point chart on paper beside the AcuNova pen",
    },
  },
  {
    title: "Then the thumbs took over",
    body: "Acupressure is the needle-free half of that tradition: the same points, pressed rather than pierced. It travelled the world on nothing more than a pair of hands, which is why every culture has some version of someone digging into someone else's shoulders.",
    image: {
      src: "/story/era-2-hands.webp",
      alt: "A thumb pressing into the muscle at the top of a shoulder",
    },
  },
  {
    title: "Electricity joined in",
    body: "Low-level stimulation through the skin became a consumer category in the 1970s, and you can buy a TENS unit in any pharmacy today. The AcuNova pen is that idea in one hand: pulse and pressure through the same tip, instead of a box, four leads and a sheet of sticky pads.",
    image: {
      src: "/story/era-3-current.webp",
      alt: "The tip of the AcuNova pen with its intensity display lit",
    },
  },
  {
    title: "It ends up on your desk",
    body: "Nine hours at a screen, a commute, a night on the wrong pillow. The pen lives in a drawer and comes out for ten minutes — which is precisely the routine most people were already doing badly with their hands.",
    image: {
      src: "/story/era-4-desk.webp",
      alt: "The AcuNova pen resting on a desk beside a laptop and a cup",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Quality / testing band — mounted on every product page.             */
/* ------------------------------------------------------------------ */
export const quality = {
  eyebrow: "Put to the test",
  heading: "Checked by hand. Only the passers ship.",
  lede: "Every unit clears the same bench checks before it goes in a box: it has to power up, step cleanly through all nine levels, and hold a head without wobble. Six checks. Zero exceptions.",
  checks: [
    {
      icon: "device" as const,
      title: "Power-on and display",
      body: "A cell goes in, the unit is switched on, and the intensity display is read at rest. A digit that ghosts, flickers or sticks fails here and never reaches a box.",
    },
    {
      icon: "shield" as const,
      title: "All nine levels, in order",
      body: "Each unit is stepped from 1 to 9 and back. The steps have to be even and the top level has to stay inside spec — a unit that jumps a step or overshoots is rejected, not downgraded.",
    },
    {
      icon: "refresh" as const,
      title: "Head-swap cycle",
      body: "All four heads are fitted and removed in turn to catch a cross-threaded collar or a loose contact before it becomes a wobble in your hand three weeks in.",
    },
    {
      icon: "fit" as const,
      title: "Tip and finish check",
      body: "Every head is inspected under light: the fine point has to be smooth and burr-free, the ball and spoon heads have to be evenly polished. A sharp edge on a tip is a fail.",
    },
    {
      icon: "check" as const,
      title: "Kit count",
      body: "Pen, four heads, case, quick-start card. Counted against the packing list at the bench, because the single most common complaint about this category is a head missing from the box.",
    },
    {
      icon: "truck" as const,
      title: "Dispatch and packaging",
      body: "Each order is packed to arrive intact and tracked from our bench to your door. If anything arrives damaged, we replace or refund it free.",
    },
  ],
};

export type BuildContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  points: { title: string; body: string }[];
  note: string;
};

/* ------------------------------------------------------------------ */
/* "The build" — how each product is actually made. The pen explains   */
/* the body, collar and circuit; the head set explains the tips.       */
/* Mounted on every product page with the copy that matches the item.  */
/* ------------------------------------------------------------------ */
export const buildPen: BuildContent = {
  eyebrow: "How it's built",
  heading: "One body, one cell, four heads that screw straight on.",
  lede: "There is no dock, no charging cradle and no app. The pen is a 170 mm aluminium-finish body with the control button and intensity display on the front, a threaded collar at the tip, and a single AA cell in the base. That is the whole machine.",
  points: [
    {
      title: "A threaded collar, not a friction fit",
      body: "Heads screw on and seat against a metal contact rather than pushing on. That is why the tip does not work loose halfway through a session, and why a swap takes about three seconds.",
    },
    {
      title: "Nine steps, held on the display",
      body: "The level you set stays on the display until you change it, so the setting that suited you yesterday is the one you come back to — not a guess at the same button-press count.",
    },
    {
      title: "One AA cell",
      body: "No charger, no cable, no battery that dies at three years old and takes the device with it. A standard cell goes in the base, and the pen travels in hand luggage without an argument.",
    },
    {
      title: "Sized for your own back",
      body: "170 mm is deliberate: long enough to reach the points between your own shoulder blades one-handed, short enough to live in a desk drawer or a wash bag.",
    },
  ],
  note: "Pick it up, screw on a head, press the button. That is the entire operating procedure.",
};

export const buildHeads: BuildContent = {
  eyebrow: "How it's built",
  heading: "Four heads, four jobs, one thread.",
  lede: "Each head is turned from the same metal stock and finished to the same standard, then threaded to the collar every AcuNova pen uses. They are consumable in the sense that they get lost, not in the sense that they wear out.",
  points: [
    {
      title: "Rounded ball",
      body: "The everyday head. Broad enough for the trapezius, the calf or the forearm without concentrating pressure into a single point.",
    },
    {
      title: "Ridged",
      body: "For kneading across a muscle rather than pressing into it — the one most people end up leaving fitted.",
    },
    {
      title: "Fine point",
      body: "A 2 mm tip for a specific point: the web of the hand, the base of the skull, the outside of the knee. Precise, so start a level or two lower than usual.",
    },
    {
      title: "Flat spoon",
      body: "The largest contact area in the kit, for the lower back and thighs where a point tip is simply the wrong tool.",
    },
  ],
  note: "Same thread as the pen in every kit, so a spare set fits the one you already own.",
};

/* ------------------------------------------------------------------ */
/* Generic risk-reversal close (used on every non-flagship product).   */
/* ------------------------------------------------------------------ */
export const closeGeneric: CloseContent = {
  eyebrow: "Covered, or we make it right",
  heading: "Thirty days to tell us it arrived wrong.",
  lede: "Every order ships tracked and free across the US and Canada. If your order arrives damaged, incomplete or wrong, send a photo within 30 days and we replace it or refund it, free, with nothing to post back.",
  cta: "Add it to your bag",
  note: "Dispatched in 1–3 business days · tracked to your door · a human answers within 12 hours",
};

/* ------------------------------------------------------------------ */
/* Generic reviews landing state (shown until a real dataset exists).  */
/* ------------------------------------------------------------------ */
export const reviewsLanding: ReviewLandingContent = {
  eyebrow: "Customer reviews",
  heading: "Verified reviews are being collected.",
  body: "We only publish reviews from confirmed orders, with no cherry-picked quotes, no invented stars, no paid testimonials. The first real ones land as soon as buyers have used it long enough to have an honest opinion.",
  points: [
    "Photos of the kit as it actually arrived",
    "Star ratings from confirmed orders only",
    "Every review published, the stinging ones included",
  ],
};

/* ------------------------------------------------------------------ */
/* Per-product pitches.                                                */
/* ------------------------------------------------------------------ */
export const pitches: Pitch[] = [
  {
    handle: "acunova-replacement-head-set",
    kind: "heads",
    story: {
      eyebrow: "The spare set",
      heading: "Because the fine point is the one that goes missing.",
      lede: "The same four heads that ship with every pen, sold as a set: rounded ball, ridged, fine point and flat spoon. Same thread, same finish, same bench checks — for the head that rolled under the sofa, or the second pen in the house that everyone fights over.",
      claim:
        "Nothing in this set wears out in normal use. It exists because small metal things get lost, not because we designed them to be replaced.",
      caption: "Four heads · same thread as every AcuNova pen.",
      stats: [
        { value: "4 heads", label: "ball, ridged, fine point, flat spoon" },
        { value: "One thread", label: "fits every AcuNova pen ever shipped" },
        { value: "Bench-checked", label: "same tip and finish check as a kit" },
      ],
      eras: acupressureEras,
    },
    moments: {
      eyebrow: "What it's for",
      heading: "A second set, where you actually need it.",
      lede: "Most people buy this for one of three reasons, and none of them is wear.",
      items: [
        {
          title: "One went missing",
          body: "The fine point is 25 mm of metal. It falls out of a bag, rolls off a desk, and it is gone. This is the cheapest way to have it back.",
        },
        {
          title: "Two places, one routine",
          body: "A set at the office and a set at home means the pen travels and the heads do not have to.",
        },
        {
          title: "Shared kit, separate heads",
          body: "If more than one person in the house uses the pen, a second set of heads is the sensible way to do it.",
        },
      ],
    },
  },
];

/** Look up a pitch by handle — undefined for a product with no bespoke pitch. */
export function pitchFor(handle: string): Pitch | undefined {
  return pitches.find((p) => p.handle === handle);
}
