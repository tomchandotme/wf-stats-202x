# Frontend Codemap

**Last Updated:** 2026-01-28
**Framework:** React 19.2
**Main Component:** /Users/tomchan/playground/wf-2025-stats/src/App.tsx

## UI Structure

The UI is built using React functional components and styled with Tailwind CSS 4.

### Components

- **`App`**: Current root component. It fetches experimental combined data and renders it as a JSON string for debug/verification.
- **Charts (Pending Implementation)**: Recharts is available in dependencies for visual rendering.
- **Icons**: Lucide-react is used for iconography.

## Design System

- **Styling:** Tailwind CSS 4 using the new `@tailwindcss/vite` plugin.
- **Utilities:** `cn()` utility in `src/utils/cn.ts` uses `clsx` and `tailwind-merge` for clean conditional class application.

## State Management

- **Local State:** Currently minimal (direct data invocation).
- **Redux:** `react-redux` and `redux` are present in `node_modules` (likely for future scale), but not yet utilized in the source code.
