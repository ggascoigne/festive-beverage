# Build Logged-In Editing UI For Recipes And Ingredients

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

After this change, a logged-in user can open an editing area inside the app, add a new ingredient, create a new recipe, and update an existing recipe without leaving the project’s main interface. The recipe workflow must make it easy to create a missing ingredient while composing a recipe so a user is not forced to abandon the form to seed data first. The behavior is visible by running the app, logging in, opening `/edit`, creating an ingredient, then saving a recipe and seeing it appear on the home screen and in the edit library.

## Progress

- [x] (2026-04-07 20:45Z) Read `.agent/PLANS.md`, the current Next.js page structure, the Prisma schema, the tRPC router, and the row-level security migration to confirm that logged-in users already have database write permission.
- [x] (2026-04-07 20:55Z) Created `.agent/execplans/edit-ui.md` and anchored the implementation against the repository’s ExecPlan requirements.
- [x] (2026-04-07 21:05Z) Added authenticated tRPC procedures for units, ingredient creation, recipe creation, and recipe updates in `src/server/api/routers/drinks.ts`.
- [x] (2026-04-07 21:15Z) Built `src/pages/edit.tsx` and `src/views/Edit.tsx` with a logged-out guard, ingredient studio, recipe library, new recipe flow, existing recipe editing, and inline ingredient creation from recipe rows.
- [x] (2026-04-07 21:18Z) Added navigation and browse-flow affordances by updating `src/components/Navigation/Routes.ts`, `src/components/Header.tsx`, and `src/views/Home.tsx`.
- [x] (2026-04-07 21:20Z) Validated the change with `pnpm tsc`, `pnpm lint`, and `pnpm test`, then updated this plan with the implemented outcome.
- [x] (2026-08-04 01:31Z) Reproduced the reported `drinks.createIngredient` failure twice against local PostgreSQL through the real tRPC caller; both runs failed with `new row violates row-level security policy for table "ingredient"`.
- [x] (2026-08-04 01:32Z) Inspected the installed `ingredient` policies and proved that setting the authenticated identity and inserting on one explicit Prisma transaction succeeds.
- [x] (2026-08-04 01:35Z) Moved authenticated database identity setup into the protected-procedure transaction, removed the now-redundant nested recipe-update transaction, and added a router-level regression test.
- [x] (2026-08-04 01:36Z) Re-ran the real-database reproduction successfully and validated the fix with `pnpm tsc`, `pnpm lint`, `pnpm test`, and `git diff --check`.
- [x] (2026-08-04 02:01Z) Replaced the Ingredient Studio's arbitrary first-18 preview with live, relevance-ranked possible matches across the complete ingredient library, exact-duplicate prevention, and focused matcher tests.
- [x] (2026-08-04 02:05Z) Reduced the default height of ingredient and recipe descriptions to two rows and recipe instructions to two rows so the edit forms use vertical space more efficiently.
- [x] (2026-08-04 02:18Z) Reworked the phone recipe workflow into separate library and focused-editor screens while preserving the existing desktop split layout.
- [x] (2026-08-04 02:22Z) Removed the redundant Recipe Workspace summary card on phones and compacted each phone ingredient editor into one ingredient-selector row followed by one Amount/Unit/Modifier row.
- [x] (2026-08-04 02:25Z) Moved each phone delete action onto the Amount/Unit/Modifier line with a confirmation dialog, and moved Add Ingredient beneath the ingredient list.
- [x] (2026-08-04 03:02Z) Recorded the user's completed authenticated manual QA and added deterministic authenticated Playwright coverage for the editor's create, update, inline ingredient, home-library persistence, and phone-focused workflows.
- [x] (2026-08-04 03:08Z) Reviewed the combined feature diff against repository standards and this plan, removed unrelated dependency upgrades, resolved the review findings, and completed the handoff validation.

## Surprises & Discoveries

- Observation: The repository currently has only one page-level route, `src/pages/index.tsx`, so the edit experience needs a new top-level route rather than extending an existing settings or admin area.
  Evidence: `find src/pages -maxdepth 2 -type f | sort` returns only `_app.tsx`, `_document.tsx`, `index.tsx`, and `~offline.tsx`.

