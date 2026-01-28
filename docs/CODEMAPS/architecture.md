# Overall Architecture Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19 + Vite 7 + Tailwind CSS 4
**Entry Point:** src/main.tsx

## Architecture Overview

This is a single-page application (SPA) focused on visualizing Warframe item usage data from 2025. It processes a large JSON dataset containing usage statistics indexed by Mastery Rank (MR).

```
[Data Source: JSON] -> [DataLoader Utility] -> [PopularityDashboard] -> [PopularityRow] -> [Recharts]
```

## Key Modules

| Module                | Purpose                                | Location                                 |
| --------------------- | -------------------------------------- | ---------------------------------------- |
| `main.tsx`            | App entry point                        | `src/main.tsx`                           |
| `App.tsx`             | Root component                         | `src/App.tsx`                            |
| `PopularityDashboard` | Main dashboard UI and state management | `src/components/PopularityDashboard.tsx` |
| `PopularityRow`       | Table row with Recharts visualization  | `src/components/PopularityRow.tsx`       |
| `dataLoader.ts`       | Data processing and aggregation logic  | `src/utils/dataLoader.ts`                |

## Technical Stack

- **Frontend:** React 19
- **Tooling:** Vite 7, Bun
- **Styling:** Tailwind CSS 4
- **Visualization:** Recharts
- **Language:** TypeScript 5.9

## Data Flow

1. Static JSON usage data is imported in `dataLoader.ts`.
2. `PopularityDashboard` fetches filtered/paged data using `getTopItems`.
3. `PopularityRow` renders individual item stats and MR distribution via `BarChart`.
