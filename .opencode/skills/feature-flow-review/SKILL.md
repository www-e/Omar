---
name: feature-flow-review
description: >
  [EVOLVED] End-to-end feature completeness audit across all layers (DB → Service → API → Page → Components → i18n → Nav).
  Executable process — not a reference doc. Parallel-first, agent-aware, trap-resistant.
  Use when: implementing new features end-to-end, auditing existing features, before marking "done" in a PR,
  or investigating user-reported flow issues.
---

# Feature Flow Review — Evolved

Audits a feature across ALL layers of the stack. This is NOT a code review — it's a **systematic completeness audit**
that verifies every data flow, every screen state, every translation key, and every verification step.

---

## Phase 0: Pre-Flight (Execute Before ANY Edit)

### 0.1 Load Relevant Skills
Match the feature's layers to skills and load them **immediately**, before reading code.

| Layer | Skill(s) to Load |
|-------|------------------|
| DB / Schema | `database-design`, `prisma-optimization` |
| API / Router | `api-design`, `auth-security` |
| UI / Components | `accessibility`, `responsive-design` |
| Security | `security-hardening`, `auth-security` |
| Testing | `testing-strategy`, `sportologyplus-setup-workflow` |
| Performance | `performance-optimization` |
| Payments | `payment-integration` |
| Notifications | `notification-system` |
| Error Handling | `error-handling` |
| SEO | `seo-optimization` |
| Code Review | `code-review` |

```
skill(name="database-design")
skill(name="api-design")
skill(name="error-handling")
# ... etc, loaded in parallel
```

### 0.2 Check Git State (AVOID THE RESET TRAP)
Run ALL four checks in parallel before touching any file:

```bash
git status --short                         # What's modified/staged/untracked?
git log --oneline -5                       # Where is HEAD?
git log origin/main..HEAD --oneline        # Unpushed commits?
git stash list                             # Stashed work?
```

If user claims file count mismatch → check all four states (unpushed commits are invisible in `status`).

### 0.3 Check Prisma Migration Health (AVOID THE DRIFT TRAP)
Before any schema change, know the database state:

```bash
pnpm prisma migrate status
```

**Decision tree:**
- `Database schema is up to date` → use `pnpm prisma migrate dev --name <desc>`
- `Drift detected` → use `pnpm prisma db push` (don't reset, don't create migration — drift means someone already used `db push`)
- `The migration table has X entries, but only Y are applied` → use `pnpm prisma migrate dev` with `--create-only` or resolve manually

### 0.4 Create Todo List (BEFORE Touching Code)
Break the feature into atomic todo items. Each item must be completable in 3 tool calls max.

Format: `[file/path]: [action] to [why] — expect [result]`

---

## Phase 1: Map the Feature Boundary (Parallel)

**Launch ALL of these in parallel — do NOT read files manually if an agent can do it faster.**

### Agent Delegation Map

| Goal | Agent Type | Prompt Hints |
|------|-----------|--------------|
| Find ALL files involved | `explore` (×2-3) | Layer-specific grep: schema model, router procedures, page files, translation keys, sidebar links |
| Understand schema relationships | `explore` | `@@index`, `@relation`, enum values, unique constraints |
| Find existing patterns for reference | `explore` | Similar features (e.g. if adding "payout", find "earnings" or "wallet" patterns) |
| Investigate external lib behavior | `librarian` | Only if unfamiliar library is involved (PayMob, Bunny, etc.) |
| Complex architecture question | `oracle` | After exploration — don't send raw, synthesize findings first |

### Output: File Boundary Table

| Layer | Files Found |
|-------|-------------|
| **DB/Prisma** | prisma/schema.prisma (models, enums, relations, indexes) |
| **Service** | src/server/services/ (business logic, transaction boundaries, error states) |
| **API/Router** | src/server/api/routers/{domain}/ (tRPC procedures, Zod validation, auth guards) |
| **Page** | src/app/{route}/page.tsx, loading.tsx, error.tsx |
| **Components** | src/components/{feature}/ (dialogs, forms, badges, skeletons) |
| **Translations** | src/lib/translations/{en,ar}.ts and/or domain-specific translation files |
| **State Mgmt** | React Query cache invalidation, refetch chains, optimistic updates |
| **Sidebar/Nav** | src/components/{role}/layout/sidebar.tsx, navigation config |
| **Middleware** | src/middleware.ts (role guards, route protection) |

