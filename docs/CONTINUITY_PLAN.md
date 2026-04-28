# DataHealth Profiler — Continuity Plan

**Created:** 2026-04-27  
**Status:** Ready for Execution  
**Objective:** Transform solid foundation into premium, portfolio-ready product

---

## Current State (2026-04-27)

Foundation complete. 80% of MVP implemented. Needs visual polish and refinement to reach premium product status.

### Completed ✅
- Design system tokens (oklch, warm neutrals, teal)
- State machine with reducer
- Server/Client component split
- Upload flow (dropzone + demo)
- Report layout (cards, table, drawer)
- Mock data (11 columns, realistic)
- All major components
- Documentation (README, PLAN, SUMMARY)

### Technical Health
- ✅ Architecture: Solid
- ✅ TypeScript: Strict mode, well-typed
- ✅ State management: Clean reducer
- ✅ Component structure: Modular
- ⚠️ Visual polish: Needs refinement
- ⚠️ Accessibility: Missing
- ⚠️ Responsive: Desktop only

---

## Execution Plan

### Phase 1: Visual Premium Foundation
**Priority:** 🔴 CRITICAL  
**Estimate:** 3-4 hours  
**Goal:** Transform generic components into premium product

#### Tasks
1. **Load Geist fonts via next/font** (15min)
   - Add Geist Sans and Geist Mono to layout.tsx
   - Configure font loading with display: swap
   - Update globals.css to use loaded fonts

2. **Refine health score card** (30min)
   - Increase spacing between elements
   - Improve number hierarchy (larger score)
   - Add subtle background gradient
   - Refine dimension breakdown layout

3. **Refine dataset meta card** (30min)
   - Improve dataset name typography
   - Better spacing in stats list
   - Add subtle dividers between stats
   - Refine timestamp display

4. **Refine summary stat card** (20min)
   - Larger icon container
   - Better number/label hierarchy
   - Consistent spacing with other cards

5. **Improve attention callout** (30min)
   - Larger, more prominent icon
   - Better visual hierarchy
   - Add subtle border-left accent
   - Improve severity indicators

6. **Refine type badges** (30min)
   - Add type icons (lucide-react)
   - Subtle color refinement
   - Better padding and spacing
   - Consistent sizing

7. **Refine flag chips** (30min)
   - Add flag icons
   - Improve color system
   - Better spacing
   - Hover states

#### Files to Modify
- `app/layout.tsx`
- `app/globals.css`
- `components/report/health-score-card.tsx`
- `components/report/dataset-meta-card.tsx`
- `components/report/summary-stat-card.tsx`
- `components/report/attention-callout.tsx`
- `components/report/type-badge.tsx`
- `components/report/flag-chip.tsx`

#### Acceptance Criteria
- [ ] Geist fonts load without FOUT
- [ ] Health score card has clear visual hierarchy
- [ ] Dataset meta card is refined and spacious
- [ ] Summary stat cards are consistent
- [ ] Attention callout stands out visually
- [ ] Type badges have icons and identity
- [ ] Flag chips are refined and consistent

#### Risks
None. Purely visual changes.

---

### Phase 2: Premium Table
**Priority:** 🔴 CRITICAL  
**Estimate:** 2-3 hours  
**Goal:** Transform table into premium centerpiece

#### Tasks
1. **Reduce density** (10min)
   - Increase py from 4 to 6 in tbody rows
   - Increase header py from 3 to 4
   - Add more breathing room

2. **Improve hover state** (15min)
   - More visible background change
   - Add smooth transition
   - Subtle shadow lift on hover
   - Cursor pointer feedback

3. **Refine sorting UI** (30min)
   - Larger, more prominent sort buttons
   - Clearer active state
   - Add sort direction indicator
   - Better spacing

4. **Add icons to headers** (20min)
   - Column icon
   - Type icon
   - Health icon
   - Improve visual hierarchy

5. **Improve null bar** (20min)
   - Slightly larger (w-24 instead of w-20)
   - Better color progression
   - Smoother transitions
   - Better label positioning

6. **Truncate long names** (30min)
   - Add text truncation with ellipsis
   - Implement tooltip on hover
   - Ensure layout doesn't break

#### Files to Modify
- `components/report/column-table.tsx`
- `components/report/null-bar.tsx`

#### Acceptance Criteria
- [ ] Table has visual breathing room
- [ ] Hover state is clear and smooth
- [ ] Sorting UI is intuitive and prominent
- [ ] Headers have icons for clarity
- [ ] Null bars are refined and readable
- [ ] Long names truncate gracefully

#### Risks
Low. Mostly CSS changes with some tooltip logic.

---

### Phase 3: Premium Drawer
**Priority:** 🔴 CRITICAL  
**Estimate:** 2-3 hours  
**Goal:** Transform drawer into premium detail panel

#### Tasks
1. **Increase histogram size** (5min)
   - Change from h-64 to h-80
   - Adjust Plotly layout margins
   - Better visual prominence

