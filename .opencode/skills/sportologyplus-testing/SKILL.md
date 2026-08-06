---
name: sportologyplus-testing
description: Automated testing for the Sportology (Edrak) platform. For E2E browser testing, use edrak-agent-browser skill (agent-browser CLI, real Chrome, human-like). For unit/integration/tRPC testing, use Playwright programmatic API. Detects 7 failure modes, fixes, and re-verifies in a loop via /ulw-loop. Uses test-automation category for optimal model routing.
argument-hint: describe what to test (e.g., "run INT-02 course lifecycle test", "test INT-01 coupon purchase flow", "verify all INT tests pass")
---

# 🧪 Edrak Testing — Orchestrator Skill

> **Purpose**: This is your entry point for ANY testing work on Edrak.
> **Sub-skills**: Delegate to `sportologyplus-setup-workflow` and `sportologyplus-agent-browser` as needed.
> **Fix Cycle**: `/ulw-loop` — never leave a failure uninvestigated.
> **Model Routing**: `test-automation` category.

## 🔴 GOLDEN RULE: Understand Before Testing

**Before running a single command, answer:**
1. **What am I testing?** (Which INT test? Which flow? Which page?)
2. **What's the expected outcome?** (What should the user see? What API calls should fire?)
3. **What could go wrong?** (Empty state? Error? Wrong data? Permission denied?)
4. **Is the environment ready?** (Server? Chrome? Database seeded?)

When a test fails → **STOP. Investigate root cause. Understand the bug. Fix it. Re-verify.**
NEVER re-run the same test hoping it'll pass.

## 🧠 The Testing Flow (Think → Delegate → Act → Verify)

### Phase 1: THINK (What Are We Testing?)

Read the test description / ticket / spec. Identify:
```
FLOW:      [e.g., Student purchases course with coupon]
PAGES:     [e.g., /courses, /courses/[id], /student/checkout]
API CALLS: [e.g., trpc.course.list, trpc.coupon.validate, trpc.enrollment.create]
EXPECTED:  [e.g., Course appears in student dashboard, wallet deducted correctly]
RISK:      [e.g., Coupon validation might not fire, wallet dedup might fail]
```

### Phase 2: DELEGATE (Setup Environment)

```powershell
skill sportologyplus-setup-workflow
# Follow the setup sequence:
# 1. Kill everything → 2. Start dev server → 3. Launch Chrome → 4. Verify
```

### Phase 3: DELEGATE (Agent-Browser Testing)

```powershell
skill sportologyplus-agent-browser
# For E2E flow testing. Connect → snapshot → act → verify cycle.
```

### Phase 4: ACT & VERIFY (The Test Loop)

```
┌─────────────────────────────────────────┐
│  1. Think — What's the expected result?  │
├─────────────────────────────────────────┤
│  2. Pre-check — Is the prerequisite met? │
│     (e.g., "Is the user logged in?")    │
├─────────────────────────────────────────┤
│  3. Act — Perform the action            │
│     (click, fill, navigate, submit)     │
├─────────────────────────────────────────┤
│  4. Verify — Did the expected thing      │
│     happen? Check URL, errors, console,  │
│     network, snapshot                   │
├─────────────────────────────────────────┤
│  5. ✓ Pass → Next step                  │
│     ✗ Fail → Investigate root cause →   │
│              Fix → Re-verify             │
└─────────────────────────────────────────┘
```

### Phase 5: FIX (When Tests Fail)

When a test step fails, the fix loop is:

```
FAILURE DETECTED
    │
    ▼
Is this a known dev-mode flake? (webpack error, chunk load failure)
    ├─ YES → Clear .next cache → restart dev server → re-run test
    └─ NO  → Continue
    │
    ▼
Is the environment broken? (Chrome disconnected, server down)
    ├─ YES → Run setup-workflow nuke → restart → re-run test
    └─ NO  → Continue
    │
    ▼
Isolate the root cause:
    ├─ Console errors? → Debug JS issue
    ├─ API not called? → Component didn't mount / query not triggered
    ├─ API returns wrong data? → Service/DB bug
    ├─ UI doesn't render data? → Component logic bug
    └─ Translation/loading state stuck? → useEffect/suspense bug
    │
    ▼
Fix → Verify build passes → Re-run test → Verify test passes
```

