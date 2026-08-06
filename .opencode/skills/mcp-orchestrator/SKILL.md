# MCP Orchestrator — Unified AI Agent Command Protocol

> **Purpose**: Coordinates all 15+ MCPs into a coherent, context-efficient, step-by-step workflow. Load this skill when starting any non-trivial coding task to get the right MCPs invoked in the right order, with zero context waste, zero looping, and maximum code understanding.

---

## 1. MCP INVENTORY & CAPABILITY MAP

### Tier S — Core Reasoning & Planning (always available)

| MCP | What It Does | Key Tools | Context Cost |
|-----|-------------|-----------|-------------|
| **sequential-thinking** | Dynamic multi-step reasoning, plan breakdown, problem decomposition | `sequentialthinking` | Low (~2K tokens) |
| **trace-mcp** | Framework-aware AST code intelligence. **58 framework integrations** (Next.js, Prisma, tRPC, shadcn, Tailwind). 99% token reduction on code understanding | `get_project_map`, `search`, `get_change_impact`, `get_task_context`, `get_outline`, `get_call_graph`, `get_tests_for`, `get_dead_code` | Ultra-low (~500 tokens/call vs 50K reading files) |
| **codedev** | 42 tools: semantic search, security scanning, dead code detection, Prisma schema analysis, API contract discovery, test coverage, dependency mapping, code scaffolding | `codebase_map`, `search_code`, `security_scan`, `db_schema`, `api_contracts`, `change_impact`, `test_coverage`, `dependency_map` | Low (~1K tokens/tool) |
| **codegraph** (built-in) | SQLite knowledge graph — every symbol, edge, call site | `codegraph_explore`, `codegraph_node`, `codegraph_callers`, `codegraph_search` | Ultra-low (~200 tokens/call) |

### Tier A — Memory & Persistence

| MCP | What It Does | Key Tools | Context Cost |
|-----|-------------|-----------|-------------|
| **engram** | Persistent session memory across AI sessions. Architecture mapping, convention detection, git history analysis. Hybrid FTS5 + vector search | `context.resume`, `context.save`, `search`, `architecture`, `conventions` | Low (~300 tokens/call) |
| **memory** | Knowledge-graph persistent memory of entities, relationships | `create_entities`, `add_observations`, `search_nodes`, `open_nodes` | Low (~500 tokens/call) |

### Tier B — Version Control & Remote Code

| MCP | What It Does | Key Tools | Context Cost |
|-----|-------------|-----------|-------------|
| **git** | Full git operations — log, diff, blame, branch, stash, commit, status | `git_log`, `git_diff`, `git_status`, `git_blame`, `git_branch`, `git_show`, `git_stash` | Low (~300 tokens/call) |
| **context7** | Live library documentation (React, Next.js, Prisma, Tailwind, etc.) | `query_docs`, `resolve_library_id` | Medium (~2-5K/query) |
| **filesystem** | Secure file read/write operations | `read_file`, `write_file`, `edit_file`, `list_directory`, `search_files` | Ultra-low (~100 tokens/call) |

### Tier C — Web, Browser & Search

| MCP | What It Does | Key Tools | Context Cost |
|-----|-------------|-----------|-------------|
| **playwright** | Browser automation, E2E testing, visual verification | `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_evaluate` | Medium (~3K tokens/call) |
| **web-search-prime** | Web search | `web_search_prime` | Medium |
| **web-reader** | URL content to markdown | `webReader` | Medium |
| **bunnycdn** | BunnyCDN API (storage, stream, CDN, DNS) | various `bunny_*` tools | Low |

### Tier D — Rules & Config

| MCP | What It Does | Key Tools | Context Cost |
|-----|-------------|-----------|-------------|
| **carl** | Rule/knowledge management, project decisions | `carl_*` tools | Low |
| **context-mode** | Context window optimization | `ctx_execute`, `ctx_batch_execute`, `ctx_search`, `ctx_stats` | Ultra-low |

---

## 2. ORCHESTRATION — THE 5-PHASE WORKFLOW

