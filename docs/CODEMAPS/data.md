# Data Codemap

**Last Updated:** 2026-01-28
**Source:** `WarframeUsageData2025.json`

## Data Models (`src/types.ts`)

- **`DataItem`**: Flat structure for UI consumption with aggregated MR ranges.
- **`ItemUsage`**: Raw usage record (ALL + per-MR stats).
- **`RootData`**: The top-level JSON structure.
- **`MRRange`**: Union type (`"0-10" | "11-20" | "21+" | "ALL"`).

## Constants (`src/constants.ts`)

- **`MR_RANGES`**: Array of available ranges.
- **`MR_COLORS`**: Color mapping for Recharts visualization.

## Transformations

- **Bucketing**: Maps raw MR (0-36) strings to aggregated buckets.
- **Name Normalization**: Used in Warframe grouping to strip " Prime" and " Umbra".