---

## Tool Selection: agent-browser vs Playwright MCP

Both tools are available. The trick is knowing which to use for each sub-task.

| Task | Primary Tool | Why |
|------|-------------|-----|
| Navigate to page | agent-browser | Real Chrome, auth cookies preserved |
| Click button / fill form | agent-browser | Human-like, ref-based (deterministic) |
| Snapshot the page | agent-browser | Interactive refs (@e1, @e2) for next action |
| Screenshot (save to file) | Playwright MCP | Better file save support |
| Check JS errors | agent-browser | `errors --json` is faster |
| Check console (quick) | agent-browser | `console --json` for errors only |
| Inspect console IN FULL | Playwright MCP | `console_messages` shows warn+info too |
| Network summary (did data load?) | agent-browser | `network requests --json` is fast |
| Full request/response DETAILS | Playwright MCP | `network_request` shows headers + body |
| Run JS evaluation | Playwright MCP | Returns complex values, structured data |
| File upload / drag & drop | Playwright MCP | Native event support |
| Multi-step flow | agent-browser `batch` | 1 tool call = many commands |

### Best Practice: The Combo Flow

```
1. agent-browser: open page, snapshot, click, fill, submit
2. agent-browser: quick verification (url, errors, network summary)
3. If data looks wrong or need more detail:
   => Playwright MCP: deep network inspection, full console dump, JS eval
4. agent-browser: continue the user flow
```

Both tools run independently (different browser instances).
agent-browser has auth cookies; PMCP is headless. Use accordingly.

## Test Strategy by Type

### A. E2E Flow Tests (agent-browser + PMCP combo)

```yaml
Use when: Testing a complete user flow end-to-end
Primary tool: agent-browser CLI (real Chrome, auth preserved)
Diagnostic tool: Playwright MCP (deep request/response inspection)
Skill: sportologyplus-agent-browser
Category: test-automation
Load: agent-browser skill via load_agent_browser_skill tool
Flow: connect => snapshot => act => verify (loop)
Deep dive: PMCP network_request for failed API calls
Fix loop: /ulw-loop
```

### B. Unit/Integration Tests (Vitest / Playwright programmatic)

```yaml
Use when: Testing API endpoints, database queries, utility functions
Tool: pnpm run vitest run (for Vitest tests)
       pnpm run playwright test (for Playwright programmatic tests)
Category: test-automation
Flow: think => run test => read output => fix => re-run
```

---

## 🔥 INT Test Suite Reference

| Test ID | Flow | Pages | Key API Calls |
|---------|------|-------|--------------|
| INT-01 | Student purchases course with coupon | `/courses/[id]` → checkout → wallet | `coupon.validate`, `enrollment.create`, `wallet.transaction` |
| INT-02 | Course lifecycle (create → publish → enroll → complete) | `/admin/courses` → `/courses/[id]` → `/student/courses` | `course.create`, `course.publish`, `enrollment.list`, `progress.update` |
| INT-03 | User registration → profile → role-based access | `/auth/signup` → `/profile` → role dashboards | `auth.register`, `user.update`, `role.verify` |
| INT-04 | Admin creates coupon → student applies → validation | `/admin/coupons` → `/checkout` | `coupon.create`, `coupon.validate`, `coupon.apply` |
| INT-05 | Course search + filters + pagination | `/careers/jobs` → filter → paginate | `course.list`, `recommendations.get` |
| INT-06 | Notification flows (in-app + WhatsApp) | Any trigger action | `notification.send`, `notification.list` |
| INT-07 | Payment gateway + webhook handling | `/checkout` → Paymob → callback | `payment.create`, `payment.webhook`, `wallet.credit` |

---

## ⚡ Common Bugs by Root Cause Category

### Category A: SSR/Client Mismatch (Next.js App Router)

| Symptom | Pattern | Fix |
|---------|---------|-----|
| Server has data, client shows empty | `useEffect(() => setState(serverData), [])` runs AFTER SSR render | Don't double-initialize state. Read server data once, use it as source of truth. |
| Hydration warning | Client HTML ≠ Server HTML | Use `suppressHydrationWarning` or ensure deterministic render. |
| "Text content does not match" | Translation strings not available on client | Load translations synchronously or use `useEffect`-only rendering. |

