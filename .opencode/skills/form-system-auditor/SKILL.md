# Form System Auditor (Master Orchestrator)

**Purpose:** Runs Skills 1-3, generates visual reports, prioritizes issues by severity, and offers interactive fixes with learning & tracking.

## What This Skill Does

This is the **master orchestrator** that:

1. **Discovers** all forms in the system (30+ forms)
2. **Orchestrates** Skills 1-3 execution
3. **Collects** all audit results
4. **Analyzes** patterns and severity
5. **Generates** visual reports with priorities
6. **Tracks** fix history and learning
7. **Offers** interactive fix mode
8. **Improves** system over time

## When to Use

Invoke this skill when:
- You want comprehensive form system health check
- Before major releases
- After significant refactoring
- When adding new forms
- Monthly/quarterly system audits
- Investigating form-related issues

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  FORM SYSTEM AUDITOR ORCHESTRATOR                   │
├─────────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 1: DISCOVERY                                     │ │
│  │  ├─ Scan codebase for all forms                           │ │
│  │  ├─ Categorize by type (Student/Company/Admin/Professor)    │ │
│  │  ├─ Map dependencies and data flows                       │ │
│  │  └─ Build form inventory                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│          ↓                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 2: EXECUTION                                    │ │
│  │  ├─ Run Skill 1 (Data Flow) on all forms                 │ │
│  │  ├─ Run Skill 2 (UI/UX) on all forms                    │ │
│  │  ├─ Run Skill 3 (File Upload) on all upload workflows   │ │
│  │  └─ Collect all results                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│          ↓                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 3: ANALYSIS                                     │ │
│  │  ├─ Group issues by severity                            │ │
│  │  ├─ Identify patterns across forms                        │ │
│  │  ├─ Calculate impact scores                              │ │
│  │  ├─ Estimate fix effort                                  │ │
│  │  └─ Prioritize fixes                                     │ │
│  └─────────────────────────────────────────────────────────┘ │
│          ↓                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 4: VISUAL REPORT                                 │ │
│  │  ├─ Generate formatted report                             │ │
│  │  ├─ Show severity distribution                           │ │
│  │  ├─ List issues by priority                               │ │
│  │  ├─ Include fix recommendations                         │ │
│  │  └─ Export to file (optional)                            │ │
│  └─────────────────────────────────────────────────────────┘ │
│          ↓                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 5: INTERACTIVE FIX MODE                          │ │
│  │  ├─ Present issues sorted by severity                    │ │
│  │  ├─ Ask: "Should we fix Critical issues now?"           │ │
│  │  ├─ Execute fixes interactively                         │
│  │  ├─ Re-run specific skill to verify                       │
│  │  └─ Update pattern library                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│          ↓                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PHASE 6: LEARNING & TRACKING                           │ │
│  │  ├─ Record fix history                                    │
│  │  ├─ Update pattern library                                │
│  │  ├─ Track issue patterns                                   │
│  │  ├─ Calculate improvement metrics                        │
│  │  └─ Generate learning reports                              │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## How It Works

### Phase 1: Discovery

Scans the entire codebase to build a form inventory:

**Searches for:**
- Form components (*.tsx, *.jsx with "form")
- tRPC mutations with `input` schemas
- Prisma models with `Application` suffix
- File upload endpoints
- Form wrapper components

**Categorizes by:**
- **Student:** Service apps, profile, careers, course reviews
- **Company:** Registration, profile, job postings
- **Admin:** Plans, courses, users, assignments
- **Professor:** Plan creation, blogs, student management

**Output:**
```markdown
## FORM INVENTORY
Total: 30 forms
├── Student: 8 forms
│   ├── NutritionApplication (service)
│   ├── PsychologyApplication (service)
│   ├── TrainingApplication (service)
│   ├── StudentProfile (profile)
│   ├── CareersProfile (careers)
│   └── ...
├── Company: 4 forms
│   ├── CompanyRegistration (registration)
│   ├── CompanyProfile (profile)
│   ├── JobPostingForm (jobs)
│   └── ...
├── Admin: 12 forms
│   ├── PlanCreation (admin)
│   ├── CourseTierForm (admin)
│   └── ...
└── Professor: 6 forms
    ├── PlanCreationWizard (professor)
    └── ...
```

