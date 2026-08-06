---
name: opencode-model-management
description: Use this skill when changing, switching, migrating, or debugging AI model configurations for OpenCode, oh-my-openagent, or sub-agents. Covers the 3+ config files involved, the custom-agent gotcha, the `-free` suffix trap (paid vs free model), MCP config separation, session caching behavior, and complete verification workflow. Triggers on: "change model", "switch model", "update model", "migrate to Go plan", "model not working", "sub-agent wrong model", "agent override", "model fallback", "oh-my-opencode config", "opencode.json model", "oh-my-openagent config", "model prefix error", "Invalid agent override", "insufficient balance", "-free suffix", "paid model", "Zen free model", "sub-agent insufficient balance".
---

# OpenCode Model Management Skill

## Overview

This skill guides the complete workflow for changing AI model configurations in an OpenCode + oh-my-openagent setup. It captures hard-won lessons from real debugging sessions covering two distinct failure modes:

1. **The `-free` suffix trap** — A config using `deepseek-v4-flash` (paid, consumes balance) instead of `opencode/deepseek-v4-flash-free` (Zen free, unlimited) causes `"insufficient_balance"` errors when sub-agents spawn. The fix is adding the `opencode/` prefix AND the `-free` suffix.
2. **The custom-agent gotcha** — 24+ project-specific agents (backend-developer, database-architect, etc.) silently fall through to user-level config (or plugin default) because the project config only defines the 10 standard agents.

## The Golden Rule

**There are FOUR config files that can affect which model a sub-agent uses. Missing any one can silently cause fallback to the wrong model.**

| # | File | Scope | Affects |
|---|------|-------|---------|
| 1 | `opencode.json` (project) | Main conversation | Sisyphus (the main UI) |
| 2 | `.opencode/oh-my-openagent.jsonc` (project) | Sub-agents + categories | All project sub-agents |
| 3 | `~/.config/opencode/oh-my-openagent.json` (user) | Global fallback | All projects, all sub-agents |
| 4 | `.mcp.json` (project) | MCP servers | Separate concern, not models |

> **CRITICAL**: File #2 is the most commonly missed. The default config only contains 10 STANDARD agents (sisyphus, prometheus, oracle, metis, momus, atlas, librarian, explore, multimodal-looker, sisyphus-junior). Any project-specific sub-agents (backend-developer, fullstack-developer, database-architect, etc.) defined in `.opencode/agent/*.md` will fall back to the user-level config or plugin's hardcoded default if not explicitly added here.

---

## 1. Config File Locations (Windows)

```powershell
# Project-level (highest priority)
D:\clones\<project>\opencode.json
D:\clones\<project>\.opencode\oh-my-openagent.jsonc
D:\clones\<project>\.mcp.json
D:\clones\<project>\tui.json

# User-level (global fallback)
C:\Users\<USER>\.config\opencode\opencode.jsonc
C:\Users\<USER>\.config\opencode\oh-my-openagent.json
C:\Users\<USER>\.config\opencode\tui.json
```

### Config Merge Behavior (from docs)

| Scenario | Result |
|----------|--------|
| User config only | User config values used |
| Project config only | Project config values used |
| Both (same field) | **Project wins** (closer-to-project overrides) |
| Both (different fields) | Deep merge — both contribute |
| Project has subset of agents | Merged with user config agents |

> **Gotcha**: If the project config only defines `agents.sisyphus`, it only overrides that one agent. All OTHER agents fall back to user config (which may be broken or use a different model).

---

## 2. The 5-Step Model Resolution Pipeline

When a sub-agent is spawned, this is the order of resolution:

```
Step 1: opencode.json → "model" field → Main conversation only
Step 2: oh-my-openagent intercepts → looks up agents.<name>.model
Step 3: If not found → looks up categories.<category>.model
Step 4: If still not found → falls back to PLUGIN DEFAULT (often old/wrong)
Step 5: Provider validates → must be in "provider/model" format
```

