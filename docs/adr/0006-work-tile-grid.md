# Work as an interactive tile grid, not a carousel

> Superseded by 0007 — tile grid, detail stage, and lazily-mounted emulators retired. Shipped is stacked brutalist cards (`components/Projects.tsx`) with always-visible repo pills. Kept as history.

The four projects live in a 2×2 tile grid (single column on mobile). Tiles carry identity only — logo, status, app name over a bottom blur bar, one-line blurb on hover/focus. Selecting a tile centers it, moves the others out of view, and showcases the interactive mockup plus repo links in a detail stage below. Supersedes ADR 0003 (manual carousel): the carousel gave each project a viewport but mounted all emulators at once and repeated the same heavy card four times down the page; the grid scans in one viewport and pays the emulator cost only for the selected project.

## Consequences

Tile blurbs are allowed to be hover-revealed because the app name is always visible and the full detail (including the blurb's content) is one selection away for touch, keyboard, and screen readers — nothing meaningful is hover-only. Tile logos are pending assets in `public/logos/`; monogram fallbacks render until they land. A fifth project reflows the grid instead of earning a slide.
