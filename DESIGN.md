---
name: Generator dokumentów online
description: Darmowe generatory pism i dokumentów jak aplikacja w telefonie. Duże kafle z ikonami, granat atramentowy w pełnych polach, arkusz A4 leżący na granatowym biurku.
colors:
  b-950: "#071334"
  b-900: "#0b1d4d"
  b-800: "#112a6b"
  b-700: "#1a3b8f"
  b-600: "#2450b3"
  b-200: "#c4d3f3"
  b-100: "#dfe7fa"
  b-50: "#eff4fd"
  sun: "#ffd24d"
  sun-600: "#f2b90f"
  bg: "#ffffff"
  mist: "#f1f5fc"
  ink: "#0b1530"
  ink-2: "#2c3a5a"
  ink-3: "#55627f"
  line: "#d9e1f0"
  line-strong: "#b5c3de"
  red: "#c0271d"
  doc-ink: "#14213d"
  doc-900: "#1c2b4a"
  doc-700: "#2d4373"
  doc-soft: "#4f5a70"
  doc-faint: "#7d869a"
  doc-line: "#e1e5ee"
  doc-line-2: "#cfd6e3"
  doc-rule-2: "#c3cde0"
  doc-zebra: "#f3f5f9"
  doc-gold: "#a9822f"
typography:
  display-hero:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 11vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline-page:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.9rem, 7vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline-section:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.75rem, 6vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-block:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-form:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-tile:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  body-lead:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  help:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  nav-label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
  doc-body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  doc-heading:
    fontFamily: "Fraunces, Georgia, Times New Roman, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.15
rounded:
  doc-sheet: "6px"
  control: "12px"
  field-search: "14px"
  icon-square: "16px"
  tile: "20px"
  panel: "24px"
  pill: "999px"
spacing:
  gap-tight: "8px"
  gap-grid: "12px"
  gap-grid-wide: "16px"
  pad-tile: "20px"
  pad-panel: "28px"
  section-y: "56px"
  section-y-wide: "80px"
components:
  button-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.b-950}"
    rounded: "{rounded.icon-square}"
    height: "56px"
    padding: "0 28px"
  button-sun-hover:
    backgroundColor: "{colors.sun-600}"
    textColor: "{colors.b-950}"
  button-blue:
    backgroundColor: "{colors.b-700}"
    textColor: "{colors.bg}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  button-blue-hover:
    backgroundColor: "{colors.b-800}"
    textColor: "{colors.bg}"
  button-outline:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  tile:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.title-tile}"
    rounded: "{rounded.tile}"
    padding: "20px"
  tile-icon:
    backgroundColor: "{colors.b-700}"
    textColor: "{colors.bg}"
    rounded: "{rounded.icon-square}"
    size: "56px"
  desk:
    backgroundColor: "{colors.b-700}"
    textColor: "{colors.bg}"
    rounded: "{rounded.panel}"
    padding: "20px"
  desk-stage:
    backgroundColor: "{colors.b-800}"
    rounded: "{rounded.icon-square}"
    padding: "16px"
  form-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 16px"
  chip-quick:
    backgroundColor: "rgba(255, 255, 255, 0.12)"
    textColor: "{colors.bg}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 14px"
  category-tab:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 8px 0 16px"
  category-tab-selected:
    backgroundColor: "{colors.b-700}"
    textColor: "{colors.bg}"
  nav-bottom:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-3}"
    typography: "{typography.nav-label}"
    height: "72px"
---

# Design System: Generator dokumentów online

## Overview

**Creative North Star: "The Ink-Blue Desk"**

The site is a sibling of Kalkulatory Online: the same app-like grammar of big white tiles, solid colour fields and Figtree at extreme weights, re-cut in ink blue, the colour of a ballpoint pen and an office stamp. Every route into a generator is a tappable tile with a filled icon square and the full document name. Every generator answers with the same signature object: a white A4 sheet lying on an ink-blue desk, updating as the user types, ready to print.

Pages alternate full-bleed bands: ink-blue fields (hero, trust band, footer, the desk) against white and Mist sections that carry tiles, forms and reading content. One blue family does the structural work; sun yellow appears only for the one action on blue and for emphasis on blue fields. The printed documents themselves live in a second, quieter world: a neutral navy "doc" palette and, for document headings only, the Fraunces serif, so the sheet reads as a real letter or certificate rather than a piece of the website.