### Why Custom Agents Silently Fail

The project at hand defines **24+ custom agents** in `.opencode/agent/*.md`:
- `backend-developer`, `fullstack-developer`, `database-architect`, `ui-designer`
- `security-auditor`, `performance-engineer`, `react-specialist`, etc.
- Plus 7 subagents in `.opencode/agent/subagent/`

But the default `oh-my-openagent.jsonc` only has the 10 STANDARD agents. So when the main agent spawns `task(subagent_type="backend-developer", ...)`:
1. Plugin looks for `agents.backend-developer.model` → **NOT FOUND**
2. Falls through to user-level config
3. If user-level config has wrong/broken model → sub-agent gets wrong/paid model
4. If user-level config also missing → falls to plugin default

**Symptom**: "Main session works fine, but sub-agents error with `insufficient_balance`."

---

### The `-free` Suffix Trap (THE #1 ROOT CAUSE)

The most common root cause of `"insufficient_balance"` errors is using the **paid model name** instead of the **free model name**.

| Model String | Type | Credits | Works |
|--------------|------|---------|-------|
| `opencode/deepseek-v4-flash-free` | Zen free | No credits consumed | ✅ |
| `opencode/deepseek-v4-flash` | Paid | Consumes credits | ❌ (insufficient balance) |
| `deepseek-v4-flash` | Invalid (no prefix) | Falls to paid default | ❌ |
| `deepseek-v4-flash-free` | Invalid (no prefix) | May not resolve at all | ❌ |

**The `-free` suffix is the difference between paying and not paying.**

Common config errors:
- `deepseek-v4-flash` — **TWO bugs**: missing `opencode/` prefix AND missing `-free` suffix → hits the paid model
- `opencode/deepseek-v4-flash` — **ONE bug**: missing `-free` suffix → still hits the paid model
- `opencode/deepseek-v4-flash-free` — **CORRECT**: proper prefix + `-free` suffix

---

## 3. Provider Prefix Requirement

**Every model override MUST use `provider/model` format.** This is the #2 cause of failures.

| Format | Example | Status |
|--------|---------|--------|
| Correct | `opencode/deepseek-v4-flash-free` | Works (Zen free) |
| Correct | `opencode-go/minimax-m3` | Works (Go plan) |
| Wrong | `deepseek-v4-flash` | Invalid — missing provider AND `-free` suffix |
| Wrong | `minimax-m3` | Invalid — missing provider |
| Wrong | `/minimax-m3` | Invalid — empty provider |

### Provider Prefix Mapping

| Provider | Prefix | Typical Models |
|----------|--------|----------------|
| OpenCode Zen (free) | `opencode/` | `deepseek-v4-flash-free`, `kimi-k2.6`, `minimax-m2.7` |
| OpenCode Go (paid) | `opencode-go/` | `minimax-m3`, `minimax-m2.7`, `kimi-k2.6`, `mimo-v2.5-pro`, `qwen3.6-plus` |
| Z.ai Coding Plan | `z-ai/` | `glm-4.7`, `glm-4.7-flash` |

> **ALWAYS run `npx opencode models`** to see available models and their exact names:
> ```
> npx opencode models
> ```

---

## 4. Diagnosis: What's Wrong With My Sub-Agents?

### Symptom → Root Cause Mapping

| Symptom | Most Likely Cause | Check |
|---------|-------------------|-------|
| `"insufficient_balance"` on sub-agent tasks | User-level config uses `deepseek-v4-flash` (paid, no `-free`) instead of `opencode/deepseek-v4-flash-free` | `Get-Content "C:\Users\<USER>\.config\opencode\oh-my-openagent.json" -Raw` |
| `"Invalid agent override: <name> — must be in provider/model format"` | Model string missing provider prefix (e.g., `minimax-m3` without `opencode-go/`) | Run `npx oh-my-opencode doctor` |
| Main session works, sub-agents silently use different model | Custom agent not in project config → falls through to user config or plugin default | Compare `.opencode/agent/*.md` list against `.opencode/oh-my-openagent.jsonc` |
| "I changed the config but nothing changed!" | Session cache — config is read at session start | Restart the session |
| Changes to project config are ignored | Legacy `oh-my-opencode.json` (old name) still exists and wins detection order | `Test-Path ".opencode\oh-my-opencode.json"` |