- Observation: Database row-level security already permits any logged-in user to modify `recipe`, `ingredient`, `unit`, and `recipe_ingredient`, which means the server can use the normal Prisma client plus authenticated procedures instead of an admin-only bypass.
  Evidence: `support/db/migrations/20210925165502_rls.js` defines `using (current_user_id()::boolean)` for modification policies on non-admin tables.

- Observation: The new `/edit` route would have been effectively hidden from normal authenticated users because the drawer toggle in `src/components/Header.tsx` was wrapped in `Perms.IsAdmin`.
  Evidence: Before the change, the drawer `IconButton` rendered only inside `<HasPermission permission={Perms.IsAdmin}>`.

- Observation: The original row-level-security assessment correctly identified the policy condition but incorrectly assumed that request identity survived until the write. `SET LOCAL` only applies for the current transaction, while `createInnerTRPCContext` issued it as a standalone statement before the tRPC procedure began.
  Evidence: The real tRPC reproduction failed twice with the reported `ingredient` policy error, while a probe that called `set_config(..., true)` and inserted through the same explicit Prisma transaction returned `PASS: same-transaction identity permits the ingredient insert`.

- Observation: Vitest could not initially import server modules that use the repository's `@/` alias.
  Evidence: The first regression-test run stopped at `Failed to resolve import "@/server/api/trpc"`; adding the TypeScript-equivalent alias to `vitest.config.ts` allowed the test to reach the expected pre-fix RLS failure.

- Observation: The Ingredient Studio's claim that it displayed relevant records was not supported by its implementation.
  Evidence: `IngredientStudio` used `ingredients.slice(0, 18)`, so it always showed the first 18 sorted records regardless of the name being entered and hid the other records without a search path.

- Observation: The original responsive grid stacked the full control-room summary, recipe library, tabs, and recipe form into one long phone page.
  Evidence: Both editor grid columns used `xs: 12`, and no mobile presentation state hid either column, so users had to navigate past the catalog and list before reaching fields.

- Observation: Auth0's installed testing entry point can generate the same encrypted session cookie the application reads, so authenticated browser tests do not need a live identity-provider login.
  Evidence: `playwright/auth.ts` uses `generateSessionCookie` from `@auth0/nextjs-auth0/testing` with the shared application cookie name; the authenticated `/edit` Playwright flow passed against the real local server and PostgreSQL database.

## Decision Log

- Decision: Build one dedicated `/edit` workspace that contains both recipe and ingredient workflows instead of scattering add/edit dialogs across the home screen.
  Rationale: The current app is browse-first. A dedicated workspace keeps the browse flow simple while giving editing enough space for line-item recipe composition, validation messaging, and recipe selection.
  Date/Author: 2026-04-07 / Codex

- Decision: Treat “logged in” as the only required permission for editing and enforce it twice: in the UI through route affordances and in tRPC through `protectedProcedure`.
  Rationale: The user requirement is explicit, and the repository’s permission model already maps ordinary authenticated users to `Perms.IsLoggedIn`.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep `recipe.ingredient_text` derived on the server from the selected ingredient rows instead of exposing it as a free-form field in the UI.
  Rationale: The column exists to support search and should stay consistent with the structured recipe ingredients. Deriving it server-side avoids divergence.
  Date/Author: 2026-04-07 / Codex

- Decision: Leave units read-only in this feature and present them as a selectable reference list in the editor sidebar instead of adding unit creation or editing.
  Rationale: The user said units matter “to a lesser degree,” and the core requested workflows can be completed with selection support alone.
  Date/Author: 2026-04-07 / Codex

- Decision: Relax the drawer toggle from `Perms.IsAdmin` to `Perms.IsLoggedIn` while leaving the route entries themselves permission-gated.
  Rationale: Logged-in non-admin users need a discoverable path to `/edit`, and route-level permission filtering still prevents unauthenticated access to edit-only navigation items.
  Date/Author: 2026-04-07 / Codex

- Decision: Implement the editor forms with `react-hook-form`, `useFieldArray`, and Zod resolvers instead of bespoke `useState` draft objects plus handwritten validation helpers.
  Rationale: The recipe editor has repeatable line items, several optional string fields, and two ingredient-creation forms. Centralizing validation in Zod and form state in `react-hook-form` keeps field arrays, reset behavior, and error display coherent.
  Date/Author: 2026-04-07 / Codex