The audience is the same as the sibling's: people who want big targets, icons, strong colour, large type and few words. Pale, hairline, text-heavy chrome is off the table.

**Key Characteristics:**
- One ink-blue family from near-black `b-950` to wash `b-50`, plus sun yellow as the single warm accent.
- Big white tiles (20px radius, blue-tinted soft shadow, 3px lift on hover) with a 56px ink-blue icon square and a bold name.
- The desk: an A4 sheet at true millimetre size, scaled to fit a Deep Ink stage inside an Ink Blue panel.
- Hero watermark glyphs (§ ¶ @ A4) at 7% white, the document-world counterpart of the sibling's giant math symbols.
- Site chrome is Figtree only; the serif belongs to printed documents.
- Every interactive target is at least 44px; fields are 56px.

## Colors

A single ink-blue family carries structure, brand and surfaces; sun yellow is the only other chrome hue. Printed sheets use a separate neutral doc palette.

### Primary
- **Ink Blue** (`b-700`): the brand colour. Tile icon squares, the desk panel, the logo mark, primary blue buttons, selected category tabs, numbered step circles, field focus borders, links and utility icons, the select chevron, text selection.
- **Deep Ink** (`b-800`): the home hero field and the desk stage behind the sheet; hover of Ink Blue buttons and icon squares; hover text on nav and links.
- **Night Ink** (`b-900`): the trust band; text on hovered white chips; inverted logo mark text.
- **Blue Black** (`b-950`): the footer, the dark ring of the focus outline, and the text colour on every Sun surface.
- **Bright Ink** (`b-600`): defined for the ramp; not used directly.
- **Pale Ink** (`b-200`): tile hover border, open FAQ border.
- **Ink Tint** (`b-100`): soft icon squares (compact tiles, block titles, search results, demo head, FAQ plus), the 4px focus glow around fields, count badges, active bottom-nav pill.
- **Ink Wash** (`b-50`): hover fill on header nav, search results, dashed add buttons and the demo link; open FAQ background.

### Secondary
- **Sun** (`sun`): the one action on blue (hero search submit, trust-band CTA), emphasised words in blue-field headings, trust icon squares, footer column headings, the inverted logo mark, the privacy shield on the desk, the yellow ring of the focus outline, the skip link, and the ink-flash highlight in the hero demo.
- **Marigold** (`sun-600`): hover of Sun buttons.

### Neutral
- **Paper** (`bg`): page background, tiles, form card, inputs, header, bars, overlays.
- **Mist** (`mist`): alternating light sections (library on home, generator page header, how-to steps, repeat blocks in forms). A blue-tinted near-white, never grey.
- **Ink** (`ink`), **Ink Two** (`ink-2`), **Ink Three** (`ink-3`): headings and values; secondary text, labels and nav links; help text, placeholders, breadcrumbs, inactive bottom-nav items.
- **Line** (`line`) and **Line Strong** (`line-strong`): 1px tile border, 2px field/tab/outline border; hover border, breadcrumb chevrons, dashed add-button border, scrollbar thumb.
- **Alarm Red** (`red`): hover state of the remove button on repeat blocks only.

### Document palette (printed sheets only)
- **Doc Ink** (`doc-ink`) and **Doc Navy** (`doc-900`): document headings and names; table header fill; default business-card accent.
- **Doc Blue** (`doc-700`): checkbox outlines, certificate subtitle line.
- **Doc Soft** (`doc-soft`) and **Doc Faint** (`doc-faint`): secondary document text; signature captions and tags.
- **Doc Line** (`doc-line`), **Doc Line Two** (`doc-line-2`), **Doc Rule Two** (`doc-rule-2`), **Doc Zebra** (`doc-zebra`): table rules, dashed label cells, the inner certificate frame, even table rows.
- **Doc Gold** (`doc-gold`): certificate outer frame, recipient name and its underline.

### Named Rules
**The One Family Rule.** Every chrome surface, border and tint comes from the ink-blue ramp or its blue-tinted neutrals. No greens, purples, greys or second brand hue in the site chrome.

**The Sun On Blue Rule.** Sun appears on or beside blue fields, for the one primary action or the one emphasised phrase. Text on Sun is always Blue Black. On white surfaces the primary action is Ink Blue (for example "Pobierz PDF"), not Sun.

**The Full Field Rule.** Hero, trust band, footer and the desk are solid blue fields edge to edge (or full panels), never tinted outlines or pale washes.

