---
name: sportologyplus-agent-browser
description: Human-like E2E browser testing for Sportology (Edrak) with agent-browser CLI. Connects to REAL Chrome via --auto-connect (auth preserved). Uses ref-based snapshots (@e1, @e2) — deterministic, 93% fewer tokens than DOM. Detects 7 failure modes. Think like a human tester, never ignore errors. Uses test-automation category for model routing.
argument-hint: describe which flow to test or what to investigate (e.g., "run INT-01 coupon-purchase flow", "investigate why wallet deduction fails", "verify INT-02 course lifecycle")
---

# Edrak Agent-Browser -- Think, Check, Act, Verify

> **Tool**: agent-browser CLI (primary driver for real Chrome)
> **Combo**: Playwright MCP (deep diagnostics -- network request details, console, eval)
> **Connection**: `--headed --auto-connect` to user's REAL Chrome
> **Snapshots**: ref-based (`@e1`, `@e2`) -- deterministic, no a11y guessing
> **Fix Cycle**: `/ulw-loop` -- investigate every failure before continuing
> **Model Routing**: `test-automation` category

## 🏗️ CRITICAL: Client-Daemon Architecture (Non-Blocking Pattern)

agent-browser uses a **client-daemon architecture**:
- The **daemon** starts automatically on the first command and **persists in background** between commands
- Each CLI invocation (`open`, `snapshot`, `click`, etc.) is a **quick client call** to the running daemon
- The daemon keeps cookies, sessions, and browser state alive across all calls
- `agent-browser close` **destroys the daemon AND all cookies/sessions** — never close unless you want a fresh start

### Non-Blocking Execution Pattern (MANDATORY)

**`agent-browser open` starts a daemon that stays alive.** The bash tool sees this as a "still running" process. **Use bash tool timeout (15-20s)** to prevent blocking:

```powershell
# ✅ CORRECT: Use timeout parameter on bash tool
# bash with timeout=15000 → lets daemon start, then returns control
agent-browser --auto-connect open http://localhost:3000 --headed

# ❌ WRONG: No timeout will hang the shell tool forever
```

**Each subsequent command** is quick (<1s) and does NOT need a special timeout:
```powershell
agent-browser get url                    # Get current URL (NOT "agent-browser get url")
agent-browser snapshot -i                # Get interactive snapshot with refs
agent-browser click @e1                  # Click by ref
```

### Important Notes
1. **`--headed` is cached**: If you first opened headless and then need headed, you must `agent-browser close` first (which destroys cookies!)
2. **Daemon port/socket**: The daemon uses a socket file — killing Chrome doesn't kill the daemon
3. **Recovery**: If daemon is stuck, kill it: `Get-Process agent-browser -ea 0 | Stop-Process -Force`
4. **Session naming**: Use `--session mysession` for multiple isolated browser instances

## Core Philosophy: Think First, Then Act

### Before ANY action, ask:
1. **Is the dev server running?** => If no, load `sportologyplus-setup-workflow` FIRST
2. **Is Chrome connected?** => If no, `agent-browser --auto-connect open http://localhost:3000 --headed` (with timeout)
3. **What page am I on?** => `agent-browser get url` (cheapest check)
4. **What do I expect to happen?** => Define success before clicking
5. **Which tool for this task?** => Navigation/click/fill/snapshot = agent-browser. Deep network/console = PMCP.

### After EVERY action, verify:
1. **Did the URL change?** => `agent-browser get url`
2. **Any JS errors?** => `agent-browser errors --json`
3. **Any console errors?** => `agent-browser console --json`
4. **Did APIs respond?** => `agent-browser network requests --json`
5. **Page look right?** => `agent-browser snapshot -i`

### When something fails: **STOP. Investigate Root Cause. Fix. Never skip.**

---

## 🚀 Pre-Flight Checklist (Before Every Test Session)

```powershell
# 0. LOAD THIS SKILL FIRST (you're reading it, good)
# 1. Load setup-workflow if server/Chrome might not be running
skill sportologyplus-setup-workflow

# 2. Quick health check
# ⚠️ IMPORTANT: This bash call MUST use timeout=15000 (daemon starts and persists)
agent-browser --auto-connect open http://localhost:3000 --headed
if ($LASTEXITCODE -ne 0) {
    Write-Output "❌ Can't connect — run setup-workflow sequence"
}
```

## 🔗 Connect → Snapshot → Act → Verify (The Only Cycle)

### Step 1: Open Page
```powershell
# ⚠️ bash tool MUST use timeout=15000 for this command (daemon starts in background)
agent-browser --auto-connect open http://localhost:3000/careers/jobs --headed
# Returns immediately with connection status
```

