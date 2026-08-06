# Template-Based Dynamic Plans Implementation

**Behavioral Protocol for implementing template-based plan systems with strict quality standards.**

## When to Use

Trigger this skill when implementing **template-based dynamic plan systems** or similar reusable configuration patterns:

- Day/meal/exercise template systems
- Plan wizards with template selection
- Configurable workflow builders
- Multi-step template creation UIs

## Core Principles (User's Rules)

**CRITICAL - Never violate these:**

1. **No Bloated Code** - Minimal, surgical changes only
2. **Respect Legacy Code** - Never ignore existing patterns
3. **No Premature Commits** - Nothing committed until everything works
4. **Complete Before Commit** - Full verification before git commit
5. **Parallel Development** - Fire 4 subagents simultaneously when appropriate

## Implementation Workflow

### Phase 1: Architecture & Design

```
1. Database Schema → Add template models (DayTemplate, TemplateAssignment)
2. Type Definitions → Create interfaces (DayTemplate, MealConfiguration)
3. Backend API → Templates CRUD router + expansion logic in plans router
4. UI Components → TemplateLibrary, TemplateBuilder, TemplateRepeater
5. Main Integration → Wizard step integration
6. Translations → Bilingual support (EN/AR)
7. Validation → Build verification, type checking
```

### Phase 2: Component Structure

**Required Components:**
- `TemplateLibrary` - Browse/search available templates
- `TemplateCard` - Individual template display
- `TemplateBuilder` - 3-step creation wizard (Details → Meals → Review)
- `TemplateBuilderModal` - Modal wrapper
- `TemplateRepeater` - Set template repetition counts
- `MealBuilder` - Meal configuration editor

### Phase 3: State Management Pattern

```typescript
// Hook-based state (no local component state)
const {
  useTemplateSystem,        // Toggle between template/item modes
  selectedTemplates,        // Array of selected templates
  showTemplateBuilder,     // Modal visibility
  editingTemplate,          // Template being edited
  // ... handlers
} = usePlanCreation();
```

**Key Pattern:** Centralized state in hooks, NOT duplicated in page components.

### Phase 4: API Integration

```typescript
// Templates Router
list: protectedProcedure
  .input(z.object({ serviceDefId, includePublic }))
  .query(async ({ ctx }) => {
    return ctx.db.dayTemplate.findMany(...);
  }),

// Plans Router - Template Expansion
createPlan: protectedProcedure
  .input(z.object({
    templateAssignments: z.array(z.object({
      templateId, repeatCount, dayOrder, assignedDays
    }))
  }))
  .mutation(async ({ ctx, input }) => {
    // Expand templates into itemAssignments
    const expanded = await expandTemplates(input.templateAssignments);
    // Create plan with expanded items
  })
```

### Phase 5: Type Safety Checklist

**Must Pass:**
- [ ] All template interfaces properly typed
- [ ] No `any` types without justification
- [ ] Proper null guards (serviceType != null)
- [ ] Translation keys exist for all UI strings
- [ ] Component props match interfaces exactly

### Phase 6: Common Pitfalls & Fixes

**1. State Duplication**
```typescript
// ❌ WRONG - Local state + hook state
const [useTemplate, setUseTemplate] = useState(false);
const { useTemplateSystem } = usePlanCreation();

// ✅ CORRECT - Use hook's state directly
const { useTemplateSystem, setUseTemplateSystem } = usePlanCreation();
```

**2. Translation Keys Missing**
```typescript
// ❌ WRONG - Default fallbacks in production
t.mealBuilder?.addFood || 'Add Food'

// ✅ CORRECT - Always add keys to both EN/AR
mealBuilder: {
  addFood: "Add Food",
  addFoodAr: "إضافة طعام",
}
```

**3. Context Access Patterns**
```typescript
// ❌ WRONG - Wrong context structure
const { prisma } = ctx;
const userId = ctx.user.id;

// ✅ CORRECT - Match actual context
const { db: prisma } = ctx;
const userId = ctx.session.user.id!;
```