Every coding task follows this exact 5-phase protocol. **Never skip phases 1-2.**

```
┌─────────────────────────────────────────────────────┐
│  PHASE 1: MEMORY & CONTEXT RESTORE                  │
│  engram → memory → carl                             │
├─────────────────────────────────────────────────────┤
│  PHASE 2: UNDERSTAND & PLAN                         │
│  trace-mcp → codedev → codegraph → sequential-thinking│
├─────────────────────────────────────────────────────┤
│  PHASE 3: RESEARCH & DOCS                           │
│  context7 → web-search → codedev.db_schema          │
├─────────────────────────────────────────────────────┤
│  PHASE 4: EXECUTE                                   │
│  filesystem → git → playwright (if needed)          │
├─────────────────────────────────────────────────────┤
│  PHASE 5: VERIFY & COMMIT                           │
│  trace-mcp → codedev → git → engram.save            │
└─────────────────────────────────────────────────────┘
```

---

### PHASE 1: Memory & Context Restore

**Goal**: Restore past decisions, avoid re-explaining, load project conventions.

**Step 1.1** — Load past session memory:
```
→ engram: context.resume()          // Load past decisions, active plans
→ engram: search("edrak <topic>")   // Search relevant past memories
```

**Step 1.2** — Load persistent knowledge graph:
```
→ memory: search_nodes("edrak")     // Find relevant entity relationships
→ memory: open_nodes(<node_ids>)    // Explore connected knowledge
```

**Step 1.3** — Load project rules:
```
→ carl: carl_get_domain("PROJECTS")     // Project conventions
→ carl: carl_get_domain("DEVELOPMENT")  // Dev workflow rules
```

**Token savings**: ~15K+ tokens by not re-explaining past context.

---

### PHASE 2: Understand & Plan

**Goal**: Map the codebase, find what to change, understand blast radius, plan steps.

**Step 2.1** — Get project overview (ONE call replaces 15 file reads):
```
→ trace-mcp: get_project_map(summary_only=true)
   Returns: module structure, frameworks detected, entry points, all routes
   Token cost: ~800 tokens (vs ~50K reading 20 files)
```

**Step 2.2** — Find relevant code:
```
→ trace-mcp: search("<feature>")     // Semantic code search
→ trace-mcp: get_outline("src/feature/file.tsx")  // 90% token savings vs reading full file
```

**Step 2.3** — Understand database schema:
```
→ codedev: db_schema()               // Prisma schema analysis
   Returns: all models, relations, indexes, enums
   Token cost: ~2K tokens (vs ~20K reading schema.prisma)
```

**Step 2.4** — Analyze blast radius:
```
→ trace-mcp: get_change_impact("<target-symbol>")
   Returns: affected files, tests, and decisions
→ codedev: change_impact("<target-symbol>")
   Cross-reference with codedev's analysis
```

**Step 2.5** — Plan with sequential thinking:
```
→ sequential-thinking: sequentialthinking(
    thought="I've mapped the codebase. The task is <task>. 
             The relevant files are <files>. The database models are <models>.
             The blast radius is <files>. 
             My plan is: 1) step one 2) step two..."
  )
   Forces structured, non-looping reasoning
```

**Token savings**: ~70K+ tokens by not reading files blindly.

---

### PHASE 3: Research & Docs

**Goal**: Get library docs, research patterns, understand schema.

**Step 3.1** — Live library documentation:
```
→ context7: resolve_library_id("next.js", "App Router")
→ context7: query_docs("next.js", "How to implement server actions in App Router")
   Returns: version-specific docs, not hallucinated APIs
```

**Step 3.2** — Web research for patterns:
```
→ web-search-prime: search("best practice <pattern> <framework>")
```

**Token savings**: Prevents hallucinated API usage that wastes subsequent iterations.

---

### PHASE 4: Execute

**Goal**: Make the change, write the code, run the tests.

**Step 4.1** — Read current file (use trace-mcp for token efficiency):
```
→ trace-mcp: get_outline("src/feature/target.tsx")   // understand structure first
→ filesystem: read_file("src/feature/target.tsx")    // only when you need full content
```