**The Two Worlds Rule.** The `doc-*` palette paints printed sheets only and never appears in chrome; the chrome `b-*` ramp never appears inside a printed document. User-chosen accents (business card, invitation swatches) live inside the sheet, not on the site.

## Typography

**Display Font:** Figtree (with system-ui, -apple-system, Segoe UI, sans-serif), Google Fonts, weights 400-800
**Body Font:** Figtree (same family)
**Document Heading Font:** Fraunces (with Georgia, Times New Roman, serif), weights 500-600, loaded on generator pages only

**Character:** One friendly geometric sans at extreme weights: 800 with -0.03em tracking and 1.04 leading for display, 600-700 for labels and tile names, 400 for reading. Tabular numerals are on in chrome and switched off inside printed documents.

### Hierarchy
- **Display, hero** (800, clamp 2.75rem-5rem, 1.04): home H1 only.
- **Headline, page** (800, clamp 1.9rem-3rem): generator H1. The trust-band heading uses clamp 1.9rem-3rem.
- **Headline, section** (800, clamp 1.75rem-2.5rem): home section heads.
- **Title, block** (800, 1.5rem, -0.02em): content titles under the generator, always with a 40px Ink Tint icon square; also category panel titles.
- **Title, form** (800, 1.25rem, -0.02em): section headings inside the form card, separated by a 2px Mist rule. Trust items use 1.25rem 800 too.
- **Title, tile** (700, 1.125rem phone to 1.25rem desktop): large tile names; compact tiles 1.0625rem.
- **Body lead** (400, 1.25rem, 1.4): hero lead (max 30ch) and generator page lead from 640px (max 60ch). The article intro uses 1.125rem at 1.7, max 68ch.
- **Body** (400, 1.0625rem, 1.5): base size, FAQ answers (1.6, max 68ch), steps, footer copy.
- **Label** (600-700, 1rem): field labels, buttons, chips, tabs, nav links.
- **Help** (400-500, 0.9375rem): hints under fields, breadcrumbs, desk privacy line, gen note, cookie text.
- **Caption** (600-700, 0.875rem): count badges, search-result subtitles, mini-grid labels, footer legal line.
- **Nav label** (700, 0.8125rem): bottom-nav labels only; the floor of the chrome ramp.

### Document type (inside the A4 sheet only)
Documents set in Figtree at 13px, 1.5-1.6 leading, sized in px/mm for print fidelity. Fraunces (500) carries document headings only: table-document titles (24px), certificate title and name (30-34px), invitation title (28px), business-card name and company. Letters stay entirely in Figtree.

### Named Rules
**The Serif Stays On Paper Rule.** Fraunces is allowed only inside printed document templates, and only for their headings. The site chrome never uses a serif.

**The No Kicker Rule.** Headings in the site chrome stand alone. No eyebrow, kicker, small-caps label or uppercase tag above any heading.

**The 13px Floor Rule.** Nothing in the chrome renders below 0.8125rem, and that size is reserved for bottom-nav labels. Document text follows print sizes and is exempt.

## Layout

A single centred container (max 72rem, 16px side padding, 24px from 640px) holds every section; full-bleed colour bands run behind it. Section rhythm is 56px vertical padding on phones, 80px from 640px. The generator page header is on Mist, shorter: 20-28px top, 32-40px bottom.

Home: Deep Ink hero with the H1, lead, hero search and quick chips on the left and a working mini-generator demo on the right (1.18fr / 0.82fr from 1024px); popular tiles on white (2 columns, 3 from 1024px); the full library on Mist behind category tabs (horizontally scrolling on phones, wrapping from 640px); trust band on Night Ink; FAQ on white; footer on Blue Black.

Generator pages: breadcrumbs, 56-64px icon square and H1 in the Mist header; then a two-column grid from 900px with the form card left (1.12fr) and the desk right (1fr), the desk sticky at 88px from the top. Below 900px the desk leaves the flow and becomes a full-screen sheet that slides up from a fixed bottom bar ("Podgląd" outline + "Pobierz PDF" blue). Below the generator, an article column sits beside a 21rem related-generators aside from 1024px, the aside sticky at 96px.

Mobile chrome: the header is sticky only from 768px. On home a fixed 72px bottom nav takes over below 768px; on generator pages the 80px action bar does the same below 900px. Both reserve their height at the bottom of the body and push the cookie banner above them.

## Elevation & Depth

