---
name: sportologyplus-setup-workflow
description: MUST LOAD before ANY testing work. Covers Windows/PowerShell-specific dev environment setup for Sportology (Edrak): Chrome remote debugging, persistent dev server, agent-browser connection setup, and common Windows pitfalls. Prevents the setup-loops that waste time.
argument-hint: describe what needs to be set up (e.g., "start dev server and Chrome for INT-01 testing", "verify database is seeded", "setup complete environment")
---

# Edrak Setup Workflow -- Think First, Then Execute

> **Environment**: Windows 10/11, PowerShell 5.1
> **Framework**: Next.js 15 (App Router) + pnpm
> **Testing Tools**: agent-browser CLI (primary) + Playwright MCP (deep diagnostics)
> **Project root**: `D:\clones\edrak`

## GOLDEN RULE: Think First, Then Execute

**Before running a single command, answer these 3 questions:**
1. Is the dev server running? If not => start it in a PERSISTENT window
2. Is Chrome running with `--remote-debugging-port=9222`? If not => kill ALL Chrome and relaunch
3. Is agent-browser connected? If not => `agent-browser --auto-connect`

**NEVER** start debugging a page issue until you've verified all 3.

## CRITICAL: PowerShell != Bash

Every command is for **Windows PowerShell 5.1**. No bash patterns.

| Bash | PowerShell | Gotcha |
|------|-----------|--------|
| `cmd1 && cmd2` | `cmd1; if ($?) { cmd2 }` | `&&` NOT SUPPORTED |
| `cd dir && pnpm dev` | Use `-WorkingDirectory` or `cd dir; pnpm dev` | `cd` + `&&` fails silently |
| `export VAR=val` | `$env:VAR = "val"` | Completely different syntax |
| Run a `.ps1` script | Use `powershell.exe -Command` or `cmd /c` | `Start-Process` can't run `.ps1` directly |

## ⚠️ agent-browser Daemon Architecture (Critical)

agent-browser uses a **client-daemon architecture**:
1. **Daemon starts automatically** on the first command (e.g., `agent-browser open`)
2. **Daemon persists in background** between commands — keeps cookies, state, sessions
3. Each subsequent command (`click`, `fill`, `snapshot`) is a **quick client call** to the daemon
4. **`agent-browser close` DESTROYS the daemon AND all cookies** — never close unless you want to re-login

### Non-Blocking Usage Pattern (the fix for "shell gets stuck")

```powershell
# ❌ WRONG: This blocks the bash tool indefinitely (daemon stays alive)
agent-browser --auto-connect open http://localhost:3000 --headed

# ✅ CORRECT: Use bash tool with timeout=15000 — lets daemon start, returns control
# Pass timeout parameter to the bash tool call itself
```

**For every `agent-browser open` command, the bash tool call MUST have `timeout=15000` or similar.**
Individual commands like `snapshot`, `click`, `fill` finish instantly and don't need a timeout.

### Recovery (Daemon Stuck)

```powershell
# Kill daemon without closing Chrome
Get-Process agent-browser -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Reconnect (Chrome and Dev server stay running)
agent-browser --auto-connect open http://localhost:3000 --headed
```

## The 60-Second Setup (One-Shot, Clean)

This is the ONLY setup sequence. ONE window each. No extras.

```powershell
# === STEP 1: KILL EVERYTHING (clean slate) ===
# Chrome MUST be killed first -- --remote-debugging-port only works on FIRST instance
# Kill ALL Chrome processes without exception
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
# Kill dev server if running
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-1) } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# === STEP 2: START DEV SERVER (SINGLE PERSISTENT WINDOW) ===
# CRITICAL: Start-Process with -WorkingDirectory. No nested "start" trickery.
# This opens EXACTLY ONE cmd window. The /k flag keeps it open.
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pnpm run dev" -WorkingDirectory "D:\clones\edrak"
Start-Sleep -Seconds 15

# Verify dev server is listening
$devServer = $false
try {
    $r = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
    $devServer = $r.StatusCode -eq 200
    Write-Output "Dev server: READY ($($r.StatusCode))"
} catch {
    Write-Output "Dev server: waiting..."
    Start-Sleep -Seconds 10
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
        $devServer = $r.StatusCode -eq 200
        Write-Output "Dev server: READY ($($r.StatusCode))"
    } catch {
        Write-Output "Dev server: FAILED -- check console window for errors"
    }
}

# === STEP 3: LAUNCH CHROME (SINGLE WINDOW, NO SESSION RESTORE) ===
# Chrome is already killed in step 1, so this WILL bind port 9222
# --no-session-restore prevents previous tabs from opening
# Direct URL at localhost:3000 = no blank window
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList `
    "--remote-debugging-port=9222", `
    "--user-data-dir=C:\Users\omara\AppData\Local\Google\Chrome\User Data", `
    "--no-first-run", `
    "--no-default-browser-check", `
    "--no-session-restore", `
    "http://localhost:3000"
Start-Sleep -Seconds 8

# Verify CDP endpoint
$chromeReady = $false
try {
    $cdp = Invoke-WebRequest -Uri "http://localhost:9222/json/version" -TimeoutSec 5 -UseBasicParsing
    $chromeReady = $true
    Write-Output "Chrome CDP: READY"
} catch {
    Write-Output "Chrome CDP: FAILED -- kill ALL Chrome and retry"
}

# === STEP 4: VERIFY ===
if ($devServer -and $chromeReady) {
    Write-Output "ALL SYSTEMS GO -- proceed with testing"
} else {
    Write-Output "Setup incomplete -- see failures above"
}
```

