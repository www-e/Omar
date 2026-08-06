---
name: sportologyplus-ultimate-testing
description: Ultimate testing skill for Edrak (Sportology Plus) platform. Master of hydration error recovery, tool selection (agent-browser vs Playwright MCP), and systematic debugging. Think → Verify → Act → Validate → Fix loop. Always understand before executing. Uses test-automation category for optimal model routing.
argument-hint: describe what to test (e.g., "run INT-02 full lifecycle", "test course enrollment flow", "verify payment integration")
---

# 🧪 Ultimate Edrak Testing Skill — Master Protocol

> **Philosophy**: Think First, Verify Setup, Act Systematically, Validate Thoroughly, Never Skip Investigation
> **Tools**: agent-browser (primary) + Playwright MCP (deep diagnostics) + Recovery Protocol
> **Pattern**: Hydration-aware testing with automatic fallback and systematic debugging
> **Model**: test-automation category

---

## 🔴 MASTER GOLDEN RULE: The 5-Question Protocol

**Before ANY action, answer these 5 questions:**

1. **What am I testing?** (Which INT test? Which specific flow? Which assertion?)
2. **What's the expected outcome?** (What should happen? What should render? What API should fire?)
3. **What could go wrong?** (Empty state? Error? Wrong data? Permission? Hydration?)
4. **Is the environment ready?** (Server? Chrome? Database? Cache clean?)
5. **Which tool for this task?** (agent-browser? PMCP? Both? Recovery needed?)

**If you can't answer ALL 5 → STOP → Investigate → Then proceed.**

---

## 🚨 CRITICAL: Hydration Error Handling (New Protocol)

### Detection

**Symptoms:**
- Form fields not rendering
- Page shows error boundary ("Something went wrong")
- Button/text appears but clicking does nothing
- Webpack errors: `Cannot read properties of undefined (reading 'call')`

**Immediate Detection Command:**
```bash
agent-browser errors --json | grep -i "hydration\|mismatch"
```

### Recovery Protocol (The 60-Second Fix)

**IMPORTANT**: If you're connected to an external agent's server (like opencode), coordinate before killing.

**Option A: You Own the Server (Full Control)**
```powershell
# STEP 1: Kill everything
Get-Process chrome -ea 0 | Stop-Process -Force
Get-Process node -ea 0 | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-2) } | Stop-Process -Force -ea 0
Start-Sleep 3

# STEP 2: Clear .next cache (CRITICAL for hydration)
Remove-Item -Recurse -Force ".next" -ea 0

# STEP 3: Restart dev server
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pnpm run dev" -WorkingDirectory "D:\clones\edrak"
Start-Sleep 20

# STEP 4: Launch Chrome
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList `
    "--remote-debugging-port=9222", `
    "--user-data-dir=C:\Users\omara\AppData\Local\Google\Chrome\User Data", `
    "--no-first-run", `
    "--no-default-browser-check", `
    "--no-session-restore", `
    "http://localhost:3000"
Start-Sleep 8

# STEP 5: Verify
try { Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Output "✓ Server OK" } catch { Write-Output "✗ Server FAIL" }
try { Invoke-WebRequest http://localhost:9222/json/version -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Output "✓ Chrome OK" } catch { Write-Output "✗ Chrome FAIL" }
```

**Option B: External Agent Owns Server (Coordination Required)**
```powershell
# DOCUMENT the issue
# Create bug report with:
# - Error pattern (hydration mismatch)
# - Page URL where it occurs
# - Expected vs actual behavior
# - Screenshot evidence
# REQUEST server restart with .next cache clear
# WAIT for coordination
# Resume testing after restart
```

### Prevention

**Before testing, always check:**
```bash
# Quick health check
agent-browser get url
agent-browser errors --json | head -5
```

**If hydration errors exist → Don't proceed → Request fix**

---

## 🛠️ Tool Selection Mastery

### Decision Tree

