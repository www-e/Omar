# UI/UX State Checker Skill

**Purpose:** Ensures forms show correct states, handle user interactions properly, and work responsively across all devices.

## What This Skill Does

This skill performs comprehensive UI/UX state audits on all forms by:

1. **Testing initial load states** (loading, error, empty)
2. **Validating form fill states** (drafts, validation, feedback)
3. **Checking submission states** (optimistic updates, success/error)
4. **Verifying post-submission states** (redirects, cache refresh, read-only)
5. **Testing read-only view states** (display, badges, accessibility)
6. **Validating responsive design** (mobile, tablet, desktop)
7. **Checking accessibility** (ARIA, labels, focus management)

## When to Use

Invoke this skill when:
- Forms feel "clunky" or confusing
- Users report "my data disappeared"
- Mobile users complain about broken forms
- Accessibility audits fail
- Form conversion rates are low
- After UI refactoring
- Before major releases

## What It Checks

### 1. Initial State
- ✅ Empty form renders correctly
- ✅ Loading skeleton/shimmer shown during fetch
- ✅ Error state handled for fetch failures
- ✅ Empty state message is clear
- ✅ Form fields have proper placeholder text
- ✅ Default values are appropriate

### 2. Form Fill State
- ✅ Draft auto-saving working (if applicable)
- ✅ Debounced save doesn't block UI
- ✅ Form validation feedback is clear
- ✅ Required fields marked with asterisk (*)
- ✅ Real-time validation on blur/change
- ✅ Error messages are specific and helpful

### 3. Submission State
- ✅ Submit button disabled during submission
- ✅ Loading indicator shown on button
- ✅ Form disabled during submission (prevent double-submit)
- ✅ Success/error messages use snackbar/toast
- ✅ Optimistic updates (if any) rollback on error
- ✅ Error state allows re-submission

### 4. Post-Submission State
- ✅ Redirect happens after success (if configured)
- ✅ Form shows read-only mode on revisit
- ✅ Cache invalidated so fresh data shows
- ✅ Status badge shows correctly (PENDING/DONE/IN_PROGRESS)
- ✅ "View Data" button changes correctly
- ✅ Submitted date displayed

### 5. Read-Only View State
- ✅ All fields display correctly
- ✅ No editable inputs when readOnly=true
- ✅ Status badges show current state
- ✅ Submitted/updated dates formatted
- ✅ Empty fields handled gracefully
- ✅ Arrays displayed cleanly

### 6. Responsive Design
- ✅ Form layout works on mobile (320px+)
- ✅ Form layout works on tablet (768px+)
- ✅ Form layout works on desktop (1024px+)
- ✅ No horizontal scroll on any device
- ✅ Touch targets ≥44x44px on mobile
- ✅ Step indicators readable on small screens
- ✅ File uploads work on touch devices
- ✅ Text is readable without zooming

### 7. Accessibility (a11y)
- ✅ All inputs have associated labels
- ✅ Labels use htmlFor/input id pairing
- ✅ Required fields indicated programmatically
- ✅ Error messages linked via aria-describedby
- ✅ Focus management works (errors, modals, steps)
- ✅ Keyboard navigation works (Tab, Enter, Escape)
- ✅ Color contrast ≥4.5:1 for text
- ✅ Screen reader announces validation errors

## State Machine Verification

Each form should follow this state machine:

