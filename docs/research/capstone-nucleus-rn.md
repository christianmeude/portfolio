# capstone-nucleus-rn — code findings (primary sources only)

Source: `https://github.com/christianmeude/capstone-nucleus-rn`, shallow clone 2026-09-17. All paths below are repo-relative.

## Identity
- App `NUcleus Mobile` (`NUcleus Mobile (Dev)` for dev variant), slug `nucleus-student-mobile`, v1.0.0, portrait (`app.config.ts:9-16`).
- Icon `./assets/icon.png`, splash `./assets/splash-icon.png` on `#ffffff`, adaptive foreground `./assets/adaptive-icon.png` on `#ffffff`, web favicon `./assets/favicon.png`, `userInterfaceStyle: automatic` (`app.config.ts:17-24,35-48`).
- Brand: navy primary `#1B3A8C`, gold accent `#CDA434`; light surface `#F1F4FA`, dark surface `#0A1226` (`src/theme/colors.ts:29,46,135-140,155,199`).
- Type: Inter only (`Inter_400Regular/500Medium/600SemiBold/700Bold` loaded in `App.tsx:6-11,68-73`); scale display 28 / h1 24 / h2 20 / h3 17 (`src/theme/typography.ts:6-20,86-89`).
- React Navigation (native-stack + bottom-tabs), not expo-router (`README.md:27`; `src/navigation/AppNavigator.tsx:13-14,157`); EAS project `cfc58fb4-…`, owner `christianmeude` (`app.config.ts:57-68`).

## Navigation map
- Root stack (`src/navigation/types.ts:6-16`): `Login`, `UnsupportedRole`, `StudentTabs`, `ResearchDetail {paperId, from}`, `SubmitResearch {resubmitPaperId?}`, `Activity`, `FacultyTabs`, `FacultyReviewDetail {paperId}`, `FacultyPaperDetail {paperId}`.
- Student tabs (`AppNavigator.tsx:41-53`; labels/icons `StudentTabBar.tsx:5-18`): Home(House)=Dashboard, Papers(Inbox)=MyPapers, Browse(Search), Profile(CircleUser).
- Faculty tabs (`FacultyTabs.tsx:22-33`; `FacultyTabBar.tsx:9-23`): Home=FacultyDashboard, Review(ClipboardList)=FacultyReview, Browse(Search)=FacultyRepository (literally shared student `BrowseScreen`), Profile=FacultyProfile (shared `ProfileScreen`).
- Stack per role: unauthenticated → `Login` wrapped in `PrivacyNoticeGate` (`AppNavigator.tsx:170-181`); student → StudentTabs + ResearchDetail + SubmitResearch + Activity (`:183-208`); faculty → FacultyTabs + FacultyReviewDetail + FacultyPaperDetail + Activity (`:209-237`); other roles → `UnsupportedRole` (`:238-244`).
- No `linking` prop on `NavigationContainer` (`AppNavigator.tsx:157`); no deep-link route config found in `src` (only outbound URL opens, e.g. DOI/privacy links).
- First-run onboarding is a gate, not a route: students with `!hasOnboarded` render `OnboardingScreen` ahead of the navigator (`AppNavigator.tsx:149-154`), persisted via AsyncStorage key `firstRun.hasOnboarded` (`src/hooks/useHasOnboarded.ts:4,19,36`).

