/**
 * Marketing copy for the flagship product page — the AcuNova acupuncture pen.
 * Mounted by components/product/Pen*.tsx, which the product page renders only
 * for this handle (app/products/[handle]/page.tsx), so no other listing
 * inherits the pitch.
 *
 * Claim policy — the hard lines are the same as the rest of the site
 * (content/copy.ts states them in full): this is a consumer wellness device,
 * not a medical one, so nothing here says or implies that it treats, cures,
 * heals, diagnoses or prevents anything. What sells the page instead is the
 * hardware (nine levels, four heads, one AA cell, a 2 mm tip), the honest
 * history of acupressure labelled as the tradition it is, and the situations
 * people actually reach for it in. The three headline numbers (9 levels,
 * 4 heads, 60 g) are real, and they double as the proof.
 */

export const pen = {
  handle: "acunova-acupressure-pen",

  /* ------------------------------------------------------------------ */
  /* Cinematic dark story band — right after the buy box.                */
  /* ------------------------------------------------------------------ */
  story: {
    eyebrow: "An old practice, on a battery",
    heading: "People have been pressing these points for two thousand years.",
    lede: "Nobody had to teach you to squeeze the back of your own neck at the end of a long day. You do it without thinking, and you go straight to the same handful of spots every time. Those spots are not a coincidence — they are the points classical Chinese medicine mapped a very long time ago, and the ones every acupressure chart still draws from today.",
    claim:
      "The pen does not invent anything. It just applies that pressure more precisely than a tired thumb can, and adds a pulse you can dial to a level that suits you.",
    stats: [
      {
        value: "9",
        label: "intensity levels, from a faint tickle to a firm tap",
      },
      {
        value: "4",
        label: "interchangeable heads: ball, ridged, fine point, flat spoon",
      },
      {
        value: "60 g",
        label: "in the hand, on one AA cell. Nothing to plug in or charge",
      },
    ],
    eras: [
      {
        title: "The points were written down",
        body: "The classical Chinese medical texts set out a map of points along channels they called meridians. Whatever you make of the theory, the map itself has been in continuous use ever since, and it is still what the chart on the back of your quick-start card is drawn from.",
        image: {
          src: "/story/era-1-origins.webp",
          alt: "An old acupressure point chart on paper beside the AcuNova pen",
        },
      },
      {
        title: "Then the thumbs took over",
        body: "Acupressure is the needle-free half of that tradition: the same points, pressed rather than pierced. It travelled the world on nothing more than a pair of hands, which is exactly why every culture has some version of someone digging into someone else's shoulders.",
        image: {
          src: "/story/era-2-hands.webp",
          alt: "A thumb pressing into the muscle at the top of a shoulder",
        },
      },
      {
        title: "Electricity joined in",
        body: "Low-level electrical stimulation through the skin became a consumer category in the 1970s, and you can buy a TENS unit in any pharmacy today. The AcuNova pen is that idea in one hand: the pulse and the pressure delivered by the same tip, instead of a box, four leads and a sheet of sticky pads.",
        image: {
          src: "/story/era-3-current.webp",
          alt: "The tip of the AcuNova pen with its intensity display lit",
        },
      },
      {
        title: "It ends up on your desk",
        body: "Nine hours at a screen, a commute, a night on the wrong pillow. The pen lives in the drawer and comes out for ten minutes, which is precisely the routine most people were already doing badly with their hands.",
        image: {
          src: "/story/era-4-desk.webp",
          alt: "The AcuNova pen resting on a desk beside a laptop and a cup",
        },
      },
    ],
    caption:
      "A wellness device, not a medical one. Not FDA or Health Canada cleared, and never sold as a treatment.",
  },

  /* ------------------------------------------------------------------ */
  /* Benefit moments — feeling language, never a medical outcome.        */
  /* ------------------------------------------------------------------ */
  moments: {
    eyebrow: "When people reach for it",
    heading: "For the ten minutes that make the evening better.",
    lede: "Not a treatment plan. A small, repeatable ritual — the same one you already improvise with your thumbs, done with something that does not get tired halfway through.",
    items: [
      {
        title: "The end of a desk day",
        body: "Shoulders somewhere up around your ears, neck stiff on one side. Level 3 or 4 along the top of the trapezius while the kettle boils, and you get your shoulders back.",
      },
      {
        title: "After the gym",
        body: "Calves, forearms, the outside of the knee. The ridged head over a broad muscle is the part most people end up using every single day.",
      },
      {
        title: "The long flight",
        body: "It runs on one AA cell and weighs 60 grams, so it goes in hand luggage without a charger, a cable or an argument at security.",
      },
      {
        title: "Winding down",
        body: "Low level, dim room, a few minutes on the hands and forearms. Plenty of people use it the way others use a foam roller or a hot shower — as the signal that the day is over.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Honest comparison — every cell is a plain hardware or practical fact */
  /* ------------------------------------------------------------------ */
  versus: {
    eyebrow: "Know exactly what you're buying",
    heading: "A pen, a box of pads, and a pair of thumbs.",
    lede: "This is a low-intensity stimulation device with a metal tip. Here is how it sits next to the two things you are probably already doing, so the difference is obvious before you buy — from us or anywhere else.",
    columns: ["The AcuNova pen", "Stick-on TENS pads", "Your own hands"],
    rows: [
      {
        label: "How it lands",
        values: [
          "A 2 mm tip on one point at a time",
          "An adhesive pad across a whole area",
          "A thumb, covering several points at once",
        ],
      },
      {
        label: "Control",
        values: [
          "9 levels on the display, repeatable tomorrow",
          "Adjustable, usually from a separate control box",
          "As hard as you can press before your hand gives out",
        ],
      },
      {
        label: "Reaching your own back",
        values: [
          "The 170 mm body extends your reach",
          "Somebody else has to place the pads",
          "Not happening, and shoulders are worse",
        ],
      },
      {
        label: "Running cost",
        values: [
          "One AA cell. Four reusable heads",
          "Replacement adhesive pads, over and over",
          "Free, and it costs you your thumbs",
        ],
      },
      {
        label: "Setup",
        values: [
          "Pick it up, press the button",
          "Peel, place, wire, dial",
          "None",
        ],
      },
      {
        label: "What it is not",
        values: [
          "Not a medical device. Not cleared by the FDA or Health Canada",
          "Some are cleared devices, most consumer units are not",
          "Not a substitute for seeing a doctor either",
        ],
      },
    ],
    close:
      "If a listing for one of these tells you it cures anything, that is the moment to close the tab. It is a comfort tool. That is a good enough reason to own one.",
  },

  /* ------------------------------------------------------------------ */
  /* Risk-reversal close — every claim is a real, established policy     */
  /* (lib/site.ts promise.*). No invented money-back guarantee.          */
  /* ------------------------------------------------------------------ */
  covered: {
    eyebrow: "Covered, or we make it right",
    heading: "Thirty days to tell us it arrived wrong.",
    lede: "Every order ships tracked and free across the US and Canada. If your pen arrives damaged, is missing a head, or is not what you ordered, send a photo within 30 days and we replace it or refund it, free, with no forms to fight through and nothing to post back.",
    cta: "Add it to your bag",
    note: "Dispatched in 1–3 business days · tracked to your door · a human answers within 12 hours",
  },

  /* ------------------------------------------------------------------ */
  /* Reviews landing space — intentionally no fabricated numbers.        */
  /* ------------------------------------------------------------------ */
  reviews: {
    eyebrow: "Customer reviews",
    heading: "Verified reviews are being collected.",
    body: "We only publish reviews from confirmed orders, with no cherry-picked quotes, no invented stars, no paid testimonials. The first real ones land as soon as buyers have used it long enough to have an honest opinion.",
    points: [
      "Photos of the kit as it actually arrived",
      "Star ratings from confirmed orders only",
      "Every review published, the stinging ones included",
    ],
  },
};
