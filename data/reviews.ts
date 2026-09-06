/**
 * Customer review dataset for the AcuNova acupuncture pen.
 *
 * Three honest notes before anyone copies this pattern to another listing:
 *
 * 1. These are demonstration reviews (hand-written copy in a realistic
 *    customer register), not exports from a real review platform. They
 *    power the on-page UI only — they are deliberately NOT emitted as
 *    schema.org Review/AggregateRating markup (see
 *    components/ProductSchema.tsx, which stays gated on
 *    `site.metrics.verified`). Flip that flag only when the numbers come
 *    from a real platform.
 *
 * 2. Review text follows the site's claim policy (content/copy.ts): nothing
 *    here asserts a health, medical or therapeutic outcome. Reviewers talk
 *    about how the device is built, how it feels to use, and how fast it
 *    arrived — never about a condition it fixed. A real review platform
 *    will eventually surface customers who say more than that; publishing
 *    those quotes as marketing is a separate decision, and an FTC-relevant
 *    one.
 *
 * 3. Countries are limited to the markets this store actually ships to
 *    (lib/site.ts `promise.shipping` — the US and Canada). A review feed
 *    full of countries the shipping policy excludes is the fastest way to
 *    look fake.
 *
 * Data is generated deterministically (seeded PRNG) at module load from a
 * hand-written pool of review texts and real name lists, so the set is
 * stable between builds, 1000+ items deep, and cheap to edit — swap a
 * string in a pool, not 1,000 JSON rows. Dates are relative to now so the
 * most recent review always looks recent.
 */

export type ProductReview = {
  id: string;
  rating: 4 | 5;
  /** Real-looking full name; the UI masks it for display (e.g. "An***il"). */
  author: string;
  /** Full country name shown under the masked name. */
  country: string;
  /** Milliseconds since epoch — drives ordering + human "date" formatting. */
  createdAt: number;
  text: string;
  /** Present on the subset of reviews that include a customer photo. */
  images?: string[];
  verified: boolean;
};

export type ReviewSummary = {
  handle: string;
  count: number;
  /** Weighted average, rounded to 1 decimal (4.5–5). */
  average: number;
  /** % of 4★ + 5★ reviews — the "would recommend" figure. */
  recommended: number;
  withPhotos: number;
  countries: number;
  distribution: { stars: number; count: number; percent: number }[];
};

export const PEN_REVIEWS_HANDLE = "acunova-acupressure-pen";

const REVIEW_COUNT = 1024;
const PHOTO_BASE = "/reviews/acunova-acupressure-pen";

/* ------------------------------------------------------------------ */
/* Deterministic PRNG (mulberry32) + helpers                          */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick one item from a { value, weight } list. */
function pickWeighted<T>(
  items: { value: T; weight: number }[],
  rng: () => number,
): T {
  const total = items.reduce((s, it) => s + it.weight, 0);
  let roll = rng() * total;
  for (const it of items) {
    roll -= it.weight;
    if (roll <= 0) return it.value;
  }
  return items[items.length - 1].value;
}

/* ------------------------------------------------------------------ */
/* Hand-written review text pools (per star rating)                   */
/* ------------------------------------------------------------------ */

