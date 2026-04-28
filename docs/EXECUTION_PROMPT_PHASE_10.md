# Execute Phase 10: Visual Premium Foundation

You are about to execute **Phase 10: Visual Premium Foundation** of the DataHealth Profiler project.

## Context

The DataHealth Profiler project is in **excellent technical condition** with a **solid foundation** but needs **visual polish** to reach premium, Apple-like product status.

**Current state:** 80% complete, foundation solid, needs visual refinement  
**Your mission:** Transform generic components into premium product  
**Time estimate:** 3-4 hours  
**Priority:** 🔴 CRITICAL

## What Was Already Done

A comprehensive audit was completed on 2026-04-27. Key findings:
- ✅ Technical architecture: Excellent (9/10)
- ⚠️ Visual design: Good but generic (6/10)
- ⚠️ Component refinement: Needs polish (6/10)
- ❌ Typography: Fonts not loaded (5/10)

Full audit available in `docs/AUDIT_2026-04-27.md`

## Your Objective

Execute Phase 10 tasks to establish visual premium foundation:

1. **Load Geist fonts via next/font** (15min)
2. **Refine health score card** (30min)
3. **Refine dataset meta card** (30min)
4. **Refine summary stat card** (20min)
5. **Improve attention callout** (30min)
6. **Refine type badges** (30min)
7. **Refine flag chips** (30min)

## Execution Instructions

### Task 1: Load Geist Fonts (15min)

**File:** `app/layout.tsx`

**What to do:**
1. Import Geist Sans and Geist Mono from `next/font/google` or local
2. Configure with `display: 'swap'` to prevent FOUT
3. Apply to html element via className
4. Update `app/globals.css` to reference loaded fonts

**Acceptance:**
- Fonts load without flash of unstyled text
- Typography immediately looks better
- Fallbacks still work if fonts fail

### Task 2: Refine Health Score Card (30min)

**File:** `components/report/health-score-card.tsx`

**What to do:**
1. Increase spacing between score and label (mb-2 → mb-3)
2. Make score larger (text-5xl → text-6xl)
3. Add subtle background gradient or glow
4. Improve dimension breakdown spacing (space-y-3 → space-y-4)
5. Add subtle dividers between dimensions
6. Refine typography hierarchy

**Acceptance:**
- Score is prominent and eye-catching
- Dimensions are clearly separated
- Card feels premium, not generic
- Spacing is generous

### Task 3: Refine Dataset Meta Card (30min)

**File:** `components/report/dataset-meta-card.tsx`

**What to do:**
1. Improve dataset name typography (larger, better weight)
2. Add more spacing in stats list (space-y-3 → space-y-4)
3. Add subtle dividers between stats
4. Refine timestamp display (smaller, more subtle)
5. Better visual hierarchy

**Acceptance:**
- Dataset name is prominent
- Stats are easy to scan
- Spacing is generous
- Card feels refined

### Task 4: Refine Summary Stat Card (20min)

**File:** `components/report/summary-stat-card.tsx`

**What to do:**
1. Increase icon container size (h-10 w-10 → h-12 w-12)
2. Add subtle background to icon container
3. Improve number/label hierarchy
4. Ensure consistent spacing with other cards
5. Refine typography

**Acceptance:**
- Icon is more prominent
- Number stands out
- Consistent with other cards
- Feels premium

### Task 5: Improve Attention Callout (30min)

**File:** `components/report/attention-callout.tsx`

**What to do:**
1. Make icon larger (h-5 w-5 → h-6 w-6)
2. Add subtle border-left accent (4px, warning color)
3. Improve spacing (p-6 → p-8)
4. Make severity indicators more prominent
5. Better visual hierarchy for messages
6. Add subtle background tint

**Acceptance:**
- Callout stands out visually
- Critical items are immediately visible
- Spacing is generous
- Feels important, not generic

### Task 6: Refine Type Badges (30min)

**File:** `components/report/type-badge.tsx`

**What to do:**
1. Add type icons from lucide-react (Database, Hash, Type, Calendar, etc.)
2. Refine color system (more subtle, less saturated)
3. Improve padding (px-2 py-0.5 → px-2.5 py-1)
4. Add icon with proper spacing
5. Ensure consistent sizing

**Icon mapping:**
- integer/float: Hash
- string: Type
- boolean: ToggleLeft
- date/datetime: Calendar
- categorical: Tag
- mixed/unknown: HelpCircle

**Acceptance:**
- Badges have icons
- Colors are refined and subtle
- Sizing is consistent
- Feels premium, not default

### Task 7: Refine Flag Chips (30min)

**File:** `components/report/flag-chip.tsx`

**What to do:**
1. Add flag icons from lucide-react
2. Improve color system (more nuanced)
3. Better padding and spacing
4. Add hover states with transitions
5. Ensure consistent sizing

**Icon mapping:**
- high_nulls: AlertCircle
- high_cardinality: TrendingUp
- low_cardinality: TrendingDown
- outliers_detected: Zap
- type_mismatch: AlertTriangle
- duplicate_values: Copy
- skewed_distribution: BarChart3
- constant_value: Minus
- suspicious_pattern: Eye

**Acceptance:**
- Chips have icons
- Colors are refined
- Hover states work
- Feels polished

## Important Guidelines

### DO:
- Focus on visual refinement only
- Use existing design tokens
- Maintain component structure
- Add subtle improvements
- Test after each change
- Commit after each task

### DON'T:
- Refactor architecture
- Change state management
- Add new features
- Change component APIs
- Break existing functionality

## Success Criteria

After completing Phase 10, the project should have:
- ✅ Geist fonts loading properly
- ✅ Cards with clear visual hierarchy
- ✅ Attention callout that stands out
- ✅ Badges and chips with icons and personality
- ✅ Consistent spacing throughout
- ✅ Premium feel, not generic

## Testing

After each task:
1. Run `npm run dev`
2. Open http://localhost:3000
3. Click "Try Demo Dataset"
4. Verify visual improvements
5. Check console for errors
6. Test interactions

## Next Steps After Phase 10

Once Phase 10 is complete, proceed to:
- **Phase 11:** Premium Table (2-3h)
- **Phase 12:** Premium Drawer (2-3h)
- **Phase 13:** Premium States (2h)

## Files You'll Modify

1. `app/layout.tsx` — Font loading
2. `app/globals.css` — Font references (if needed)
3. `components/report/health-score-card.tsx` — Refinement
4. `components/report/dataset-meta-card.tsx` — Refinement
5. `components/report/summary-stat-card.tsx` — Refinement
6. `components/report/attention-callout.tsx` — Enhancement
7. `components/report/type-badge.tsx` — Icons + refinement
8. `components/report/flag-chip.tsx` — Icons + refinement

## Reference Documents

- Full audit: `docs/AUDIT_2026-04-27.md`
- Execution plan: `docs/CONTINUITY_PLAN.md`
- Current state: `docs/SUMMARY.md`
- Project plan: `docs/PLAN.md`

## Ready to Execute

You have everything you need:
- ✅ Clear objectives
- ✅ Detailed tasks
- ✅ Acceptance criteria
- ✅ Time estimates
- ✅ Files to modify
- ✅ Testing instructions

**Start with Task 1: Load Geist fonts**

Good luck! Transform this solid foundation into a premium product.

---

**Prompt created:** 2026-04-27  
**Phase:** 10 — Visual Premium Foundation  
**Estimated time:** 3-4 hours  
**Status:** Ready to execute
