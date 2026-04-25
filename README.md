# DataHealth Profiler

A premium data profiling tool that turns any dataset into an actionable health report with AI-assisted insights.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black)

## Overview

DataHealth Profiler analyzes datasets and provides comprehensive health reports with:
- Overall health scoring (completeness, consistency, validity)
- Column-level profiling with type inference
- Data quality flags and anomaly detection
- Distribution visualizations
- AI-generated insights and recommendations

## Features

- **Executive Summary**: Overall health score with breakdown by dimension
- **Attention Callout**: Critical issues requiring immediate action
- **Column Analysis Table**: Sortable table showing health, nulls, unique values, and flags
- **Detail Drawer**: Deep-dive into individual columns with histograms and statistics
- **Mock Demo**: Try the interface with realistic sample data

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Plotly.js (lazy-loaded)
- **State Management**: React useReducer
- **UI Components**: Custom components with Radix UI primitives

## Design Philosophy

The interface follows Apple-like design principles:
- **Clarity**: Information hierarchy is immediately apparent
- **Deference**: UI defers to content, not the other way around
- **Depth**: Subtle shadows and layers create visual depth
- **Quiet Confidence**: Premium feel without being loud

### Color System
- Warm neutral palette (oklch color space)
- Deep teal accent used sparingly
- 5-tier health color system (excellent → critical)

### Typography
- Geist Sans for UI text
- Geist Mono for data and code

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd datahealth-profiler

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
datahealth-profiler/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Design system tokens
├── components/            # React components
│   ├── app-shell.tsx     # Main orchestrator (Client)
│   ├── top-bar.tsx       # Header (Server)
│   └── report/           # Report components
├── lib/                   # Core logic
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Helper functions
│   ├── reducer.ts        # State machine
│   ├── mock-data.ts      # Demo dataset
│   └── plotly-config.ts  # Chart configuration
└── docs/                  # Documentation
```

## Usage

### Try Demo Dataset
1. Click "Try Demo Dataset" on the home screen
2. Wait for processing (simulated 1.5–2s delay)
3. Explore the health report

### Upload Your Own Data
1. Drag and drop a CSV file into the upload zone
2. Wait for processing
3. Review the generated report

### Explore Column Details
1. Click any row in the column table
2. View detailed statistics, distributions, and insights
3. Close the drawer to return to the table

## State Machine

The app uses a reducer-based state machine:

```
idle → uploading → processing → success
                              ↘ error
```

- **idle**: Initial state, showing upload zone
- **uploading**: File accepted, preparing for processing
- **processing**: Analyzing dataset (simulated delay)
- **success**: Report ready, displaying results
- **error**: Processing failed, showing error with retry

## Mock Data

The demo dataset simulates a realistic e-commerce transaction dataset:
- 847,293 rows
- 11 columns (emails, amounts, dates, categories, etc.)
- Health scores ranging from 42 (critical) to 96 (excellent)
- Various data quality issues (high nulls, outliers, type mismatches)
- AI-generated insights for each column

## Development

### Component Architecture

**Server Components** (default):
- Static content, no interactivity
- Smaller bundle size
- Examples: cards, badges, static panels

**Client Components** (when needed):
- Interactive elements (buttons, forms)
- Browser APIs (drag-drop, localStorage)
- State management (useState, useReducer)
- Examples: table, drawer, upload zone

### Design System

All design tokens are defined in `app/globals.css`:
- Color palette (warm neutrals + deep teal)
- Typography scale
- Spacing scale (4px base)
- Border radius tokens
- Shadow system
- Motion tokens

### Adding New Components

1. Determine if Server or Client Component
2. Create in appropriate directory
3. Import types from `lib/types.ts`
4. Use utility functions from `lib/utils.ts`
5. Follow existing naming conventions

## Roadmap

### Phase 1: Foundation ✅
- Project setup
- Design system
- Component library
- State machine
- Mock data

### Phase 2: Core Features ✅
- Upload flow
- Report layout
- Column table
- Detail drawer
- All state surfaces

### Phase 3: Enhancement (Next)
- Dark mode
- Responsive mobile refinement
- Keyboard navigation
- Accessibility improvements
- Font loading optimization

### Phase 4: Real Data (Future)
- CSV parsing
- Backend integration
- Real-time processing
- Export functionality

### Phase 5: Advanced (Future)
- Multi-file comparison
- Custom health thresholds
- Advanced filtering
- User preferences
- Collaboration features

## Contributing

This is currently a portfolio project. Contributions, issues, and feature requests are welcome.

## License

MIT

## Acknowledgments

- Design inspiration: Apple Human Interface Guidelines
- Color system: oklch color space for perceptual uniformity
- Typography: Geist font family by Vercel
- Visualization: Plotly.js for interactive charts

---

**Built with care for the craft of software design.**