2. **Refine stats layout** (30min)
   - More spacious grid
   - Better card styling
   - Improved typography hierarchy
   - Add subtle dividers

3. **Improve top values panel** (30min)
   - Larger bars (h-2 instead of h-1.5)
   - Better spacing between items
   - Refined typography
   - Smoother animations

4. **Refine insight note** (20min)
   - Larger icon
   - Better background treatment
   - Improved list styling
   - More prominent

5. **Add smooth scroll** (15min)
   - Smooth scroll behavior
   - Better scroll indicators
   - Refined scrollbar styling

6. **Improve drawer header** (30min)
   - Better spacing
   - Refined close button
   - Add subtle border-bottom
   - Sticky positioning refinement

#### Files to Modify
- `components/report/column-detail-drawer.tsx`
- `components/report/histogram-panel.tsx`
- `components/report/top-values-panel.tsx`
- `components/report/insight-note.tsx`

#### Acceptance Criteria
- [ ] Histogram is larger and more readable
- [ ] Stats have clear hierarchy and spacing
- [ ] Top values are visual and refined
- [ ] Insights stand out appropriately
- [ ] Scroll behavior is smooth
- [ ] Header is refined and functional

#### Risks
Low. Mostly layout and styling changes.

---

### Phase 4: Premium States
**Priority:** 🟡 HIGH  
**Estimate:** 2 hours  
**Goal:** Refine empty, loading, error states

#### Tasks
1. **Improve empty state** (45min)
   - Better illustration or icon
   - More inviting copy
   - Refined layout
   - Add subtle animation

2. **Improve loading state** (45min)
   - Replace spinner with skeleton screens OR
   - Create custom branded animation
   - Better progress indication
   - Refined typography

3. **Refine error state** (30min)
   - Better icon treatment
   - Improved layout
   - More helpful copy
   - Refined button styling

#### Files to Modify
- `components/empty-state.tsx`
- `components/loading-state.tsx`
- `components/error-state.tsx`

#### Acceptance Criteria
- [ ] Empty state invites action
- [ ] Loading state is sophisticated
- [ ] Error state is clear and helpful
- [ ] All states feel premium

#### Risks
Low. Self-contained components.

---

### Phase 5: Responsive Mobile
**Priority:** 🟡 HIGH  
**Estimate:** 3-4 hours  
**Goal:** Adapt for mobile devices

#### Tasks
1. **Convert drawer to sheet on mobile** (90min)
   - Full-screen on small viewports
   - Slide up from bottom
   - Better mobile header
   - Touch-friendly close

2. **Adapt table for mobile** (90min)
   - Horizontal scroll with indicators OR
   - Card-based layout for mobile
   - Touch-friendly interactions
   - Maintain functionality

3. **Adjust cards for mobile** (30min)
   - Stack vertically
   - Adjust spacing
   - Ensure readability
   - Test on small viewports

4. **Test and refine** (30min)
   - Test on various viewport sizes
   - Fix any layout issues
   - Ensure touch targets are adequate

#### Files to Modify
- `components/report/column-detail-drawer.tsx`
- `components/report/column-table.tsx`
- `components/app-shell.tsx`
- `app/globals.css` (add mobile breakpoints)

#### Acceptance Criteria
- [ ] Drawer becomes full-screen sheet on mobile
- [ ] Table is usable on mobile
- [ ] Cards stack well on mobile
- [ ] Touch interactions work smoothly
- [ ] Layout doesn't break on small screens

#### Risks
Medium. Requires careful testing across viewports.

---

### Phase 6: Keyboard & Accessibility
**Priority:** 🟡 HIGH  
**Estimate:** 3-4 hours  
**Goal:** Make fully accessible

#### Tasks
1. **Add keyboard navigation to table** (90min)
   - Arrow keys to navigate rows
   - Enter to open drawer
   - Tab to move between interactive elements
   - Visual focus indicators

2. **Add Escape to close drawer** (15min)
   - Listen for Escape key
   - Close drawer on Escape
   - Restore focus to trigger element

3. **Add Tab trapping in drawer** (30min)
   - Trap focus within drawer when open
   - Cycle through focusable elements
   - Prevent focus escape

4. **Add ARIA labels and roles** (60min)
   - Add proper ARIA labels
   - Define roles for interactive elements
   - Add live regions for state changes
   - Ensure semantic HTML

5. **Test with screen reader** (30min)
   - Test with NVDA or JAWS
   - Fix any issues found
   - Ensure all content is accessible

#### Files to Modify
- `components/report/column-table.tsx`
- `components/report/column-detail-drawer.tsx`
- `components/upload-dropzone.tsx`
- `components/app-shell.tsx`

#### Acceptance Criteria
- [ ] Table is fully keyboard navigable
- [ ] Drawer closes with Escape
- [ ] Focus is trapped in drawer
- [ ] All interactive elements have ARIA labels
- [ ] Screen reader can navigate entire app
- [ ] Focus indicators are visible

#### Risks
Medium. Requires testing with assistive technologies.

---