```
Need to...                    | Use This              | Why
─────────────────────────────────────────────────────────────────────────
Navigate to page             | agent-browser         | Real Chrome, auth preserved
Click button/fill form       | agent-browser         | Human-like, ref-based (@e1)
Get page snapshot            | agent-browser         | Interactive refs for next action
Quick error check            | agent-browser         | `errors --json` is faster
Quick console check          | agent-browser         | `console --json` for errors
Network summary              | agent-browser         | `network requests --json` fast
Deep network inspection      | Playwright MCP        | Full headers + body
Full console (warn+info)     | Playwright MCP        | `console_messages` shows all
Run JS & get complex data     | Playwright MCP        | `evaluate` returns structured
File upload/drag-drop        | Playwright MCP        | Native event support
Screenshot to file           | Playwright MCP        | Better file save support
```

### The Combo Pattern

```
1. agent-browser: navigate, click, fill, submit (main flow)
2. agent-browser: quick verify (url, errors, network summary)
3. If suspicious → Playwright MCP: deep inspection
4. agent-browser: continue flow
```

### Tool Commands Reference

**agent-browser:**
```bash
# Connect (always with timeout for open commands)
agent-browser --auto-connect open http://localhost:3000 --headed  # timeout=15000

# Navigation
agent-browser open <url>                    # timeout=15000
agent-browser get url                       # Quick check

# Interact
agent-browser snapshot -i                   # Interactive refs
agent-browser click @e1                     # By ref
agent-browser fill @e2 "text"              # Type text
agent-browser select @e3 "option"           # Dropdown

# Verify (run in parallel or batch)
agent-browser get url                       # Where am I?
agent-browser errors --json                 # JS errors
agent-browser console --json                # Console errors
agent-browser network requests --json       # API summary

# Wait
agent-browser wait 2                        # Let React render

# Batch for multi-step
agent-browser batch --bail "cmd1" "cmd2" "cmd3"
```

**Playwright MCP:**
```bash
# Navigate
playwright_browser_navigate("http://localhost:3000/page")

# Deep network inspection
playwright_browser_network_requests()           # List all
playwright_browser_network_request(requestId)  # Full details

# Console
playwright_browser_console_messages()           # All messages (warn+info+error)

# JS evaluation
playwright_browser_evaluate("() => { return document.title }")

# Screenshot
playwright_browser_take_screenshot(path="screenshot.png")
```

---

## 📋 The Testing Flow (Think → Verify → Act → Validate → Fix)

### Phase 1: THINK (What Am I Testing?)

**Before any command, define:**
```
FLOW:      [e.g., Admin creates course → publishes → student enrolls]
PAGES:     [e.g., /admin/courses/new → /admin/courses → /courses/[slug]]
API CALLS: [e.g., trpc.course.create, trpc.course.publish]
EXPECTED:  [e.g., Course record in DB, visible on /courses]
RISK:      [e.g., Hydration blocking form, validation fail]
```

**Output:** A clear test plan with success criteria.

### Phase 2: VERIFY SETUP (Is Environment Ready?)

**Checklist (run in parallel):**
```bash
# 1. Server health
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# 2. Chrome CDP
curl -s -o /dev/null -w "%{http_code}" http://localhost:9222/json/version

# 3. agent-browser connection
agent-browser get url

# 4. Quick error check
agent-browser errors --json | head -3
```

**If ANY check fails → Run Recovery Protocol → Re-verify**

### Phase 3: ACT (Execute the Test Step)

**For each action:**
1. **Pre-check**: "Is the element visible?" → `agent-browser snapshot -i`
2. **Act**: Click/fill/type → `agent-browser click @e1`
3. **Wait**: Let React render → `agent-browser wait 2`
4. **Verify**: Did it work? → `agent-browser get url`

### Phase 4: VALIDATE (Did It Work?)

**Run verification suite:**
```bash
agent-browser get url                           # URL changed?
agent-browser errors --json                     # Any JS errors?
agent-browser console --json                    # Any console errors?
agent-browser network requests --json           # APIs called?
agent-browser snapshot -i                        # Page looks right?
```

**For each assertion:**
- ✅ PASS → Continue to next step
- ❌ FAIL → STOP → Investigate → Fix → Re-verify

### Phase 5: FIX (When Things Fail)