**Step 4.2** — Make edits:
```
→ Use Edit tool for surgical changes
→ Or filesystem: write_file() for new files
```

**Step 4.3** — Track with git:
```
→ git: git_status()
→ git: git_diff()             // review before committing
→ git: git_log(-5)            // check recent history
→ git: git_commit()           // only when asked
```

**Step 4.4** — Browser test (if UI change):
```
→ playwright: browser_navigate("http://localhost:3000/feature")
→ playwright: browser_snapshot()     // visual check
→ playwright: browser_console_messages() // error check
```

---

### PHASE 5: Verify & Commit

**Goal**: Verify correctness, check security, save to memory.

**Step 5.1** — Code quality verification:
```
→ codedev: security_scan("src/feature/target.tsx")
   Returns: vulnerability findings, severity levels
→ trace-mcp: check()                   // quality gate checks
→ trace-mcp: get_dead_code()           // detect dead exports
```

**Step 5.2** — Test impact:
```
→ trace-mcp: get_tests_for("src/feature/target.tsx")
```

**Step 5.3** — Diagnostics:
```
→ LSP diagnostics on changed files
→ pnpm run type-check
→ pnpm run lint
```

**Step 5.4** — Save decisions to memory:
```
→ engram: context.save({
    type: "decision",
    content: "Changed <X> to fix <Y>. Files: <files>. Reason: <reason>."
  })
→ memory: create_entities([{
    name: "<feature-name>",
    entityType: "feature",
    observations: ["Changed <X> to fix <Y>"]
  }])
```

**Token savings**: Prevents future sessions from re-discovering the same context.

---

## 3. CONTEXT OPTIMIZATION RULES

### Rule 1: Progressive Disclosure
Never load all MCP tools at once. Use tools in this priority order:

```
1st: codegraph_explore / trace-mcp search  →  ~500 tokens
2nd: trace-mcp get_outline / get_symbol   →  ~300 tokens
3rd: filesystem read_file (offset + limit) →  ~200 tokens/100 lines
NEVER: read entire files unless you've confirmed they're needed
```

### Rule 2: Batch Before Cascade
```
WRONG:  trace-mcp search "X" → read file → find dependency → search "Y"
RIGHT:  trace-mcp get_task_context("feature X")  // returns everything in one call
```

### Rule 3: Memory Before Discovery
```
WRONG:  search codebase for architecture patterns every session
RIGHT:  engram context.resume() → remembers architecture from last session
```

### Rule 4: Sequential Thinking as a Guard
Always use sequential-thinking at the START of a complex task. It prevents:
- Looping (forced step-by-step prevents repeating)
- Context explosion (compresses reasoning into structured thoughts)
- Missing steps (forces exhaustive decomposition)

### Rule 5: The 3-Call Ceiling
If you've made 3 tool calls and still don't have the answer:
```
→ STOP. Do not make call #4.
→ Use sequential-thinking to re-analyze what you know
→ Ask: "What am I missing? What assumption is wrong?"
→ Only then proceed.
```

---

## 4. COMMON TASK TEMPLATES

### Template A: "Fix a Bug"

```
PHASE 1: engram context.resume() + memory search_nodes("bug")
PHASE 2: trace-mcp get_project_map() + trace-mcp search("<error>")
         + trace-mcp get_change_impact("<suspected-symbol>")
         + sequential-thinking to plan fix
PHASE 3: (skip — it's a bug, not research)
PHASE 4: Read file → Edit → git status
PHASE 5: codedev security_scan() + engram context.save({type:"bug", ...})
```

### Template B: "Add a New Feature"

```
PHASE 1: engram context.resume()
PHASE 2: trace-mcp get_project_map() + codedev db_schema()
         + trace-mcp get_task_context("<similar-existing-feature>")
         + sequential-thinking to architect
PHASE 3: context7 query_docs for any new libraries
PHASE 4: Make edits → git track
PHASE 5: trace-mcp get_change_impact() + codedev security_scan()
         + engram context.save({type:"decision", ...})
```

### Template C: "Code Review / Audit"

