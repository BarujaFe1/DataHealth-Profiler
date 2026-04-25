# DataHealth Profiler — Project Plan

## Objective
Build a premium frontend foundation for a data profiling tool that turns any dataset into an actionable health report with AI-assisted insights.

## Current Scope
Implement frontend foundation (phases 1–7): design system, app shell, upload flow, mock report rendering, column table, detail drawer. No backend or persistent storage.

## Phases

### 1. Foundation ✓
- Project setup
- Environment config
- Git structure

### 2. Design System
- Color tokens (warm neutral base, deep teal accent)
- Typography (Geist, Geist Mono)
- Spacing, radius, shadows
- Semantic layer (surface, text, interactive)
- Responsive foundation

### 3. Shell
- App shell with top bar
- Layout grid
- Responsive surface

### 4. Upload Flow
- Empty state with dropzone
- Demo dataset button
- File validation and feedback

### 5. Mock Data
- Realistic ProfileReport mock
- Simulated 1.5–2s processing delay
- Flags, inferred types, distributions

### 6. Report UI
- Executive summary cards
- Attention callout
- Column table (sortable, severity-first)
- Interactive row selection

### 7. Detail Drawer
- Right-side slide-in panel
- Histogram visualization
- Top values panel
- Type & flag indicators
- Insight note

### 8. States
- Complete state machine (idle → uploading → processing → success | error)
- Transitions with subtle motion
- Empty, loading, error, success visuals

### 9. Orchestration
- Integrate all flows
- State + UI + mock data
- Final logic wiring

### 10. Accessibility & i18n
- ARIA labels
- Keyboard nav
- Focus management
- Text direction (LTR)

### 11. Dark Mode
- High-contrast dark surface
- Preserved depth and deference
- Adaptive shadows and borders

### 12. Polish
- Micro-interactions
- Motion refinement
- Edge case visuals
- Final review

## Modules
- `components/`		Reusable UI
- `lib/`			Types, utils, reducer, mock
- `app/`			Next.js routing and layout
- `public/`		Static assets
- `mocks/`		Data stubs

## Checkpoints
- [x] Design tokens defined
- [x] Layout and shell implemented
- [x] Upload surface complete
- [x] Mock report data ready
- [x] Column table renders
- [x] Drawer opens with content
- [x] State machine wired
- [ ] Final integration
- [ ] Responsive behaviors
- [ ] Accessibility pass
- [ ] Dark mode
- [ ] Polish

## Risks
- Over-engineering early: Mitigation: Stick to MVP components
- Visual bloat: Mitigation: Audit every pixel, remove non-essentials
- Performance with Plotly: Mitigation: Lazy load only when drawer opens

## Acceptance Criteria
- App compiles and renders
- Upload → process → result flow works with mock
- Table sorts by health severity
- Drawer opens with correct column data
- UI feels premium, not generic
- Code is modular and well-typed
- Works on desktop and mobile
- Loading states feel intentional
