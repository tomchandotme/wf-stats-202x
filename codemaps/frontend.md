# Frontend Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19.2 (Vite)
**Main Component:** `src/components/PopularityDashboard.tsx`

## UI Structure

The UI is a dense data dashboard using standard HTML table elements styled with Tailwind for high information density.

### Components

- **`PopularityDashboard`**:
  - Manages selection state: `selectedYear`, `category`, `mrRange`.
  - Effect-based data loading with error/loading states.
  - Responsive layout (flex-wrap filters, overflow-x-auto table).
- **`PopularityRow`**:
  - Displays trend indicators: `NEW`, `TrendingUp`, `TrendingDown`, or `Minus` (no change).
  - Handles item images/placeholders.
  - Features integrated `Recharts.BarChart` for distribution.
- **`MRDistributionShape`**: Custom SVG rectangle for BarChart highlighting active ranges.

## State & Performance

- **Caching**: Multi-year data is cached in a local `dataCache` record within `dataLoader.ts`.
- **Optimization**: `useMemo` is used for category sorting and data merging to ensure smooth UI updates during filtering.
- **Interactivity**: Clicking bars in the distribution chart updates the global `mrRange` filter.

## Layout & Styling

- **Tailwind CSS 4**: Uses modern CSS variables approach via `@import "tailwindcss"`.
- **Icons**: `lucide-react` for trend arrows and UI markers.
- **Class Merging**: `src/utils/cn.ts` provides safe Tailwind class merging via `clsx` and `tailind-merge`.
