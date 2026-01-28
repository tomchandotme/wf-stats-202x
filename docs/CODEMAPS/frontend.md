# Frontend Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19.2
**Main Component:** src/App.tsx

## UI Structure

The UI is built using React functional components with a focus on data visualization.

### Components

- **`App`**: Renders the `PopularityDashboard`.
- **`PopularityDashboard`**: Manages category and MR range selection state. Use `useMemo` for data fetching optimization.
- **`PopularityRow`**: Displays item details and a small `BarChart` for MR distribution.
- **Icons**: Lucide-react (if used) or standard SVG.

## Design System

- **Styling:** Tailwind CSS 4.
- **Utilities:** `cn()` for class merging.
- **Responsiveness:** Tailwind's responsive prefixes (sm, md, lg).

## State Management

- **Local State:** `useState` in `PopularityDashboard` for filters.
- **Performance:** `useMemo` and `useCallback` used to prevent unnecessary re-renders in the data table.