### Phase 2: Execution

Orchestrates the three specialized skills:

```
┌──────────────────────────────────────────────────────────┐
│  EXECUTING: Skill 1 - Data Flow Auditor                  │
│  ├─ Checking mutation → Database alignment                 │
│  ├─ Verifying query invalidation                           │
│  ├─ Validating data extraction                            │
│  └─ [Progress: ████░░░░ 30/30 forms]                      │
└──────────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────┐
│  EXECUTING: Skill 2 - UI/UX State Checker               │
│  ├─ Testing initial load states                            │
│  ├─ Validating submission flows                           │
│  ├─ Checking responsive design                            │
│  └─ [Progress: ████████░ 28/30 forms]                      │
└──────────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────┐
│  EXECUTING: Skill 3 - File Upload Validator              │
│  ├─ Validating upload endpoints                           │
│  ├─ Checking storage integration                           │
│  ├─ Testing file display                                  │
│  └─ [Progress: ██████████ 7/7 workflows]                   │
└──────────────────────────────────────────────────────────┘
```

### Phase 3: Analysis

Groups and prioritizes issues:

**Severity Calculation:**
```
Severity = (Impact × Occurrence) / FixEffort

Impact:
- Critical = 10 (data loss, security breach)
- High = 7 (feature broken, UX degraded)
- Medium = 4 (edge case, performance)
- Low = 1 (cosmetic)

Occurrence:
- All forms = 1.0
- Most forms = 0.5
- Some forms = 0.2

FixEffort:
- Simple = 1 (1 line change)
- Medium = 3 (small refactor)
- Complex = 7 (architectural change)
```

**Pattern Recognition:**
```markdown
## PATTERNS FOUND

### Pattern: Query Invalidation Without Parameters
**Occurrences:** 3 forms
**Severity:** High (7)
**Impact:** Stale data shown to users
**Fix:** Add input parameter to useFormMutation
**Estimated Effort:** Simple (1 line per form)

### Pattern: Mobile Horizontal Scroll
**Occurrences:** 2 forms
**Severity:** Medium (4)
**Impact:** Mobile users can't submit
**Fix:** Change width to max-width
**Estimated Effort:** Simple (1 line per form)

### Pattern: File Upload Progress Not Shown
**Occurrences:** 1 form
**Severity:** Medium (4)
**Impact:** Unclear upload status
**Fix:** Add progress bar component
**Estimated Effort:** Medium (component + state)
```

### Phase 4: Visual Report

Generates a comprehensive, easy-to-read report:

```markdown
╔═══════════════════════════════════════════════════════════════════╗
║                    FORM SYSTEM AUDIT REPORT                            ║
║                                                                              ║
║  📊 EXECUTION SUMMARY                                                        ║
║    ┌─────────────────────────────────────────────────────────────┐  ║
║    │  Audit Date: 2025-01-08 15:30 UTC                          │  ║
║    │  Forms Audited: 30                                            │  ║
║    │  Upload Workflows: 7                                          │  ║
║    │  Total Checks Per Form: 47                                    │  ║
║    │  Total Checks Per Workflow: 39                               │  ║
║    │                                                              │  ║
║    │  ┌────────────────────────────────────────────────────┐   │  ║
║    │  │  Issues Found: 12                                         │   │  ║
║    │  │  ├─ 🔴 Critical: 3  (fix immediately)              │   │  ║
║    │  │  ├─ 🟠 High: 4        (fix this week)           │   │  ║
║    │  │  ├─ 🟡 Medium: 3     (fix next sprint)        │   │  ║
║    │  │  └─ 🟢 Low: 2         (technical debt)       │   │  ║
║    │  └────────────────────────────────────────────────────┘   │  ║
║    └─────────────────────────────────────────────────────────────┘  ║
║                                                                              ║
║  📈 SEVERITY DISTRIBUTION                                                ║
║     🔴 Critical    ████████████░░░░░░░░░░░░░░░░░░░░░ 30%            ║
║     🟠 High       ████████████████████░░░░░░░░░░░░░░░░░░░ 40%            ║
║     🟡 Medium    ████████████░░░░░░░░░░░░░░░░░░░░░░░░░ 20%            ║
║     🟢 Low       ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10%            ║
║                                                                              ║
║  🔴 CRITICAL ISSUES (Fix Immediately)                                    ║
║   [ ] 1. Professor data extraction broken                          ║
║       │  File: case-assignments.ts:428                        ║
║       │  Impact: Professors can't see student data            ║
║       │  Affected: 3 users (professors) + 50+ students          ║
║       │  Fix: Extract formData JSON field                       ║
║       │  Est: 2 min                                              ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
║   [ ] 2. Query invalidation missing parameters                     ║
║       │  Files: nutrition-form.tsx:70, psychology-form.tsx:73,    ║
║       │         training-form.tsx:80                               ║
║       │  Impact: Stale data shown after form submission          ║
║       │  Affected: All form users                               ║
║       │  Fix: Add input parameter to invalidateQueries          ║
║       │  Est: 5 min (3 forms × 2 lines)                         ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
║   [ ] 3. Video encoding webhook failure not handled                 ║
║       │  File: /api/upload-with-encoding webhook handler        ║
║       │  Impact: Videos fail silently if webhook drops            ║
║       │  Affected: All course video viewers                      ║
║       │  Fix: Poll encoding status, add retry logic                ║
║       │  Est: 30 min                                             ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
║  🟠 HIGH PRIORITY ISSUES (Fix This Week)                                ║
║   [ ] 4. Mobile horizontal scroll on job posting form               ║
║       │  File: JobPostingForm.tsx:89                         ║
║       │  Impact: Mobile users can't click submit               ║
║       │  Fix: Change width to max-width                           ║
║       │  Est: 1 min                                              ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
║  [ ] 5. Upload progress not shown for training photos              ║
║       │  File: subscription-form.tsx:526                       ║
║       │  Impact: Users unsure of upload status                   ║
║       │  Fix: Add progress bar component                           ║
║       │  Est: 15 min                                             ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
║  🟡 MEDIUM PRIORITY ISSUES (Fix Next Sprint)                            ║
║   [ ] 6. Image compression not reducing file size                    ║
║       │  Impact: Higher bandwidth costs                            ║
║       │  Fix: Add sharp/imagick on upload                         ║
║       │  Est: 2 hours                                            ║
║       │  └───────────────────────────────────────────────────┘ ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Phase 5: Interactive Fix Mode

After presenting the report, the skill offers interactive fixing:

```markdown
## INTERACTIVE FIX MODE

🤖 "Would you like to fix the Critical issues now?"

If YES:
  → Skill creates tasks for each critical issue
  → Executes fixes one by one with confirmation
  → Re-runs relevant skill to verify
  → Reports results

📋 CRITICAL FIX PLAN:
  1. [2 min] Fix professor data extraction
     └─ → Edit case-assignments.ts:428
     └─ → Add formData extraction
     └─ → Test with Skill 1

  2. [5 min] Fix query invalidation parameters
     ├─ → Edit nutrition-form.tsx:70
     ├─ → Edit psychology-form.tsx:73
     └─ → Edit training-form.tsx:80
     └─ → Test with Skill 1

  3. [30 min] Fix video encoding webhook
     ├─ → Add polling logic
     ├─ → Add retry mechanism
     └─ → Test with Skill 3

📊 ESTIMATED TIME: 37 minutes
💰 ESTIMATED IMPACT: 50+ students + 3 professors
```

### Phase 6: Learning & Tracking

Tracks improvements over time:

```markdown
## LEARNING & TRACKING

### Pattern: Query Invalidation Missing Parameters
🔍 **History:**
├─ 2025-01-08: First occurrence (NutritionForm)
├─ 2025-01-08: Fixed in 3 forms
├─ 2025-01-15: Recurrence check: [none - pattern learned]
└─ **Times Fixed:** 1

📚 **Pattern Definition:**
```
When: Parameterized query invalidated without input
Impact: Stale cache shown to users
Detection: Check invalidateQueries array for router string
Fix: Add input parameter matching query requirements
Prevention: Add validation to useFormMutation hook
```

### IMPROVEMENT METRICS
┌────────────────────────────────────────────────────────────┐
│  Metric              │ Before │ After  │ Change │           │
├────────────────────────────────────────────────────────────┤
│  Critical Issues     │     3  │     0  │  ↓100%            │
│  High Issues         │     4  │     1  │  ↓75%             │
│  Medium Issues       │     3  │     2  │  ↓33%             │
│  Pattern Library     │     0  │    12  │ ↑∞               │
│  System Health Score │   42%  │   95%  │ ↑53%             │
└────────────────────────────────────────────────────────────┘