- Decision: Run every `protectedProcedure` inside one Prisma interactive transaction and set `user.id` and `user.admin` on that transaction before invoking the procedure.
  Rationale: PostgreSQL row-level-security settings must be attached to the exact transaction and pooled connection that performs the write. Centralizing this in protected middleware covers ingredient and recipe mutations consistently and avoids leaking session-scoped identity between pooled requests.
  Date/Author: 2026-08-04 / Codex

- Decision: Let `updateRecipe` use the protected procedure's transaction rather than opening a nested transaction.
  Rationale: Prisma transaction clients do not support nested interactive transactions, and the middleware transaction already preserves the atomic parent/child recipe update promised by this plan.
  Date/Author: 2026-08-04 / Codex

- Decision: Make the Ingredient Studio's side panel a creation-time duplicate detector rather than a truncated library browser.
  Rationale: Searching all ingredient names and tags as the user types directly supports the create workflow. Ranking exact name, name prefix, name substring, and then tag matches makes the limited display meaningful; reporting the total match count keeps the cap honest. `useWatch` and `useMemo` limit the derived work to changes in the ingredient name or library.
  Date/Author: 2026-08-04 / Codex

- Decision: Below the Material UI `sm` breakpoint, show either the recipe library or the focused editor rather than stacking both, while leaving the URL-selected recipe and React Hook Form as the shared data state.
  Rationale: A two-screen phone flow gives the recipe library the available viewport and makes form navigation independent of list length. Reusing the existing route selection and form avoids duplicating drafts or introducing a separate mobile editor implementation.
  Date/Author: 2026-08-04 / Codex

- Decision: Omit the Recipe Workspace summary card and use a two-row ingredient layout only below the `sm` breakpoint.
  Rationale: The focused phone screen already establishes that the user is editing a recipe, so the heading card repeats context while consuming scarce vertical space. A full-width ingredient selector followed by three equal Amount, Unit, and Modifier columns keeps each line item compact without changing the tablet or desktop layout.
  Date/Author: 2026-08-04 / Codex

- Decision: Require confirmation before removing a recipe ingredient row and place Add Ingredient after the current rows.
  Rationale: The compact delete icon sits close to other phone controls, so confirmation prevents accidental destructive draft edits. Positioning Add Ingredient at the end of the list matches the point where users decide they need another row and prevents the action from disappearing above a long list.
  Date/Author: 2026-08-04 / Codex

- Decision: Authenticate Playwright with Auth0's official encrypted test-cookie helper, use unique fixture names, and restrict direct database access to fixture cleanup.
  Rationale: This keeps assertions on public browser-visible behavior while making the suite deterministic and avoiding a dependency on the external Auth0 login flow. Sharing the cookie-name constant with production prevents the test fixture from silently drifting from application configuration.
  Date/Author: 2026-08-04 / Codex

## Outcomes & Retrospective

The logged-in edit workspace is now implemented. `src/pages/edit.tsx` prefetches the editor data, and `src/views/Edit.tsx` renders a full workspace with a recipe library, a recipe editor, an ingredient studio, and a dialog-based inline ingredient creation path for recipe rows. The current implementation uses `react-hook-form` plus Zod-based validation for the recipe form, the recipe ingredient field array, the ingredient studio form, and the inline ingredient dialog. The server now exposes `getAllUnits`, `createIngredient`, `createRecipe`, and `updateRecipe` from `src/server/api/routers/drinks.ts`, with authenticated mutations and transaction-backed recipe updates.

The result matches the original purpose: a logged-in user can add an ingredient, create a recipe, and edit an existing recipe inside the app. Units are intentionally selection-only in this pass, which kept the scope aligned with the user’s stated priority. Authenticated Playwright coverage now exercises the public workflow end to end, including inline ingredient creation and selection, recipe creation and update, visibility in the home library, and reopening the persisted recipe through its Edit Recipe link.

The follow-up RLS defect is fixed. Authenticated procedures now establish database identity inside the same transaction used by their Prisma queries and mutations, so creating an ingredient no longer loses `user.id` between request-context construction and the insert. A router-level test simulates the prior RLS rejection when the base client is used and proves that identity setup plus ingredient creation occur on the transaction client. The original real-database reproduction changed from the exact reported failure to `PASS: an authenticated request created an ingredient under row-level security`.

