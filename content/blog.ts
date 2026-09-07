/**
 * Blog post content. Same pattern as content/copy.ts and lib/product.ts —
 * plain data, kept out of components so posts can be edited without touching
 * page code. `body` is author-controlled HTML (same trust model as
 * lib/product.ts's descriptionHtml), never user input.
 *
 * Claim policy carries over from content/copy.ts unchanged, and it is the
 * hardest constraint on this file. The AcuNova pen is a consumer wellness
 * device with no FDA or Health Canada clearance. So:
 *   - Describe what the hardware does and what the user does with it.
 *   - Describe acupressure as the tradition it is, and say so explicitly.
 *   - Where evidence is genuinely mixed or thin, say that plainly rather
 *     than rounding it up into a benefit.
 *   - Never write that the pen treats, cures, heals, relieves or prevents a
 *     named condition, and never imply it replaces seeing a doctor.
 * An article that would only work if we broke one of those rules is an
 * article we don't publish.
 *
 * Fewer, longer, genuinely useful posts beat a wide net of thin ones — both
 * for readers and for search. Eight posts that each answer one real question
 * fully is the deliberate shape here.
 */

import { productPath } from "@/lib/catalog";

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description + card excerpt. Kept under ~155 chars for SERP display. */
  excerpt: string;
  targetKeyword: string;
  /**
   * A single self-contained 1–3 sentence answer to the post's core question,
   * rendered as a highlighted callout right under the headline (see
   * app/blog/[slug]/page.tsx) and mirrored into the BlogPosting schema's
   * `abstract`. Answer engines lift the most extractable, self-contained
   * block on a page rather than synthesizing across paragraphs — this exists
   * to be that block.
   */
  quickAnswer: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  coverImage: { src: string; alt: string; width: number; height: number };
  body: string;
  /**
   * Direct question/answer pairs for featured snippets and answer engines.
   * Rendered both as visible on-page copy and as FAQPage JSON-LD — see
   * components/blog/FAQSchema.tsx. Only add where the question genuinely
   * matches a real query, not as a keyword-stuffing device.
   */
  faqs?: { question: string; answer: string }[];
};

const author = "The AcuNova Team";
export { author as blogAuthor };

/** Every post currently shares the studio hero shot. Swap per-post as real photography lands. */
const cover = {
  src: "/product/pen-hero.png",
  alt: "The AcuNova acupressure pen standing upright on a pale stone ledge in soft daylight",
  width: 896,
  height: 1200,
};

