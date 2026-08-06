# Data Flow Auditor Skill

**Purpose:** Ensures form data flows correctly from submission → database → all viewers with complete end-to-end tracing.

## What This Skill Does

This skill performs comprehensive data flow audits on all forms in the codebase by:

1. **Discovering all forms** in the system (student, company, admin, professor)
2. **Tracing complete data paths** from UI → Database → Viewers
3. **Validating schema alignment** (Form → Zod → Prisma → Database)
4. **Checking query invalidation** with proper parameters
5. **Verifying data extraction** from JSON fields
6. **Checking permissions** and role-based access
7. **Generating visual reports** with prioritized issues

## When to Use

Invoke this skill when:
- A new form is added to the system
- Form submission workflow changes
- Database schema is modified
- New user roles are added
- Reports of "data not showing" issues
- After refactoring form-related code
- Before major releases
- use as well the file-upload-validator (mandatory)
- use as well the form-system-auditor (mandatory)
- use as well the ui-ux-checker (mandatory)
## What It Checks

### 1. Mutation Layer
- ✅ Zod schema matches Prisma model fields
- ✅ Required fields enforced correctly
- ✅ Default values applied properly
- ✅ Type coercion safe (string→number, enums)
- ✅ Nested objects handled correctly
- ✅ Array fields validated properly

### 2. Database Layer
- ✅ Prisma model matches actual database schema
- ✅ Relations defined correctly
- ✅ Indexes exist for query fields
- ✅ Constraints enforced correctly
- ✅ JSON fields store valid data

### 3. Query Layer
- ✅ Query fetches correct data for user's role
- ✅ joins/include relations properly
- ✅ Filters (userId, serviceType) correct
- ✅ Ordering consistent
- ✅ Pagination limits appropriate

### 4. Query Invalidation
- ✅ Invalidated after relevant mutations
- ✅ Parameters passed correctly
- ✅ Cache timing appropriate
- ✅ Stale data refreshed properly

### 5. Data Extraction
- ✅ JSON fields (formData) extracted correctly
- ✅ Nested data accessed with proper chaining
- ✅ Null safety implemented
- ✅ Data transformed for UI consumption

### 6. Permissions & Security
- ✅ ProtectedProcedure on sensitive routes
- ✅ User ownership checks
- ✅ Role-based access control
- ✅ No data leakage between users

## Data Flow Tracing

For each form, this skill traces the complete path:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA FLOW TRACE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SUBMISSION                                                  │
│     [Form Component]                                            │
│          │                                                      │
│          ↓ user fills & submits                                 │
│     [Mutation Hook]  → validates with Zod                       │
│          │                                                      │
│          ↓                                                      │
│     [tRPC Router]  → checks permissions                         │
│          │                                                      │
│          ↓                                                      │
│     [Prisma Client]  → type-safe query                          │
│          │                                                      │
│          ↓                                                      │
│     [Database]  ← INSERT with validated data                    │
│                                                                 │
│  2. INVALIDATION                                                │
│     [Mutation Success]                                          │
│          │                                                      │
│          ↓                                                      │
│     [invalidateQueries]  → router + input params                │
│          │                                                      │
│          ↓                                                      │
│     [Query Cache]  ← marked stale                               │
│                                                                 │
│  3. RETRIEVAL                                                   │
│     [Viewer Component]                                          │
│          │                                                      │
│          ↓ data needed                                          │
│     [useQuery Hook]  → with parameters                          │
│          │                                                      │
│          ↓                                                      │
│     [tRPC Router]  → checks permissions                         │
│          │                                                      │
│          ↓                                                      │
│     [Prisma Client]  → joins/includes                           │
│          │                                                      │
│          ↓                                                      │
│     [Database]  ← SELECT with filters                           │
│          │                                                      │
│          ↓                                                      │
│     [Query Result]  → raw data                                  │
│                                                                 │
│  4. EXTRACTION                                                  │
│     [Query Result]                                              │
│          │                                                      │
│          ↓ JSON fields                                          │
│     [formData Extraction]  → parse/access                       │
│          │                                                      │
│          ↓                                                      │
│     [UI Props]  → transformed for display                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Output Format