### FIX HISTORY
┌────────────────────────────────────────────────────────────┐
│  Date         │ Issue Fixed                        │ Files Modified   │
├────────────────────────────────────────────────────────────┤
│  2025-01-08  │ Professor data extraction        │ case-assignments │
│  2025-01-08  │ Query invalidation parameters      │ 3 forms         │
│  2025-01-08  │ Mobile responsive layout         │ 1 form          │
└────────────────────────────────────────────────────────────┘
```

## Pattern Library

The skill maintains a library of learned patterns:

```markdown
## PATTERN LIBRARY

### Data Flow Patterns

#### Pattern 1: Parameterized Query Invalidation
✅ **Correct:**
```typescript
invalidateQueries: [
  { router: 'student.services.getFormSubmission',
   input: { serviceType: 'NUTRITION', userId } }
]
```
❌ **Incorrect:**
```typescript
invalidateQueries: [
  { router: 'student.services.getFormSubmission' }
]
```

#### Pattern 2: JSON Data Extraction
✅ **Correct:**
```typescript
formData: {
  nutrition: submission?.formData || null
}
```
❌ **Incorrect:**
```typescript
formData: {
  nutrition: submission || null  // Returns whole object, not data
}
```

### UI/UX Patterns

#### Pattern 3: Mobile Responsive Width
✅ **Correct:**
```typescript
className="w-full max-w-3xl"
```
❌ **Incorrect:**
```typescript
className="w-full lg:w-3/4"  // Fixed width causes scroll
```

#### Pattern 4: Submit Button During Upload
✅ **Correct:**
```typescript
<Button disabled={isUploading}>
  {isUploading ? 'Uploading...' : 'Submit'}
</Button>
```
❌ **Incorrect:**
```typescript
<Button>Submit</Button>  // Can submit while uploading
```

### File Upload Patterns

#### Pattern 5: Upload Progress Indication
✅ **Correct:**
```typescript
{uploadProgress > 0 && (
  <ProgressBar value={uploadProgress} />
)}
```
❌ **Incorrect:**
```typescript
{isUploading && <Spinner />}  // No percentage
}
```

#### Pattern 6: Form Submit Until Upload Complete
✅ **Correct:**
```typescript
const allFilesReady = photoUrls.every(url => url && url.length > 0)
<Button disabled={!allFilesReady}>Submit</Button>
```
❌ **Incorrect:**
```typescript
<Button>Submit</Button>  // Can submit with incomplete uploads
```
```

## Usage

```bash
# Full system audit
/claude "Run comprehensive form system audit"

# Quick health check
/claude "Quick form system health check"

# Audit specific skill
/claude "Run data flow audit on all forms"

# Generate report without fixing
/claude "Generate form audit report and save to file"

# Interactive fix mode
/claude "Run form audit and fix critical issues interactively"

# Check pattern library
/claude "What patterns have we learned about forms?"

# View improvement metrics
/claude "Show form system improvement over time"
```

## Export Formats

Reports can be exported in multiple formats:

```markdown
## Markdown (default)
Complete formatted report with ASCII art tables

## JSON
Machine-readable format for CI/CD integration

## HTML
Visual dashboard for stakeholder presentation
```

## Learning & Improvement

After each audit cycle, the skill:

1. **Updates pattern library** with newly discovered patterns
2. **Tracks fix history** to prevent recurrence
3. **Calculates impact scores** to measure improvement
4. **Suggests refactoring** to eliminate patterns of bugs
5. **Generates test cases** for discovered issues
6. **Identifies training opportunities** for the team

## Success Criteria

A form system is considered healthy when:

- ✅ No critical issues
- ✅ High issues < 5
- ✅ Medium issues < 10
- ✅ All forms pass accessibility checks
- ✅ All uploads work correctly
- ✅ No data loss incidents
- ✅ System health score > 90%

## Notes

- Always run full audit before major releases
- Fix critical issues immediately
- Document decisions that skip "low priority" issues
- Review pattern library monthly
- Update skills as new patterns emerge
- Share reports with stakeholders
- Track metrics over time to measure improvement