### Category B: Data Fetching (tRPC + React Query)

| Symptom | Pattern | Fix |
|---------|---------|-----|
| Data never loads | Query not enabled, no `_key` parameter, component conditionally renders | Ensure query is enabled and key params match. |
| Stale/wrong data | Cache not invalidated after mutation | Use `trpc.useUtils().some.invalidate()` after mutations. |
| Double fetch | StrictMode double-render in dev | Normal in dev; check production behavior. |

### Category C: Runtime Errors

| Symptom | Pattern | Fix |
|---------|---------|-----|
| `TypeError: Cannot read properties of undefined (reading 'call')` | Webpack Lazy component — dev mode flake | Clear `.next` cache, restart dev server. |
| `TypeError: X is not a function` | Component rendered before import resolved | Check for circular imports, dynamic import order. |
| `Maximum update depth exceeded` | Infinite loop in `useEffect` | Check dependency array. |

---

## 🚫 What NOT to Do

| ❌ Don't | ✅ Instead | Why |
|----------|-----------|-----|
| Re-run the same failing test 3 times hoping it passes | Investigate root cause | 99% chance it'll fail again the same way |
| Edit 5 files trying to fix a webpack error | Clear `.next` cache and restart | It's almost always a dev-mode HMR corruption |
| Start testing without verifying DB state | `pnpm run db:seed:all` first | Tests depend on seed data (users, courses, coupons) |
| Skip setup thinking "it was working earlier" | Run the 90-second setup anyway | Chrome CDP dies when Chrome updates/reopens |
| Use Playwright MCP `page.click()` in agent-browser context | Use `agent-browser click @e1` | agent-browser has its own ref-based DOM system |
| Write a new test to verify a known bug is fixed | Manually test the fix, then update existing test | Tests live in the repo; don't commit test-for-bug |
| Fix a test assertion without understanding the real bug | Trace the actual bug's root cause first | You'll just miss the real issue |

---

## ⚠️ CRITICAL: agent-browser Daemon & Non-Blocking

agent-browser uses a **client-daemon architecture**. The daemon starts on the first command and persists:

```
# ✅ Each command is a separate bash call (except open which needs timeout)
bash tool: agent-browser --auto-connect open http://localhost:3000 --headed   # timeout=15000
bash tool: agent-browser get url                                               # quick
bash tool: agent-browser snapshot -i                                           # quick
bash tool: agent-browser click @e1                                             # quick
```

**`agent-browser open` starts a daemon that stays alive** — the bash tool treats it as running forever.
**Solution**: Always pass `timeout=15000` to the bash tool call for `open` commands.
**`agent-browser close` DESTROYS the daemon AND all cookies** — never close unless starting fresh.

## Quick Start (One-Shot Test Run)

```powershell
# 1. Load this skill
# Already loaded

# 2. Setup environment (delegates to setup-workflow)
# Run: setup sequence (kill => dev server => Chrome)

# 3. Run E2E test (agent-browser + PMCP combo)
# agent-browser: navigate, click, fill, snapshot
# ⚠️ open commands need bash tool timeout=15000
# PMCP: deep network inspection on suspicious APIs

# 4. Unit/integration tests
# pnpm run vitest run [test-file]

# 5. On failure: investigate, fix, re-verify
# Use /ulw-loop for automated fix loop
```

## The /ulw-loop Integration

When using `/ulw-loop`, the loop follows this protocol:

1. **THINK**: What does this test verify? What's the expected outcome?
2. **CHECK SETUP**: Is the environment ready? (If not, delegate to setup-workflow)
3. **ACT**: Run the test using the right tool:
   - Main flow => agent-browser
   - Deep diagnostic => PMCP
4. **VERIFY**:
   - agent-browser: `get url`, `errors --json`, `console --json`, `network requests --json`, `snapshot -i`
   - PMCP: full request details on failed API calls
5. **ON FAILURE**:
   - Classify (dev flake? env issue? code bug?)
   - Fix at root cause
   - Re-verify with same test
6. **ON SUCCESS**: Mark complete, move to next step

The loop does NOT continue past failures. Each failure is investigated and fixed before proceeding.
