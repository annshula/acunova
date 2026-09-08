/**
 * Every word on the page. Kept out of the components so copy can be edited,
 * A/B tested or localised without a developer.
 *
 * Claim policy — read this before writing a single new line. The AccuPenPro pen
 * is a consumer wellness device, not a medical device. It is not cleared by
 * the FDA or Health Canada, so nothing on this site may say or imply that it
 * treats, cures, heals, diagnoses or prevents anything. What we describe is:
 *   • what the hardware objectively does (micro-current pulse, 9 levels,
 *     4 heads, one AA cell, the timer, the display);
 *   • what the user does with it (finds a sore point and applies pressure
 *     plus stimulation, the same points people already press by hand);
 *   • what acupressure is, culturally and historically, labelled as the
 *     tradition it is.
 * "Relief" and "relaxation" describe how using it feels, in the same
 * register as a hot shower or a foam roller — never as a clinical outcome.
 * Anything stronger belongs to a doctor, not a product page.
 */

import { daysRangeDisplay, defaultRegion } from "@/lib/shipping";
import { site } from "@/lib/site";

export const hero = {
  // SEO: the H1 must contain the term people actually search. The product's
  // real Shopify title is "Acupressure Pen - Auto-Sensing Meridian Massage
  // Tool, No Needles", so "Acupressure pen" is the head term and "no
  // needles" is the qualifier that separates it from acupuncture results.
  // The previous headline ("Targeted relief for a healthier, happier you")
  // was generic wellness copy that ranked for nothing.
  eyebrow: "Acupressure pen",
  // Two lines: head term first, differentiator second. Hero.tsx renders
  // exactly two entries, stacked.
  headline: ["Real relief.", "No needles."],
  // One line, doing double duty: it carries the secondary keywords
  // (meridian massage, drug-free, at home) in a sentence a human would
  // actually read, rather than a keyword list.
  sub: "A drug-free meridian massage tool that puts adjustable micro-current on the pressure points you already rub by hand.",
  cta: "Shop the pen",
  ctaHref: "/shop",
  secondary: "How it works",
  secondaryHref: "#method",
  // Three short proof chips under the CTAs. Deliberately specs, not
  // adjectives — "9 intensity levels" is checkable, "amazing relief" is not.
  chips: ["9 intensity levels", "4 interchangeable heads", "Free US & CA shipping"],
};

/**
 * The poster's 2x3 icon block.
 *
 * ⚠️ CLAIM WORDING — read before editing. The printed poster labels these
 * "Relieves Joint Pain" and "Improves Blood Circulation". Those are
 * physiological claims, and this device is not FDA or Health Canada
 * cleared (see the claim policy at the top of this file and the safety
 * answer in `faqs`). The labels below keep the poster's six categories
 * and its visual rhythm, but phrase them as what people reach for the pen
 * for rather than as outcomes it delivers. Restoring the poster's exact
 * wording is a legal decision, not a copy decision — get it signed off
 * before changing these strings.
 */
export const heroBenefits = [
  { icon: "joint" as const, label: "Joint and knee comfort" },
  { icon: "muscle" as const, label: "Eases muscle tension" },
  { icon: "circulation" as const, label: "Supports circulation" },
  { icon: "calm" as const, label: "Stress and wind-down" },
  { icon: "sleep" as const, label: "A better sleep routine" },
  { icon: "wellness" as const, label: "Everyday wellness" },
];

/**
 * The four body areas from the poster's photo column.
 *
 * `image` is intentionally nullable: until branded lifestyle photography
 * exists, Hero.tsx renders a soft placeholder card rather than a broken
 * image. Drop a real photo in and the card picks it up with no code
 * change. Never point these at stock that shows a different device.
 */
export const reliefAreas = {
  eyebrow: "Where people use it",
  items: [
    {
      label: "Neck & shoulders",
      image: {
        src: "/lifestyle/neck-shoulders.png",
        alt: "A woman using the AccuPenPro pen at the base of her neck while seated at a desk",
        width: 928,
        height: 1152,
      },
    },
    {
      label: "Arms & joints",
      image: {
        src: "/lifestyle/arms-joints.png",
        alt: "The AccuPenPro pen being used on the forearm just below the elbow",
        width: 928,
        height: 1152,
      },
    },
    {
      label: "Back",
      image: {
        src: "/lifestyle/back.png",
        alt: "Reaching behind to use the AccuPenPro pen on the lower back beside the spine",
        width: 928,
        height: 1152,
      },
    },
    {
      label: "Knees & legs",
      image: {
        src: "/lifestyle/knees-legs.png",
        alt: "Using the AccuPenPro pen on the outer side of the knee while seated",
        width: 928,
        height: 1152,
      },
    },
  ],
};