### Step 2: Quick Health Check
```powershell
# DO THESE IN PARALLEL (one call each, no waiting)
agent-browser get url
agent-browser errors --json
agent-browser console --json
```

### Step 3: Snapshot (See What's Clickable)
```powershell
agent-browser snapshot -i
# Returns refs like:
# - link "Courses" [ref=e5]
# - button "Login" [ref=e12]
# - textbox "Email" [ref=e18]
```

### Step 4: Act Using Refs (Deterministic)
```powershell
agent-browser click @e5        # Clicks exact element
agent-browser fill @e18 "text" # Types into exact field
agent-browser select @eX "opt"  # Select dropdown option
```

### Step 5: Wait For Settle
```powershell
agent-browser wait 2            # Let React/Turbo render
```

### Step 6: Verify Everything
```powershell
# Run ALL of these — they're cheap
agent-browser get url
agent-browser errors --json
agent-browser console --json
agent-browser network requests --json
agent-browser snapshot -i
```

## ⚡ Token-Efficient Batch Mode

For multi-step flows, use `agent-browser batch` to save context tokens:

```powershell
# Instead of 5 separate commands → 1 batch call
agent-browser batch --bail `
    "open http://localhost:3000/careers/jobs" `
    "snapshot -i" `
    "click @e5" `
    "wait 2" `
    "get url" \`
    "errors --json" `
    "console --json" `
    "network requests --json" `
    "snapshot -i"

# With --bail: stops on first error and reports it
```

**Token savings**: 9 individual commands = 9 tool calls × overhead. 1 batch = 1 tool call.

---

## 🔍 Advanced Debugging Patterns

### Pattern A: Page Loads But Shows Empty State ("No Jobs Found" etc.)

```powershell
# 1. Check if API returned data
agent-browser network requests --json
# Look for: tRPC calls — did they return 200 with data?

# 2. Check console for errors (even subtle ones)
agent-browser console --json

# 3. Check JS errors specifically
agent-browser errors --json

# 4. Check the raw HTML (RSC payload may have data)
# Use Playwright JS evaluation to examine React state
agent-browser eval "() => { console.log('RSC data check'); }"
```

**Common causes**:
- **SSR initialData overridden by client-side effect** (our bug: filter useEffect clearing accumulatedJobs on mount)
- **tRPC query never fires** (component didn't mount due to webpack error)
- **Translation key not found** (translations object doesn't have the key)
- **RSC payload has data but component doesn't render it** (hydration mismatch)

### Pattern B: Webpack `Cannot read properties of undefined (reading 'call')` Error

```yaml
# This error in <Lazy> component:
#   TypeError: Cannot read properties of undefined (reading 'call')
#     at options.factory (webpack.js:704)
#     at resolveLazy (react-dom-client.development.js)
#     ErrorBoundaryHandler → "Something went wrong"
```

**This is a DEV-MODE FLUKE, not a code bug.**

| Cause | Fix |
|-------|-----|
| Turbopack HMR cache corrupted | `Remove-Item -Recurse -Force ".next"` → restart dev server |
| Stale module reference in RSC payload | Reload page (hard refresh). If persists → clear cache |
| Module factory not registered | Full sequence: kill Chrome → clear `.next` → restart both |

**Rule**: If you see this error, DON'T edit code. Clear `.next` cache and restart. Takes 30 seconds total.

### Pattern C: Checking tRPC / API Responses

```powershell
# List network requests
agent-browser network requests --json
# Look for: tRPC calls, fetch URLs, response status codes

# Check specific API call details
agent-browser network request 1   # Get full request/response for request #1
```

**Key things to look for in responses**:
- `total: null` or `pages: null` → service might not be computing pagination
- Empty `jobs: []` → query filters may be too restrictive or service has a bug
- No network request at all → component never mounted (check for errors)
- `500` status → backend error, check server logs

### Pattern D: React Query Cache Inspection (Next.js App Router)

```javascript
// Next.js 15 App Router uses `__next` global — React Query may not be accessible directly
// Check for query client in devtools:
agent-browser eval "() => {
  // Try React DevTools hooks
  const fiber = document.getElementById('__next')?.__reactFiber$;
  console.log('React root:', fiber ? 'found' : 'not found');
}"
```

**For App Router pages**, the RSC payload is streamed via `self.__next_f.push(...)`. This means:
- No `__NEXT_DATA__` script (that's Pages Router)
- No global React Query client exposed
- Data is in the RSC stream, not in global variables
- Best way to debug: check `agent-browser network requests --json` for the tRPC POST calls

---

## Playwright MCP Combo (Deep Diagnostic Layer)

Playwright MCP tools provide deeper inspection than agent-browser can do alone.
Use them to supplement agent-browser when you need full request/response details.

### PMCP Tools Available

| Tool | What It Does | When to Use Instead of agent-browser |
|------|-------------|--------------------------------------|
| `playwright_browser_network_requests` | Lists all network requests with status, method, URL | When agent-browser `network requests --json` doesn't show enough detail |
| `playwright_browser_network_request` | Full headers + request/response body for a specific request | When you need to inspect the actual API response payload or request body |
| `playwright_browser_console_messages` | All console messages with level (info, warn, error) | When you need warnings+info, not just errors |
| `playwright_browser_evaluate` | Run arbitrary JS, return complex values | When agent-browser `evaluate` can't return structured data |
| `playwright_browser_snapshot` | a11y tree snapshot (alternative format) | When you need a different snapshot format than agent-browser |
| `playwright_browser_take_screenshot` | Full-page or element screenshot | When you need a saved screenshot file |

### The Combined Workflow

```
1. agent-browser: navigate to page, click, fill, submit (real Chrome, auth preserved)
2. agent-browser: quick check (url, errors, console, network summary)
3. If something suspicious => Playwright MCP:
   a. Navigate PMCP to the SAME url
   b. Check network request DETAILS (headers, bodies)
   c. Get ALL console messages (including warnings, info)
   d. Evaluate JS to inspect React component state
