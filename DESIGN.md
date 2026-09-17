---
name: Christian Meude Portfolio
description: Calm single-page developer portfolio — proof over claims.
colors:
  paper: "#FAFAFA"
  ink: "#09090B"
  card-white: "#FFFFFF"
  mist: "#E8ECF0"
  slate-ink: "#334155"
  hairline: "#E4E4E7"
  calm-operations-blue: "#1E40AF"
  on-accent-white: "#FFFFFF"
  soft-ink: "#18181B"
  paper-dark: "#09090B"
  ink-dark: "#FAFAFA"
  card-dark: "#121214"
  mist-dark: "#1C1C1F"
  slate-light: "#CBD5E1"
  hairline-dark: "#27272A"
  calm-operations-sky: "#60A5FA"
  on-accent-dark: "#09090B"
  ambient-violet: "#7C3AED"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  full: "9999px"
  2xl: "16px"
  xl: "12px"
  focus: "4px"
spacing:
  section: "clamp(64px, 10vw, 144px)"
  container: "72rem"
  gutter: "20px"
  gutter-sm: "32px"
  gap: "32px"
  gap-lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.calm-operations-blue}"
    textColor: "{colors.on-accent-white}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.calm-operations-blue}"
    textColor: "{colors.on-accent-white}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  badge-stack:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  card-work:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: Christian Meude Portfolio

## Overview

**Creative North Star: "Calm Systems Clearing"**

Calm, spacious, proof-led. This single-page portfolio is a clearing in the woods: generous whitespace, type that does the heavy lifting, and one project per view so a time-constrained recruiter can scan four projects and reach email without friction. The surface stays quiet on purpose; the systems underneath — Expo + Supabase, Flutter, Laravel + Inertia — carry the proof.

Refined and restrained throughout. Flat surfaces, hairline borders, pill-shaped actions, and a single blue accent used sparingly. Ambient canvas motion exists only on capable desktops and degrades to a static gradient on mobile, reduced-motion, and low-power devices. No hover-dependent information, no shadows at rest, no decoration without a job.

**Key Characteristics:**
- Calm, spacious, proof-led — one idea per viewport
- Type-led hierarchy (Archivo display, Space Grotesk body)
- Flat-by-default surfaces with hairline borders
- One accent, used sparingly for action and wayfinding

## Colors

Quiet paper neutrals with a single confident blue for action.