The Ingredient Studio now searches the entire ingredient collection as a name is entered instead of displaying the first 18 records. It shows up to 12 ranked matches with the full result count, searches both names and tags, lets a user click a match to fill the name, visually identifies an exact match, and disables Save for duplicates. With no input it explains how to begin, and with no results it explicitly confirms that no existing record matched.

On phone-width screens, `/edit` now opens as a library-first experience: the catalog summary card is replaced by one full-width New Recipe button, and the recipe library fills the remaining viewport with an internal scrolling list. Choosing the button or a recipe swaps to a focused editor view with a Back to Recipe Library action. Tablet and desktop widths retain the original simultaneous library/editor layout. Authenticated Playwright validation at 390 by 844 pixels verifies this transition, the compact two-row ingredient geometry, delete cancellation and confirmation, and the return to the recipe library. The user also completed the authenticated manual QA pass.

The focused phone editor no longer renders the decorative Recipe Workspace card. Recipe ingredient rows now use two compact lines on phones: the ingredient selector spans the first line, while Amount, Unit, and Modifier share the second line equally. The established tablet and desktop layouts remain unchanged.

The second phone ingredient line now contains Amount, Unit, Modifier, and the delete action. Delete opens a confirmation dialog that identifies the ingredient when possible; the draft row remains intact when cancelled. Add Ingredient now appears below all current rows and expands to the phone width, while remaining a compact button on larger layouts.

The final combined-diff review found and resolved stale plan text, missing coverage for inline creation and persisted updates, a brittle phone test assumption, duplicated Auth0 cookie configuration, a misleading responsive-state name, and unrelated package-version churn. One maintainability follow-up remains deliberately outside this feature: `src/views/Edit.tsx` has grown large enough that a later refactor should extract the ingredient studio, recipe workspace, and form/controller concerns without changing behavior. The client and server validation schemas could likewise be shared in that focused refactor.

## Context and Orientation

This repository is a Next.js application using the Pages Router. The visible home screen is served by `src/pages/index.tsx` and rendered by `src/views/Home.tsx`. Data is loaded through tRPC in `src/server/api/routers/drinks.ts`, then consumed with React Query hooks from `src/utils/api.ts`.

The domain model lives in `prisma/schema.prisma`. `Recipe` is the main object a user browses. Each recipe has a name and optional descriptive fields, plus a required `ingredient_text` column used for search. Structured ingredient lines are stored in `RecipeIngredient`, which joins a `Recipe` to an `Ingredient` and a `Unit`. `Unit` records are seeded by the migration in `support/db/migrations/20210927142614_drink_schema.js` and should be selectable, not edited, in this feature.

Authentication is handled with Auth0. Client-side login state and permissions come from `src/components/Auth/useAuth.tsx`. A logged-in user receives the `Perms.IsLoggedIn` permission through `src/components/Auth/PermissionRules.ts`. Server-side tRPC authentication is available through `protectedProcedure` in `src/server/api/trpc.ts`. That protected middleware opens a Prisma transaction, sets the PostgreSQL `user.id` and `user.admin` row-level-security variables on the transaction client, and invokes the procedure with that same client so authenticated writes use the intended identity.

The site shell is defined in `src/components/Layout.tsx`, `src/components/Header.tsx`, and `src/components/Navigation/Routes.ts`. The original application exposed only `/`; this work adds the authenticated `/edit` page and its route entry. Notifications are shown through `src/components/Notifications.tsx`, and the existing recipe card presentation lives in `src/components/DrinkCard.tsx`.

## Plan of Work

First, extend `src/server/api/routers/drinks.ts` so the UI can fetch units and perform authenticated mutations. Add one read query that returns all units ordered by sort and name. Add one authenticated mutation to create an ingredient from name, optional tags, optional description, and optional sort. Add authenticated mutations to create and update recipes. The recipe mutations must accept the editable recipe fields plus an array of line items, validate them with Zod, write the parent recipe, replace the child `recipe_ingredient` rows on update, and derive `ingredient_text` from the selected ingredients before saving.

Next, add edit-focused types in `src/utils/apiTypes.ts` if needed so the UI can consume the new queries without hand-written shapes. Keep these types derived from the router outputs and inputs so the client stays aligned with the server.

