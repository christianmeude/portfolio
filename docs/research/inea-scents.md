# inea-scents system — code findings (primary sources only)

Sources: `https://github.com/christianmeude/inea-scents` (Laravel admin + API),
`inea-scents-landing` (React marketing site), `inea-scents-client` (Flutter app).
Shallow clones 2026-09-17. All paths below are repo-relative (`admin:` / `landing:` / `client:`).

## Identity

- Product `INEA Scents`: perfume-bar booking platform for events in Metro Manila
  (`admin:README.md:3`; `landing:index.html:7`).
- Admin brand: `INEA` in Josefin Sans caps + `Scents` in Great Vibes script
  (`admin:resources/js/Layouts/AuthenticatedLayout.vue:32-35`).
- Admin palette: burgundy/plum scale, `brand:{primary:#6a4053, cream:#fdf4f5, …}`;
  fonts `Figtree` (sans), `Josefin Sans` (logo), `Great Vibes` (script); dark mode `class`
  (`admin:tailwind.config.js:6,16-44`).
- Landing palette: Dark Plum `#6a4053`, Dusty Rose `#c4acac`, Cream bg `#fdf4f5`,
  night `#151012`; "Cream owns the page; plum owns text and actions"
  (`landing:src/index.css:7-24`); same three typefaces (`landing:src/index.css:26-29`).
- Client palette: Dark Plum `0xFF6A4053`, cream `0xFFFDF4F5`, night `#151012`;
  Figtree via Google Fonts; pill buttons radius 9999
  (`client:lib/config/theme.dart:31-41,75,124,175`).

## Stack

- Admin: Laravel `^13.8` + Inertia-Laravel `^2.0` + Sanctum `^4.0` + Breeze `^2.4`
  (`admin:composer.json:11-21`); **Vue 3** + `@inertiajs/vue3 ^2.0`, Tailwind `^3.2.1`
  (`admin:package.json:10-20`). README says "Laravel 11" (`admin:README.md:44-48`) — stale.
- Landing: React 19 + Vite + TypeScript + Tailwind 4, single-page, no router
  (`landing:package.json:13-18`; `landing:src/` holds only `App.tsx`, `index.css`, `main.tsx`).
- Client: Flutter (Dart `^3.12.2`), Riverpod + go_router 7 + Dio + Retrofit + Freezed
  (`client:pubspec.yaml:1,21-49`).

## Navigation map (admin)

- All admin routes under `prefix admin`, `name admin.`, `middleware [auth,admin]`
  (`admin:routes/web.php:14`); dashboard adds `verified` (`admin:routes/web.php:15`).
- Routes: `dashboard`; `packages` resource; `bookings` resource + `bookings.approve (PATCH)`;
  `customers.index/show` + `customers.link/unlink (POST)`; `inquiries.index/show/update` +
  `inquiries.promote (POST)`; `notifications.index/read`; `calendar.index`;
  `payments.index`; `calendar.toggle-block (POST)` (`admin:routes/web.php:15-35`).
- Inertia pages (`admin:resources/js/Pages/**/*.vue`): `Dashboard`; `Bookings/Index`
  (+ Partials `CreateBookingModal/ViewBookingModal`); `Packages/Index,Create,Edit`;
  `Inquiries/Index,Show`; `Calendar/Index`; `Customers/Index,Show`; `Payments/Index`;
  `Profile/Edit`; `Auth/Login,ForgotPassword,ResetPassword,ConfirmPassword,VerifyEmail`.
- Sidebar links (text pills, no icons): Dashboard, Bookings, Inquiries, Calendar,
  Packages, Customers, Payments, Settings (disabled, "Coming soon!")
  (`admin:resources/js/Layouts/AuthenticatedLayout.vue:14-23,57-61`).
- Topbar: `NotificationBell`, `ThemeToggle`, user dropdown (Profile/Log Out), mobile
  hamburger (`admin:AuthenticatedLayout.vue:96-124`).

## Screens (route → purpose → elements → actions)

- `Dashboard` → daily command center. `GET admin.dashboard → DashboardController@index`
  (`admin:routes/web.php:15`; `admin:app/Http/Controllers/Admin/DashboardController.php:14-30`).
  Elements: period toggle Daily/Weekly/Monthly/Yearly/All-Time (`admin:Dashboard.vue:25-39,60-68`),
  3 metric cards (Total Bookings / Revenue Php / Confirmed Events: `:79-94`),
  popular-package cards with `bookings_count` + new-today (`:99-106`),
  upcoming table Customer/Package/Event Date/Status/Action with `Approve` (pending only) + `View →`
  opening the view modal (`:117-153`).