**The Fix Loop:**
```
FAILURE DETECTED
    │
    ▼
Is this a hydration error?
    ├─ YES → Recovery Protocol (clear .next + restart)
    └─ NO  → Continue
    │
    ▼
Is environment broken? (Chrome dead, server down)
    ├─ YES → Kill all → Restart → Re-verify
    └─ NO  → Continue
    │
    ▼
Isolate root cause:
    ├─ Console errors? → Debug JS issue
    ├─ No API call? → Component didn't mount / query not triggered
    ├─ API returns wrong data? → Service/DB bug
    ├─ API returns error? → Backend validation/permission issue
    └─ UI doesn't show data? → Component logic / hydration bug
    │
    ▼
Fix → Verify build passes → Re-run test → Verify test passes
```

**NEVER re-run the same failing test hoping it passes. ALWAYS investigate root cause.**

---

## 🧠 INT Test Suite Reference

| Test ID | Flow | Pages | Key APIs | Hydration Risk |
|---------|------|-------|----------|-----------------|
| INT-01 | Student purchases course with coupon | `/courses/[id]` → checkout → wallet | `coupon.validate`, `enrollment.create`, `wallet.transaction` | Medium (form heavy) |
| INT-02 | Course lifecycle (create → publish → enroll → complete) | `/admin/courses/new` → `/admin/courses` → `/courses/[slug]` | `course.create`, `course.publish`, `enrollment.list`, `progress.update` | **HIGH (create course form)** |
| INT-03 | User registration → profile → role-based access | `/auth/signup` → `/profile` → dashboards | `auth.register`, `user.update`, `role.verify` | Medium (auth forms) |
| INT-04 | Admin creates coupon → student applies → validation | `/admin/coupons` → `/checkout` | `coupon.create`, `coupon.validate`, `coupon.apply` | Low (list pages) |
| INT-05 | Course search + filters + pagination | `/careers/jobs` → filter → paginate | `course.list`, `recommendations.get` | Low (read-only) |
| INT-06 | Notification flows (in-app + WhatsApp) | Any trigger action | `notification.send`, `notification.list` | Low (read-only) |
| INT-07 | Payment gateway + webhook handling | `/checkout` → Paymob → callback | `payment.create`, `payment.webhook`, `wallet.credit` | Medium (external redirect) |

---

## 🔍 Advanced Debugging Patterns

### Pattern A: Form Fields Not Rendering (Hydration)

**Symptoms:**
- Page loads but form fields missing
- "Create" or "Submit" button visible but no inputs
- Hydration errors in console

**Root Cause:**
- Server-rendered form fields → Client hydration fails → Form disappears

**Fix:**
```powershell
# Recovery Protocol
Remove-Item -Recurse -Force ".next"
# Restart server
# Retry test
```

### Pattern B: Page Loads But Shows Empty State

**Symptoms:**
- "No courses found", "No jobs available"
- Table/list is empty
- No error visible

**Diagnosis:**
```bash
# Check if API returned data
agent-browser network requests --json

# Look for:
# - tRPC calls with 200 status
# - Response body has data
# - Total/pages not null
```

**Root Causes:**
- Component never mounted (webpack error)
- tRPC query not enabled
- Filter too restrictive
- Service returns empty

### Pattern C: Button Click Does Nothing

**Symptoms:**
- Click button → No URL change
- No API call triggered
- No error

**Diagnosis:**
```bash
agent-browser snapshot -i    # Check if button is disabled
agent-browser errors --json  # Check for JS errors before click handler
```

**Root Causes:**
- JS error before handler runs
- Button disabled by validation
- Click handler not bound

### Pattern D: API Returns Error

**Symptoms:**
- `network requests --json` shows 400/401/403/500
- Console shows API error

**Diagnosis:**
```bash
# Use Playwright MCP for full details
playwright_browser_network_request(requestId)
# Check request body, response body, headers
```

**Root Causes:**
- 400: Validation fail
- 401: Not authenticated
- 403: Permission denied
- 500: Backend error

---

## ⚡ Common Bugs by Category

### SSR/Client Mismatch (Next.js App Router)

| Symptom | Pattern | Fix |
|---------|---------|-----|
| Server has data, client shows empty | `useEffect(() => setState(serverData), [])` | Don't double-initialize state |
| Hydration warning | Client HTML ≠ Server HTML | Use `suppressHydrationWarning` or fix deterministic render |
| Translation key showing as text | Key missing in client translations | Load translations synchronously |