Then create a new page at `src/pages/edit.tsx` and a new view module such as `src/views/Edit.tsx`. The page should render a full editing workspace, not a modal. The workspace should include a logged-out guard, a recipe library for picking an existing recipe, a “new recipe” action, and an ingredient creation surface. The main recipe form should expose fields for the recipe metadata and a repeatable list of ingredient lines with amount, unit, ingredient selection, and modifier. The ingredient selector should support opening a lightweight “new ingredient” dialog from inside the recipe workflow so a missing ingredient can be added and immediately selected.

After the main view exists, update navigation in `src/components/Navigation/Routes.ts` so logged-in users can reach `/edit`. Add affordances from the browse flow in `src/views/Home.tsx` so when a logged-in user is viewing a single recipe they can jump straight into editing that recipe. Keep non-logged-in users on the existing read-only experience.

Finally, validate the change. Run TypeScript and lint checks, then update this ExecPlan so the `Progress`, `Surprises & Discoveries`, `Decision Log`, `Outcomes & Retrospective`, `Concrete Steps`, and `Validation and Acceptance` sections reflect the actual finished state and the commands that proved it works.

## Concrete Steps

From the repository root `/Users/ggp/dev/git/festiveBeverage`:

1. Create the ExecPlan file and keep it current while implementing.

       mkdir -p .agent/execplans

2. Implement the server-side router changes and the new edit UI files.

       # edit source files under src/server/api, src/pages, src/views, and src/components

3. Run validation commands after the code compiles.

       pnpm tsc
       pnpm lint
       pnpm test
       pnpm test:e2e

Successful transcript excerpts from this implementation:

       > festive-beverage@0.1.0 tsc
       > tsc

       > festive-beverage@0.1.0 lint
       > eslint '{src,scripts,support,types}/**/*.{[mc]js,[mc]ts,[jt]s,tsx}'

       Test Files  3 passed (3)
            Tests  20 passed (20)

       5 passed (28.2s)

4. Reproduce and validate the row-level-security follow-up.

       pnpm exec tsx scripts/repro-create-ingredient-rls.ts
       pnpm vitest run src/server/api/routers/drinks.test.ts
       pnpm tsc
       pnpm lint
       pnpm test
       git diff --check

   The temporary real-database reproduction and policy probe scripts were deleted after the fix was verified. The permanent router-level regression test remains at `src/server/api/routers/drinks.test.ts`.

Additional repository checks used while implementing:

       find .agent -maxdepth 3 -type f | sort
       find src/pages -maxdepth 2 -type f | sort
       find src/views -maxdepth 2 -type f | sort
       rg -n "ingredient_text|ingredientText" scripts src support prisma

## Validation and Acceptance

Start the application in development mode, authenticate with a verified user, and open `http://localhost:40000/edit`.

Acceptance is:

1. A logged-out visitor can load `/edit` but sees a login requirement instead of editable controls.
2. A logged-in user sees an ingredient creation form and a recipe editor workspace.
3. Creating a new ingredient succeeds, shows a success notification, and the ingredient becomes selectable in the recipe editor without a page refresh.
4. Creating a new recipe with one or more ingredient rows succeeds, shows a success notification, and the new recipe appears in both the edit library and the home page listing after cache invalidation or navigation.
5. Opening an existing recipe for editing, changing at least one field, and saving it succeeds and the updated values are visible on the home page card/detail view.
6. Attempting to save invalid data, such as an empty recipe name or missing ingredient line selections, shows form validation feedback and does not send a destructive partial write.
7. Typing in the Ingredient Studio name field searches the complete ingredient library by name and tags, shows ranked possible matches with an accurate count, and prevents saving an exact duplicate.
8. At phone width, the initial recipe tab shows only New Recipe and the viewport-filling recipe library; choosing either a recipe or New Recipe opens a focused editor, and Back to Recipe Library returns to the list. At tablet and desktop widths, the library and editor remain side by side.
9. In the focused phone editor, no Recipe Workspace summary card appears, and each recipe ingredient uses one full-width selector line followed by one line containing Amount, Unit, and Modifier.
10. The phone ingredient row keeps Delete beside the secondary fields, requires confirmation before removal, and places Add Ingredient after the final current ingredient row.

Validation completed in this implementation:

