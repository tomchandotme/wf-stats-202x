# Overall Architecture Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19 + Vite 7 + Tailwind CSS 4
**Entry Point:** /Users/tomchan/playground/wf-2025-stats/src/main.tsx

## Architecture Overview

This is a single-page application (SPA) focused on visualizing Warframe item usage data from 2025. It processes a large JSON dataset containing usage statistics indexed by Mastery Rank (MR).

```
[Data Source: JSON] -> [DataLoader Utility] -> [React App Component] -> [UI/Charts]
```

## Key Modules

| Module | Purpose | Location |
|--------|---------|----------|
| `main.tsx` | App entry point, React root mounting | `src/main.tsx` |
| `App.tsx` | Main application component, handles data display | `src/App.tsx` |
| `dataLoader.ts` | Utilities for parsing and aggregating usage data | `src/utils/dataLoader.ts` |
| `types.ts` | TypeScript interface definitions for the data model | `src/types.ts` |
| `cn.ts` | Utility for Tailwind class merging | `src/utils/cn.ts` |

## Technical Stack

- **Frontend:** React 19 (Functional Components)
- **Tooling:** Vite 7 (Build tool), Bun (Lockfile detected)
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite)
- **Visualization:** Recharts (Dependency detected)
- **Language:** TypeScript 5.9

## Data Flow

1. Static JSON (`WarframeUsageData2025.json`) is imported directly in `dataLoader.ts`.
2. `dataLoader.ts` extracts and transforms the raw data (e.g., aggregating variants like Prime/Umbra).
3. `App.tsx` calls loader functions to retrieve processed data.
4. UI components (using Lucide icons and Recharts) render the statistics.