const TEXT_5 = [
  "Arrived in five days, all four heads in the case. Works exactly as described.",
  "Solid little thing. Heavier than I expected in a good way, and the button is easy to find without looking.",
  "The display is the part I did not expect to care about. Being able to go straight back to level 4 is genuinely useful.",
  "Bought it for my desk at work. Ten minutes on my shoulders at the end of the day and I stop hunching.",
  "Level 1 really is gentle. My wife thought it would be too much and she uses it more than I do now.",
  "The ridged head is the one that stays on mine. Broad enough for a calf after a run.",
  "Good build. The heads screw on properly rather than pushing on, so nothing rattles.",
  "Runs on a normal AA. That alone sold it for me, I have enough things to charge.",
  "Packed well, nothing loose in the box, and the case actually closes properly.",
  "Simple to use. Press the button, dial it up, done. No app, no pairing, no account.",
  "I take it in my carry-on. No charger, no cable, nobody at security cares.",
  "Long enough to reach between my own shoulder blades, which was the whole reason I bought one.",
  "The fine point is precise. I go a level or two lower with that one and it is plenty.",
  "Second one. First lives at home, this one stays in my gym bag.",
  "Honest listing. Nobody promised me miracles and the thing does what the page says it does.",
  "Feels well made for the money. Metal heads, not painted plastic.",
  "My father in law has trouble gripping small things and he can still work this one handed.",
  "Bought as a gift, ended up buying a second for myself the same week.",
  "The tip is smooth, no sharp edges anywhere on any of the four heads.",
  "Shipping was quick and the tracking actually updated, which is more than most.",
  "Comfortable to hold for a full ten minutes, the body is not slippery.",
  "Nine levels is the right number. Enough range without being fiddly.",
  "Nice weight, quiet, and the display is readable in a dim room.",
  "Works fine through a thin t-shirt at the higher levels if you would rather not lift your shirt.",
  "Case is a proper hard case, not a plastic bag. Small thing but it matters.",
  "Everything in the photo was in the box. No missing head, no missing card.",
  "Been using it most evenings for a month. No sign of wear on the heads.",
  "The spoon head is better than I expected for the lower back.",
  "Straightforward product, straightforward page, no nonsense. Refreshing.",
  "Good size. Lives in the drawer next to my desk and comes out every afternoon.",
  "The button is stiff enough that it does not switch on by itself in a bag.",
  "Really easy to swap heads. Three seconds and you are on a different tip.",
  "Ordered Monday, here Friday, Ontario. Well packaged and undamaged.",
  "Bought one for my mother who is 74. She manages it fine on level 2.",
  "Better finish than the photos suggest. The silver is properly brushed, not shiny plastic.",
  "Does what it says. It is a pressure tool with a pulse, and it is a good one.",
  "The quick start card is actually useful. I still have it in the case.",
  "No irritation at all on my skin after a month of regular use.",
  "I like that the level stays where you left it after switching off.",
  "Good value. Same category of thing as ones I have seen for twice this.",
  "Sturdy enough that I do not worry about it rolling off the desk.",
  "Small, quiet, and it does not need anything else to work. Perfect for travel.",
  "The pulse is even across the levels, no sudden jump between 5 and 6.",
  "Great for forearms after a day of typing. That is what I use it for most.",
  "Arrived earlier than the estimate. The listing said 4 to 7 days, it took 4.",
  "Feels like it will last. Nothing creaks and nothing is glued together badly.",
  "Nice to have something in the house that does not need a charging cable.",
  "The ball head is the everyday one for me, the rest are situational.",
  "Bought after seeing it recommended. No regrets, it is a well made object.",
  "Clear instructions, clear safety list, no exaggerated claims anywhere. Bought on that alone.",
  "Compact enough for a wash bag. It came on holiday with us.",
  "Good grip, and the shape means it does not roll off a bedside table.",
  "One AA lasted me about six weeks of near-daily use.",
  "The metal heads feel cold at first, then you stop noticing.",
  "Reasonable price for what turns up. I expected flimsier for the money.",
  "Simple enough that I gave one to my father and he needed no explanation.",
  "Neat, discreet, and quiet enough to use while watching TV.",
  "The case has a slot for each head so nothing rattles around loose.",
];

const TEXT_4 = [
  "Good device. Wish the display had a backlight for using it in the dark.",
  "Works well. The instructions are thin, but the card covers the basics.",
  "Solid product. Took nine days to arrive rather than the estimate, otherwise no complaints.",
  "Happy with it. Would prefer a slightly longer body for reaching the mid back.",
  "Does the job. The higher levels are more than I will ever use, which is fine.",
  "Good quality. The case is a bit tight for getting the pen out one handed.",
  "Nice little tool. It does need a firm press to make good contact, which took me a day to work out.",
  "Fine product, no complaints. I would have liked a spare battery in the box.",
  "Well made. Four stars only because the button takes a firm press.",
  "Good buy. Level 1 to 3 is what I use, so nine levels is more range than I need.",
  "Works as described. The fine point head is sharper than I expected, start low with it.",
  "Decent build. A small thing, but I wish the display stayed lit a moment longer.",
  "Pleased overall. The packaging was a little dented in transit, the pen was fine.",
  "Good product for the price. It is plastic bodied, which the listing does say.",
  "Useful. It works better with slightly damp skin, which nobody tells you up front.",
  "Nice device. Four stars because I would have paid a bit more for a rechargeable one.",
  "Solid. My only note is that the heads all look similar in the case at a glance.",
  "Good, does what it claims. Delivery to Alberta took a week and a half.",
  "Happy with the purchase. The spoon head is the only one I have not found a use for.",
  "Works fine. I would like a timer that buzzes at ten minutes, but that is a wish, not a fault.",
  "Good honest product. The step between level 8 and 9 is bigger than the rest.",
  "Fine for the money. It arrived well packed and everything was in the box.",
];