**4. Component Prop Mismatches**
```typescript
// ❌ WRONG - JSX element instead of component
<EmptyState icon={<Search />} />

// ✅ CORRECT - Component reference
<EmptyState icon={Search} />

// ❌ WRONG - Object instead of action
action={<Button onClick={...}>Click</Button>}

// ✅ CORRECT - Action object
action={{ label: "Create", onClick: handleClick }}
```

### Phase 7: Build Verification

**Run before every commit:**
```bash
npm run build
```

**Common Build Errors to Fix:**
- Type mismatches → Check interfaces, add type guards
- Missing translations → Add to both EN/AR
- Context issues → Use `ctx.db` not `ctx.prisma`
- Syntax errors → Check JSX structure, fix shorthand props

### Phase 8: Final Verification Checklist

**Before `git commit`:**
- [ ] Build passes completely
- [ ] No TypeScript errors
- [ ] All translations present
- [ ] Components render without errors
- [ ] API routes return expected data
- [ ] State management is clean (no duplication)
- [ ] Legacy code patterns respected

## File Organization

```
src/app/professor/dynamic-plans/plans/new/
├── components/
│   ├── TemplateCard.tsx           # Template display
│   ├── TemplateLibrary.tsx        # Template browser
│   ├── TemplateBuilder.tsx        # Creation wizard
│   ├── TemplateBuilderModal.tsx   # Modal wrapper
│   ├── TemplateRepeater.tsx      # Repetition UI
│   └── MealBuilder.tsx            # Meal editor
├── hooks/
│   ├── use-plan-creation.ts       # State & handlers
│   └── use-data-fetching.ts       # API queries
├── lib/
│   ├── template-types.ts           # Interfaces
│   └── constants.ts               # Config values
└── page.tsx                        # Main wizard
```

## Success Metrics

✅ **Successful implementation when:**
- Build completes without errors
- Template → Plan expansion works server-side
- All 6 UI components render correctly
- Bilingual support complete
- No state duplication
- Clean git history (single logical commit)

## Anti-Patterns to Avoid

❌ **Never:**
- Create local state that duplicates hook state
- Commit broken code "to save progress"
- Add features without translation support
- Ignore existing code patterns
- Add unnecessary abstractions
- Use `any` type to bypass type errors
- Commit before build passes

## Parallel Development Strategy

When appropriate, fire 4 subagents in parallel:
1. **Schema & Types** - Database + TypeScript interfaces
2. **Backend API** - Routers + business logic
3. **UI Components** - React components
4. **Integration** - Page assembly + state wiring

**Each subagent gets:**
- Clear task boundary
- Expected output format
- Integration points defined
- No overlapping work

## Translation Pattern

**Always add in pairs:**
```typescript
// English
someComponent: {
  title: "Title",
  description: "Description",
}

// Arabic (same structure)
someComponent: {
  title: "العنوان",
  description: "الوصف",
}
```

## Template Expansion Logic

**Server-side algorithm:**
```typescript
1. For each templateAssignment (sorted by dayOrder):
2. Fetch template with nutritionConfig
3. For repeatCount times:
   - Create itemAssignments for each meal
   - Set day number sequentially
   - Include all meal items with quantities
4. Return expanded itemAssignments array
5. Create plan with expanded items
```

## Quality Gates

**Must pass ALL gates before commit:**
1. ✅ Build succeeds (`npm run build`)
2. ✅ Type checking passes
3. ✅ No console errors
4. ✅ All translations present
5. ✅ State management clean
6. ✅ Follows existing patterns
7. ✅ No unnecessary abstractions
8. ✅ User approval obtained

## Session-Specific Context

**This session implemented:**
- Nutrition template-based plans (Training/Psychology patterns ready)
- 7 new UI components
- Template CRUD API
- Plan creation with template expansion
- 40+ translation keys (EN/AR)
- Type-safe interfaces

**Key decisions made:**
- Templates stored with full configurations (JSON columns)
- Expansion happens server-side during plan creation
- State centralized in usePlanCreation hook
- TemplateLibrary shows available templates (not selected)
- TemplateRepeater manages repetition counts
