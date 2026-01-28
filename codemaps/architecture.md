# Overall Architecture Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19 + Vite 7 + Tailwind CSS 4
**Entry Point:** src/main.tsx

## Architecture Overview

This is a multi-year dashboard for visualizing Warframe item usage data (2022-2025). It dynamically loads JSON datasets and calculates trends between years.

```
[UI: PopularityDashboard] -> [PopularityRow] -> [Recharts]
          |
          v
[Logic: dataLoader.ts] -> [Dynamic Fetch: /WarframeUsageData*.json]
          |
          v
[Data: urls.json] (Asset Mapping)
```

## Key Modules

| Module | Purpose | Location |
|--------|---------|----------|
| `App` | Base layout and footer | `src/App.tsx` |
| `PopularityDashboard` | Main dashboard with multi-year filter, category selection, and rank/trend display | `src/components/PopularityDashboard.tsx` |
| `PopularityRow` | Table row component showing item rank, trend, name, usage percentage, and MR distribution | `src/components/PopularityRow.tsx` |
| `dataLoader` | Dynamic fetching from static assets, data aggregation (MR bucketing), and ranking logic | `src/utils/dataLoader.ts` |
| `types` | Application-wide TypeScript definitions | `src/types.ts` |

## Technical Stack

- **Frontend:** React 19 (Hooks, Memo, Callback)
- **Tooling:** Vite 7, Bun, TSX
- **Styling:** Tailwind CSS 4 + Lucide React
- **Visualization:** Recharts (Bar Charts)
- **Data Source:** Static JSON files (processed from DE raw data)

## Data Flow

1. User selects a **Year** and **Category** in `PopularityDashboard`.
2. `dataLoader.loadDataForYear` fetches the current year JSON and caches it.
3. If year > 2022, it also fetches the previous year for trend calculation.
4. `getTopItemsWithTrends` merges data, calculates rank differences, and attaches image URLs from `urls.json`.
5. Display components render the resulting `DataItem[]`.
