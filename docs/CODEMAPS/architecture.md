# Overall Architecture Codemap

**Last Updated:** 2026-01-29
**Framework:** React 19 + Vite 7 + Tailwind CSS 4
**Entry Point:** src/main.tsx

## Architecture Overview

This is a single-page application (SPA) focused on visualizing Warframe item usage data from 2025. It processes a large JSON dataset containing usage statistics indexed by Mastery Rank (MR), utilizing derived population weights for mathematically accurate aggregation.

```
[Data Source: JSON] -> [DataLoader Utility] -> [PopularityDashboard]
                              |                     |-> [PopularityRow] -> [Recharts]
                              |                     |-> [MRPopulationChart] -> [Recharts]
                              |
                       [MR_WEIGHTS (Constants)]
```

## Key Modules

| Module                | Purpose                                | Location                                 |
| --------------------- | -------------------------------------- | ---------------------------------------- |
| `main.tsx`            | App entry point                        | `src/main.tsx`                           |
| `App.tsx`             | Root component                         | `src/App.tsx`                            |
| `PopularityDashboard` | Main dashboard UI and state management | `src/components/PopularityDashboard.tsx` |
| `PopularityRow`       | Table row with item distribution       | `src/components/PopularityRow.tsx`       |
| `MRPopulationChart`   | Demographic weight visualization       | `src/components/MRPopulationChart.tsx`   |
| `dataLoader.ts`       | Weighted data aggregation logic        | `src/utils/dataLoader.ts`                |
| `mrWeights.ts`        | Derived population weights (0-36)      | `src/constants/mrWeights.ts`             |

## Technical Stack

- **Frontend:** React 19
- **Tooling:** Vite 7, Bun
- **Styling:** Tailwind CSS 4
- **Visualization:** Recharts
- **Language:** TypeScript 5.9

## Data Flow

1. **Source:** Static JSON usage data and derived MR weights constants.
2. **loader:** `dataLoader.ts` imports JSON and applies `MR_WEIGHTS` to aggregate per-MR usage into correct buckets ("0-10", "11-20", "21+").
3. **Consumer:** `PopularityDashboard` manages filtering and renders charts.
4. **View:**
   - `PopularityRow` renders item stats and MR distribution.
   - `MRPopulationChart` visualizes the underlying demographic weights used for calculations.