### Primary
- **Calm Operations Blue** (#1E40AF): primary actions, links, eyebrows, and focus. Dark theme shifts to Calm Operations Sky (#60A5FA) to hold contrast on near-black paper (#09090B).
- **Ambient Violet** (#7C3AED): canvas/static-gradient ambient wash only, at 8–10% mix — never text, never borders, never actions.

### Neutral
- **Paper** (#FAFAFA): light page background; dark theme Paper Dark (#09090B).
- **Ink** (#09090B): light foreground text; dark theme Ink Dark (#FAFAFA).
- **Card White** (#FFFFFF): card and secondary-button surfaces; dark theme Card Dark (#121214).
- **Mist** (#E8ECF0): muted badge fills and subtle fills; dark theme Mist Dark (#1C1C1F).
- **Slate Ink** (#334155): secondary body copy on light; dark theme Slate Light (#CBD5E1).
- **Hairline** (#E4E4E7): all borders and dividers; dark theme Hairline Dark (#27272A).
- **Soft Ink** (#18181B): logo/primary text punch on light; resolves to paper white in dark.
- **On-Accent White** (#FFFFFF): text on the blue action; dark theme On-Accent Dark (#09090B).

### Named Rules (optional, powerful)
**The One Accent Rule.** Calm Operations Blue is the sole accent on any screen. Violet never exceeds a 10% ambient wash and never carries meaning.

## Typography

**Display Font:** Archivo (with system-ui, -apple-system, Segoe UI fallback)
**Body Font:** Space Grotesk (with system-ui, -apple-system, Segoe UI fallback)

**Character:** Confident grotesque display with tight tracking against a neutral, highly legible grotesque body. Display shouts once per section; body stays quiet and spacious.

### Hierarchy
- **Display** (800, clamp(3rem, 10vw, 8rem), 0.95): hero name only (`hero-display`, `text-wrap: balance`).
- **Headline** (700, 2.25rem rising to 3rem on sm, 1.1): section titles (`Selected work`, `About`, `Contact`).
- **Title** (700, 1.875rem rising to 2.25rem / 3rem, 1.2 tight): project card titles.
- **Body** (400–500, 1rem rising to 1.125rem, 1.6 relaxed, max ~65ch): outcomes, about copy, part details.
- **Label** (600, 0.875rem, 0.2em tracking, uppercase): eyebrow kickers in accent (`Developer Portfolio`, `Selected work`), card index lines in muted.

### Named Rules (optional)
**The Type Does the Work Rule.** Hierarchy comes from size, weight, and whitespace — never from extra colors or decoration.

## Layout

Single-column stacked flow on mobile; focused centered column on desktop inside a 72rem (max-w-6xl) container with 20px gutters (32px on sm+). Sections breathe with a fluid rhythm token (`clamp(64px, 10vw, 144px)` top/bottom). Work stacks with 32px gaps (48px on lg); each work card is full-width and holds a 70vh minimum on lg so one project owns one viewport. About splits 0.9fr/1.1fr on lg; work cards split 1.1fr/0.9fr on lg. Sticky 64px header with blurred paper background; hero fills the first viewport (min-h-svh) with a max-3xl scrim card for legibility over canvas.

## Elevation & Depth

Flat by default. Depth is conveyed through tonal layering (paper → card → mist) and 1px hairline borders — never shadows at rest. No `box-shadow` vocabulary exists in the codebase.

### Named Rules (optional)
**The Flat-By-Default Rule.** Surfaces stay flat. The only lift is a 2px rise (`hover:-translate-y-0.5`, 200ms) on the primary action; everything else changes border color, never shadow.

## Shapes

Gently confident pills over soft rectangles. Primary actions, secondary actions, badges, capability chips, and the theme toggle are fully rounded pills (9999px). Hero scrim and work cards are large soft rectangles (16px). Inner part rows and text-only placeholders are smaller soft rectangles (12px). Focus is a sharp 3px ring with 3px offset and 4px corner. Borders are 1px solid hairline everywhere except a dashed 1px border reserved for the text-only outcome placeholder.

## Components

Refined and restrained: bordered pills and flat cards with crisp focus and no shadow play.

### Buttons
- **Shape:** fully rounded pill (9999px)
- **Primary:** Calm Operations Blue fill with on-accent text, 28px horizontal / 12px vertical padding, 44px minimum height, semibold; hover lifts 2px
- **Hover / Focus:** primary lifts on hover; all actions show a 3px accent focus ring with 3px offset; secondary/ghost shifts border to accent
- **Secondary / Ghost / Tertiary (if applicable):** card fill with hairline border and ink text; contact GitHub variant adds a 18px inline SVG icon with 8px gap

### Chips
- **Style:** mist fill, ink text, hairline border, pill shape, 13–15px medium type (stack badges 28px min-height; capability chips larger padding)
- **State:** static only — no selected/unselected treatment exists

### Cards / Containers
- **Corner Style:** large soft rectangle (16px)
- **Background:** card surface on paper background
- **Shadow Strategy:** none — see Elevation & Depth
- **Border:** 1px hairline; text-only variant uses 1px dashed hairline
- **Internal Padding:** 24px mobile, 40px on sm+; inner part rows 16–20px
- **Disclosure rows:** the Inea three-surface system renders as native disclosure rows (`details`/`summary`) with an inline SVG chevron; first row open by default, no JavaScript required

### Inputs / Fields
- None exist in this static site. Do not invent input styling.

### Navigation
- Sticky top header, 64px height, blurred paper at 90% with hairline bottom border. Wordmark `CM.` in Archivo extrabold 18px with accent period. Primary nav 15px medium; Work/About hidden on mobile, Contact always visible; all links 44px targets. Theme toggle is a 44px pill outlined in hairline with sun/moon glyph and `aria-pressed`. Skip-to-content link appears on focus in accent fill. Footer repeats contact actions with a hairline top rule, copyright line, and back-to-top link.

### Signature Component
- **Hero scrim + ambient canvas.** A max-3xl 16px card over the hero canvas carries the headline and actions; its background is paper at 72% mix (78% in dark) so the ambient blobs stay subordinate. Canvas renders five slow indigo/violet radial blobs (hues 221/262, 10% alpha light / 16% dark) with pointer parallax, gated to fine pointers, ≥769px width, no reduced-motion, and no save-data; a three-stop static radial gradient (accent 10%, violet 8%, accent 6%) is always present underneath as the fallback. Inside the scrim, a proof strip names the three real systems (Nucleus, Inea Scents, BudgeTrax) with 6px accent markers over a hairline rule — the product fingerprint in the first viewport.

## Do's and Don'ts

Concrete guardrails grounded in the shipped implementation.

### Do:
- **Do** keep one project per viewport on desktop (70vh card minimum) and stacked full-width on mobile.
- **Do** keep every link and outcome visible and tappable at 44px minimum with no hover dependency.
- **Do** use the accent sparingly for actions, eyebrows, and focus; let paper, ink, and hairlines do the rest.
- **Do** respect `prefers-reduced-motion` (reveal becomes instant, smooth scroll becomes auto, canvas stays off).
- **Do** keep landmarks (`main`, labelled sections, footer) and a visible 3px focus ring on everything interactive.

### Don't:
- **Don't** add a second accent or promote the ambient violet to text, borders, or actions.
- **Don't** add shadows, gradients-as-decoration, or glassmorphism beyond the existing header blur and hero scrim.
- **Don't** invent testimonials, metrics, case-study claims, or input styles that don't exist in the code.
- **Don't** shrink touch targets below 44px or hide information behind hover.
- **Don't** replace Archivo / Space Grotesk or introduce a third family without an explicit rebrand decision.
