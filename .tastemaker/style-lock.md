# Style lock — AccuPenPro

> **REVISION 2 (2026-09-07).** The user explicitly asked for a different
> direction: different colours, different aesthetic, different layout. The
> bronze/cream poster palette below in Revision 1 is SUPERSEDED — kept only
> so the reasoning trail survives. Revision 2 is the active contract.

## Revision 2 — active palette (healing teal)

Generated with `scripts/generate_palette.py --mood technical --mode light`,
not hand-picked. Rationale: the bronze read as luxury-spa; this product is a
drug-free therapeutic device, and a clinical-calm teal carries "restorative
and trustworthy" far better while being maximally different from Revision 1.

- Background: #f4fefb (pale mint-white)
- Surface: #ffffff
- Surface sunken: #eaf4f1
- Primary: #0f846e (healing teal — CTA fills, focus ring)
- Accent: #0b808d (teal-cyan — icons, hairlines, highlights)
- Accent wash: #c3e8dc
- Text: #121d1a — 16.78:1 vs bg
- Text soft: #53645f — 6.08:1 vs bg
- Text muted: #5f706b — 5.08:1 vs bg
- Border: #d9e4e0
- Button label: white on primary — 4.62:1 (AA pass)

### Revision 2 colour contract

- **Text-safe (>=4.5):** text/surface, text/on-primary, text/bg, text/border, surface/accent, accent/on-primary, surface/primary, primary/on-primary, bg/accent
- **UI-safe (>=3.0, <4.5):** bg/primary, text/primary, text/accent, accent/border, primary/border
- **Decorative (<3.0):** surface/border, border/on-primary, bg/border, bg/surface, bg/on-primary, primary/accent, surface/on-primary

⚠️ **bg/primary is only UI-safe (3.x).** Teal text directly on the mint
canvas is large-text/icon only. Teal text on a white *surface* IS text-safe —
put teal body copy on cards, not on the page background.

⚠️ **#6b7c77 was tested as a muted tone and FAILS at 4.28:1.** Do not use it.

---

## Revision 1 (SUPERSEDED — bronze/cream, kept for the reasoning trail)

Established: 2026-09-07.
Source: the AccuPenPro brand poster supplied by the user (product + design reference).

> **Extraction honesty note.** `scripts/extract_palette.py` was NOT run — the
> poster arrived as a chat attachment, and that script needs a file on disk.
> The hexes below come from a careful visual read of the poster, then were
> put through `scripts/check_contrast.py --matrix`, which is what actually
> validated them (and caught a real failure — see Color contract). If the
> poster PNG is dropped into the repo, re-run the extractor to confirm or
> refine these values; nothing below is guessed at contrast, only at hue.

## Palette
- Background: #fdfcfa (page background — near-white, faint warmth)
- Surface: #ffffff (cards, panels, photo card ground)
- Primary: #7e5c36 (deep bronze — CTA fills, links-as-text, focus ring)
- Accent: #a67c4e (light bronze from the wordmark — icons, hairlines, script flourish, graphical highlights ONLY)
- Text primary: #2b2a28 — contrast vs background: 13.98 (WCAG AA pass)
- Text muted: #6b6862 — contrast vs background 5.42, vs surface 5.55 (both AA pass)
- Button label color: white — contrast vs Primary: 6.05 (AA pass)
- Dark mode: not needed for this project — single light mode only. The poster
  is a bright, clinical-wellness composition; a dark variant would be a
  different brand, not a mode. The `--color-void/pitch/carbon` tokens survive
  from the reference build and are used for the footer band only.

## Color contract

Verified with `scripts/check_contrast.py --matrix text=2b2a28 bg=fdfcfa
surface=ffffff primary=7e5c36 accent=a67c4e border=e9e5de on-primary=ffffff`.

- **Text-safe (>=4.5):** text/surface (14.34), text/on-primary (14.34), text/bg (13.98), text/border (11.42), surface/primary (6.05), primary/on-primary (6.05), bg/primary (5.90), primary/border (4.82)
- **UI-safe (>=3.0, <4.5):** text/accent (3.83), surface/accent (3.74), accent/on-primary (3.74), bg/accent (3.65)
- **Decorative (<3.0):** accent/border, text/primary, primary/accent, surface/border, border/on-primary, bg/border, bg/surface, bg/on-primary, surface/on-primary