---

## Phase 2: Trace Every Data Flow

For each user-facing operation (e.g. "list payouts", "request payout", "cancel payout"):
trace ALL states across ALL layers.

### State Machine per Flow

```
User Action
  │
  ├─► Loading State  ─── skeleton matches layout, no layout shift
  │
  ├─► Error State    ─── message + retry button, not just a toast
  │                        └─ error.tsx for page-level, try/catch for mutations
  │
  ├─► Empty State    ─── meaningful message + CTA (not just "no data")
  │
  ├─► Data State     ─── all columns/fields shown, proper formatting
  │                        └─ dates locale-aware, currency consistent, status badges
  │
  └─► Mutate State   ─── pending (button disabled), success (toast + refetch), error (rollback + message)
                           └─ INVALIDATE ALL RELATED QUERIES, not just one
```

### Transaction & Idempotency Checks (CRITICAL)

For EVERY mutation endpoint, verify:

```
□ Mutation wrapped in Prisma $transaction (multi-step consistency)
□ Idempotency guard exists (unique constraint or find-before-create)
□ On optimistic update: error rolls back optimistically
□ On failure: doesn't leave inconsistent DB state
□ Cache invalidation covers ALL related queries (not just the one being mutated)
```

### Common Trap: The "Forgot to Invalidate" Bug
After mutation, the affected data is stale. If you update a payout status, invalidate:

```
api.admin.payout.getAll.invalidate()        // main list
api.professor.payout.listPayouts.invalidate()  // professor's view
api.professor.payout.getEarningsSummary.invalidate()  // summary widget
```

**Don't just invalidate the query that was used in the mutation — invalidate ALL queries that depend on the mutated data.**

---

## Phase 3: Layer-by-Layer Verification

### 3.1 DB Layer
```
□ Model has all required fields + createdAt + updatedAt
□ Foreign keys are indexed (@@index)
□ Relations are bidirectional (BOTH sides of @relation exist)
□ Monetary fields use Decimal(10, 2)
□ Enum values cover all needed states
□ Unique constraints enforce business rules (e.g. one earning per payment+professor)
□ Composite indexes exist for common query patterns (e.g. [professorId, status])
```

### 3.2 Service Layer
```
□ Business logic validates all preconditions before acting
□ Balance/eligibility checks happen before any state change
□ Multi-record operations use $transaction
□ Errors are meaningful (not generic) and use TRPCError codes
□ Idempotent: calling same endpoint twice doesn't double-create
□ Edge cases handled: null values, missing relations, Decimal precision
```

### 3.3 API Layer (tRPC)
```
□ Correct auth procedure: publicProcedure / protectedProcedure / adminProcedure
□ Input validated with Zod schema (not just TypeScript)
□ Pagination: cursor-based for infinite lists, offset-based for filtered lists
□ Pagination metadata returned (total count, page number, total pages)
□ Sort/filter parameters validated
□ Error responses are structured, not raw exceptions
```

### 3.4 Page Layer
```
□ page.tsx exists at the route, uses proper data fetching
□ loading.tsx exists — skeleton matches actual layout (not a generic spinner)
□ error.tsx exists — shows error message + retry button
□ Proper HTTP status on error pages (404.tsx if applicable)
□ Metadata exported (generateMetadata or metadata export)
```

### 3.5 Component Layer
```
□ Loading skeleton matches the actual data layout (same number of rows, columns)
□ Error state with retry action (not swallowed, not just console.error)
□ Empty state with meaningful message + call to action
□ All columns/fields shown, properly formatted
□ Status badges use distinct colors + text labels (color is not the only indicator)
□ Action buttons disabled during mutation (pending state visually distinct)
□ Dialogs: open/close state managed, form reset on close, escape key works
□ Pagination controls: page info, prev/next buttons, disabled at boundaries
□ Filter/sort changes reset pagination to page 1
□ RTL: text alignment, icon placement, layout direction all correct
□ a11y: buttons have aria-labels, form fields have associated labels, color contrast sufficient
```

### 3.6 Translation Layer
```
□ Every UI string has a translation key (no hardcoded strings in JSX/TSX)
□ All EN keys exist in AR (verify with grep or diff, don't assume)
□ No English fallback strings: `?? "Retry"`, `?? "Previous"` — use `?? ""` at most
□ Dynamic strings use replace/template with locale-aware formatting
□ Date formatting: uses toLocaleDateString('ar-EG' | 'en-US') or equivalent
□ Currency: consistent decimal places, locale-aware symbol placement
□ RTL-aware: numeric values don't flip direction, currency symbols on correct side
```