## Screens (route → purpose → elements → actions)
- `Login` → sign in (+ OTP password reset). Elements: email/password fields (`LoginScreen.tsx:53-54,335-395`), Sign-in button w/ loading (`:413-420`), "Forgot?" (`:368-369`) → 2-step sheet (`:460-465`): step 1 `request-otp`, step 2 code + new password via `verify-otp` (`:211-236`). Actions: `signIn(email.trim(), password)` (`:196`); empty-check error (`:188-189`).
- Student `Dashboard` → command center. Loads my papers + categories + 5 notifications (`DashboardScreen.tsx:49-53`). Elements: `DashboardHero` greeting/avatar → Profile (`:138-143`), "Up Next" card → ResearchDetail or SubmitResearch-resubmit (`:166-178`), "Recent Activity" `NotificationCard`s → ResearchDetail (`:200-208`).
- `MyPapers` → personal ledger/archive. Elements: `SearchField` + `SegmentedControl` all/active/published/action (`:249-257`; keys `:49-56`), `StandardPaperCard` list. Actions: tap → `ResearchDetail from:'myPapers'` (`:164`); resubmit → `SubmitResearch {resubmitPaperId}` (`:169-172`); "Submit research" → SubmitResearch (`:321-323`); DOI sheet → `requestPublish` (`:137-160,203-236`).
- `Browse` (also faculty `FacultyRepository`) → public repository discovery. Loads published papers + categories + departments + programs (`BrowseScreen.tsx:89-94`). Elements: `BrowseHeader/Controls/FilterSystem` (fields/departments/year tabs, list/grid toggle), recent searches (`:78,126`). Actions: tap → `ResearchDetail` (student) or `FacultyPaperDetail` (faculty) (`:248`).
- `Profile` (both roles) → identity + settings. Elements: header initials/name/department/program (`ProfileScreen.tsx:38-49,133-149`); rows: Recovery email, Password, Dark-mode toggle, Sign out (`:152-184`). Actions: save recovery email via `users.recovery_email` read + `update-recovery-email` fn (`:57-88`); change password = re-`signInWithPassword` then `updateUser` (`:110-120`).
- `Activity` → merged inbox over tab bar. Student sees Notifications/Invites chips (`ActivityScreen.tsx:63-78`); faculty sees notifications only (`:32,81-85`). Bodies: `NotificationsList` (mark-all-read: `NotificationsList.tsx:53-59,163,221-225`) and `InvitationsList` Accept/Decline (`InvitationsList.tsx:104-105`; `InvitationCard.tsx:129-151`).
- `ResearchDetail` → paper view + owner actions. Loads detail + related (max 3) + workflow (`:155-163`); file via signed URL (`:176-183`); bookmark via `togglePaperSaved` (`:16,209`); inline + fullscreen `PdfViewer` (`:286,469-478`); DOI link-out + DOI request sheet (`:401,306-339`); "Resubmit revision" → SubmitResearch (`:218-220,508-510`); related pushes same route (`:544`); workflow timeline (`:576-625`); Related shown only for repo papers in non-owner context (`:248-258`).
- `SubmitResearch` → stepped submit/resubmit. Fields title/abstract/keywords/coAuthors/category/faculty/dept/program (`:58-69`); attachment via `DocumentPicker.getDocumentAsync` (`:551`); category/department/program/faculty bottom-sheet pickers (`:768-848`); co-author search add/remove (`:885-924`); policy MIME pdf/doc/docx (`:79-90`); autosave local (`submission_draft_` + 30 s) and server drafts (`:55-56,71-72,254-284,355-371`); submit → back to StudentTabs (`:470-527`); resubmit pre-fills form, file optional (`:223-241`).
- Onboarding gate → 4 slides Discover/Submit/Track-progress/Stay-in-loop (`OnboardingScreen.tsx:37-65`); Skip/Get Started calls `markOnboarded`, arms first-entrance animation (`AppNavigator.tsx:153`; `OnboardingScreen.tsx:30`).
- `FacultyDashboard` → workload command center. Loads summary + up-next + 3 notifications (`FacultyDashboardScreen.tsx:68-72`). Elements: `WorkloadChart` → Review w/ filter (`:141-150`); up-next card → FacultyReviewDetail (`:164-167`); activity cards → FacultyReviewDetail (`:174-178`); "See all pending" (`:188-197`). First assignment triggers push-token prompt (`:79-81`).
- `FacultyReview` → "Review Queue" (`FacultyReviewScreen.tsx:156`; filters `facultyStatus.ts:12-15`). Elements: debounced search (400 ms), paged queue (20/page) via `getReviewQueue` (`:66-93`), `FacultyPaperCard` → FacultyReviewDetail (`:122,132`).
- `FacultyReviewDetail` → review workbench; reviewable only when `pending_faculty` (`:300`). Loads `getReviewDetail` + `getReviewFile` (`:98,114`); annotatable PDF (`:384`); "Review progress" section (`:417-419`); Approve (loads dean/chair list `getDeanChairMembers :205-215`, pick forwardee, `faculty_approve_paper :227-243,529-619`), Request revision (`faculty_request_revision`), Reject with required reason (`faculty_reject_paper :262,708-762`).
- `FacultyPaperDetail` → thin alias rendering the exact student `ResearchDetailScreen` (`FacultyPaperDetailScreen.tsx:1-12`).
- `UnsupportedRole` → dead-end for non-student/faculty roles: warning card + role label + Sign out (`UnsupportedRoleScreen.tsx:88-99`).

