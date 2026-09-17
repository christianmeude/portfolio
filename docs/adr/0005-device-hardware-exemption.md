# Device hardware is exempt from flat-by-default

DESIGN.md's Flat-By-Default rule bans `box-shadow` elevation: cards, chips,
and frames stay shadowless with 1px hairline borders, and depth comes only
from the chrome glow behind everything.

Device hardware is not UI elevation and is exempt: phone bezels (metallic
gradient, punch-hole camera, side buttons), diagonal screen glare, and soft
floor reflections depict a physical object holding the screen, not a raised
surface. The exemption covers only the frame — screen content follows the
app it depicts (or portfolio tokens for wireframes), never the hardware
treatment.

## Considered options

- **Flat frames everywhere**: rejected — a bezel-free emulator reads as a
  screenshot, and the portfolio's proof model rests on devices as evidence.
- **Hardware glow as accent**: rejected — bezel gradients stay neutral
  metallics; sky accent never lives in hardware (One Accent Rule holds).