const SAFETY_HTML = `
<h2>Before you use one at all</h2>
<p>This is the part most listings bury, so here it is up front. An acupressure pen passes a low-intensity electrical pulse through your skin. That means there are people who should not use one, and areas nobody should use one on.</p>
<ul>
<li><strong>Do not use it if you have a pacemaker</strong>, an implanted defibrillator, or any other implanted electronic device.</li>
<li><strong>Do not use it if you are pregnant.</strong></li>
<li><strong>Do not use it over</strong> broken skin, an open wound, a rash, a mole you are watching, varicose veins, the front or sides of your neck, or anywhere near your eyes.</li>
<li><strong>Ask a doctor first</strong> if you have a heart condition, epilepsy, a metal implant near the area you want to work on, reduced sensation anywhere, or any ongoing medical condition at all.</li>
</ul>
<p>None of that is legal boilerplate. It is the actual answer, and if a seller does not give it to you unprompted, that tells you something about the seller.</p>`;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-use-an-acupressure-pen",
    title: "How to Use an Acupressure Pen (Without Guessing)",
    excerpt:
      "A plain walkthrough: pick the head, find the point, set a level you can actually tolerate, and keep the session short. Plus the safety list most listings skip.",
    targetKeyword: "how to use an acupressure pen",
    quickAnswer:
      "Fit the head that suits the area, hold the tip flat against a sore point, start at level 1 and step up only until the pulse is clearly felt and still comfortable. Five to fifteen minutes across a few points is a full session. Longer is not better.",
    tags: ["How to", "Getting started"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 6,
    coverImage: cover,
    body: `
<p>Most people take an acupressure pen out of the box, press the button a few times, feel a strange tickle, and put it back in the drawer. That is a shame, because the device is genuinely simple once somebody explains the four decisions you are actually making.</p>
${SAFETY_HTML}
<h2>1. Pick the head that matches the area</h2>
<p>The heads are not decorative variety. Each one changes how much pressure lands per square millimetre.</p>
<ul>
<li><strong>Rounded ball</strong>, the everyday head. Broad enough for the top of the shoulders, a calf, or a forearm without concentrating everything into one spot.</li>
<li><strong>Ridged</strong>, for kneading <em>across</em> a muscle rather than pressing into it. Most people end up leaving this one fitted.</li>
<li><strong>Fine point</strong>, a small tip for one specific spot: the web of the hand, the base of the skull, the outside of the knee. Because the contact area is tiny, the same intensity setting feels much stronger. Drop a level or two when you switch to it.</li>
<li><strong>Flat spoon</strong>, the largest contact area, for the lower back and thighs where a point tip is simply the wrong tool.</li>
</ul>
<h2>2. Find the point, you probably already know where it is</h2>
<p>You do not need to memorise a meridian chart. The spots you instinctively reach for at the end of a long day are, in practice, the same ones the classical charts mark. Press around the area with a thumb first. You are looking for a spot that feels dense or tender in a way the surrounding tissue does not: that is your target.</p>
<p>If you want the traditional map, it exists and it is worth reading, but treat it as a starting point rather than a prescription.</p>
<h2>3. Start at level 1 and work up</h2>
<p>This is where people go wrong. They start high, it feels unpleasant, and they conclude the device is not for them.</p>
<p>Level 1 should read as a faint tickle. Step up one level at a time until the pulse is unmistakable but you would still describe it as comfortable. That is your level. It will differ by body part: the setting that feels right on your shoulder will be too much on the back of your hand.</p>
<p>Two things make the sensation harsher than it needs to be: dry skin and bone. If it stings or feels sharp rather than tapping, move off the bony spot, or lower the level.</p>
<h2>4. Keep the session short</h2>
<p>Five to fifteen minutes total, across a few points, once or twice a day. Thirty seconds to two minutes on any single point is plenty before moving on.</p>
<p>Longer is not better, and there is no prize for enduring level 9. If a spot goes numb, unusually sore, or red, stop and leave it alone.</p>
<h2>What to expect, honestly</h2>
<p>It feels like a firm, rhythmic tap, and afterwards the area usually feels warm and a bit looser, the same sort of after-effect as a decent self-massage or a hot shower. That is what the tool is for. Anyone promising more than that is selling you something else.</p>
<p>If you want the device itself, <a href="${productPath}">the AcuNova pen</a> ships with the heads described above and a card mapping the common points.</p>
`,
    faqs: [
      {
        question: "How long should an acupressure pen session last?",
        answer:
          "Five to fifteen minutes in total, spread across a few points, once or twice a day. Thirty seconds to two minutes per point is enough before moving on. Longer sessions are not more effective, and a spot that goes numb, sore or red is a signal to stop.",
      },
      {
        question: "What intensity level should I use?",
        answer:
          "Start at level 1 and step up until the pulse is clearly felt but still comfortable. The right level differs by body part, a setting that suits your shoulder is usually too strong for the back of your hand or a bony area.",
      },
    ],
  },
  {
    slug: "do-acupressure-pens-work",
    title: "Do Acupressure Pens Actually Work? An Honest Answer",
    excerpt:
      "What these devices verifiably do, what the evidence for acupressure and TENS actually says, and what no seller can honestly promise you.",
    targetKeyword: "do acupressure pens work",
    quickAnswer:
      "As a tool for applying precise, repeatable pressure plus a mild electrical pulse, yes, that is simply what the hardware does. As a treatment for a medical condition, no honest seller can promise that, and an acupressure pen is not a cleared medical device.",
    tags: ["Honest answers", "Buying guide"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 7,
    coverImage: cover,
    body: `
<p>This is the question everyone actually types, so it deserves a straight answer rather than a sales page. The honest response is that "work" is doing a lot of hidden work in that sentence, and splitting it into three narrower questions gets you somewhere useful.</p>
<h2>Does the hardware do what it claims?</h2>
<p>Yes, and this part is not really in dispute. An acupressure pen is a metal tip that delivers a low-intensity electrical pulse, in the same broad family as the TENS units sold in any pharmacy. Press it against your skin at level 5 and you will feel an unmistakable rhythmic tap. There is no mystery in the mechanism and nothing exotic inside the casing.</p>
<p>It also does something a thumb cannot: apply the same pressure to the same spot for as long as you like, at a setting you can repeat tomorrow, in places on your own back your hands cannot reach.</p>
<h2>Does acupressure itself do anything?</h2>
<p>Here the honest answer is: the evidence is mixed, and it is weaker than enthusiasts claim and stronger than sceptics allow.</p>
<p>Acupressure and acupuncture have been studied a great deal, particularly for musculoskeletal discomfort and nausea. Reviews of that literature tend to land in a similar place: some studies find modest effects, the studies are frequently small or poorly blinded, and separating a genuine effect from placebo is notoriously difficult when the intervention involves someone attentively pressing on you for ten minutes.</p>
<p>What we will not do is cherry-pick the favourable studies and present them as settled. If you want to read the state of the evidence yourself, the US National Center for Complementary and Integrative Health maintains a plain-language summary that does not sell anything.</p>
<h2>Will it fix my back?</h2>
<p>We do not know, and neither does anyone selling you one.</p>
<p>This device is not cleared by the FDA or Health Canada. It is not a medical device. It has not been evaluated as a treatment for any condition, and if your pain is persistent, worsening, or comes with numbness, weakness or anything else unusual, the correct move is a doctor, not a gadget, and not a blog post.</p>
<h2>So what is it actually for?</h2>
<p>It is a comfort tool. The reasonable framing is the one you would apply to a foam roller, a hot shower or a massage gun: a small, repeatable ritual that most people find pleasant and which makes a stiff evening more bearable.</p>
<p>Plenty of people find that genuinely worth having. It is also the entire honest pitch, and a seller who needs more than that to make the sale is telling you something.</p>
<h2>How to spot a listing that is lying to you</h2>
<ul>
<li>It names conditions it "treats" or "cures".</li>
<li>It shows a certification badge that turns out to be a factory audit, not a medical clearance.</li>
<li>It quotes a percentage of users who improved, with no study attached.</li>
<li>It never mentions pacemakers or pregnancy anywhere.</li>
</ul>
<p>That last one is the most telling. Any seller who understands what they are shipping leads with the safety list.</p>
`,
    faqs: [
      {
        question: "Is an acupressure pen a medical device?",
        answer:
          "No. Consumer acupressure pens, including this one, are not cleared by the FDA or Health Canada as medical devices. They are wellness and massage tools, and nothing about them treats, cures or prevents a condition.",
      },
      {
        question: "Is acupressure scientifically proven?",
        answer:
          "The evidence is mixed. Studies exist, particularly for musculoskeletal discomfort and nausea, but many are small or hard to blind, and separating a real effect from placebo is difficult. It is fair to call acupressure a long-standing tradition with some supportive but inconclusive research, not a proven treatment.",
      },
    ],
  },
  {
    slug: "acupressure-points-neck-and-shoulders",
    title: "Acupressure Points for Neck and Shoulder Tension",
    excerpt:
      "The handful of spots people actually reach for after a long day at a desk, where to find them, and how to work them without overdoing it.",
    targetKeyword: "acupressure points neck shoulders",
    quickAnswer:
      "The most-used points for desk-related neck and shoulder tightness sit at the base of the skull, along the top ridge of the shoulder, and between the shoulder blade and the spine. Work each for under two minutes at a comfortable intensity, and never on the front or sides of the neck.",
    tags: ["Point guides", "Desk workers"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 6,
    coverImage: cover,
    body: `
<p>If you work at a screen, your tension has a pattern, and it is remarkably consistent from person to person: the base of the skull, the ridge of the shoulders, and the strip between the shoulder blade and the spine. Here is where those spots are and how to approach them.</p>
<p><strong>One hard rule before anything else:</strong> work the <em>back</em> and <em>top</em> of the neck only. Never the front, and never the sides, there are major blood vessels and the carotid sinus there, and neither pressure nor electrical stimulation belongs anywhere near them.</p>
<h2>The base of the skull</h2>
<p>Run a thumb up the back of your neck until you hit the ridge of bone where your skull begins. Just below that ridge, in the hollows either side of the spine, is the spot nearly everyone finds tender after a long screen day.</p>
<p>Work the hollows, not the spine itself. This area is sensitive, so start low: the setting that felt right on your shoulder will usually be too much here.</p>
<h2>The top ridge of the shoulder</h2>
<p>The midpoint of the ridge between the base of your neck and the tip of your shoulder: the classic spot people grab when someone says "you're carrying a lot of tension". It is usually the single tenderest point on a desk worker.</p>
<p>This is thick muscle, so a broader head and a slightly higher intensity suits it better than a fine point.</p>
<p><em>Traditional caution:</em> this point is conventionally avoided during pregnancy. That advice comes from tradition rather than trial evidence, but combined with the general rule that pregnant people should not use an electrical stimulation device at all, it is not a distinction you need to worry about, just do not use one.</p>
<h2>Between the shoulder blade and the spine</h2>
<p>The strip of muscle along the inner edge of the shoulder blade is where "I slept badly" tension collects. It is also the classic spot you cannot properly reach with your own hands, which is most of why a 170 mm handle is useful.</p>
<p>Work along the inner edge of the blade, staying off the spine itself and off the blade's bony ridge.</p>
<h2>The web of the hand</h2>
<p>Not a neck point, but worth knowing, because it is the one you can use at your desk without anyone noticing: the soft web between thumb and index finger. Squeeze it and you will find the tender spot immediately.</p>
<p>It is a small area over bone, so use a low setting and a short stint.</p>
<p><em>Also traditionally avoided in pregnancy</em>, same note as above.</p>
<h2>A ten-minute round</h2>
<ol>
<li>Base of the skull, both hollows: 60 seconds each, low setting.</li>
<li>Shoulder ridge, both sides: 90 seconds each, broader head.</li>
<li>Inner edge of each shoulder blade: 90 seconds each.</li>
<li>Web of each hand: 30 seconds each, low setting.</li>
</ol>
<p>That is roughly nine minutes and covers the whole desk-tension pattern. Do it once in the evening rather than twice as long once a week.</p>
<h2>When to stop and see somebody</h2>
<p>Neck pain that radiates down an arm, comes with numbness, tingling or weakness, follows an injury, or wakes you at night is not a self-massage problem. Put the device down and book an appointment.</p>
`,
    faqs: [
      {
        question: "Where are the main acupressure points for shoulder tension?",
        answer:
          "The most-used are the hollows just below the base of the skull, the midpoint of the ridge between neck and shoulder, and the strip along the inner edge of the shoulder blade. The web of the hand is a common addition you can use discreetly at a desk.",
      },
      {
        question: "Is it safe to use an acupressure pen on your neck?",
        answer:
          "Only on the back and top of the neck. Never use pressure or electrical stimulation on the front or sides, where major blood vessels and the carotid sinus sit. Start at a low intensity, since the area is more sensitive than the shoulders.",
      },
    ],
  },
  {
    slug: "acupressure-pen-vs-tens-unit",
    title: "Acupressure Pen vs TENS Unit: Which One Do You Want?",
    excerpt:
      "Both pass a mild current through your skin. The real differences are precision, reach, running cost, and whether anything is actually cleared as a medical device.",
    targetKeyword: "acupressure pen vs TENS unit",
    quickAnswer:
      "A TENS unit spreads stimulation across an area through adhesive pads; an acupressure pen concentrates it on one point through a handheld tip. Pens are better for precise spots and reaching your own back, pads are better for sustained coverage of a large area, and some TENS units are FDA-cleared where most consumer pens are not.",
    tags: ["Comparisons", "Buying guide"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 6,
    coverImage: cover,
    body: `
<p>These two get compared constantly, usually by someone selling one of them. The underlying technology overlaps heavily (both pass a low-intensity electrical current through the skin), so the decision comes down to form factor and a regulatory point most comparisons skip.</p>
<h2>The comparison, plainly</h2>
<table>
<thead><tr><th>&nbsp;</th><th>Acupressure pen</th><th>TENS unit with pads</th></tr></thead>
<tbody>
<tr><td>How it contacts you</td><td>A handheld metal tip on one point</td><td>Adhesive pads across an area</td></tr>
<tr><td>Precision</td><td>High: you aim it at the exact tender spot</td><td>Low: placement is an educated guess</td></tr>
<tr><td>Sustained sessions</td><td>You hold it, so a few minutes at a time</td><td>Pads stay put; can run much longer</td></tr>
<tr><td>Reaching your own back</td><td>Yes, the handle extends your reach</td><td>Usually needs a second person to place</td></tr>
<tr><td>Running cost</td><td>A battery; heads are reusable</td><td>Replacement adhesive pads, repeatedly</td></tr>
<tr><td>Setup</td><td>Pick it up, press the button</td><td>Peel, place, wire, dial</td></tr>
<tr><td>Regulatory status</td><td>Consumer pens are typically <strong>not</strong> cleared devices</td><td><strong>Some</strong> units are FDA-cleared; many consumer ones are not</td></tr>
</tbody>
</table>
<h2>The regulatory difference is the one that matters</h2>
<p>This is the part sales pages leave out, and it is the most important line in the table.</p>
<p>A subset of TENS devices have gone through FDA clearance for specific indications. That is a real regulatory process, and it means claims made about those devices have been reviewed. Most consumer acupressure pens, including ours, have not been through anything of the kind, and cannot honestly make treatment claims.</p>
<p>If you need a device for a diagnosed condition, on medical advice, that distinction should drive your decision, and the conversation belongs with your clinician rather than with a product page.</p>
<h2>Pick a pen if…</h2>
<ul>
<li>Your tension is a few specific tender spots, not a whole region.</li>
<li>You want to reach your own upper back without help.</li>
<li>You want something that lives in a drawer or a carry-on with no consumables.</li>
<li>You want a two-minute ritual, not a twenty-minute session.</li>
</ul>
<h2>Pick pads if…</h2>
<ul>
<li>You want to cover a broad area like the whole lower back.</li>
<li>You want long sessions while doing something else.</li>
<li>A clinician has recommended TENS specifically.</li>
</ul>
<h2>The honest summary</h2>
<p>They are not really competitors. A pen is a precision instrument for spot work; pads are for area coverage over time. Plenty of people who own both use them for different things.</p>
<p>What neither is: a substitute for a diagnosis.</p>
`,
    faqs: [
      {
        question: "Is an acupressure pen the same as a TENS unit?",
        answer:
          "They share the underlying idea, a low-intensity current passed through the skin, but differ in delivery. A pen concentrates it on a single point through a handheld tip; a TENS unit spreads it across an area through adhesive pads. Some TENS units are FDA-cleared; most consumer acupressure pens are not.",
      },
    ],
  },
  {
    slug: "acupressure-pen-safety",
    title: "Acupressure Pen Safety: Who Should Not Use One",
    excerpt:
      "Pacemakers, pregnancy, implants, and the areas of the body to avoid entirely, the list that belongs on the box and usually isn't.",
    targetKeyword: "acupressure pen safety",
    quickAnswer:
      "Do not use an acupressure pen if you have a pacemaker or any implanted electronic device, or if you are pregnant. Do not use it over broken skin, the front or sides of the neck, or near the eyes. Check with a doctor first if you have a heart condition, epilepsy, a metal implant nearby, or reduced sensation.",
    tags: ["Safety", "Honest answers"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 5,
    coverImage: cover,
    body: `
<p>This article exists because the information is genuinely hard to find on most product listings, which is not a great sign for the category. Read it before your first session.</p>
${SAFETY_HTML}
<h2>Why pacemakers specifically</h2>
<p>Implanted cardiac devices sense the heart's own electrical activity to decide when to act. An external source of current near the chest can, in principle, interfere with that sensing. The risk is why every reputable electrical stimulation device carries the same warning, and it is not one to take a chance on. If you have any implanted electronic device, this category is simply not for you.</p>
<h2>Why the front of the neck</h2>
<p>The carotid sinus sits in the front and sides of the neck and is involved in regulating blood pressure and heart rate. Pressure or stimulation there can affect both. Work the back and top of the neck only.</p>
<h2>Sensation matters more than people realise</h2>
<p>The whole method depends on your ability to feel the intensity and back it off when it becomes too much. If the area has reduced sensation (from neuropathy, an old injury, or anything else) you lose the feedback that keeps the session safe. Do not work an area you cannot properly feel.</p>
<h2>Normal versus not normal</h2>
<p><strong>Expected:</strong> a tapping or tingling sensation while in use, mild redness that fades within an hour, and a warm, slightly looser feeling afterwards.</p>
<p><strong>Stop and reassess:</strong> sharp or burning pain, numbness that persists after you finish, redness that lasts more than a couple of hours, any skin irritation, or feeling lightheaded.</p>
<p>Persistent or worsening pain, pain that radiates into a limb, or pain with weakness or numbness is a reason to see a doctor. It is not a reason to turn the level up.</p>
<h2>Sensible habits</h2>
<ul>
<li>Start at the lowest setting every session, not where you finished last time.</li>
<li>Keep sessions short: five to fifteen minutes across a few points.</li>
<li>Do not use it on someone else without them being able to tell you what they feel, and never on a child.</li>
<li>Do not use it while driving, in the bath, or anywhere near water.</li>
<li>Take the battery out if you are storing it for a long stretch.</li>
</ul>
<h2>The short version</h2>
<p>It is a low-intensity comfort device, and for most healthy adults using it sensibly on the right areas it is unremarkable. The exceptions above are genuine, though, and worth two minutes of your attention before the first use.</p>
`,
    faqs: [
      {
        question: "Can I use an acupressure pen with a pacemaker?",
        answer:
          "No. Do not use an acupressure pen, or any electrical stimulation device, if you have a pacemaker, an implanted defibrillator or any other implanted electronic device. External current can potentially interfere with how those devices sense your heart's activity.",
      },
      {
        question: "Can you use an acupressure pen while pregnant?",
        answer:
          "No. Electrical stimulation devices are not recommended during pregnancy. Several commonly used acupressure points are also traditionally avoided in pregnancy, but the simpler and safer guidance is to avoid the device entirely and speak to your midwife or doctor.",
      },
    ],
  },
  {
    slug: "acupressure-points-in-the-hand",
    title: "Acupressure Points in the Hand You Can Use at a Desk",
    excerpt:
      "The hand carries several of the most-used points in the tradition, they are easy to find, and nobody notices you working them mid-meeting.",
    targetKeyword: "hand acupressure points",
    quickAnswer:
      "The best-known hand points are the web between thumb and index finger, the centre of the palm, the fleshy base of the thumb, and the sides of the fingertips. All are easy to locate and discreet enough to work at a desk, use a low intensity, since the hand is thin-tissued and bony.",
    tags: ["Point guides", "Desk workers"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 5,
    coverImage: cover,
    body: `
<p>Hand points are where most people start, for three practical reasons: you can see exactly what you are doing, you can reach both hands easily, and you can work them at a desk without it becoming a conversation.</p>
<p><strong>Set the intensity low here.</strong> The hand is thin-tissued and full of bone close to the surface, so a level that felt mild on your shoulder will feel considerably sharper. Drop two levels when you move to the hand, especially with a fine point head.</p>
<h2>The web between thumb and index finger</h2>
<p>The most-used point in the whole tradition. Find the fleshy web, squeeze it between your other thumb and forefinger, and you will locate the tender spot immediately, usually slightly toward the index-finger side.</p>
<p>Traditionally reached for with tension headaches and general tightness. It is also just satisfying to work.</p>
<p><em>Traditionally avoided during pregnancy</em>, though as covered in our safety guide, pregnancy is a reason to skip the device entirely.</p>
<h2>The centre of the palm</h2>
<p>Make a loose fist; where your middle fingertip lands is roughly the point. Associated in tradition with calming and winding down, and it is a good one to finish an evening session on.</p>
<h2>The fleshy base of the thumb</h2>
<p>The thenar eminence: the muscular pad at the base of the thumb. If you type or use a phone heavily, this is often quietly tight without you having registered it.</p>
<p>Broad enough to take a rounded head rather than a point.</p>
<h2>The sides of the fingertips</h2>
<p>Just beside the corner of each nail bed. These are used in tradition as alerting points. They are also the most sensitive spots on the hand, so use the lowest setting you have, and briefly.</p>
<h2>A three-minute desk round</h2>
<ol>
<li>Web of each hand: 45 seconds each, low setting.</li>
<li>Base of each thumb: 30 seconds each.</li>
<li>Centre of each palm: 30 seconds each.</li>
</ol>
<p>Three minutes, no equipment beyond the pen, and nobody on the call notices.</p>
<h2>Keeping expectations straight</h2>
<p>Working hand points is pleasant and it is a genuinely useful interruption to a long screen stretch. What it is not is a treatment for headaches, anxiety, or anything else. The tradition attaches those associations to these points; the tradition is not the same thing as evidence, and we would rather say so than imply otherwise.</p>
`,
  },
  {
    slug: "desk-worker-tension-routine",
    title: "A Ten-Minute Routine for Desk-Day Tension",
    excerpt:
      "One repeatable evening round covering the pattern nine hours at a screen actually produces, neck, shoulders, forearms, hands.",
    targetKeyword: "desk worker neck shoulder routine",
    quickAnswer:
      "Work the base of the skull, the shoulder ridge, the inner edge of each shoulder blade, then the forearms and hands, roughly ten minutes total, once in the evening. Consistency matters more than duration; a short daily round beats a long weekly one.",
    tags: ["Routines", "Desk workers"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 5,
    coverImage: cover,
    body: `
<p>Desk tension is predictable. The same four areas, in the same order, on almost everybody who spends the day at a screen. Here is a round that covers the pattern in about ten minutes.</p>
<p>Read the <a href="/blog/acupressure-pen-safety">safety guide</a> first if you have not, particularly the pacemaker and pregnancy exclusions, and the rule about never working the front of the neck.</p>
<h2>The round</h2>
<ol>
<li><strong>Base of the skull, 1 min each side.</strong> The hollows either side of the spine, just under the ridge of bone. Low setting; this area is sensitive.</li>
<li><strong>Shoulder ridge, 90 sec each side.</strong> The midpoint between neck and shoulder tip. Thick muscle, so a broader head and a higher setting than the neck.</li>
<li><strong>Inner edge of the shoulder blade, 90 sec each side.</strong> The strip between blade and spine. This is the one your hands cannot reach; let the handle do the work. Stay off the spine and off the bony ridge of the blade.</li>
<li><strong>Forearms, 1 min each.</strong> The muscular top third, below the elbow. Badly under-rated if you type all day.</li>
<li><strong>Hands, 45 sec each.</strong> The web between thumb and index finger, then the base of the thumb. Low setting.</li>
</ol>
<p>That is a shade under ten minutes.</p>
<h2>Do it in the evening</h2>
<p>Most people get more out of this at the end of the day than at the start, the tension has accumulated by then, and the wind-down framing suits it. Attaching it to something you already do daily (while the kettle boils, after you close the laptop) is what makes it stick.</p>
<h2>Consistency beats duration</h2>
<p>Ten minutes daily does more for how your shoulders feel than forty minutes once a week. This is true of stretching, walking and most other physical habits, and there is no reason to expect it to be different here.</p>
<h2>The part a device cannot fix</h2>
<p>Worth saying plainly: if your monitor is too low, your chair has no support, and you have not stood up since morning, no amount of evening self-massage compensates. Raise the screen to eye level, get your feet flat, and stand up hourly. The routine above works considerably better as a complement to those things than as a substitute for them.</p>
<p>And if the pain is persistent, radiates into an arm, or comes with numbness or weakness, see a doctor. That is not a routine problem.</p>
`,
  },
  {
    slug: "choosing-acupressure-pen-heads",
    title: "Which Acupressure Pen Head Should You Use?",
    excerpt:
      "Three heads or five, oil-free or oil-infused, and which tip actually suits the shoulders, the back, the knees and the hands.",
    targetKeyword: "acupressure pen heads",
    quickAnswer:
      "Use a rounded or multi-point head for broad muscle like shoulders and calves, a fine point for specific small spots like the hand or the base of the skull, and a flat head for large areas like the lower back. Smaller contact area means stronger sensation, so drop the intensity when you switch to a point.",
    tags: ["How to", "Buying guide"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-07",
    readingMinutes: 5,
    coverImage: cover,
    body: `
<p>The heads look like variety for its own sake. They are not, the contact area changes how much pressure and current land per square millimetre, which changes the sensation completely at the same dial setting.</p>
<h2>The rule that governs all of it</h2>
<p><strong>Smaller contact area equals stronger sensation at the same intensity.</strong> Everything else follows from that. Switching from a broad head to a fine point without dropping the level is the single most common reason someone decides the device is unpleasant.</p>
<h2>Multi-point heads: three versus five</h2>
<p>Multi-point heads spread the contact across several small tips at once, which makes them the everyday choice for muscle.</p>
<ul>
<li><strong>Three-point</strong>, more precise. Better on smaller or more contoured areas: the forearm, around the knee, the upper trapezius.</li>
<li><strong>Five-point</strong>, covers more ground per pass, so it is quicker over a broad muscle like the calf, thigh or the wide part of the back.</li>
</ul>
<p>If you only ever use one head, most people settle on a multi-point. Between the two, pick three-point if you mostly work neck and arms, five-point if you mostly work back and legs.</p>
<h2>The fine point</h2>
<p>A single small tip for one specific spot, the web of the hand, a precise point at the base of the skull, the outside of the knee.</p>
<p>This is the head that needs the intensity drop. It is also the one to keep off bone: a point tip directly on a bony prominence is sharp rather than useful.</p>
<h2>The flat or spoon head</h2>
<p>The largest contact area, for the lower back and thighs. Gentle per square millimetre, so you can run it at a higher setting comfortably. It is the right tool for a broad ache and the wrong tool for a specific knot.</p>
<h2>Oil-free versus oil-infused</h2>
<p>Oil-infused heads carry a small reservoir that lets the tip glide rather than drag.</p>
<ul>
<li><strong>Oil-infused</strong> suits sliding strokes over a broad area, and most people prefer it on the neck and shoulders where dragging on dry skin is uncomfortable.</li>
<li><strong>Oil-free</strong> suits staying on one point, and avoids getting product on your clothes or hair. Simpler if you are working hands at a desk.</li>
</ul>
<p>Neither is better. If you are unsure and mostly want neck and shoulder work, oil-infused is the safer first pick.</p>
<h2>Matching head to area</h2>
<table>
<thead><tr><th>Area</th><th>Head</th><th>Intensity</th></tr></thead>
<tbody>
<tr><td>Neck (back and top only)</td><td>Three-point</td><td>Low</td></tr>
<tr><td>Shoulder ridge</td><td>Three or five-point</td><td>Medium</td></tr>
<tr><td>Between shoulder blades</td><td>Five-point</td><td>Medium</td></tr>
<tr><td>Lower back</td><td>Flat / spoon</td><td>Medium to high</td></tr>
<tr><td>Forearms</td><td>Three-point</td><td>Low to medium</td></tr>
<tr><td>Hands</td><td>Fine point</td><td>Low</td></tr>
<tr><td>Calves and thighs</td><td>Five-point or flat</td><td>Medium to high</td></tr>
<tr><td>Around the knee</td><td>Three-point or fine</td><td>Low</td></tr>
</tbody>
</table>
<p>You can see which heads ship with each configuration on <a href="${productPath}">the product page</a>.</p>
`,
    faqs: [
      {
        question: "What is the difference between 3-head and 5-head acupressure tips?",
        answer:
          "A three-point head is more precise and suits smaller or contoured areas like the forearm, neck and around the knee. A five-point head covers more ground per pass, so it works faster on broad muscle like the calves, thighs and the wide part of the back.",
      },
      {
        question: "Should I choose oil-free or oil-infused heads?",
        answer:
          "Oil-infused heads glide rather than drag, which most people prefer for sliding strokes over the neck and shoulders. Oil-free heads suit staying on a single point and avoid getting product on clothes or hair. Neither is better, oil-infused is the safer first pick for neck and shoulder work.",
      },
    ],
  },
];

/** Look up a post by slug — undefined when the slug doesn't exist. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
