/**
 * The full FAQ page (/faq) — a superset of the compact homepage FAQ
 * (content/copy.ts `faqs`), grouped by topic.
 *
 * ⚠️ Reference homepage entries by `id`, never by question text.
 *
 * This file used to filter the homepage list with `f.q === "Will it fit my
 * wrist?"` and similar. When the copy was rewritten for this product every
 * one of those matches silently returned nothing, so three of the four
 * groups on /faq rendered empty and no test or type error caught it. Each
 * homepage FAQ now carries a stable `id`; `pick()` below throws if an id
 * goes missing, so the same failure becomes loud instead of invisible.
 *
 * Claim policy carries over from content/copy.ts unchanged: hardware fact
 * stays fact, acupressure stays labelled as tradition, and the safety
 * exclusions are stated plainly rather than softened.
 */

import { productPath } from "@/lib/catalog";
import { faqs as homepageFaqs } from "@/content/copy";

export type FaqEntry = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqEntry[] };

/** Pull homepage entries by id, loudly, in the order given. */
function pick(...ids: string[]): FaqEntry[] {
  return ids.map((id) => {
    const found = homepageFaqs.find((f) => f.id === id);
    if (!found) {
      throw new Error(
        `content/faq.ts: no homepage FAQ with id "${id}". If you renamed or ` +
          `removed it in content/copy.ts, update this file too.`,
      );
    }
    return { q: found.q, a: found.a };
  });
}

export const faqGroups: FaqGroup[] = [
  {
    title: "What it is, and what it isn't",
    items: [
      ...pick("what-it-does"),
      {
        q: "Is an acupressure pen the same as acupuncture?",
        a: "No, and the distinction matters. Acupuncture involves inserting fine needles through the skin and is performed by a trained practitioner. This device never breaks the skin. It presses on a point and adds a mild electrical pulse. It borrows the point map that acupuncture and acupressure both use, which is where the name comes from, but the procedure is not the same and it is not a substitute for seeing one.",
      },
      {
        q: "Is it a medical device?",
        a: "No. It is a consumer wellness and massage tool. It has not been cleared or evaluated by the FDA or Health Canada, and nothing we say about it is a claim to treat, cure, prevent or diagnose any condition. If you are dealing with persistent pain, an injury, or any ongoing condition, the right step is a doctor rather than a gadget.",
      },
      {
        q: "Does the evidence support acupressure?",
        a: 'The honest answer is that it is mixed. Acupressure and acupuncture have both been studied, particularly for musculoskeletal discomfort and nausea, and reviews tend to find some modest effects alongside real methodological problems: small samples and the genuine difficulty of blinding a treatment that involves someone pressing on you attentively. We would rather state that plainly than quote only the favourable studies. There is a fuller discussion in <a href="/blog/do-acupressure-pens-work">do acupressure pens actually work</a>.',
      },
    ],
  },
  {
    title: "Safety, and who should not use one",
    items: [
      ...pick("safety"),
      {
        q: "Can I use it with a pacemaker?",
        a: "No. Do not use this or any electrical stimulation device if you have a pacemaker, an implanted defibrillator, or any other implanted electronic device. Implanted cardiac devices work by sensing the heart's own electrical activity, and an external current can in principle interfere with that. This is the one exclusion we would ask you to treat as absolute.",
      },
      {
        q: "Can I use it while pregnant?",
        a: "No. Electrical stimulation devices are not recommended during pregnancy. Several commonly used acupressure points are also traditionally avoided in pregnancy, but you do not need to learn which. The simpler guidance is to skip the device entirely and speak to your midwife or doctor.",
      },
      {
        q: "Which areas should I avoid?",
        a: "The front and sides of the neck (major blood vessels and the carotid sinus sit there), anywhere near the eyes, broken skin, open wounds, rashes, moles you are monitoring, and varicose veins. Also avoid any area where you have reduced sensation, since the whole method depends on being able to feel the intensity and back it off.",
      },
    ],
  },
  {
    title: "Using it",
    items: [
      ...pick("does-it-hurt", "where-and-how-long"),
      {
        q: "Which head should I use where?",
        a: 'Broad heads for broad muscle, fine points for specific spots. A multi-point head suits shoulders, calves and forearms; the fine point suits the hand or a precise spot at the base of the skull; a flat head suits the lower back and thighs. The key rule is that a smaller contact area feels much stronger at the same setting, so drop the intensity when you switch to a point. There is a full breakdown in <a href="/blog/choosing-acupressure-pen-heads">which head should you use</a>.',
      },
      {
        q: "How often can I use it?",
        a: "Once or twice a day is a sensible ceiling for most people, with sessions of five to fifteen minutes across a few points. Consistency does more than duration: a short daily round beats a long weekly one. Stop if a spot becomes numb, unusually sore, or stays red for more than an hour or two.",
      },
    ],
  },
  {
    title: "Choosing a version",
    items: [
      ...pick("in-the-box"),
      {
        q: "What is the difference between the 3-head and 5-head versions?",
        a: `A three-point head is more precise and suits smaller or contoured areas: the forearm, the neck, around the knee. A five-point head covers more ground per pass, so it works faster across broad muscle like the calves, thighs and the wide part of the back. Neither is better; pick three-point if you mostly work neck and arms, five-point if you mostly work back and legs. Both are listed on <a href="${productPath}">the product page</a>.`,
      },
      {
        q: "Oil-free or oil-infused?",
        a: "Oil-infused heads carry a small reservoir so the tip glides instead of dragging, which most people prefer on the neck and shoulders. Oil-free suits staying on a single point and avoids getting product on clothes or hair. If you are unsure and mostly want neck and shoulder work, oil-infused is the safer first pick.",
      },
    ],
  },
  {
    title: "Shipping and returns",
    items: pick("delivery", "damaged-or-wrong"),
  },
];

export const allFaqs: FaqEntry[] = faqGroups.flatMap((g) => g.items);