```
PHASE 1: engram context.resume()
PHASE 2: trace-mcp get_project_map() + trace-mcp get_dead_code()
         + codedev security_scan("./src")
         + trace-mcp check()  // quality gates
PHASE 3: (skip)
PHASE 4: (skip — read-only)
PHASE 5: engram context.save({type:"audit", ...})
```

### Template D: "Database Schema Change"

```
PHASE 1: engram context.resume()
PHASE 2: codedev db_schema() + trace-mcp get_change_impact("<model>")
         + sequential-thinking to plan migration
PHASE 3: context7 query_docs("prisma", "migration patterns")
PHASE 4: Edit schema → pnpm prisma migrate dev → pnpm prisma generate
PHASE 5: codedev db_schema() (verify) + engram context.save()
```

### Template E: "Deploy / CI Debug"

```
PHASE 1: (skip)
PHASE 2: git git_log(-20) + git git_diff("origin/main..HEAD")
PHASE 3: (skip)
PHASE 4: git git_status() → git git_diff()
PHASE 5: (skip unless changes to track)
```

---

## 5. ANTI-PATTERNS — NEVER DO THESE

| Anti-Pattern | Why It's Bad | What To Do Instead |
|-------------|-------------|-------------------|
| Reading files before `trace-mcp get_outline` | Wastes 10K+ tokens reading irrelevant code | `get_outline` first, then read targeted sections |
| Calling 5 MCPs in parallel without sequential-thinking first | Tools return disconnected data, agent loops | `sequentialthinking` to plan → then parallelize |
| Using git MCP when `git diff` in bash is faster | MCP costs 7-32x more tokens per operation | Use bash `rtk git diff` for simple reads; MCP only for complex queries |
| Skipping engram/memory save at end | Next session starts from zero | Always save decisions, bugs, architecture notes |
| Loading all MCP tools simultaneously | Context window fills with tool definitions | Invoke tools lazily — only as needed per phase |
| Using `filesystem read_file` whole files | Most expensive way to read code | `trace-mcp get_outline` → `trace-mcp get_symbol` → `read_file offset:line` |
| Not using `search`/`get_outline` before `get_change_impact` | You don't know what to check impact on | Search first, then analyze impact of found symbols |
| Relying solely on web-search for library docs | Returns generic results, not version-specific | Use `context7` first, then web-search if more context needed |

---

## 6. QUICK REFERENCE — MCP COMMAND CHEAT SHEET

### trace-mcp (call this FIRST for any code question)
```
get_project_map(summary_only=true)     → Full project structure (one call)
search("<query>")                      → Semantic code search
get_outline("<file>")                  → File structure (90% token savings)
get_symbol("<symbol>")                 → ONE symbol's source + callers + callees
get_task_context("<feature>")          → Everything about a feature
get_change_impact("<symbol>")          → Blast radius: what breaks if I change this?
get_call_graph("<symbol>")             → Callers and callees graph
get_tests_for("<file>")                → All tests for a file/symbol
get_dead_code()                        → Dead exports, unused variables
get_model_context("<model>")           → DB model + its relationships
get_component_tree("<component>")      → React component tree
get_request_flow("<route>")            → HTTP request → handler → DB
get_circular_imports()                 → Circular dependency detection
check()                                → Run quality gates
```

### codedev-mcp (call for security + schema + deep analysis)
```
codebase_map()                         → Full project overview
search_code("<query>")                 → Ripgrep-powered code search
db_schema()                            → Prisma/ORM schema analysis
api_contracts()                        → tRPC route discovery
security_scan("<path>")                → Vulnerability scan
dead_code()                            → Dead code detection
change_impact("<symbol>")              → Change impact analysis
test_coverage()                        → Test coverage analysis
dependency_map()                       → Dependency graph
cicd_analyze()                         → CI/CD pipeline analysis
```

### codegraph (built-in — fastest for quick lookups)
```
codegraph_explore("<question>")        → Natural language codebase query
codegraph_search("<symbol>")           → Quick symbol location
codegraph_node("<symbol>")             → Symbol source + callers/callees
codegraph_callers("<symbol>")          → All call sites
```