```
┌─────────────────────────────────────────────────────────────┐
│                    FORM STATE MACHINE                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LOADING → (fetch complete) → EMPTY                         │
│                ↓                                            │
│  ERROR ←←←←←←←←←←←←←←←←←←←←←← (fetch failed)              │
│                                                              │
│  EMPTY → (user starts typing) → FILLING                       │
│         ↓                                                   │
│  FILLING → (validation error) → INVALID                        │
│          ↓                                                  │
│  FILLING → (user clicks submit) → SUBMITTING                   │
│           ↓ (success)                                        │
│  SUBMITTING → (redirect) → VIEW                              │
│              ↓ (data exists)                                  │
│  VIEW → (readOnly=true) → READ_ONLY                           │
│                                                              │
│  Invalid states shown with error messages                    │
│  Loading states shown with spinners/skeletons                │
│  Success states shown with checkmarks/green colors           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

- **Mobile:** 320px - 767px
  - Single column layout
  - Full-width inputs
  - Stack labels above inputs
  - Horizontal step indicators

- **Tablet:** 768px - 1023px
  - Two-column layout where appropriate
  - Side-by-side buttons
  - Vertical step indicators

- **Desktop:** 1024px+
  - Multi-column layout
  - Button groups horizontal
  - Horizontal step indicators with labels

## Output Format

```markdown
╔════════════════════════════════════════════════════════════════╗
║               UI/UX STATE AUDIT REPORT                          ║
╠════════════════════════════════════════════════════════════════╣
║ 📊 EXECUTION SUMMARY                                          ║
║   Forms Audited: 30                                           ║
║   Issues Found: 8                                            ║
║   Critical: 2  🔴  High: 3  🟠  Medium: 2  🟡  Low: 1     ║
║                                                              ║
║ 🔴 CRITICAL ISSUES (Fix Immediately)                          ║
║   [ ] Form submission not disabled - NutritionForm:176        ║
║       Impact: Users can submit multiple times                 ║
║       Fix: Add isSubmitting check to button                   ║
║                                                              ║
║ 🟠 HIGH PRIORITY                                             ║
║   [ ] Mobile horizontal scroll - JobPostingForm:89          ║
║       Impact: Mobile users can't see submit button            ║
║       Fix: Remove width: 100% on container                   ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝

## DETAILED FINDINGS

### Form: NutritionForm
**File:** src/components/nutrition/nutrition-form.tsx

| State | Check | Status | Details |
|-------|-------|--------|---------|
| **Initial Load** | Loading State | ✅ | ServiceFormWrapper shows skeleton |
| **Initial Load** | Error State | ✅ | Error alert shown |
| **Initial Load** | Empty Form | ✅ | Form renders with defaults |
| **Form Fill** | Validation | ✅ | Real-time validation works |
| **Form Fill** | Draft Save | N/A | No draft saving |
| **Submission** | Button State | ❌ | Button not disabled during submit |
| **Submission** | Feedback | ✅ | Snackbar shows success |
| **Post-Submit** | Redirect | ✅ | Works after 1.5s |
| **Post-Submit** | Cache Refresh | ✅ | getMyServices invalidated |
| **Read-Only** | Display | ✅ | All fields show |
| **Responsive** | Mobile (320px) | ⚠️ | Check spacing |
| **Responsive** | Tablet (768px) | ✅ | Works well |
| **Responsive** | Desktop (1024px+) | ✅ | Works well |
| **Accessibility** | Labels | ✅ | All inputs labeled |
| **Accessibility** | ARIA | ✅ | Descriptive links used |
| **Accessibility** | Keyboard | ✅ | Tab navigation works |

**Issue Found:**
```typescript
// Line 176 - Button should be disabled during submission
<InstantButton
  onClick={handleSubmit}
  isLoading={isSubmitting || isPending}  // ← This is correct
  className="..."
>
```

Actually, this is correct! The button IS disabled. Marking as FALSE POSITIVE.

### Form: PsychologyForm
[Similar detailed output]

### Form: JobPostingForm (Company)
**File:** src/components/company/forms/JobPostingForm.tsx

| State | Check | Status | Details |
|-------|-------|--------|---------|
| **Responsive** | Mobile (320px) | ❌ | Horizontal scroll at line 89 |
| **Responsive** | Tablet (768px) | ✅ | Works well |
| **Responsive** | Desktop (1024px+) | ✅ | Works well |

**Issue Found:**
```typescript
// Line 89 - Container has fixed width causing overflow
<div className="w-full lg:w-3/4">  // ← Should be max-width
  <Form ... />
</div>
```

**Fix:** Change to `max-w` instead of `w` for responsive behavior.

## RESPONSIVE ISSUES SUMMARY

### Mobile (320px - 767px)

| Form | Issue | Line | Fix |
|------|-------|------|-----|
| JobPostingForm | Horizontal scroll | 89 | Use max-w instead of w |
| CareerForm | Input too small | 45 | Increase min-height to 44px |
| ProfessorPlanWizard | Steps cramped | 12 | Stack vertically on mobile |