### Quick Diagnostic Flow

```
Sub-agents failing?
├─ Is it "insufficient_balance"?
│  └─ YES → Check user-level config for missing `-free` suffix
│           (most common: `deepseek-v4-flash` → should be `opencode/deepseek-v4-flash-free`)
├─ Is it "Invalid agent override"?
│  └─ YES → Missing provider prefix. Run `npx oh-my-opencode doctor`
├─ Different model than expected?
│  └─ YES → Custom agent not covered in project config. Check agent list.
└─ Config changes not taking effect?
   └─ Restart the session (/exit + relaunch)
```

---

## 5. Complete Fix Workflow

### Phase 1: Discovery (READ FIRST)

```powershell
# 1. List ALL custom agents defined in the project
Get-ChildItem -Path "D:\clones\<project>\.opencode\agent" -Recurse -Filter "*.md" |
    Where-Object { $_.Name -notlike "ABSOLUTE*" -and $_.Name -notlike "karpathy*" } |
    ForEach-Object { $_.BaseName } | Sort-Object -Unique

# 2. Snapshot current state of all 3 config files
Copy-Item "D:\clones\<project>\opencode.json" "$env:TEMP\opencode.json.bak"
Copy-Item "D:\clones\<project>\.opencode\oh-my-openagent.jsonc" "$env:TEMP\oh-my-openagent.jsonc.bak"
Copy-Item "C:\Users\<USER>\.config\opencode\oh-my-openagent.json" "$env:TEMP\oh-my-openagent.json.bak"

# 3. Check the user-level config for the `-free` suffix trap
Get-Content "C:\Users\<USER>\.config\opencode\oh-my-openagent.json" -Raw |
    Select-String -Pattern '"model"'

# 4. Verify target model is available
npx opencode models | Select-String -Pattern "deepseek-v4-flash"

# 5. Run baseline doctor
npx oh-my-opencode doctor 2>&1 | Tee-Object -FilePath "$env:TEMP\doctor-before.txt"
```

### Phase 2: Fix (TWO files minimum)

#### Scenario A: Fixing `-free` suffix + custom agent coverage (Zen free)

This is the most common fix: the user-level config has `deepseek-v4-flash` (paid, broken prefix) and the project config is missing custom agents.

**File 1: `C:\Users\<USER>\.config\opencode\oh-my-openagent.json`**

Set `"model": "opencode/deepseek-v4-flash-free"` (with proper prefix AND `-free` suffix) for ALL agents + categories.

**File 2: `D:\clones\<project>\.opencode\oh-my-openagent.jsonc`**

Add ALL custom project agents + categories with `"model": "opencode/deepseek-v4-flash-free"`.