## The Playwright MCP Combo (Deep Diagnostics)

Playwright MCP complements agent-browser by providing deep request/response inspection that agent-browser can't do (full headers, request bodies, response payloads).

**The combo pattern**:
```
agent-browser  => Main flow (navigation, clicks, fills, screenshots, snapshots)
Playwright MCP => Deep diagnostics (network request/response details, console, JS evaluation)
```

**How to use PMCP alongside agent-browser**:
1. Start with agent-browser for the main test flow (user's real Chrome, auth preserved)
2. When you need deep network details on a specific page, fire Playwright MCP tools:
   - `playwright_browser_navigate` to the same URL
   - `playwright_browser_network_requests` to list all requests with full details
   - `playwright_browser_network_request` to inspect headers + body of specific requests
   - `playwright_browser_console_messages` to get ALL console output including warnings
   - `playwright_browser_evaluate` to run arbitrary JS and get complex return values

**When to use which**:
| Task | Tool |
|------|------|
| Navigate to a page | agent-browser (real Chrome, auth preserved) |
| Click a button / fill a form | agent-browser (human-like, ref-based) |
| Take a screenshot / snapshot | agent-browser (headed, visible, refs) |
| Check if data loaded (summary) | agent-browser `network requests --json` |
| Inspect full request/response DETAILS | Playwright MCP `network_request` (headers + body) |
| Run JS and get complex return value | Playwright MCP `evaluate` |
| Upload a file / drag & drop | Playwright MCP (native event support) |
| Get ALL console messages incl warnings | Playwright MCP `console_messages` |
| Check JS errors on page | agent-browser `errors --json` (faster) |

## Recovery: When Something Breaks

### Symptom => Root Cause => Fix

| Symptom | What Actually Happened | Fix |
|---------|----------------------|-------------------|
| `ERR_CONNECTION_REFUSED` | Dev server died | Kill Chrome => restart both (full steps 1-4) |
| `No running Chrome instance` | Chrome was killed or never launched with `--remote-debugging-port` | Kill ALL Chrome => relaunch with flag |
| agent-browser commands hang | Daemon lost connection | `agent-browser close --all` => reconnect |
| Webpack `Cannot read properties of undefined (reading 'call')` | Turbopack HMR cache corrupted => stale module references | Clear `.next` cache => restart dev server |
| `--headed` flag ignored | Daemon started headless, config is cached | `agent-browser close --all` => reconnect with `--headed` |
| Page shows "Something went wrong" error boundary | Chunk loading failure (dev mode artifact) | Reload page. If persistent => clear `.next` and restart dev server |
| Snapshot refs don't match | Chrome was killed/restarted between snapshots | Re-snapshot |
| Two Chrome windows open | Session restore opened previous tabs + new window | Already fixed with `--no-session-restore` above |

### The 15-Second Nuke (For When Everything Is Broken)

```powershell
# Kill it all
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-2) } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# If Turbopack corruption suspected
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue

# Restart fresh -- ONE cmd window, ONE Chrome window
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pnpm run dev" -WorkingDirectory "D:\clones\edrak"
Start-Sleep -Seconds 20
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=C:\Users\omara\AppData\Local\Google\Chrome\User Data", "--no-first-run", "--no-default-browser-check", "--no-session-restore", "http://localhost:3000"
Start-Sleep -Seconds 8
Write-Output "Nuked and restarted"
```

## What NOT to Do (From Painful Experience)

| Don't | Instead | Why |
|-------|---------|-----|
| Run `pnpm run dev` directly in shell tool | Start-Process with -WorkingDirectory in persistent cmd window | Shell timeout kills it after 60-120s |
| Use `start "" cmd /k cd /d D:\clones\edrak && pnpm run dev` | `Start-Process cmd.exe "/k pnpm run dev" -WorkingDirectory D:\clones\edrak` | Creates TWO cmd windows instead of one |
| Use `--new-window about:blank` for Chrome | Use `--no-session-restore http://localhost:3000` without --new-window | Opens TWO Chrome windows (session restore + blank) |
| Start debugging without checking setup | Verify: dev server up? Chrome on 9222? | Wasted time debugging connection issues |
| Kill Chrome but leave dev server during nuke | Kill BOTH | They can have cache interdependence |
| Fix webpack errors by editing code | Clear `.next` cache and restart dev server | Dev-mode HMR bug, not your code |
| Start multiple Chrome instances | Kill ALL Chrome, launch ONE with --remote-debugging-port | Only first instance binds debug port |

## Quick Setup Reference (One-Shot Copy-Paste)

Run this entire block. Creates exactly 1 cmd window + 1 Chrome window.

```powershell
# STEP 1: Kill
Get-Process chrome -ea 0 | Stop-Process -Force
Get-Process node -ea 0 | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-1) } | Stop-Process -Force -ea 0
Start-Sleep 3; Remove-Item -Recurse -Force ".next" -ea 0

# STEP 2: Dev server -- ONE window
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pnpm run dev" -WorkingDirectory "D:\clones\edrak"

# STEP 3: Chrome -- ONE window, at target URL
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=C:\Users\omara\AppData\Local\Google\Chrome\User Data", "--no-first-run", "--no-default-browser-check", "--no-session-restore", "http://localhost:3000"

# Wait for both
Start-Sleep 20

# STEP 4: Verify
try { Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Output "Dev=3000 OK" } catch { Write-Output "Dev FAIL" }
try { Invoke-WebRequest http://localhost:9222/json/version -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Output "Chrome CDP=9222 OK" } catch { Write-Output "Chrome FAIL" }
```