/**
 * The Problem / stakes beat of the narrative arc.
 *
 * Claim-policy note: this section describes what the reader's HANDS and
 * ROUTINE do, never what their body is diagnosed with. "Your thumbs give
 * out" is an observation anyone can verify about themselves; "your
 * inflammation builds" would be a medical assertion about a stranger. Keep
 * every string on this side of that line.
 */
export const problem = {
  headline: "You already know where it hurts. Reaching it is the problem.",
  body: "Nobody has to be told to squeeze the back of their own neck at the end of a long day, you go to the same two or three spots without thinking. The trouble is what you have to reach them with.",
  states: [
    {
      doing: "Right now you use",
      breaks: "Your own thumbs",
      detail:
        "They find the spot immediately and then give out about ninety seconds in, right when it was starting to help. And they never reach the middle of your own back.",
    },
    {
      doing: "Or you bought",
      breaks: "A sheet of sticky pads",
      detail:
        "A pad covers a whole area and hopes the right spot is somewhere under it. Then you peel, place, wire and dial, and buy more adhesive next month.",
    },
    {
      doing: "Or you booked",
      breaks: "An appointment, eventually",
      detail:
        "Which works, and costs an hour plus the fee, and is not available at eleven at night when your shoulder is the reason you are still awake.",
    },
  ],
};

export const showcase = {
  eyebrow: "Drug-free · Non-invasive",
  headline: "Small device. Big relief.",
  body: "The AccuPenPro pen is a handheld micro-current stimulator built for acupressure points, the same spots on your neck, shoulders, back and knees you already dig a thumb into. Press the tip where it aches, dial the intensity, and let the pulse do the pressing instead of your hands.",
  points: [
    {
      title: "Nine levels, one dial",
      body: "Start at 1 and work up until you can feel it clearly and it still feels good. The level shows on the front display, so you can come back to whatever worked yesterday.",
    },
    {
      title: "Four heads, four jobs",
      body: "A rounded ball head for broad muscle, a ridged head for kneading, a fine point for precise spots, and a flat spoon head for larger areas like the lower back and thighs.",
    },
    {
      title: "Pocket-sized, no wires",
      body: "170 mm long, 60 grams, one AA battery. It lives in a desk drawer, a gym bag or a carry-on, and there is nothing to plug in or charge.",
    },
  ],
};

/**
 * The method band (components/sections/Method.tsx) — what acupressure is,
 * what the device does, and the line between the two. This section carries
 * the brand story, so it is also where the claim policy is most load-bearing.
 */
export const method = {
  eyebrow: "How it works",
  headline: "An old practice, on a battery.",
  lede: "Acupressure is the practice of pressing specific points on the body, mapped along what traditional Chinese medicine calls meridians. People have been doing it with thumbs and knuckles for thousands of years, and most of us do a crude version of it every time we squeeze the back of our own neck.",
  body: "The AccuPenPro pen is a modern way of applying that same pressure: a metal tip you press against the point, plus a low-level electrical pulse you can dial from barely-there to firm. It is a comfort tool, and we will always describe it as one.",
  paragraphs: [
    {
      title: "What the device does",
      body: "The tip delivers a low-intensity electrical pulse, the same broad family of stimulation used in the TENS units sold in any pharmacy, across nine selectable levels. Level 1 reads as a faint tickle; level 9 is a firm, unmistakable tap. Combined with the physical pressure of the tip itself, that is the entire mechanism. There is nothing else going on inside it.",
    },
    {
      title: "What acupressure means",
      body: "Meridian theory comes out of traditional Chinese medicine, where the classical point maps have been in use for well over two thousand years. Those maps are still what every acupressure chart is drawn from, and plenty of people find the points genuinely useful for a self-massage routine. That is a tradition with a long history, and we will always tell you it is a tradition.",
    },
    {
      title: "What we will not claim",
      body: "We are not going to tell you a battery-powered pen treats, cures or heals anything, because it does not, and because no honest seller can promise you that. It is not a medical device and it is not cleared as one. If you have persistent pain, numbness, an injury, or any condition at all, see a doctor, not a product page. What we sell is a well-built tool for the self-massage you are already doing with your hands.",
    },
  ],
};

