---
name: multi-agent-code-review-orchestrator
description: Orchestrate parallel code review agents across user-flow, runtime, and missed-update dimensions. Use when reviewing a multi-file feature (10+ changed files) that spans backend, frontend, and PDF/render layers. Also handles production-readiness verification (type-check + lint + build) and finalizing for commit. Triggers: "code review the changes", "review all my changes", "comprehensive review", "review across all layers", "user flow review", "fix the actual issues", "run the build", "production ready", "learn from mistakes".
---

# Multi-Agent Code Review Orchestrator + Production-Readiness

When you have a completed feature touching 10+ files across backend, frontend, and rendering layers, this skill runs a parallel, exhaustive review with zero redundant work, applies ALL fixes, and verifies production-readiness end-to-end.

## When to Use

- **Use this when**: 10+ files changed; feature spans tRPC + React + PDF/email/SSE; pre-existing uncommitted files exist in the working tree; multiple agents must run in parallel to cover user flow, runtime, and missed-update angles; or you need to do a final pre-commit verification.
- **Skip if**: < 5 files changed, single-layer change (UI only, or backend only), or no new user-facing flow.

---

## The Protocol

### Phase 1: Filter Files First (BEFORE Launching Agents)

Before any review prompt, explicitly partition the file list. This prevents agents from wasting context on noise and prevents them from "fixing" pre-existing issues.

**Filter OUT (don't review)**:
- Image files: `*.png`, `*.jpg`, `*.jpeg`, `*.svg`, `*.gif`, `*.webp`
- Lock files: `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`
- Package files: `package.json` (only review for new deps if relevant)
- CARL session files: `.carl/`
- Design reference assets: `design-reference/`
- Git noise: `.git/`

**Pre-existing uncommitted files** (e.g., changes the user made before your task started): **explicitly list them as OFF-LIMITS** during the review phase. The reviewer should never touch them. Only review files YOU changed.

**However**: pre-existing uncommitted files that BLOCK `pnpm run build` (via type-check) MUST be fixed in the final production-readiness phase. See Phase 5.

Tell the user upfront:
> "Reviewing N code files. Ignoring M pre-existing uncommitted files (not mine). Total: 24 files."

### Phase 2: Launch 3 Parallel Agents With Focused Scopes

Each agent covers a distinct concern. **NEVER overlap scopes** — that's wasted tokens. The intersection of findings should be near-zero; each agent should catch issues the others can't.

| Agent | Concern | What to look for |
|-------|---------|------------------|
| **Agent 1: User Flow + UI/UX** | Complete user journeys, data flow, pre-population, dropdown population, mutation payload, error states, mobile, i18n gaps | Trace each journey end-to-end. Find: fields not populated on edit, dropdowns sourced wrong, submit payload missing/extra fields, error states missing, hardcoded strings without translation keys, image removal bugs (null vs undefined for clearable fields). |
| **Agent 2: Runtime Errors + State + Performance** | What could BREAK at runtime | Find: `useEffect` dep issues, stale closures (read state after `setState` in same function), race conditions, null/undefined access, memory leaks (interval/listener/cleanup), re-render hotspots, network refetches, type assertions (`as any`), `in` operator on possibly-null, SSR/client mismatches, fetch without AbortController. |
| **Agent 3: Missed Updates + Inconsistencies + Edge Cases** | What was FORGOTTEN or INCONSISTENT | Find: files that consume the changed data but don't display it (e.g., PDF route drops the new field), dead code (types defined but never imported), defined-but-never-used translation keys, missing files in the change set, type duplicates, schema regex inconsistencies between UI and API, dialogs that should show new fields but don't. |

### Phase 3: Prompt Structure (Mandatory)

Each agent prompt MUST include:
- **The exact file list** (relative paths, no images/packages/locks/carl)
- **Which files are OFF-LIMITS** (pre-existing uncommitted)
- **The source-of-truth path** (`.omo/plans/...md`) so the agent doesn't drift
- **The concern** they're scoped to (don't ask for user flow AND runtime AND missed updates in one prompt)
- **Output format**: severity-tagged findings with `file:line` references and proposed fix
- **Be EXHAUSTIVE** — never stop at first issue
- **VERIFY before reporting** — for each finding, read the file to confirm

### Phase 4: The Orchestrator Applies All Fixes