4. agent-browser: continue the flow with next action
```

**Important**: PMCP opens its OWN headless browser (separate from the user's Chrome).
This means no auth cookies. Use PMCP only for diagnostic inspection, not for the main flow.

## The 7 Failure Modes -- Detection & Root Cause

| # | Symptom | What to Check | Most Common Root Cause |
|---|---------|--------------|----------------------|
| 1 | Page shows error boundary ("Something went wrong") | `agent-browser errors --json` | Webpack chunk loading failure (dev fluke). Clear `.next` cache. |
| 2 | Page loads but shows empty/no data | `agent-browser network requests --json` | Component never mounted (error), or effect clears data on mount |
| 3 | API returns data but UI doesn't show it | Snapshot shows UI state vs API response mismatch | SSR initialData overwritten by client-side state initialization |
| 4 | Button click does nothing | `agent-browser errors --json`, check if button is disabled | JS error before click handler fires, or button disabled in snapshot |
| 5 | Form submit doesn't save | `agent-browser network requests --json` — no POST? | Validation fail (silent), or submit handler crashes |
| 6 | Translation key showing as text (e.g., "searchPlaceholder") | `agent-browser console --json` for errors | Translations object doesn't contain the key, or hook crashed before loading |
| 7 | URL not changing after navigation | `agent-browser get url` | Link not clickable, router.push failed, or error boundary caught navigation |

## ⚠️ Common Mistakes (Token Wasters)

| ❌ Mistake | 💀 Why It's Bad | ✅ Fix |
|-----------|----------------|-------|
| Running `agent-browser open` without bash tool timeout | Shell blocks forever (daemon starts and persists) | Use bash tool `timeout=15000` for open commands |
| Using the command `url` in batch (should be `get url`) | Errors in batch output | Use `"get url"` instead of `"url"` |
| Re-snapshotting the same page 5 times | Token waste, no new info | Snapshot once, use refs, re-snapshot only after DOM-changing actions |
| Checking `console --json` when page has no errors | Token waste | Check `errors --json` first (cheaper), then `console --json` if suspicious |
| Not using batch for multi-step flows | 5x more tool calls | `agent-browser batch --bail "cmd1" "cmd2" "cmd3"` |
| Debugging webpack errors by reading code | Wasted time — it's a dev fluke | `Remove-Item .next -Force -Recurse` → restart dev server |
| Sequential verification (url, then console, then errors, then network) | 4 sequential tool calls | Fire verification commands in parallel, or use batch |
| Using old refs from previous snapshot | Click wrong element / get `ref not found` | Always re-snapshot after any page change |
| Assuming data is present without checking | Bug goes undetected | Always `network requests --json` to confirm API response |
| Not checking URL after navigation | Stuck on same page thinking you navigated | Always `agent-browser get url` after click |

## 🧪 Think Like a Human Tester Checklist

```
Before clicking:   "Is this the right page? Is the element visible? Has the page finished loading?"
After clicking:    "Did the URL change? Any errors? Did data load? Does the page look right?"
On error:          "STOP. What's the actual error? Is this my code or a dev fluke? What's the root cause?"
On empty state:    "Is the API returning data? Is the component mounting? Did something clear the data?"
On success:        "Verified. Move to next step."
```

## 🔄 Auto-Fix Pattern

```powershell
/ulw-loop
# Agent will:
# 1. Think → 2. Check setup → 3. Act → 4. Verify → 5. Fix if fail → 6. Re-verify
# Loop until all steps pass or unrecoverable error.
```