### Tablet (768px - 1023px)

| Form | Issue | Line | Fix |
|------|-------|------|-----|
| None | - | - | All good |

### Desktop (1024px+)

| Form | Issue | Line | Fix |
|------|-------|------|-----|
| None | - | - | All good |

## ACCESSIBILITY CHECKLIST

For each form, verify:

### Semantic HTML
- [ ] Form has proper <form> tag or role="form"
- [ ] Fieldsets and legends used for grouping
- [ ] Button type="submit" for submission
- [ ] Button type="button" for actions

### Labels & Indicators
- [ ] Every input has associated label
- [ ] Label uses htmlFor attribute
- [ ] Required fields have aria-required
- [ ] Error messages use aria-describedby
- [ ] Help text uses aria-describedby

### Keyboard Navigation
- [ ] Tab order follows visual layout
- [ ] Enter key submits form
- [ ] Escape key cancels
- [ ] Arrow keys work in selects
- [ ] Focus indicators visible

### Visual Feedback
- [ ] Focus states visible (2px minimum)
- [ ] Required fields marked (*)
- [ ] Validation errors in red
- [ ] Success states in green
- [ ] Disabled states clear (grayed out)

### Color Contrast
- [ ] Text on background ≥4.5:1
- [ ] Text on disabled ≥3:1
- [ ] Error text meets contrast requirements
- [ ] Link text meets contrast requirements

## PATTERNS LEARNED

### Pattern 1: Loading State Management
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Forms should show loading state during initial data fetch
✅ **Solution:** Use skeleton loaders matching form structure
📚 **Learning:** Users perceive forms as "faster" with skeleton vs spinner

### Pattern 2: Mobile Responsive Breakpoints
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Fixed widths cause horizontal scroll
✅ **Solution:** Use max-width instead of width
📚 **Learning:** Always test at 320px minimum width

### Pattern 3: Touch Target Sizes
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Mobile touch targets should be 44x44px minimum
✅ **Solution:** Increase button/input min-height
📚 **Learning:** Human finger average is 44-48px

## STATE VALIDATION TEST CASES

For each form, this skill generates test cases:

```typescript
describe('Form State Machine - NutritionForm', () => {
  test('should start in EMPTY state', () => {
    // Initially, form should be empty and editable
  });

  test('should transition to FILLING state on input', () => {
    // First input should trigger FILLING state
  });

  test('should show VALIDATION_ERROR for invalid input', () => {
    // Invalid input should show error
  });

  test('should transition to SUBMITTING on submit', () => {
    // Submit button should disable, form should lock
  });

  test('should show SUCCESS on valid submission', () => {
    // Success message should appear
  });

  test('should redirect to services page', async () => {
    // Should navigate after success
  });

  test('should show READ_ONLY on revisit', async () => {
    // Existing data should be read-only
  });
});
```

## Device Testing Matrix

| Form | Mobile | Tablet | Desktop | Notes |
|------|--------|--------|---------|-------|
| Nutrition | ✅ | ✅ | ✅ | 3-step wizard works |
| Psychology | ✅ | ✅ | ✅ | 4-step wizard works |
| Training | ✅ | ✅ | ✅ | 5-step wizard works |
| JobPosting | ⚠️ | ✅ | ✅ | Fix horizontal scroll |
| CompanyReg | ✅ | ✅ | ✅ | Works well |
| PlanWizard | ✅ | ✅ | ✅ | Works on mobile |

## Usage

```bash
# Audit all forms for UI/UX
/claude "Run UI/UX state audit on all forms"

# Audit specific form
/claude "Check UI/UX state for NutritionForm"

# Check responsive design
/claude "Validate responsive design for all forms"

# Check accessibility
/claude "Run accessibility audit on forms"
```

## Notes

- Always test on real devices when possible
- Emulate mobile view in DevTools
- Check color contrast with accessibility tools
- Test keyboard navigation without mouse
- Verify focus trapping in modals/wizards
- Ensure form is usable at 320px width minimum
- Test in both light and dark modes