Hybrid: blue fields do most of the layering, and a soft, blue-tinted shadow family lifts white objects off them. Shadows are always diffuse and tinted with the ink family; only the printed sheet uses a neutral black shadow, because it is paper, not chrome.

### Shadow Vocabulary
- **Tile** (`0 1px 2px rgba(11,29,77,0.06), 0 10px 28px -14px rgba(11,29,77,0.3)`): resting tiles and the form card.
- **Tile hover** (`0 2px 4px rgba(11,29,77,0.08), 0 18px 40px -16px rgba(11,29,77,0.42)`): with a 3px lift and Pale Ink border on linked tiles.
- **Float** (`0 20px 50px -18px rgba(7,19,52,0.5)`): the desk, the hero demo card, the hero search field, search dropdowns and sheet, the cookie banner.
- **Bar** (`0 -8px 24px -16px rgba(7,19,52,0.45)`): the fixed bottom nav and the mobile action bar.
- **Sheet** (`0 18px 44px -20px rgba(0,0,0,0.55)`): the A4 document on the desk only; removed in print.

### Named Rules
**The Lift On Touch Rule.** Linked tiles rise 3px and deepen their shadow on hover (200ms, ease-out-expo `cubic-bezier(0.16,1,0.3,1)`). Static containers do not move. Reduced motion removes the lift.

## Shapes

Generously rounded, radius growing with object size: 12px for controls (inputs, buttons, small icon squares, nav pills, desk buttons), 14px for the search field, 16px for tile icon squares, FAQ items, the desk stage, trust items, steps and the large Sun CTA, 20px for tiles, 24px for panels (form card, desk, hero demo, cookie banner). Chips, category tabs, count badges, swatches, step numbers and bottom-nav pills are fully round. The document sheet itself is square-cornered at print size; only its top edge in the hero demo is rounded (6px).

Borders: tiles 1px Line; fields, tabs, outline buttons and FAQ items 2px Line; the add-row button is a 2px dashed Line Strong. Icons are lucide-style inline SVG line icons (stroke 2-2.5) defined in the catalogue. Document, category, block-title and trust icons always sit in a filled rounded square (Ink Blue with white, Ink Tint with Ink Blue, or Sun with Blue Black); utility icons (arrows, chevrons, search, close, zoom) appear bare at 16-24px.

## Components

### Buttons
Chunky, filled and obvious.
- **Shape:** gently rounded (12px); the large Sun CTA uses 16px.
- **Sun primary (on blue):** Sun fill, Blue Black text, 800 weight. The hero search submit sits inside the search field; the trust-band CTA is 56px with 28px padding and an arrow. Hover to Marigold.
- **Blue primary (on white):** Ink Blue fill, white text, 48px, 20px padding; hover Deep Ink. Carries "Pobierz PDF" on the desk and the mobile bar, and the cookie accept.
- **Outline:** white, 2px Line border, Ink text, 48px; hover border Ink Blue. "Podgląd" on the mobile bar, cookie reject.
- **Add row:** full-width 52px dashed button in Ink Blue text; hover fills Ink Wash.
- **Focus:** a double ring on every focusable element: 3px Blue Black outline at 2px offset plus a 5px Sun box-shadow ring. The dark ring carries contrast on white, the yellow ring on blue.

### Chips and Tabs
- **Quick chips on the hero:** 44px pill, 12% white fill, white 1rem semibold with an 18px icon; hover fills white with Night Ink text.
- **Category tabs:** 48px pill, white with 2px Line border, Ink Blue icon and an Ink Tint count badge; hover border Ink Blue; selected is solid Ink Blue with white text and an 18% white badge.

### Cards / Containers
- **Tile:** 20px radius, white, 1px Line, Tile shadow. Large: 56px (64px from 640px) Ink Blue icon square with the name, stacked on phones and side by side from 640px. Compact: 48px Ink Tint square beside the name, filling Ink Blue on hover. Icon plus full name only.
- **Form card:** white, 24px radius, 20-28px padding, Tile shadow; section titles split by a 2px Mist rule. Repeating rows sit in Mist blocks (16px radius) with a round 40px remove button that turns Alarm Red on hover.
- **Trust items:** 7% white on Night Ink, 16px radius, 56px Sun icon squares.
- **How-to steps:** Mist cards, 16px radius, numbered 36px Ink Blue circles.