```markdown
╔════════════════════════════════════════════════════════════════╗
║                 DATA FLOW AUDIT REPORT                         ║
╠════════════════════════════════════════════════════════════════╣
║ 📊 EXECUTION SUMMARY                                           ║
║   Forms Audited: 30                                            ║
║   Issues Found: 12                                             ║
║   Critical: 3  🔴  High: 4  🟠  Medium: 3  🟡  Low: 2        ║
║                                                                ║
║ 🔴 CRITICAL ISSUES (Fix Immediately)                          ║
║   [ ] Issue description                                       ║
║       File: path/to/file.tsx:line                             ║
║       Impact: Users can't see submitted data                  ║
║       Fix: Add formData extraction                            ║
║                                                               ║
║ 🟠 HIGH PRIORITY                                             ║
║   [ ] Issue description                                       ║
║       File: path/to/file.tsx:line                             ║
║       Impact: Data may be stale                               ║
║       Fix: Pass input parameters to invalidate                ║
║                                                               ║
╚════════════════════════════════════════════════════════════════╝

## DETAILED FINDINGS

### Form: NutritionForm
**File:** src/components/nutrition/nutrition-form.tsx

| Layer | Check | Status | Details |
|-------|-------|--------|---------|
| **Mutation** | Schema Alignment | ✅ | Zod matches Prisma model |
| **Mutation** | Required Fields | ✅ | All required enforced |
| **Query** | Filters | ✅ | userId, serviceType correct |
| **Query** | Invalidation | ✅ | Params passed correctly |
| **Extraction** | JSON Fields | ⚠️ | Check formData usage |
| **Security** | Permissions | ✅ | ProtectedProcedure used |

**Data Flow Path:**
```
NutritionForm.tsx:175 → createNutritionApplication
  ↓ (mutation)
student/services.ts:622 → zod validation
  ↓
prisma:NutritionApplication → INSERT
  ↓
ServiceFormWrapper.tsx:44 → getFormSubmission
  ↓ (query with params {serviceType, userId})
student/services.ts:155 → extraction
  ↓
GenericForm.tsx:94 → display
```

### Form: PsychologyForm
[Similar detailed output]

### Form: SubscriptionForm
[Similar detailed output]

## PATTERNS LEARNED

### Pattern 1: Query Invalidation with Parameters
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Parameterized queries require explicit input during invalidate()
✅ **Solution:** Pass `{ router, input }` to useFormMutation
📚 **Learning:** Always check if query takes parameters when configuring invalidation

### Pattern 2: JSON Data Extraction
🔍 **First Found:** 2025-01-08
🎯 **Issue:** JSON fields must be extracted before passing to UI
✅ **Solution:** Use `submission?.formData || null`
📚 **Learning:** Tracing data types through the full flow reveals hidden transformations

## SEVERITY LEVELS

- **🔴 CRITICAL:** Data corruption, security breach, complete feature failure
- **🟠 HIGH:** Data not showing, stale data, broken user experience
- **🟡 MEDIUM:** Edge cases fail, performance issues, inconsistent behavior
- **🟢 LOW:** Cosmetic issues, minor UX friction, optimization opportunities

## FIX PRIORITY QUEUE

1. **[CRITICAL]** Fix Professor data extraction - case-assignments.ts:428
2. **[CRITICAL]** Fix query invalidation params - 3 forms
3. **[HIGH]** Fix upload progress indicators - CareerForm
4. **[HIGH]** Fix mobile responsive issues - JobPostingForm
5. **[MEDIUM]** Optimize CDN caching headers
```

## Learning & Improvement

After each audit cycle, the skill:

1. **Updates pattern library** with newly discovered issues
2. **Tracks fix history** to prevent recurrence
3. **Calculates impact scores** to measure improvement
4. **Suggests refactoring** to eliminate patterns of bugs
5. **Generates test cases** for discovered issues

## Usage

```bash
# Audit all forms
/claude "Run data flow audit on all forms"

# Audit specific form
/claude "Audit data flow for NutritionForm"

# Audit specific layer
/claude "Check query invalidation for all parameterized queries"
```

## Notes

- Always trace the COMPLETE path from UI to Database and back
- Check both the HAPPY path and ERROR paths
- Verify permissions at each layer
- Validate that the data structure is preserved through transformations
- Check that JSON fields are properly typed and extracted
- Ensure that query invalidation reaches the correct cache entries