After all 3 agents complete, **synthesize ALL findings** (even the low-priority ones) and **apply ALL fixes in one batch**. Do NOT pick-and-choose based on importance — the user wants production-ready code.

**Critical pattern library** (use these as templates):

1. **Prisma Decimal vs number comparison**:
   ```ts
   // ❌ Wrong (Prisma returns Decimal)
   if (course.price > 0) { ... }
   // ✅ Right
   if (Number(course.price) > 0) { ... }
   ```

2. **Clearable fields (image removal, etc.) — null vs undefined for Prisma**:
   ```ts
   // ❌ Wrong — undefined means "don't touch the field"
   imageUrl: imageUrl ? String(imageUrl) : undefined
   // ✅ Right — null means "clear the field"
   imageUrl: imageUrl && String(imageUrl).length > 0 ? String(imageUrl) : null
   // Zod schema must accept both:
   imageUrl: z.union([httpUrlSchema, z.null()]).optional()
   ```

3. **Type-safe `(item as any)` cast replacement**:
   ```ts
   // ❌ Wrong — defeats type safety
   {(item as any).imageUrl && <Image src={(item as any).imageUrl} ... />}
   // ✅ Right — add fields to the interface
   // (in template-types.ts):
   export interface MealItem {
     warehouseItemId: string;
     name: string;
     imageUrl?: string | null;  // ADD
     videoUrl?: string | null;  // ADD
     // ...
   }
   // (in component):
   {item.imageUrl && <Image src={item.imageUrl} ... />}
   ```

4. **Stale closure in async setState**:
   ```ts
   // ❌ Wrong — touchedFields is from closure, doesn't see the new value
   setTouchedFields(prev => new Set(prev).add(key));
   if (touchedFields.has(errorKey)) { ... }  // STALE
   // ✅ Right — compute new set locally
   const newTouched = new Set(touchedFields);
   newTouched.add(key);
   setTouchedFields(newTouched);
   if (newTouched.has(errorKey)) { ... }  // CURRENT
   ```

5. **Memoize translations to stabilize useCallback deps**:
   ```ts
   // ❌ Wrong — t is a new object every render, breaks useCallback
   const t = getTranslation(language, "...");
   const handleBlur = useCallback(..., [t]);
   // ✅ Right
   const t = useMemo(() => getTranslation(language, "..."), [language]);
   ```

6. **ESLint disable justification comment**:
   ```ts
   // ❌ Wrong — no explanation, future devs can't tell if it's safe
   }, [hasImage]); // eslint-disable-line react-hooks/exhaustive-deps
   // ✅ Right — explicit reason
   // Intentionally only react to `hasImage` transitions to avoid an infinite
   // clear loop. We also guard with `&& videoInput` to skip when nothing to clear.
   // eslint-disable-next-line react-hooks/exhaustive-deps -- videoInput and onVideoChange are read but not used as triggers
   }, [hasImage]);
   ```

7. **Media thumbnail DRY pattern** (extract to a helper):
   ```ts
   // Reusable function — copy to all places that show item media
   function renderItemMedia(item: { imageUrl?: string | null; videoUrl?: string | null; name: string }) {
     const videoId = item.videoUrl ? extractYouTubeVideoId(item.videoUrl) : null;
     if (item.imageUrl) return <Image src={item.imageUrl} ... />;
     if (videoId) return <Image src={getYouTubeThumbnail(videoId)} ... />;
     return <ImageOff ... />;
   }
   ```

### Phase 5: Production-Readiness Verification

After ALL fixes are applied, run the verification chain **ONCE** (not after each fix):
1. `pnpm run type-check` — should be 0 errors
2. `pnpm run lint` — should be 0 warnings
3. `pnpm run build` — should produce a compiled output. **Use `pnpm run build` (not `build:strict`)** for production verification. `build:strict` stops at the first type error; `build` continues to bundle, giving you a more complete picture.

**If `pnpm run build` fails on pre-existing errors** that you don't own, fix them anyway. The user wants production-ready. Common pre-existing issues:
- `Decimal` vs `number` in Prisma queries (convert with `Number()`)
- Type assertions on API responses
- `null` vs `undefined` in optional fields

**Do NOT** commit anything. Leave all changes in the working tree for user review.

### Phase 6: DO NOT Poll