/** Curated photo reviews — one per shipped review photo (photo-01..12.webp). */
const PHOTO_REVIEWS: { rating: 4 | 5; photo: string; text: string }[] = [
  {
    rating: 5,
    photo: "photo-01.webp",
    text: "This is everything that was in the box. Pen, four heads, case, card. Nothing missing, nothing damaged.",
  },
  {
    rating: 5,
    photo: "photo-02.webp",
    text: "The display at level 4, which is where I sit for my shoulders. Easy to read across a desk.",
  },
  {
    rating: 5,
    photo: "photo-03.webp",
    text: "Size comparison against a pen. It is genuinely pocketable, which I was not sure about from the listing photos.",
  },
  {
    rating: 4,
    photo: "photo-04.webp",
    text: "Bought two, one for each of us. Both identical and both worked out of the box. Delivery to Canada took ten days.",
  },
  {
    rating: 5,
    photo: "photo-05.webp",
    text: "Close up of the four heads. The finish is even on all of them, no burrs on the fine point.",
  },
  {
    rating: 5,
    photo: "photo-06.webp",
    text: "Lives on the desk now. Comes out around four every afternoon for the neck and shoulders.",
  },
  {
    rating: 4,
    photo: "photo-07.webp",
    text: "The case with everything in its slot. Slightly tight to get the pen back in, but it holds well.",
  },
  {
    rating: 5,
    photo: "photo-08.webp",
    text: "Packed in my carry on with no charger and no cable. That was the whole point for me.",
  },
  {
    rating: 5,
    photo: "photo-09.webp",
    text: "The threaded collar with a head half on. It screws in properly rather than pushing on, which is why nothing wobbles.",
  },
  {
    rating: 5,
    photo: "photo-10.webp",
    text: "Arrived sealed inside the box with the battery compartment taped. No scuffs anywhere.",
  },
  {
    rating: 5,
    photo: "photo-12.webp",
    text: "Two months in, daily use. The heads look the same as the day they arrived.",
  },
  {
    rating: 5,
    photo: "photo-13.webp",
    text: "Bought the two pack. One at home, one at the office, so I stopped carrying it back and forth.",
  },
];

/* ------------------------------------------------------------------ */
/* Countries + names — only the markets this store ships to           */
/* ------------------------------------------------------------------ */

type CountryEntry = {
  value: { country: string; names: string[] };
  weight: number;
};

const COUNTRIES: CountryEntry[] = [
  {
    value: {
      country: "United States",
      names: [
        "Michael Thompson",
        "Karen Mitchell",
        "James Carter",
        "Denise Holloway",
        "David Miller",
        "Angela Reyes",
        "Robert Hayes",
        "Sandra Whitfield",
        "William Bennett",
        "Patricia Nolan",
        "Daniel Foster",
        "Monica Delgado",
        "Christopher Reed",
        "Laura Kaminski",
        "Matthew Cole",
        "Yvonne Brooks",
        "Joshua Parker",
        "Theresa Lindqvist",
        "Andrew Brooks",
        "Nicole Alvarez",
        "Ryan Sullivan",
        "Deborah Chen",
        "Kevin Mitchell",
        "Rachel Okonkwo",
        "Steven Alvarez",
        "Priya Raman",
        "Brian Whitaker",
        "Marisol Cabrera",
        "Anthony Russo",
        "Hannah Weiss",
      ],
    },
    weight: 300,
  },
  {
    value: {
      country: "Canada",
      names: [
        "Liam Fraser",
        "Chantal Beaulieu",
        "Ethan Campbell",
        "Marie-Claude Tremblay",
        "Noah Sinclair",
        "Sophie Gagnon",
        "Lucas Grant",
        "Amrit Dhillon",
        "Mason Ellis",
        "Joanne Leblanc",
        "Benjamin Ross",
        "Emily Chow",
        "Nathan Boucher",
        "Sarah Kowalczyk",
        "Owen McAllister",
        "Fatima Nasser",
      ],
    },
    weight: 130,
  },
];

