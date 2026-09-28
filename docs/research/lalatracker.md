# Lalatracker — working repo (Expo rebuild v0)

Repo: `https://github.com/christianmeude/lalatracker` (`com.christianmeude.lalatracker`).
Status: working app — Expo parity v0 complete, installs and launches on emulator
(Pixel_7). Not store-distributed: offline personal ledger, no backend, no auth.

## What it is

Offline-first delivery-earnings ledger for a solo PH rider. Rebuilds the side-loaded
native Delivery Tracker (`com.example.deliverytracker`, recovered from APK +
on-device SQLite — see provenance below) as managed Expo. Peso totals header
(net / tips / gross), fast per-delivery entry, date filtering, recycle bin,
separate wallet cash ledger.

## Stack (shipped)

- **App:** Expo ~57, `expo-router` (tabs: ledger / bin / wallet + `add-entry` route),
  TypeScript, React Native 0.86.
- **Data:** `expo-sqlite` (`lalatracker.db`) — relational rows, totals aggregation,
  soft-delete flags, date-range filtering. No AsyncStorage, no backend, no sync,
  zero permissions.
- **Design world:** paper ledger-book — ink `#1F1B16` on paper `#FAF6EF`, Bitter
  display + RobotoMono tabular amounts, stock-mapped surfaces (wallet / bin tints).

## Domain math (preserved from original)

- Entry: net fare + tip, gross (= net + tip), payment value, deduction value;
  transaction types `CASH` / `WALLET`; tip destination `CASH`.
- Totals header aggregates non-deleted rows; wallet balance = sum of movements.
- Seed: Room `delivery_entries_table` where `is_deleted_flag = 0` (`src/db/seed.ts`).

## Provenance (APK-derived, still the history source)

- Original Android Studio source lost with an old laptop; recovery from pulled APK
  (`com.example.deliverytracker` v1.0, SHA-256 `CCE4B214…944DA4D`, 11,552,362 B)
  and on-device SQLite: 150 current Room rows + 29 + 19 legacy rows, 23 wallet
  movements, dates 2025-06-29 → 2025-08-31.
- Evidence in repo (git-ignored `backup/`, `apk/base.apk`, `notes/` inventories);
  old package stays installed on-device until v0 verified (different package →
  zero data risk).
- Original was native Android (Room, 3 unmigrated schema generations), Material3,
  template namespace `com.example.*` (unpublishable — the reason for the
  `com.christianmeude.*` rename on rebuild).