### Inputs / Fields
- **Style:** 56px, 2px Line border, 12px radius, white, 1.0625rem medium Ink; placeholders regular Ink Three. Selects carry an Ink Blue chevron. Multi-value rows (hours, days) use 48px centred mini fields.
- **Hover / Focus:** hover border Line Strong; focus border Ink Blue plus a 4px Ink Tint glow.
- **Hero search:** 64px, 16px radius, transparent border with Float shadow on blue, Sun submit inset; focus border turns Sun.
- **Colour swatches:** 44px circles; the active one gets a white gap ring, an Ink outer ring and a white check.

### Navigation
- **Header:** white, 64-72px, 1px Line rule, sticky from 768px. Logo (40px Ink Blue mark, 800 wordmark with the second word in Ink Blue); search from 1024px; nav links as 1rem semibold Ink Two pills filling Ink Wash on hover.
- **Bottom nav (home, phones):** fixed white 72px bar, four items, 24px icon over a nav-label; active item turns Deep Ink with a 56x32px Ink Tint pill.
- **Footer:** Blue Black, inverted logo (Sun mark), Sun column headings, 86% white links, a sibling link to Kalkulatory Online with a Sun icon in a 10% white square.

### The Desk (signature)
The heart of the product. An Ink Blue panel (24px radius, Float shadow) with a bar holding the "Podgląd" title and 44px translucent zoom buttons (minus, plus, fit), a Deep Ink stage, the white A4 sheet inside it, a full-width "Pobierz PDF" button and a privacy line with a Sun shield. The sheet is built at true size (210 x 297 mm, landscape 297 x 210 mm for certificates and wide tables) and scaled to fit the stage width; zoom steps by 10% between 20% and 120%. On desktop the desk is sticky beside the form; below 900px it is a full-screen sheet that slides up (320ms ease-out-expo) from the action bar and locks page scroll. Printing clones only the sheet into a print root at A4 with zero margins, so the PDF is exactly the sheet.

The hero demo is a miniature of the same object: a working two-field generator whose sheet sits on an Ink Blue desk, with changed words flashing Sun for 700ms (ink flash).

### Document templates
Letters (right-aligned date, centred bold subject, justified body, signature line), table documents (Fraunces title, Doc Navy header row in 11px uppercase, zebra rows), certificates (landscape, cream paper, double gold/rule frame, Fraunces title and gold name), invitations (130 x 180 mm card centred on the sheet, accent from swatches), address labels (3-column dashed cells) and business cards. **Business cards are 90 x 50 mm, printed as five front/back pairs on one A4 cutting sheet** (two columns, 5 mm row gap, 8 mm column gap), accent chosen from swatches.

### Known open item
Landscape table documents (grafik pracy, plan lekcji) render small in the desk at default fit because the 297 mm sheet is scaled to the stage width; users enlarge them with the plus control. This is a current limitation, not a rule.

## Do's and Don'ts

### Do:
- **Do** route to every generator through a tile with a filled icon square and the full document name.
- **Do** show every generator's output as a white A4 sheet on the Ink Blue desk, live-updating, sticky on desktop and full-screen from the action bar on phones.
- **Do** alternate full blue fields with white and Mist sections so each band reads at a glance.
- **Do** use Sun only for the one action or emphasised phrase on blue, with Blue Black text on it.
- **Do** keep the hero watermark glyphs (§ ¶ @ A4) as large 800-weight characters at 7% white on the hero field, decorative and aria-hidden.
- **Do** paint printed sheets with the `doc-*` palette and, if a heading needs gravity, Fraunces; keep everything else in Figtree.
- **Do** keep every tappable target at least 44px and every chrome string at 1rem or more (13px only for bottom-nav labels).
- **Do** tint every chrome shadow with the ink family and keep it soft and diffuse.

### Don't:
- **Don't** return to pale, hairline, text-heavy chrome with small labels and text-only lists.
- **Don't** put an eyebrow, kicker or uppercase label above any chrome heading.
- **Don't** use a serif anywhere in the site chrome.
- **Don't** use emoji or text glyphs as icons; every icon is an inline lucide-style SVG from the catalogue, and document/category icons always sit in a filled rounded square. (The hero watermark glyphs are texture, not icons.)
- **Don't** introduce a second chrome hue family or use Sun as a large background on white.
- **Don't** let `b-*` colours leak into printed documents or `doc-*` colours into the chrome.
- **Don't** use hard offset shadows or black shadows in the chrome.
- **Don't** add descriptions or blurbs to generator tiles; icon plus full name only.
