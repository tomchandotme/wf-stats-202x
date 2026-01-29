# Frontend Codemap

**Last Updated:** 2026-01-29
**Framework:** React 19.2
**Main Component:** src/App.tsx

## UI Structure

The UI is built using React functional components with a focus on data visualization using Recharts.

### Components

- **`App`**: Renders the application container and `PopularityDashboard`.
- **`PopularityDashboard`**: Central state hub for category selection, MR range filtering, and pagination.
- **`MRPopulationChart`**: Global chart showing the MR population distribution (generated from `MR_WEIGHTS`).
- **`PopularityRow`**: Individual item display including:
  - Rank and trend indicators
  - Item image (from CDN)
  - Small `BarChart` for per-bucket MR distribution.

## Design System

- **Styling:** Tailwind CSS 4.
- **Glassmorphism:** Custom "glass" classes for cards and tooltips.
- **Utilities:** `cn()` for class merging.
- **Responsiveness:** Tailwind's responsive prefixes; mobile-optimized table rows.

## State Management

- **Local State:** `useState` in `PopularityDashboard` for navigation and filtering.
- **Performance:** `useMemo` in components to optimize chart data preparation and prevent unnecessary re-renders during list filtering.