- `pnpm tsc` passed.
- `pnpm lint` passed.
- `pnpm test` passed with 3 files and 20 tests.
- `pnpm test:e2e` passed with 5 tests, including 4 authenticated editor tests.
- The user reported completing the authenticated manual QA pass.
- The real-database tRPC reproduction passed with `PASS: an authenticated request created an ingredient under row-level security` after failing twice with the exact reported RLS error before the fix.
- `git diff --check` passed.

## Idempotence and Recovery

Re-running the UI code edits is safe because they are additive source changes. Re-running TypeScript and lint validation is safe and should not modify the repository. Creating ingredients and recipes through the UI is intentionally persistent database work, so retry only when the user intends to keep the resulting records.

If a recipe update fails after the form is edited, the page should preserve the client-side draft so the user can correct the issue and resubmit. If a mutation partially fails on the server, the implementation should rely on a single Prisma transaction for recipe updates so the parent recipe and child ingredient lines do not drift apart.

## Artifacts and Notes

Important implementation evidence:

- New route: `src/pages/edit.tsx`.
- Main editor view: `src/views/Edit.tsx`.
- Updated browse affordances: `src/views/Home.tsx`.
- Updated authenticated navigation: `src/components/Header.tsx` and `src/components/Navigation/Routes.ts`.
- New server procedures: `getAllUnits`, `createIngredient`, `createRecipe`, and `updateRecipe` in `src/server/api/routers/drinks.ts`.
- Authenticated transaction and RLS identity boundary: `src/server/api/trpc.ts`.
- Router-level RLS regression test: `src/server/api/routers/drinks.test.ts`.
- Vitest `@/` path alias needed by server-module tests: `vitest.config.ts`.
- Ingredient match ranking: `src/views/ingredientMatches.ts` with focused coverage in `src/views/ingredientMatches.test.ts`.
- Authenticated editor browser coverage: `playwright/edit.spec.ts`, with the Auth0 session fixture in `playwright/auth.ts` and fixture cleanup in `playwright/cleanup.ts`.
- Shared Auth0 session cookie configuration: `src/server/auth/constants.ts`.
- Added form dependencies: `react-hook-form` and `@hookform/resolvers`.
- Validation transcripts:

      > festive-beverage@0.1.0 tsc
      > tsc

      > festive-beverage@0.1.0 lint
      > eslint '{src,scripts,support,types}/**/*.{[mc]js,[mc]ts,[jt]s,tsx}'

      Test Files  1 passed (1)
           Tests  16 passed (16)

- Follow-up validation transcript:

      PASS: an authenticated request created an ingredient under row-level security

      Test Files  2 passed (2)
           Tests  17 passed (17)

- Final handoff validation transcript:

      Test Files  3 passed (3)
           Tests  20 passed (20)

      5 passed (28.2s)

## Interfaces and Dependencies

Use the existing dependencies already present in the repository: Next.js Pages Router for routing, MUI for layout and form controls, Auth0 hooks for login state, tRPC for client/server calls, Zod for mutation input validation, React Query invalidation through `api.useUtils()`, and Prisma for persistence.

In `src/server/api/routers/drinks.ts`, define stable procedures with names that match their behavior:

    getAllUnits: publicProcedure query returning units ordered for selection
    createIngredient: protectedProcedure mutation accepting ingredient fields
    createRecipe: protectedProcedure mutation accepting recipe fields and ingredient rows
    updateRecipe: protectedProcedure mutation accepting recipe id plus editable recipe fields and ingredient rows

The recipe mutation input shape must contain:

    name: string
    description?: string | null
    instructions?: string | null
    glass?: string | null
    garnish?: string | null
    source?: string | null
    recipeIngredients: Array<{
      ingredientId: number
      unitId: number
      amount?: string | null
      modifier?: string | null
    }>

In the UI, define a view in `src/views/Edit.tsx` that renders:

    a logged-out guard state
    a recipe library/list for selecting existing recipes
    a recipe form for create and update
    an ingredient creation form or dialog
    an inline path from the recipe form to create an ingredient and select it immediately

Revision note: Updated after implementation to reflect the completed `/edit` workspace, the authenticated tRPC mutations, the navigation changes required to expose the route to logged-in users, and the final validation results. Updated again after the RLS follow-up to record the transaction-boundary defect, its regression test, and successful real-database verification. Updated for handoff after authenticated manual QA, authenticated Playwright coverage, combined standards/spec review, scope cleanup, and final validation.