### 3.7 Navigation Layer
```
□ Sidebar has link to the new page (or existing page verified)
□ Link text is translated (not hardcoded English)
□ Active state highlights correctly
□ Breadcrumbs (if applicable) include the new page
□ Role guard: Middleware or layout prevents unauthorized access
```

---

## Phase 4: Verify Idempotency & Guardrails

### Execute These Checks on Every Mutation Endpoint

| Check | Why It Matters | How to Verify |
|-------|---------------|---------------|
| **Duplicate prevention** | Double-click / retry creates double records | Unique constraint or find-before-create |
| **Transaction boundary** | Half-applied mutation leaves corrupt state | Wrap all writes in `$transaction` |
| **Optimistic rollback** | Error during optimistic update leaves stale UI | `onError` handler reverts the cache |
| **Stale data after refetch** | User sees cached old data | `invalidate()` after mutation, not just `refetch()` |
| **Concurrent modification** | Two admins update same record | No blind overwrite — check current state first |
| **Webhook idempotency** | PayMob sends same webhook twice | Check `paymentId_professorId` uniqueness before credit |

### Common Trap: The "Webhook Skips" Bug
When a webhook handler queries related data (e.g. `payment.course.professorId`), verify:
```
□ The select/include actually fetches the needed field
□ There's no silent `if (x?.y)` that skips the entire block because the field wasn't selected
□ The field name matches exactly between select and usage (case-sensitive)
```

---

## Phase 5: Add Cron/Background Jobs (If Applicable)

### Standard Cron Job Template for This Codebase

```
1. Create src/server/jobs/{job-name}.ts
   └─ Export async function that does one thing
   └─ Accept no params (or minimal config)
   └─ Log start and end (don't be silent)
   └─ Catch errors per-record, don't fail the whole batch

2. Import in src/server/cron.ts
   └─ Add import at top with existing imports
   └─ Add schedule function following existing pattern:
      └─ same try/catch/log structure
      └─ timezone: 'UTC'
      └─ task.stop() + scheduledJobs.push()

3. Register in startCronJobs() and runJobManually()

4. Create a DB index if the WHERE clause isn't covered
```

### Common Trap: Cron Job Registration
After adding the job function, you must do TWO things in cron.ts:
```
□ Add schedule function (scheduleYourJob)
□ Call it in startCronJobs() (scheduleYourJob() after existing jobs)
□ Add case in runJobManually() for manual trigger
```
Missing any one means the job never runs.

---

## Phase 6: Prioritize Issues

| Priority | Criteria | Examples |
|----------|----------|---------|
| **P0** | Data loss, wrong data, broken flow, silent failure | Webhook skips earning, wrong amount recorded, user can't complete purchase |
| **P1** | User-visible error, incorrect UI state, security bypass | Wrong status shown, error on valid input, unauthenticated access to protected route |
| **P2** | Missing feature piece, incomplete UX, performance | No pagination, missing loading skeleton, N+1 query, English fallback string |
| **P3** | Polish, minor a11y, code style, edge cases unlikely | Unused import, color contrast, naming conventions |

**When reporting, ALWAYS separate pre-existing issues from your own changes.**
If you find a pre-existing bug, note it but don't fix it unless asked.

---

## Phase 7: Verification Cadence (Continuous, Not Final)

### Per-Layer Verification

| After Completing | Run |
|-----------------|-----|
| Prisma schema change | `pnpm prisma db push` or `pnpm prisma migrate dev` |
| Service logic | `pnpm run type-check` (narrow scope: `tsc --noEmit --pretty`) |
| API/Router | `pnpm run type-check` |
| Page + Components | `pnpm run lint` on changed files |
| ALL edits done | `pnpm run type-check` (full) |
| Before claiming done | `pnpm run build:strict` |

### Build Output Handling
For `build:strict` output (can be 5000+ lines):
```
□ Use `rtk pnpm run build:strict` to filter errors
□ If output is still large → use ctx_execute with `build:strict` and search for errors
□ If you get TS errors: determine if they're pre-existing or your fault
   └─ Check: did you touch that file? If no → pre-existing
   └─ If pre-existing, say so explicitly in the summary
```