## Auth
- Sign-in only in-app: `supabase.auth.signInWithPassword(email.lower, password)` (`AuthContext.tsx:92-99`); no `signUp` call exists in `src`. Profile resolved from `public.users` by email, must be provisioned, rejects suspended (`fetchAppUserProfile.ts:35-60,79-97`); failures force `signOut` (`AuthContext.tsx:120-133`).
- Session: `getSession` bootstrap + `onAuthStateChange` (ignores `INITIAL_SESSION`/`TOKEN_REFRESHED`) (`AuthContext.tsx:61-90`); Supabase persists via AsyncStorage, auto-refresh (`src/lib/supabase.ts:15-22`); `signOut` clears local token keys + `supabase.auth.signOut` (`AuthContext.tsx:148-152`; `authStorage.ts:6-8`).
- Extras: forgot-password via `request-otp`/`verify-otp` edge functions (see Login); in-app password change (Profile); privacy gate must be accepted (in-memory, per session) before Login renders (`CONTEXT.md:44-45`; `PrivacyNoticeGate.tsx:28,66-79`).

## Data & sync
- Tables queried: `users`, `research_papers`, `research_authors`, `research_categories`, `research_comments`, `departments`, `programs`, `system_policy_settings`, `submission_drafts`, `notifications`, `co_author_invitations`, `collections`, `collection_papers`, `paper_views` (grep `\.from\('…'` across `src/api`, `ProfileScreen.tsx:58`).
- RPCs: `register_push_token`, `toggle_paper_saved`, `get_dean_chair_members`, `faculty_approve_paper`, `faculty_request_revision`, `faculty_reject_paper`, `create_faculty_annotation`, `increment_view_count`, `get_faculty_members`, `search_students`, `create_co_author_invitations`. Edge functions invoked: `request-otp`, `verify-otp`, `request-publish`, `update-recovery-email` (+ `search-papers` gated by `flags.hybridSearch`, `embed-papers`, `notify-review-action` present in `supabase/functions/`).
- Storage bucket `research-papers`: signed reads (`research.ts:782`; `faculty.ts:895`), public URL fallback (`research.ts:1286`).
- Sync model: request/response PostgREST + in-memory SWR cache (5-min TTL, 100 entries: `src/utils/apiCache.ts:1-22`), re-scoped per user on auth change (`AuthContext.tsx:47-50`). No realtime subscriptions in `src` (only `onAuthStateChange`); notifications/invites load by polling (`getNotifications`, queue fetches).

## Offline behavior verdict
- **No offline support in code.** No NetInfo listener, offline queue, retry-with-backoff, or persisted cache found in `src` (only test-helper "queue" matches and a "Pull down to retry" hint `FacultyReviewScreen.tsx:294`). Only mitigations: in-memory SWR cache (lost on restart), AsyncStorage submission-draft autosave (`SubmitResearchScreen.tsx:254-284`), and one optimistic `setResolved(true)` in `NotificationCard.tsx:82,92`.

## README claims
- "official React Native (Expo) app for enrolled students and faculty at National University — Dasmariñas… unified mobile command center for browsing research, submitting papers, and conducting faculty reviews" (`README.md:3`).
- Student bullets: browse/search + filters, detail/abstract/PDF links, submit + revisions, real-time status via progress map, notifications + co-author invites (`:9-13`); Faculty/Admin: command center + workload dashboards, Review Queue, approve/reject/revise, publication requests + DOI assignment (`:17-20`). "Real-time status tracking" and setup/docs claims were not independently verified beyond the cited polling/progress UI.

## Gaps (could NOT confirm from repo)
- No in-app sign-up/registration UI found (provisioning assumed); no deep-link scheme/config, push-tap routing, or realtime channel usage in `src`.
- No admin/dean mobile role UI (gated to `UnsupportedRole`); no offline/NetInfo handling; server-side DOI validation and RLS policies not reviewed (`supabase/schema_backup.ts` unread).
- Visual assets (`assets/*.png`), `google-services.json` sender, and EAS update-channel behavior not inspected beyond paths/IDs cited above.