Background agents may take 5-15 minutes. **DO NOT** call `background_output` repeatedly. Wait for `<system-reminder>` notifications. If an agent "disappears" (result not found), re-launch with the same prompt — the failure is usually a timeout, not a real error.

### Phase 7: Update Source of Truth As You Go

The `.omo/plans/*.md` file is the contract with the user. Update it **after each ticket completes** (not at the end), so the user can track progress in real-time. Each ticket should have:
- Status (`TODO` → `DONE` / `SKIP` / `REMOVED`)
- Severity, agent, files touched, brief description

After ALL fixes, update with the final verification result.

---

## DOs and DO NOTs

### DOs

1. **DO** filter files explicitly before launching agents
2. **DO** give each agent ONE focused concern (user flow OR runtime OR missed updates)
3. **DO** include the source-of-truth doc path in every prompt
4. **DO** use `run_in_background=true` for parallel review agents
5. **DO** wait for system reminders; do not poll
6. **DO** re-launch agents that time out — the prompt is fine, the system is just slow
7. **DO** synthesize findings yourself after collecting all results
8. **DO** apply ALL fixes (synthesized, not just critical) before type-check/lint/build
9. **DO** update the tickets/source-of-truth doc as work progresses
10. **DO** provide concrete file:line references in every finding
11. **DO** list "Skipped" items with the reason why (e.g., "no items directly rendered here")
12. **DO** cross-check findings against the codebase before reporting (verify, don't guess)
13. **DO** use `pnpm run build` (not `build:strict`) for production-readiness
14. **DO** fix pre-existing errors that block the build, even if they're not yours
15. **DO** use the pattern library above for common bug classes
16. **DO** extract DRY helpers for repeated patterns (e.g., media thumbnail rendering)
17. **DO** use `<Image unoptimized>` for external URLs (BunnyCDN, YouTube, Unsplash)

### DO NOTs

1. **DO NOT** ask the user which agent type to use — pick the right one automatically
2. **DO NOT** poll background tasks — wait for system notifications
3. **DO NOT** run type-check after each fix — wait until ALL fixes are applied
4. **DO NOT** touch pre-existing uncommitted files DURING the review phase (do it during the production-readiness phase if they block the build)
5. **DO NOT** include images, lock files, package.json, .carl, or design refs in review scope
6. **DO NOT** re-do the same search yourself after delegating (wastes tokens)
7. **DO NOT** use broad exploratory searches without filtering (wastes time)
8. **DO NOT** mark a task complete without validation (type-check/lint/visual evidence)
9. **DO NOT** claim "I didn't touch anything" without `git status` proof
10. **DO NOT** include absolute paths when reporting files to the user — use relative paths from project root
11. **DO NOT** include relative paths in code references to user — use absolute paths in code
12. **DO NOT** add debug code blocks when devmode=false
13. **DO NOT** bundle multiple goals into one `deep` call — fan out
14. **DO NOT** modify files outside your assigned scope — even if a related fix is obvious
15. **DO NOT** pick-and-choose fixes based on "importance" — the user wants the full set
16. **DO NOT** commit anything — leave all changes in the working tree
17. **DO NOT** add new dependencies without checking existing alternatives first
18. **DO NOT** use `as any` to silence the type system — fix the type instead
19. **DO NOT** treat 80% of the issues as "good enough" — the user will ask for the remaining 20%
20. **DO NOT** ship a feature where the data flows to some places but not others — trace end-to-end

---

## Anti-Patterns to Avoid

### "Re-do the same search yourself after delegating"
Once you delegate exploration to agents, do not manually grep for the same info. Use the results.

### "Run type-check after every small change"
Wait. Apply ALL fixes from all agents, then run type-check ONCE. This avoids noise from intermediate states.

### "Poll background tasks"
The system will notify you. If you're anxious, set a reasonable timeout in `background_output(block=true, timeout=...)` and walk away.

### "Touch pre-existing uncommitted files during review"
They were uncommitted before you started. They're not your problem. Mention them in the report, but don't modify them unless explicitly asked.

### "Include absolute paths in user-facing reports"
Use relative paths from the project root: `src/app/...` not `D:\clones\edrak\src\app\...`. The user is looking at a tree, not a filesystem.

### "Use `as any` to escape type errors"
Fix the type by adding the missing fields to the interface. Casts hide bugs and propagate.

### "Send `undefined` to clear a Prisma field"
Prisma treats `undefined` as "don't change" and `null` as "clear". For clearable fields, send `null` and ensure the Zod schema accepts `z.union([schema, z.null()])`.

### "Hardcode English/Arabic strings in components"
Always use the translation system. If a translation key doesn't exist, ADD it to the translation file first.

### "Leave a duplicate `WarehouseItem` interface"
Two interfaces with the same name in different files is a recipe for silent bugs. Remove the dead one, or import the shared one.

### "Add features without checking if the data flows"
Before adding a feature, trace end-to-end: where does the data come from → how does it propagate → where is it consumed. If any step is missing, the feature is half-built.

### "Treat the first N issues as 'good enough'"
If 21 issues are found, fix all 21. The user will come back for the rest.

---

## Recovery from Common Failures

| Symptom | Cause | Recovery |
|---------|-------|----------|
| "Task result not found" | Background task expired or never returned | Re-launch with same prompt — usually succeeds in 2nd try |
| Agent times out at 30 min | Task too complex for one agent | Reduce scope; have it focus on subset of files; fan out more agents |
| Agent returns too generic | Prompt was too broad | Re-launch with specific file:line scope and "be exhaustive" requirement |
| Type errors after my fix | Used `null` where `undefined` expected (or vice versa) | Check the Zod schema first; use `z.union([z.string().optional(), z.null()])` for nullable strings |
| ESLint disable needed but breaks | Used wrong separator | Use `// eslint-disable-next-line react-hooks/exhaustive-deps -- comment` (two dashes, then comment) |
| PowerShell `-Raw` not supported | Older PowerShell | Use `Get-Content $path | Out-String` or `Select-String` directly |
| Build fails on pre-existing errors | Not yours but blocks production | Fix them with the Decimal→Number pattern or other common fixes; document in the report |
| `pnpm run build:strict` vs `pnpm run build` | `build:strict` stops at first error; `build` bundles anyway | For production verification, prefer `build` and fix all errors |

---

## Example Workflow

```
1. Filter: 24 code files to review, 29 pre-existing off-limits
2. Launch 3 background agents (user flow / runtime / missed) in parallel
3. Wait for system reminders (do not poll)
4. Collect results, synthesize findings — ALL of them, not just critical
5. Apply ALL fixes (use the pattern library for common bug classes)
6. Fix pre-existing errors that block the build
7. Run pnpm type-check && pnpm lint && pnpm build
8. Update .omo/plans/tickets.md with completion status
9. Report final summary to user (build pass, all changes uncommitted)
```

---

## Learn from Mistakes

This skill was refined after making these mistakes in a real session:

1. **Tried to pick-and-choose fixes based on "importance"** — the user had to remind me to fix ALL issues.
2. **Treated the first 10 of 21 issues as "good enough"** — caused follow-up requests for the remaining 11.
3. **Used `pnpm run build:strict`** when regular `pnpm run build` was correct — caused confusion.
4. **Left `(item as any)` casts** instead of fixing the underlying type — propagated the bug.
5. **Told the user to type-check after each fix** — generated noise and confused state.
6. **Forgot to memoize `t` from `getTranslation`** — broke useCallback deps.
7. **Sent `undefined` to clear Prisma fields** — silently failed to remove the field.
8. **Re-ran type-check after every fix** — wasted time and produced confusing intermediate errors.
9. **Stopped at "good enough" instead of pushing for build-pass** — user had to ask twice.
10. **Did not fix the pre-existing `Decimal` vs `number` errors that blocked the build** — user asked me to ensure production-ready.

The skill now encodes the correct patterns to avoid these.

---

## Verification Checklist (Before Reporting Done)

- [ ] All 3 agents returned findings
- [ ] ALL findings applied (not just critical)
- [ ] Pre-existing build errors fixed
- [ ] `pnpm run type-check` → 0 errors
- [ ] `pnpm run lint` → 0 warnings
- [ ] `pnpm run build` → "Compiled successfully"
- [ ] Source-of-truth doc updated with final status
- [ ] All changes are in working tree (NOT committed)
- [ ] No files outside the original scope were modified
- [ ] No new dependencies added (or explicitly justified)
- [ ] No `as any` introduced
- [ ] No hardcoded strings where translations exist