---

## Phase 8: Deliverables

### 8.1 Audit Report
```
| Layer | Files | Status | Findings |
|-------|-------|--------|----------|
| DB    | 1     | ✅/❌  | notes... |
```

### 8.2 Fix Plan
```
P0 (priority=high):
- [ ] file:path — what to fix, why, expected result

P2 (priority=medium):
- [ ] ...
```

### 8.3 Final Evidence
```
□ type-check: clean (or N pre-existing errors unrelated to changes)
□ lint: clean on changed files
□ build: exit 0 (or N pre-existing failures)
□ db: schema in sync
□ git: all changes accounted for (committed, staged, unstaged, stashed)
```

---

## Quick Reference: Common Trap List

| Trap | How It Manifests | Prevention |
|------|-----------------|------------|
| **Prisma Drift** | `migrate dev` wants to reset DB | Check `migrate status` first → use `db push` if drift exists |
| **Missing Relation Side** | `migrate dev` fails validation | Every `@relation` on one model needs a matching field on the other |
| **Silent Webhook Skip** | Earning never created, no error | Verify selected fields actually include what the condition checks |
| **Forgotten Invalidation** | UI shows stale data after mutation | Invalidate ALL queries that depend on the data, not just one |
| **English Fallback** | `?? "Retry"` leaks English | Use `?? ""` at most — translations should always exist |
| **Singleton Prisma** | New `PrismaClient()` in service code | Import `db` from `@/server/db` — never create your own |
| **Sequential Trap** | Reading files one by one when 5 are needed | Batch all independent reads in ONE message |
| **Context Flood** | 5000 lines of build output in context | Use `rtk` prefix or `ctx_execute` with search |
| **Migration Reset** | Losing all dev data | Never accept "reset" without checking what's in the DB first |
| **Double Cron Job** | Never registers or never runs | Must: import + schedule function + call in startCronJobs + case in runJobManually |
| **One-Sided i18n** | Arabic users see English | After adding keys to `en.ts`, verify they exist in `ar.ts` with grep |
| **Loading/Layout Mismatch** | Skeleton has 3 rows but data has 5 columns | Match skeleton structure to actual table/grid layout |
| **Optimistic Stale** | Optimistic update succeeds, then refetch shows wrong data | Chain: `onMutate` cache set → `onSettled` invalidate |
| **Missing loading.tsx** | Page loads with no visual feedback | Every route that fetches data needs a sibling `loading.tsx` |
| **Missing error.tsx** | Unhandled error shows white screen | Every route needs a sibling `error.tsx` with retry action |
| **Filter/Page Reset** | Filtering on page 5 shows "no results" | Reset page to 1 on every filter/sort change |

---

## Quick Reference: Parallel Execution Patterns

### When Reading
```typescript
// GOOD: All at once
read("file1.ts"), read("file2.ts"), grep(...), explore(...)

// BAD: Sequentially
read("file1.ts") // wait
read("file2.ts") // wait
```

### When Editing
```typescript
// GOOD: Parallel independent edits
edit("file1.ts"), edit("file2.ts"), edit("file3.ts")

// BAD: One at a time
edit("file1.ts") // wait for confirmation
edit("file2.ts") // wait for confirmation
```

### When Exploring
```typescript
// GOOD: Fire 3 explores at once
explore(prompt="...", run_in_background=true)
explore(prompt="...", run_in_background=true)
explore(prompt="...", run_in_background=true)
// Continue with independent work, wait for results

// BAD: Sequential
explore(prompt="...") // wait
explore(prompt="...") // wait
```

### When Deploying Changes
```typescript
// GOOD: Independent delegation
deep(prompt="DB schema changes...", run_in_background=true)
deep(prompt="tRPC router...", run_in_background=true)
deep(prompt="Page component...", run_in_background=true)

// BAD: Monolithic
deep(prompt="Do everything...") // one agent has too much scope
```

---

## Usage

Call this skill when:
- Implementing a NEW feature end-to-end
- Auditing an EXISTING feature for completeness
- Before marking a feature as "done" in a PR
- Investigating user-reported issues in a feature flow
- Adding a background job or webhook handler
- Before and after making schema changes

**Do NOT call this skill for:**
- Simple typo fixes (use quick)
- Code review without flow changes (use code-review skill)
- Single-file refactors (use /refactor command)