- `Bookings/Index` → booking ledger. Paginated `bookings` + `packages` + `filters.search`
  (`admin:app/Http/Controllers/Admin/BookingController.php:18-36`). Elements: `New Booking`
  button → create modal (`Bookings/Index.vue:66-74,132-136`), live search
  ("Search reference or name", `router.get`: `:19-25,88-93`), table
  Booking ID/Name/Package/Date/Status/Action (`:42-49`), status `Chip`, eye button → view modal
  (`:110-119`). Statuses `Pending/Confirmed/Cancelled`
  (`admin:app/Enums/BookingStatus.php:7-9`); approve sets Confirmed
  (`admin:BookingController.php:112-125`).
- `Packages/Index` → "Manages the perfume-bar packages" (`Packages/Index.vue:49-51`).
  Elements: `Add Package` link (`:53-61`), `Active Packages` card grid with image
  (`/storage/`, "Image Placeholder" fallback), hover trash → "Delete Package? … cannot be
  undone" confirm (`:84-95,121-148`), `Modify` edit link (`:106-111`).
  Price logic: `pax_prices` tier map wins, options = keys, price = min
  (`admin:PackageController.php:40-55`); max 3 images (`:71`).
- Landing sections (`landing:src/App.tsx`): nav + theme toggle + "Book in App"/"Inquire"
  (`:497-524`); hero "The perfume bar guests remember" (`:527-590`); packages with tiers
  50/Php 4,499 · 70/6,399 · 100/8,799 · 150/13,119 (`:592-673`); 4-step "How the day goes"
  (`:675-693`); inquiry form POSTing `${API_BASE}/api/inquiries` (`:181,695-719`);
  footer "Metro Manila, Philippines" (`:722-751`).
- Client routes (`client:lib/config/router.dart:9-93`): splash → login/register →
  shell tabs home, packages, package-details, booking, bookings, calendar, profile.
  Multi-step booking (calendar + scent pick + details); JWT in secure storage
  (`client:README.md:45-49`).

## Auth

- Admin: Breeze session auth; `LoginRequest::authenticate` rejects non-`is_admin`
  (logout + `auth.failed`) (`admin:app/Http/Requests/Auth/LoginRequest.php:53-61`);
  `admin` middleware aborts 404 for non-admins
  (`admin:app/Http/Middleware/EnsureUserIsAdmin.php:18-20`); single seeded admin, no
  self-registration. Mobile JWT via Sanctum; admins blocked from API login
  (`admin:app/Http/Controllers/Api/AuthController.php:102`).

## Data & sync

- Models (`admin:app/Models/`): `User, Booking, Package, Scent, Inquiry, BlockedDate`.
  Tables: `bookings`, `packages`, `scents + package_scent + booking_scent`,
  `blocked_dates`, `inquiries`, `webhook_events`, `notifications`.
- Pending holds: `PENDING_HOLD_MINUTES=15` + `expireStalePending()` sweep on reads, no cron
  (`admin:app/Models/Booking.php:39-51`).
- Sync model: Inertia visits + REST polling — notifications polled every 30 s via `fetch`
  with backoff to 5 min + visibility pause
  (`admin:resources/js/Components/NotificationBell.vue:5-50,79-87`).
- **No realtime in code**: no Echo/Pusher/Reverb/broadcast in `resources/js`;
  `BROADCAST_CONNECTION=log` (`admin:.env.example:56`).
- **No offline support in code**: no service worker/offline queue; "offline" hits in the
  repo mean the cash payment method (`admin:app/Enums/PaymentMethod.php:7-8`).

## README claims

- "core backend API and administrative dashboard for the … perfume bar booking platform"
  (`admin:README.md:3`); "Admin Dashboard: Full administrative interface for managing
  bookings, packages, scents, and inquiries" (`admin:README.md:53`).
- Landing: "The customer-facing web application and marketing landing page"
  (`landing:README.md:3`). Client: "A complete, production-ready Flutter mobile app"
  (`client:README.md:3`).

- Scent catalog (5, seeded): Lavender Dream, Vanilla Bean, Ocean Breeze, Citrus Burst,
  Sandalwood Spice (`admin:database/seeders/DatabaseSeeder.php:30-33`); "Essential 10ml
  Perfume Bar" package (`:46`; `admin:database/migrations/2026_09_11_101328_seed_real_package_offering.php:28`).
  Landing marketing says "4 inspired scents" (`landing:src/App.tsx:432`).
- Booking API fields: package_id, customer_name/email/phone, pax, event_date/time,
  venue_address, payment_method, scent_ids
  (`client:lib/api/models/api_bookings_request_body.dart:15-24`).

## Gaps (could NOT confirm from repo)

- Mail sending beyond `log` config, queue workers unreviewed.
- Inquiry promote flow, calendar block UX, payments page internals, customer
  link/unlink UX not read; server-side policies/RLS not reviewed.
- Visual assets (logo files) and EAS/store deployment claims not inspected.
- Prior portfolio mockup showed sidebar Orders/Stock/Staff — **fabricated, contradicted
  by `AuthenticatedLayout.vue:14-23`**; replaced by this research.
