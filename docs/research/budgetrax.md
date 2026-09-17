# BudgeTrax — code findings (primary sources only)

Source: `https://github.com/christianmeude/BudgeTrax` (private), shallow clone 2026-09-17.
All paths below are repo-relative. Status: WIP — README is still the Expo template.

## Identity

- App `BudgeTrax` (`budgetrax`, v1.0.0), Expo + expo-router entry
  (`package.json:2-3`; `app.json`; `eas.json` present).
- Brand: dark glass — bg `#0D0D14`, glass `rgba(255,255,255,0.05)`, accent violet
  `#7C6FFF` (soft `rgba(124,111,255,0.15)`); semantic `success #4ADE80`,
  `warning #FBBF24`, `danger #F87171`, `savings #60A5FA`, `contribution #34D399`,
  `toSpare #A78BFA`; system fonts only; cards radius 20, pills 100
  (`src/constants/theme.ts:3-39`).
- Header gradient accent violet → `#9B59FF`, 34px extrabold title
  (`src/app/(tabs)/index.tsx:53-60,186-195`).

## Stack (corrects portfolio copy)

- **Expo ~56 + expo-router ~56 + React Native 0.85 + React 19**, Reanimated,
  AsyncStorage, expo-linear-gradient/blur/haptics/notifications
  (`package.json:6-37`). **Not** React/Vite/Tailwind — portfolio `projects.ts`
  stack was stale and is fixed alongside this research.

## Navigation map

- File-based routing; tab bar 64px, near-black `rgba(13,13,20,0.95)`, active = accent
  (`src/app/(tabs)/_layout.tsx:8-27`).
- Exactly two tabs: `Cutoffs` (wallet icon) and `Bills` (receipt icon); headers hidden
  (`src/app/(tabs)/_layout.tsx:28-46`).

## Screens (route → purpose → elements → actions)

- `Cutoffs` (`src/app/(tabs)/index.tsx`) → per-pay-cutoff salary allotment ledger.
  Elements: "BudgeTrax" title + `en-PH` long date subtitle (`:58-59`);
  cutoff pills May 8 / May 23 / Jun 8, last selected by default (`:28-30,64-93`);
  income card (`IncomeBar` in `GlassCard`: `:97-100`); allotments card with rows +
  "To Spare" total, danger-red when negative (`:104-141`); running-balance card
  (`ToSpareBar`: `:145-148`). Empty states: "No income received yet for this
  cutoff" / "No allotments set for this cutoff" (`:125-131`).
- `Bills` (`src/app/(tabs)/bills.tsx`) → "Bills & Loans", "N active obligations"
  (`:46-48`). Elements: summary chips Outstanding (danger) / Paid (success) /
  Due This Week (warning) (`:57-93`); `BillCard`s sorted nearest-due-first
  (`:17-20,96-104`). Card: name + type badge (Credit Card / Loan / BNPL) + due
  badge; Total Due; progress bar (accent, green when fully paid); "Paid ₱X" /
  "Remaining ₱Y" (`src/components/BillCard.tsx:14-80`). Remaining colors: paid →
  success, overdue → danger, ≤7d → warning (`:27-37`).

## Domain math (`src/utils/computations.ts:3-42`)

- Income = salary + contributions (`:4-7`); To Spare = income − allotments (`:10-13`);
  cumulative rollover across cutoffs (`:16-23`); remaining = totalDue − payments
  (`:26-29`); peso format `₱` + `en-PH` commas (`:40-42`).
- Sample ledger (`src/data/mockData.ts:43-112`): May 23 salary ₱12,959 + ₱1,000
  contribution; allotments savings ₱3,000, bills ₱4,000/₱2,000/₱1,141, allowance
  ₱1,000 → to spare ₱2,818. Bills: Maya Black ₱8,226 (paid ₱4,000), Maya Credit
  ₱7,598 (paid ₱5,000), Atome ₱2,432 (paid ₱1,141).

## Auth / data / sync

- No auth, no backend, no sync in code: data is `MOCK_CUTOFFS`/`MOCK_BILLS` in
  `src/data/mockData.ts`; AsyncStorage/secure-store deps present but no store
  wiring found in `src`. No realtime, no offline queue (nothing to sync yet).

## Gaps (could NOT confirm from repo)

- Roadmap beyond the two tabs (add/edit flows don't exist yet); notification
  usage (dep present, unused); EAS/store deployment; icon entrance animations
  (`animated-icon`) not reviewed.
- Prior portfolio mockup (generic "Budgets / Visual summaries" rows) was
  placeholder, contradicted by the cutoff/allotment/to-spare model above.