### Phase 7: Final Polish
**Priority:** 🟢 MEDIUM  
**Estimate:** 2-3 hours  
**Goal:** Micro-interactions and final refinement

#### Tasks
1. **Add smooth transitions** (45min)
   - All hover states
   - State changes
   - Drawer open/close
   - Consistent timing

2. **Add visual feedback on clicks** (30min)
   - Button press states
   - Active states
   - Ripple effects (subtle)

3. **Refine animations** (45min)
   - Drawer slide-in
   - Loading animations
   - Fade-ins for content
   - Spring physics for natural feel

4. **Final spacing review** (30min)
   - Audit all spacing
   - Ensure consistency
   - Fix any outliers

5. **Final typography review** (30min)
   - Check all font sizes
   - Ensure hierarchy
   - Fix any inconsistencies

#### Files to Modify
- All component files (minor tweaks)
- `app/globals.css` (animation tokens)

#### Acceptance Criteria
- [ ] All interactions are smooth
- [ ] Transitions are consistent
- [ ] Animations feel natural
- [ ] Spacing is consistent throughout
- [ ] Typography hierarchy is clear
- [ ] Product feels truly premium

#### Risks
Low. Incremental polish.

---

## Total Estimate

**17-23 hours** to reach premium, portfolio-ready state

### Breakdown
- Phase 1: 3-4 hours
- Phase 2: 2-3 hours
- Phase 3: 2-3 hours
- Phase 4: 2 hours
- Phase 5: 3-4 hours
- Phase 6: 3-4 hours
- Phase 7: 2-3 hours

---

## Success Criteria

### Technical
- [ ] Fonts load without FOUT
- [ ] All TypeScript errors resolved
- [ ] Build passes without warnings
- [ ] No console errors

### Visual
- [ ] Components have clear visual identity
- [ ] Spacing is consistent throughout
- [ ] Typography hierarchy is clear
- [ ] Colors are used consistently
- [ ] Shadows and borders are refined

### UX
- [ ] Table is centerpiece with premium feel
- [ ] Drawer is spacious and refined
- [ ] States are polished and inviting
- [ ] Interactions are smooth and responsive
- [ ] Mobile experience is solid

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus management is correct
- [ ] ARIA labels are present
- [ ] Color contrast meets WCAG AA

### Product
- [ ] Feels Apple-like premium
- [ ] Ready for portfolio showcase
- [ ] Screenshots are compelling
- [ ] Demo video is polished

---

## Out of Scope (V1)

These items are explicitly deferred to future versions:

- Dark mode (defer to V2)
- Real CSV parsing (mock sufficient for demo)
- Backend integration (V2)
- Advanced filtering (V2)
- Export functionality (V2)
- Multi-file comparison (V3)
- User authentication (V3)
- Database persistence (V3)

---

## Checkpoints

### After Phase 1
- [ ] Components look premium, not generic
- [ ] Fonts are loaded properly
- [ ] Visual identity is established

### After Phase 2
- [ ] Table is refined centerpiece
- [ ] Hover states are polished
- [ ] Sorting is intuitive

### After Phase 3
- [ ] Drawer is spacious and polished
- [ ] Visualizations are prominent
- [ ] Stats are well-organized

### After Phase 4
- [ ] All states are inviting
- [ ] Loading is sophisticated
- [ ] Empty state is compelling

### After Phase 5
- [ ] Mobile works well
- [ ] Responsive breakpoints are solid
- [ ] Touch interactions work

### After Phase 6
- [ ] Fully accessible
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

### After Phase 7
- [ ] Final polish complete
- [ ] All interactions smooth
- [ ] Product feels premium

### Final Checkpoint
- [ ] Screenshots taken
- [ ] Demo video recorded
- [ ] Portfolio case study written
- [ ] README updated with visuals
- [ ] Ready for showcase

---

## Execution Strategy

### Recommended Order
1. Start with Phase 1 (Visual Foundation) — establishes visual identity
2. Move to Phase 2 (Table) — centerpiece of experience
3. Continue to Phase 3 (Drawer) — completes core experience
4. Execute Phase 4 (States) — polishes edge cases
5. Tackle Phase 5 (Mobile) — expands device support
6. Implement Phase 6 (Accessibility) — ensures inclusivity
7. Finish with Phase 7 (Polish) — final refinement

### Alternative: Quick Wins First
If time is limited, execute quick wins from each phase first:
1. Load fonts (Phase 1)
2. Increase table spacing (Phase 2)
3. Increase histogram size (Phase 3)
4. Improve empty state copy (Phase 4)
5. Add Escape to close drawer (Phase 6)
6. Add transitions (Phase 7)

This gives immediate visual improvement in ~2 hours.

---

## Next Session

**Start with:** Phase 1 — Visual Premium Foundation

**First task:** Load Geist fonts via next/font in layout.tsx

**Expected outcome:** Fonts load properly, typography improves immediately

---

**Plan created:** 2026-04-27  
**Status:** ✅ Ready for execution  
**Estimated completion:** 17-23 hours of focused work
