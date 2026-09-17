# CSS-crafted mockups instead of screenshots

Work slides show device frames drawn in CSS/SVG with real surface structure and words, rather than screenshot images. Rationale: the repo has no image assets and the author produces them rarely; hand-built mockups stay crisp at any density, add zero network weight, and can't drift from the copy because they share the same tokens. The trade-off is accepted explicitly: scenes stay abstract (bars, statuses, real labels) and must never invent product data like prices or metrics.

## Considered Options

- **Author-supplied screenshots**: truer proof, but requires assets that don't exist and a pipeline to keep them fresh — rejected for now.
- **Hotlinked GitHub previews**: rejected as unreliable (breaks, needs network, inconsistent quality).