/**
 * The policy/trust band (components/sections/Guarantee.tsx) — every claim in
 * `items` is a real, already-established policy (lib/site.ts `promise.*`),
 * not new copy invented for this band. Kept in sync by pulling the same
 * strings rather than re-wording them.
 */
export const guarantee = {
  eyebrow: "Buy with confidence",
  headline: "What every order includes.",
  body: "The pen, all four heads, free shipping across the US and Canada, and a real fix if anything arrives wrong.",
  items: [
    {
      icon: "device" as const,
      label: "The complete kit",
      body: "One AccuPenPro pen, all four interchangeable heads, a storage case and the quick-start card. No head is held back as a paid extra, the kit is the kit.",
    },
    {
      icon: "ship" as const,
      label: site.promise.shipping,
      body: site.promise.shippingFull,
    },
    {
      icon: "shield" as const,
      label: site.promise.returns,
      body: site.promise.returnsDetail,
    },
    {
      icon: "fit" as const,
      label: "Secure checkout",
      body: "Payment is processed by Shopify, not us, and your card details never touch our servers.",
    },
  ],
};

/**
 * The pen against the two things people actually weigh it against: doing it
 * by hand, and the pharmacy TENS pad. Every row is a plain hardware or
 * practical fact — nothing here asserts an outcome for any of the three.
 */
export const comparison = {
  eyebrow: "How it compares",
  headline: "The pen, your thumbs, or a box of pads.",
  body: "Most people arrive here already doing one of two things: pressing sore points by hand, or sticking TENS pads on and hoping they land in the right place. Here is the honest difference between the three.",
  columns: ["AccuPenPro pen", "Your own hands", "Stick-on TENS pads"],
  rows: [
    {
      label: "Precision",
      values: [
        "A 2 mm tip lands on one point at a time",
        "A thumb covers several points at once",
        "A pad covers a whole area; placement is a guess",
      ],
    },
    {
      label: "Intensity control",
      values: [
        "9 levels, shown on the front display",
        "However hard you can press before your hand tires",
        "Adjustable, usually from a separate control box",
      ],
    },
    {
      label: "Reaching your own back",
      values: [
        "Yes, the 170 mm body extends your reach",
        "Not really, and shoulders are worse",
        "Needs a second pair of hands to place",
      ],
    },
    {
      label: "Consumables",
      values: [
        "None. One AA cell, four reusable heads",
        "None",
        "Replacement adhesive pads, again and again",
      ],
    },
    {
      label: "Setup time",
      values: [
        "Pick it up, press the button",
        "None",
        "Peel, place, wire, dial",
      ],
    },
    {
      label: "Portable",
      values: [
        "170 mm, 60 g, fits a pocket",
        "Always with you",
        "Box, leads, pads, and somewhere flat to keep them",
      ],
    },
  ],
};

/**
 * ⚠️ PLACEHOLDER TESTIMONIALS.
 * These are written examples of the voice you want, not real customers.
 * Replace every one with a verified review before launch, and do not turn on
 * `site.metrics.verified` until the numbers come from a real review platform.
 */
export const reviews = [
  {
    quote:
      "I sit at a desk for nine hours. Ten minutes on the back of my neck at level 4 while the kettle boils has become the best part of my evening.",
    name: "Marcus D.",
    meta: "Verified owner · Chicago",
    stars: 5,
  },
  {
    quote:
      "Ordered Thursday, tracking Friday, on my desk Tuesday. The case is properly solid and all four heads were in it, which is more than I can say for the last one of these I bought.",
    name: "Jack W.",
    meta: "Verified owner · Toronto",
    stars: 5,
  },
  {
    quote:
      "Honest product page, honest product. Nobody promised me it would cure my back, which is exactly why I trusted it enough to buy.",
    name: "Priyan S.",
    meta: "Verified owner · Vancouver",
    stars: 5,
  },
  {
    quote:
      "Level 1 is genuinely gentle, my mother uses it on her knees. Level 9 is more than I want. Good range, and the display means you never have to guess.",
    name: "Elena V.",
    meta: "Verified owner · Seattle",
    stars: 4,
  },
];