See [Section 8](#8-complete-config-templates) for the full templates.

#### Scenario B: Switching to a new model (e.g., Go plan)

All 3 files usually need updating. See [Phase 3 in original](#53-phase-3-refresh-plugin-if-using-oh-my-openagent) below.

### Phase 3: Verification

```powershell
# 1. Validate JSON syntax
node -e "JSON.parse(require('fs').readFileSync('D:/clones/<project>/opencode.json','utf8')); console.log('opencode.json: VALID')"
node -e "const fs=require('fs'); const c=fs.readFileSync('D:/clones/<project>/.opencode/oh-my-openagent.jsonc','utf8'); JSON.parse(c.replace(/\/\/.*$/gm,'').replace(/\/\*[\s\S]*?\*\//g,'')); console.log('project config: VALID')"
node -e "JSON.parse(require('fs').readFileSync('C:/Users/<USER>/.config/opencode/oh-my-openagent.json','utf8')); console.log('user config: VALID')"

# 2. Count free model entries (should equal total agent+category count)
node -e "$j=JSON.parse(require('fs').readFileSync('C:/Users/<USER>/.config/opencode/oh-my-openagent.json','utf8')); $f=Object.values($j.agents).filter(a=>a.model==='opencode/deepseek-v4-flash-free').length; console.log('User: '+$f+'/'+Object.keys($j.agents).length+' agents on free model')"

# 3. Run the doctor
npx oh-my-opencode doctor
# Expected: NO "Invalid agent override" errors

# 4. Check what changed
git status --short
git diff --stat
```

### Phase 4: Restart Session (USER ACTION REQUIRED)

**OpenCode reads config at session start, not dynamically.** The user MUST restart any open sessions (`/exit` + relaunch) for the new config to take effect. This is the most commonly missed step.

> **Symptom if skipped**: "I updated the config but sub-agents still error with `insufficient_balance`!" — Session cache. Restart.

---

## 6. Common Pitfalls & Mistakes

### Pitfall 1: The `-free` Suffix Trap (MOST COMMON)

**Symptom**: `"insufficient_balance"` when launching background sub-agents. Main session works fine.

**Cause**: User-level config has `"model": "deepseek-v4-flash"` instead of `"model": "opencode/deepseek-v4-flash-free"`. Two bugs in one string:
- Missing `opencode/` prefix → doctor reports "must be in provider/model format"
- Missing `-free` suffix → resolves to the paid `deepseek-v4-flash` model

**Fix**: Change EVERY occurrence to `opencode/deepseek-v4-flash-free` in BOTH configs.

### Pitfall 2: Forgetting Custom Project Agents

**Symptom**: Main UI shows new model, sub-agents show old model.

**Cause**: `.opencode/oh-my-openagent.jsonc` only has 10 standard agents, missing 18+ project custom agents.

**Fix**: Add entries for EVERY `.md` file in `.opencode/agent/` and `.opencode/agent/subagent/`.

### Pitfall 3: Missing Provider Prefix

**Symptom**: Doctor reports `Invalid agent override: <name>`.

**Cause**: Model string missing `provider/` prefix (e.g., `minimax-m3` instead of `opencode-go/minimax-m3`).

**Fix**: Always use `provider/model` format. Verify with `npx opencode models`.

### Pitfall 4: Session Cache

**Symptom**: "I changed the config but nothing changed!"

**Cause**: The OpenCode session was started before the config change. Config is read at session start.

**Fix**: Restart the session. Tell the user to `/exit` and relaunch.

### Pitfall 5: Legacy Config File Wins

**Symptom**: New `oh-my-openagent.jsonc` changes are ignored.

**Cause**: Old `oh-my-opencode.json` (legacy name) still exists in the same `.opencode/` directory and wins due to detection order.

**Fix**: Delete the legacy file:
```powershell
Remove-Item -LiteralPath "D:\clones\<project>\.opencode\oh-my-opencode.json" -Force
```

### Pitfall 6: User-Level Config Override

**Symptom**: Project config is correct but sub-agents still use wrong model.

**Cause**: User-level config (`~/.config/opencode/oh-my-openagent.json`) is loaded FIRST as base config. If a field is missing in project config, the user-level value is used.

**Fix**: Either update BOTH files, or make sure the project config has entries for every agent used.

### Pitfall 7: `insufficient_balance` on ONE sub-agent but not others

**Symptom**: Some sub-agents work, others fail with "insufficient balance".

**Cause**: The working agents are in the project config (correct model). The failing agents are NOT in project config → fall through to user config (broken model).

**Fix**: Add the failing agents to the project config, or fix the user-level config.

---

## 7. Doctor Command Reference

```bash
npx oh-my-opencode doctor
```

### Common Doctor Outputs

| Symptom | Meaning | Fix |
|---------|---------|-----|
| `Invalid agent override: <name> — must be in provider/model format` | Missing provider prefix | Add `opencode/` (or `opencode-go/`, `z-ai/`) prefix |
| `TUI plugin entry missing from tui.json` | Plugin UI not registered | Run `npx oh-my-openagent install` |
| `AST-Grep unavailable` | AST-Grep CLI not installed | Install `ast-grep` CLI |
| `GitHub CLI missing` | `gh` not installed | Install from https://cli.github.com/ |

> The first 2 are the ones that BLOCK sub-agent functionality. The last 2 are tooling warnings, not blockers. The doctor will NOT report a wrong `-free` suffix (it only validates format, not whether the model is paid vs free).

---

## 8. Complete Config Templates

### Template: Zen Free (`opencode/deepseek-v4-flash-free`)

**User-level or project-level:**

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/dev/assets/oh-my-opencode.schema.json",
  "agents": {
    // === 10 STANDARD agents ===
    "sisyphus":          { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "prometheus":        { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "oracle":            { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "metis":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "momus":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "atlas":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "librarian":         { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "explore":           { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "multimodal-looker": { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "sisyphus-junior":   { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },

    // === PROJECT CUSTOM agents (ALL from .opencode/agent/*.md) ===
    "accessibility-expert":           { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "api-designer":                   { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "backend-developer":              { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "code-quality-enforcer":          { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "database-architect":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "devops-engineer":                { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "fullstack-developer":            { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "nextjs-developer":               { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "performance-engineer":           { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "react-specialist":               { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "security-auditor":               { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "seo-specialist":                 { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "testing-qa-expert":              { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "typescript-pro":                 { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "ui-designer":                    { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "ui-designer-and-code-perfector": { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "ultimate-nextjs-fullstack-architect": { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },

    // === PROJECT SUB-AGENTS (from .opencode/agent/subagent/*.md) ===
    "cleanup-surgeon":              { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "dev-planner":                  { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "perf-analyzer":                { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "prisma-optimizer":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "security-scanner":             { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "superpowers-code-reviewer":    { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "ux-reviewer":                  { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] }
  },
  "categories": {
    "deep":               { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "visual-engineering": { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "ultrabrain":         { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "quick":              { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "test-automation":    { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "artistry":           { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "unspecified-high":   { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "unspecified-low":    { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] },
    "writing":            { "model": "opencode/deepseek-v4-flash-free", "fallback_models": [] }
  }
}
```

### Template: Go Plan (`opencode-go/minimax-m3`)

Same structure, replace `opencode/deepseek-v4-flash-free` → `opencode-go/minimax-m3` everywhere.

---

## 9. Rollback / Revert Workflow

### Step 1: Capture the original state BEFORE editing

Always read the current state of all 3 files before making changes. Save the output for reference.

### Step 2: Restore each file from your saved original

Use the exact original content. Pay special attention to:
- The original model string (e.g., `opencode/deepseek-v4-flash-free` vs `opencode-go/minimax-m3`)
- Whether the user-level config was already broken (missing prefix or `-free` suffix)
- The original agent list (10 standard, not 24+ custom)

### Step 3: Verify the revert

```powershell
# Confirm all 3 files show the original model
Select-String -Pattern "opencode/deepseek-v4-flash" "opencode.json", ".opencode/oh-my-openagent.jsonc" | Format-Table
```

### Step 4: Restart the session

Same as a forward switch — restart for the reverted config to take effect.

---

## 10. Quick Reference: Provider & Model Names

| Provider | Prefix | Known Models (verify with `npx opencode models`) |
|----------|--------|---------------------------------------------------|
| OpenCode Zen (free) | `opencode/` | `deepseek-v4-flash-free`, `kimi-k2.6`, `minimax-m2.7`, `mimo-v2.5-free` |
| OpenCode Go (paid) | `opencode-go/` | `minimax-m3`, `minimax-m2.7`, `kimi-k2.6`, `mimo-v2.5`, `mimo-v2.5-pro`, `qwen3.6-plus`, `qwen3.7-max`, `deepseek-v4-flash` |
| Z.ai Coding Plan | `z-ai/` | `glm-4.7`, `glm-4.7-flash` |

> **ALWAYS run `npx opencode models` first** to confirm the exact model name and provider prefix. Model names change over time.

---

## 11. The 10-Second Mental Model

When a sub-agent uses the wrong model or errors with `"insufficient_balance"`, ask these 5 questions in order:

1. **Is the user-level config missing the `-free` suffix?** (Most common — `deepseek-v4-flash` vs `deepseek-v4-flash-free`)
2. **Did I restart the session?** (Second most common — session cache)
3. **Does the project config have an entry for THIS specific agent name?** (Custom agent gotcha)
4. **Does the model string have the `provider/` prefix?** (Format check)
5. **Is there a legacy `oh-my-opencode.json` file shadowing the new config?** (Detection order)

If all 5 are checked and correct, the config is right. The issue is elsewhere (network, API key, rate limit).

---

## Appendix: Files Discovered in This Session

When debugging model issues, check these files in order:

| Priority | File | What It Controls |
|----------|------|------------------|
| 1 (highest) | `D:\clones\<project>\opencode.json` | Main conversation model |
| 2 | `D:\clones\<project>\.opencode\oh-my-openagent.jsonc` | Project sub-agents |
| 3 | `C:\Users\<USER>\.config\opencode\oh-my-openagent.json` | **Global sub-agent fallback — most common source of bugs** |
| 4 | `D:\clones\<project>\.mcp.json` | MCP servers (not models, but related) |
| 5 | `C:\Users\<USER>\.config\opencode\opencode.jsonc` | User-level plugin list |
| 6 | `D:\clones\<project>\tui.json` | Project TUI plugins |
| 7 | `C:\Users\<USER>\.config\opencode\tui.json` | User-level TUI plugins |
| 8 (lowest) | `D:\clones\<project>\.opencode\agent\*.md` | Agent definitions (read for `name:` field) |
| 9 (lowest) | `D:\clones\<project>\.opencode\agent\subagent\*.md` | Subagent definitions |

> **First-time audit**: When onboarding a new project, check ALL 9 files above. Missing any one can cause silent issues. The user-level config (#3) is the most common source of bugs because it's invisible — you don't edit it day-to-day, so it's easy to leave a broken model string there.

---

## Real-World Case Study: The `-free` Suffix Fix

### The Problem
- 18+ custom sub-agents erroring with `"insufficient_balance"`
- Main session worked fine
- `npx oh-my-opencode doctor` showed no model errors (only gh CLI missing)

### Root Cause
- User-level `~/.config/opencode/oh-my-openagent.json` had `"model": "deepseek-v4-flash"` — **TWO bugs**:
  1. Missing `opencode/` prefix → doctor won't crash but format is wrong
  2. Missing `-free` suffix → resolves to the PAID `opencode/deepseek-v4-flash` model
- Project `.opencode/oh-my-openagent.jsonc` only had 10 standard agents → 24+ custom agents fell through to the broken user-level config

### The Fix
1. **User-level config**: Changed ALL `deepseek-v4-flash` → `opencode/deepseek-v4-flash-free` (34 agents + 9 categories)
2. **Project config**: Added ALL 24+ custom agents + 9 categories with `opencode/deepseek-v4-flash-free`
3. **Verification**: `npx oh-my-opencode doctor` — clean (only pre-existing gh CLI warning)

### Key Insight
The `-free` suffix is the ONLY difference between the Zen free model (uses free credits) and the paid model (consumes paid credits). A typo or omission of `-free` silently triggers paid model usage, which fails if the account has insufficient balance.

---

*Last updated: 2026-06-29 — Two real debugging sessions: (1) Zen free → OpenCode Go migration & custom agent fallback, (2) `-free` suffix trap & `insufficient_balance` root cause fix*