### sequential-thinking (call BEFORE complex work)
```
sequentialthinking(thought="<analysis>") → Structured step-by-step reasoning
```

### engram (call at START and END of session)
```
context.resume()                       → Load past decisions + active plans
context.save({type, content})          → Save decision/bug/note
search("<query>")                      → Search past memories
architecture                           → Auto-detected module structure
conventions                            → Detected coding conventions
```

### git (for version control queries)
```
git_status()                           → Current repo state
git_log(<count>)                       → Recent history
git_diff()                             → Unstaged changes
git_blame("<file>")                    → Line-by-line attribution
git_branch()                           → Branch list
git_show("<ref>")                      → Commit details
```

### memory (for persistent knowledge graph)
```
create_entities([{name, entityType, observations}])
add_observations([{entityName, contents}])
search_nodes("<query>")
open_nodes([<ids>])
```

---

## 7. CONTEXT SAVINGS CALCULATOR

| Task | Without Orchestration | With Orchestration | Savings |
|------|----------------------|-------------------|---------|
| "Find where X is defined" | Grep 20 files (~15K tokens) | `trace-mcp search("X")` (~500 tokens) | **97%** |
| "What breaks if I change Y?" | Read 30 files (~45K tokens) | `trace-mcp get_change_impact("Y")` (~2K tokens) | **96%** |
| "Plan a new feature" | Read 15 files + grep (~50K tokens) | Phases 1→2→3 (~5K tokens) | **90%** |
| "Understand this codebase" | Read 20 files (~30K tokens) | `trace-mcp get_project_map()` (~800 tokens) | **97%** |
| "Debug a production issue" | Scattered debugging (~40K tokens) | Phases 1→2→5 (~4K tokens) | **90%** |
| Full work session (complex task) | ~250K tokens context | ~25K tokens context | **90%** |

---

## 8. COMPLETE WORKFLOW EXAMPLE

### User: "Add a quiz completion certificate feature"

**Phase 1 — Memory Restore:**
```
engram: context.resume()         → "Last session you started certificate feature"
carl: carl_get_domain("DEVELOPMENT") → "Follow existing Prisma patterns"
```

**Phase 2 — Understanding:**
```
trace-mcp: get_project_map()                → "Next.js 15, Prisma, tRPC, shadcn/ui"
trace-mcp: search("certificate")            → "No existing certificate code"
trace-mcp: search("quiz")                   → "Quiz model in Prisma, quiz router, quiz UI"
trace-mcp: get_outline("prisma/schema.prisma") → "Quiz, QuizQuestion, QuizAttempt models"
codedev: db_schema()                        → Full schema analysis
trace-mcp: get_change_impact("Quiz")        → "Quiz routes, components, services"
sequential-thinking: sequentialthinking(    → Structured plan
  "1) Add Certificate model to Prisma
   2) Add tRPC router for certificate generation
   3) Add certificate component
   4) Wire up quiz completion → certificate generation"
)
```

**Phase 3 — Research:**
```
context7: query_docs("prisma", "relation patterns")     → Best practice
context7: query_docs("next-auth", "session in tRPC")    → Session access
```

**Phase 4 — Execute:**
```
[Edit prisma/schema.prisma → Add Certificate model]
[Edit src/server/api/routers/student/certificate.ts → Add router]
[Edit src/components/certificate/CertificateCard.tsx → Add UI]
```

**Phase 5 — Verify:**
```
codedev: security_scan("src/server/api/routers/student/certificate.ts")
trace-mcp: get_change_impact("Certificate")    → Verify all references updated
engram: context.save({type:"decision", content:"Added Certificate model, router, UI"})
memory: create_entities([{
  name: "QuizCertificate",
  entityType: "feature",
  observations: ["Certificate model in Prisma", "Generated on quiz completion"]
}])
```

**Result**: ~15K tokens total context used instead of ~250K. Zero wasted reads.

---

> **End of Orchestration Protocol.** Load with: `skill(name="mcp-orchestrator")`