export const faqs = [
  {
    id: "what-it-does",
    q: "What does an acupuncture pen actually do?",
    a: "Two things at once, and neither involves a needle. Physically, the metal tip lets you press a specific point with steady, repeatable pressure, the same points you would press with a thumb. Electrically, it delivers a low-intensity pulse through that tip across nine levels, in the same broad family as a pharmacy TENS unit. That is the whole mechanism. It does not break the skin, and it is not acupuncture in the clinical sense of the word.",
  },
  {
    id: "does-it-hurt",
    q: "Does it hurt?",
    a: "It should not. Level 1 is a faint tingle most people describe as a tickle; the higher levels feel like a firm, rhythmic tap. Everyone's comfortable range is different, so start at 1 and work up. If it stings or feels sharp rather than tapping, lower the level or move the tip: dry skin and a bony spot both make the sensation harsher than it needs to be.",
  },
  {
    id: "safety",
    q: "Is it safe, and who should not use it?",
    a: "It is a low-intensity consumer device, not a medical one, and it has not been cleared by the FDA or Health Canada. Do not use it if you have a pacemaker, an implanted defibrillator or any other implanted electronic device, and do not use it if you are pregnant, or over broken skin, an open wound, a rash, the front of the neck, or the eyes. If you have epilepsy, a heart condition, a metal implant near the area, or any ongoing medical condition, ask your doctor before using it at all. None of this is boilerplate buried at the bottom of a page: it is the actual answer to the question.",
  },
  {
    id: "where-and-how-long",
    q: "Where do I use it, and for how long?",
    a: "Start where you already rub yourself: the base of the neck, the top of the shoulders, the forearms, the lower back, the outside of the knee. The quick-start card in the box maps the common points, and there is a fuller guide on our blog. A sensible session is 5 to 15 minutes across a few points, once or twice a day. Longer is not better. If a spot goes numb, sore or red, stop and move on.",
  },
  {
    id: "in-the-box",
    q: "What is in the box, and does it need charging?",
    a: "The pen, all four heads (rounded ball, ridged, fine point and flat spoon), a storage case and a quick-start card. It runs on a single AA battery rather than a charger, which is also why it is fine to pack in hand luggage.",
  },
  {
    id: "delivery",
    q: "How long does delivery take, and what does it cost?",
    a: `Shipping is free to the US and Canada, with no minimum order. Orders are processed within 1–3 business days, then tracked delivery typically takes ${daysRangeDisplay(defaultRegion)} depending on where you are. See the full country-by-country breakdown on our About page. Your tracking number arrives by email the moment the label is scanned.`,
  },
  {
    id: "damaged-or-wrong",
    q: "What if it arrives damaged, or the wrong item shows up?",
    a: "We do not offer change-of-mind returns on a personal-care device, so read the safety answer above before you order. If your pen arrives damaged, is missing a head, or is not what you ordered, send us a photo within 30 days of delivery and we will ship a free replacement or refund, with nothing to send back.",
  },
];

export const finalCta = {
  eyebrow: site.tagline,
  headline: "Put the pressure somewhere useful.",
  sub: "Free shipping in the US and Canada. Free fix for damaged, missing, or wrong items. Dispatched within 1–3 business days.",
  cta: "Shop the pen",
};

export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "The AccuPenPro pen", href: "/shop" },
      { label: "How it works", href: "/#method" },
      { label: "Pressure point guide", href: "/blog" },
      { label: "Safety and who it's for", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping policy", href: "/shipping-policy" },
      { label: "Refund & return policy", href: "/refund-policy" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Track your order", href: "/account/orders" },
      { label: "Start a return", href: "/account/orders" },
      { label: "Your account", href: "/account" },
      { label: "Sign in", href: "/account/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our claims policy", href: "/claims-policy" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookie-policy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const marqueeWords = [
  "Free shipping in the US and Canada",
  "Free fix for damaged or wrong items",
  "Drug-free · Non-invasive",
  "Dispatched in 1–3 business days",
  "4 interchangeable heads",
  "9 intensity levels",
];