### Data Fetching (tRPC + React Query)

| Symptom | Pattern | Fix |
|---------|---------|-----|
| Data never loads | Query not enabled, no `_key` param | Ensure query enabled with correct params |
| Stale/wrong data | Cache not invalidated after mutation | Use `utils.some.invalidate()` after mutations |
| Double fetch | StrictMode double-render (dev only) | Normal in dev; check production |

### Runtime Errors

| Symptom | Pattern | Fix |
|---------|---------|-----|
| `Cannot read properties of undefined (reading 'call')` | Webpack Lazy component (dev fluke) | Clear `.next` cache, restart dev server |
| `X is not a function` | Component rendered before import resolved | Check circular imports |
| `Maximum update depth exceeded` | Infinite loop in `useEffect` | Check dependency array |

---

## 🚫 What NOT to Do

| ❌ Don't | ✅ Instead | Why |
|----------|-----------|-----|
| Re-run failing test 3x hoping it passes | Investigate root cause | 99% chance it'll fail the same way |
| Edit 5 files to fix webpack error | Clear `.next` cache and restart | It's a dev-mode HMR corruption |
| Test without verifying DB state | `pnpm run db:seed:all` first | Tests depend on seed data |
| Skip setup thinking "it worked earlier" | Run 90-second setup anyway | Chrome CDP dies when Chrome updates |
| Fix test assertion without understanding bug | Trace actual bug root cause | You'll miss the real issue |
| Use PMCP `page.click()` in agent-browser context | Use `agent-browser click @e1` | Different DOM systems |
| Ignore hydration errors "they're normal" | Fix them immediately | They'll block your progress |

---

## 📊 Test Execution Dashboard

After each test session, document:

```yaml
Test ID: INT-XX
Date: YYYY-MM-DD
Environment:
  Server: Port 3000 (opencode agent) / Local
  Chrome: CDP enabled (port 9222)
  agent-browser: v0.XX.X

Progress:
  Phase 1: ✅ Complete
  Phase 2: ❌ BLOCKED at step X
  Phase 3: ⏸️ Not started

Findings:
  Critical Issues:
    - Hydration error blocking course creation
    - API endpoint returns 500 for coupon validate
  Non-Critical:
    - Translation key "saveBtn" missing
    - Console warning about deprecated API

Recommendations:
  Immediate: Clear .next cache and restart server
  Follow-up: Fix coupon validation service
  Documentation: Update translation files

Artifacts:
  Screenshots: /path/to/screenshots/
  Network logs: /path/to/network-logs.json
  Error logs: /path/to/errors.json
```

---

## 🎯 Success Criteria

A test session is successful when:

1. ✅ All 5 pre-questions answered
2. ✅ Environment verified (server, Chrome, agent-browser)
3. ✅ Test steps executed with Think-Verify-Act-Validate cycle
4. ✅ Failures investigated and documented
5. ✅ Root causes identified (not just symptoms)
6. ✅ Fixes verified before moving on
7. ✅ Report generated with findings and recommendations

---

## 🔄 The /ulw-loop Integration

When using `/ulw-loop`, the agent follows this protocol:

1. **THINK**: What does this test verify? What's the expected outcome?
2. **CHECK SETUP**: Is the environment ready? If not → Recovery Protocol
3. **ACT**: Run the test step using the right tool (agent-browser/PMCP)
4. **VERIFY**: Run verification suite (url, errors, console, network, snapshot)
5. **ON FAILURE**:
   - Classify (hydration? env? code bug?)
   - Fix at root cause
   - Re-verify with same test
6. **ON SUCCESS**: Mark complete, move to next step

The loop does NOT continue past failures. Each failure is investigated and fixed before proceeding.

---

**Remember**: The goal isn't to run tests — it's to **understand what's happening** and **fix what's broken**. Every failure is an opportunity to learn and improve the system. Every hydration error is a signal that the SSR/client contract needs attention. Every bug you find and document makes the platform more robust.

**Be systematic. Be thorough. Never skip investigation.**

---

**Version**: 1.0
**Last Updated**: 2025-06-05
**Based On**: INT-02 execution findings + agent-browser mastery + Playwright MCP integration
