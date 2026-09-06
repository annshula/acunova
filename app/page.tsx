import Hero from "@/components/sections/Hero";
import BenefitGrid from "@/components/sections/BenefitGrid";
import ReliefAreas from "@/components/sections/ReliefAreas";
import Problem from "@/components/sections/Problem";
import TrustBar from "@/components/sections/TrustBar";
import Showcase from "@/components/sections/Showcase";
import Method from "@/components/sections/Method";
import Comparison from "@/components/sections/Comparison";
import Guarantee from "@/components/sections/Guarantee";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Schema from "@/components/Schema";

/**
 * The home page, built as a Long-Scroll Narrative (see
 * .tastemaker/style-lock.md's Structure section, and
 * .tastemaker/log.json for the archetype record).
 *
 * The order is the narrative arc, not a list of available sections:
 *
 *   Hook          Hero        — one promise, one action, on a dark frame
 *   (orient)      BenefitGrid — the six use-cases, lifted out of the fold
 *   (orient)      ReliefAreas — the four body areas, lifted out of the fold
 *   Problem       Problem     — thumbs give out, pads guess, clinics close
 *   (reassurance) TrustBar    — verifiable policy facts only, no ratings
 *   Solution      Showcase    — what the pen actually is, shown
 *   How it works  Method      — the mechanism, and the line we won't cross
 *   (support)     Comparison  — pen vs pads vs hands, plain facts
 *   (support)     Guarantee   — what every order includes
 *   Proof         Reviews     — gated on site.metrics.verified
 *   (objections)  Faq         — including the safety answer, which is the
 *                               real objection for a device in this category
 *   Close         FinalCta    — one ask, echoing the hook's promise
 *
 * An acupressure pen is an unfamiliar object fighting a "is this legit"
 * trust gap, so the page explains before it asks. That is why Problem sits
 * this high and why Faq sits immediately before the close rather than being
 * buried on its own page.
 *
 * No live data to fetch, so the whole page is static.
 */
export default function Home() {
  return (
    <>
      <Schema />
      <main>
        <Hero />
        <BenefitGrid />
        <ReliefAreas />
        <Problem />
        <TrustBar />
        <Showcase />
        <Method />
        <Comparison />
        <Guarantee />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