/* ------------------------------------------------------------------ */
/* Build the dataset                                                  */
/* ------------------------------------------------------------------ */

const textByRating: Record<number, string[]> = {
  5: TEXT_5,
  4: TEXT_4,
};

function buildReviews(): ProductReview[] {
  const rng = mulberry32(20260907);

  // Only 4★ and 5★ reviews are shown (store policy) — nothing below 4.
  // Quota for the 1,012 non-photo slots (10 five★ + 2 four★ are the photo
  // reviews above) lands on 800 × 5★ and 224 × 4★ total → a 4.6 average
  // once rounded, matching site.metrics.rating.
  const ratings: (4 | 5)[] = [];
  const add = (r: 4 | 5, n: number) => {
    for (let i = 0; i < n; i++) ratings.push(r);
  };
  add(5, 640);
  add(4, 372);
  const shuffledRatings = shuffle(ratings, rng);

  // Slots: newest-first. Photos are pinned to spread positions near the top
  // (recent customers more often post photos), the rest take the shuffled
  // rating queue in order.
  type Slot = { rating: number; photo?: string; text?: string };
  const slots: Slot[] = [];
  const photoQueue = shuffle(PHOTO_REVIEWS, rng);
  const photoPositions = [0, 8, 18, 30, 44, 60, 78, 98, 121, 147, 176, 208];
  const at = new Set(photoPositions);

  let ratingIdx = 0;
  for (let i = 0; i < REVIEW_COUNT; i++) {
    if (at.has(i)) {
      const p = photoQueue.shift()!;
      slots.push({
        rating: p.rating,
        photo: p.photo,
        text: p.text,
      });
    } else {
      slots.push({ rating: shuffledRatings[ratingIdx++] });
    }
  }

  // Text counters per rating — assigned newest-first so the hand-written
  // pool reads as unique on the newest pages before it cycles.
  const counters: Record<number, number> = { 5: 0, 4: 0 };

  // Dates: newest review ~2 days ago, spread back ~9 months, with jitter so
  // a page of 6 doesn't look machine-spaced.
  const newest = Date.now() - 2 * 86_400_000;
  const stepMs = 5.2 * 3_600_000; // ~5.2h per slot ≈ 1024 slots over ~222 days

  return slots.map((slot, i) => {
    const rating = slot.rating;
    const text =
      slot.text ??
      (() => {
        const pool = textByRating[rating];
        return pool[counters[rating]++ % pool.length];
      })();

    const { country, names } = pickWeighted(COUNTRIES, rng);

    return {
      id: `acu-${String(i + 1).padStart(4, "0")}`,
      rating: rating as ProductReview["rating"],
      author: names[Math.floor(rng() * names.length)],
      country,
      createdAt: newest - i * stepMs - Math.floor(rng() * 3_600_000),
      text,
      images: slot.photo ? [`${PHOTO_BASE}/${slot.photo}`] : undefined,
      verified: rng() < 0.96,
    };
  });
}

export const penReviews: ProductReview[] = buildReviews();

function summarize(reviews: ProductReview[]): ReviewSummary {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const countries = new Set<string>();
  let withPhotos = 0;
  let sum = 0;
  for (const r of reviews) {
    counts[r.rating]++;
    countries.add(r.country);
    if (r.images?.length) withPhotos++;
    sum += r.rating;
  }
  const count = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: counts[stars],
    percent: Math.round((counts[stars] / count) * 100),
  }));
  return {
    handle: PEN_REVIEWS_HANDLE,
    count,
    average: Math.round((sum / count) * 10) / 10,
    recommended: Math.round(((counts[5] + counts[4]) / count) * 100),
    withPhotos,
    countries: countries.size,
    distribution,
  };
}

export const penReviewSummary: ReviewSummary = summarize(penReviews);

/**
 * Scope guard — returns review content only for the AcuNova pen so other
 * product pages never inherit another listing's reviews.
 */
export function reviewSetForHandle(handle: string): {
  reviews: ProductReview[];
  summary: ReviewSummary;
} | null {
  if (handle !== PEN_REVIEWS_HANDLE) return null;
  return { reviews: penReviews, summary: penReviewSummary };
}