**The one rule that matters here:** the two bronzes are not interchangeable.
`--color-accent` (#a67c4e) is 3.74:1 against white — it may carry icons,
hairlines and large decorative type, and must never be a fill behind a white
label. `--color-primary` (#7e5c36) is 6.05:1 and is the only bronze allowed
under white text.

**Adjustment made mid-build:** the first hand-picked draft assigned #a67c4e to
Primary, which put every CTA label at 3.74:1 — below the AA floor. Fixed by
promoting the deeper #7e5c36 to Primary (an already-legal pairing, per the
Step-4 failure path) rather than inventing a new hue. `components/ui/Button.tsx`
also had a gradient CTA that *ended* on accent; it is now a solid primary fill.

## Typography
- Display/heading font: **Outfit** — geometric sans matching the poster's headline; set light (300) at display sizes, which is where the poster gets its calm.
- Body font: **Figtree** — humanist sans, high x-height, comfortable at the long-form lengths the FAQ and policy pages run to.
- Script accent: **Parisienne** — the poster's "Small Device. Big Relief." flourish. Strictly once per page, always decorative (never the only place a message appears).
- No serif anywhere. The editorial serif in earlier drafts belonged to the reference build, not this brand.
- Scale: fluid `clamp()` tokens in `app/globals.css` (`--text-display` → `--text-caption`).

## Shape language
- Corner radius: `--radius-card` 14px (cards/panels), `--radius-photo` 18px (the poster's rounded lifestyle photos), full-round for buttons and chips.
- Shadow depth: barely-there. `--shadow-e1`→`e4` are warm-tinted and low-opacity; a bright layout carries depth with hairlines and space.
- Border usage: 1px hairlines (`--color-line` #e9e5de) are the primary separator, not shadows.
- Texture: none. The reference build's `.grain` overlay is neutralised to a no-op — the poster look is clean studio white.

## Density & spacing
- Base unit: 4px. Section padding is weighted by role, not uniform: pivotal sections (hero, close) take 128–192px vertical; connective sections take 80–96px.
- Internal <= external: content cards use >=24px internal padding, and never more than the gap between them.

## Structure
- Macrostructure: **Long-Scroll Narrative** (`references/macrostructures.md` #4).
- Archetypes: Nav **N2** (balanced product bar, frost-on-scroll) · Hero **H2** (split demo, left-bias) · Solution **F1** (alternating bands) · How-it-works **F4** (numbered steps) · Proof **P4** (stat strip, honesty-gated) · Close **C2** (statement + action) · Footer **Ft1** (masthead) · Section heads mostly **S1** (hanging), **S4** used at most twice.
- Banned here: the eyebrow-left/heading-right two-column section head; the generic hero → 3-feature-cards → testimonial → CTA → footer rhythm.

## Assets
- Photography: real Shopify CDN product shots (`cdn.shopify.com`, allow-listed in `next.config.ts`). All HimVolt/hematite imagery from the reference build was deleted, not reused.
- Lifestyle/body photography: **not yet sourced.** The four relief-area cards render a soft placeholder until real photography exists (`content/copy.ts` `reliefAreas`, `image: null`).
- Icons: hand-drawn thin line set in `components/ui/LineIcons.tsx`, 1.25 stroke, matched to the poster's icon row.
- Logo: typographic wordmark in `components/ui/Logo.tsx` — live text plus one SVG dotted-O glyph, not a raster. No raster logo asset ships.

## Honesty flags (do not quietly resolve these)
1. **The poster's six benefit labels are health claims** ("Relieves Joint Pain", "Improves Blood Circulation"). This device is not FDA/Health-Canada cleared. `content/copy.ts` keeps the poster's six categories but phrases them as use-cases. Restoring poster-exact wording is a legal sign-off, not a copy edit.
2. **The poster's "4.6/5" and "50,000+ Happy Customers" are unverified.** `site.metrics.verified` is `false`, which gates them out of schema.org markup. Do not build a P4 stat strip on these until they come from a real review platform.


---

## Revision 2 — structure rotation

Rotating against `.tastemaker/log.json`, which records Revision 1 as
Long-Scroll Narrative / N2 / H2 / Ft1. Per the diversification rule the nav,
hero and footer archetypes must all differ:

- Macrostructure: **Bento Showcase** (was Long-Scroll Narrative) — an
  asymmetric mixed-span tile grid. The pen has many small capabilities
  (head types, intensity range, portability, safety, shipping) that read
  better at a glance than as a vertical argument, and it is maximally
  different in shape from a long scroll.
- Nav: **N3 floating pill** (was N2 balanced bar)
- Hero: **H3 photographic fold** (was H2 split demo) — depends on real
  photography landing; see the Assets note.
- Footer: **Ft4 statement close** (was Ft1 masthead)

## Revision 2 — known-open items

1. **Navbar bug fixed.** The bar derived `solid` from a dark-hero assumption
   inherited from the reference build; on a light hero it rendered white text
   on a near-white page (invisible on `/` unscrolled and on `/benefits`
   permanently). It is now always solid.
2. **Higgsfield photography still not generated.** The upload widget has been
   opened twice and has not returned a media_id, so no image has been
   generated. The hero still uses the real Shopify CDN product shot and the
   four relief-area cards still render placeholders. This is NOT done.
3. **566 hematite/bracelet references remain** across 17 content files
   (22 blog articles, /benefits, /shop, /faq, legal.ts, llms routes).
   The design layer is clean; the content layer is not.
