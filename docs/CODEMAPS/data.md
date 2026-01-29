# Data Codemap

**Last Updated:** 2026-01-29
**Source:** `WarframeUsageData2025.json`

## Data Models (`src/types.ts`)

- **`DataItem`**: Transformed structure for UI consumption with aggregated weights.
- **`ItemUsage`**: Raw usage record containing `ALL` and specific MR (0-36) usage values.
- **`RootData`**: Top-level structure mapping categories to items.
- **`MRRange`**: Aggregated buckets: `"0-10" | "11-20" | "21+" | "ALL"`.

## Constants

- **`MR_WEIGHTS`** (`src/constants/mrWeights.ts`): Population weights for MR 0-36, solved to match global averages.
- **`MR_COLORS`** (`src/constants.ts`): Color mapping for UI consistency across ranges (including Legendary Ranks).

## Data Processing (`src/utils/dataLoader.ts`)

- **Weighted Aggregation**: Usage for aggregated buckets is calculated as `sum(usage_i * weight_i) / sum(weight_i)` to ensure mathematical correctness compared to global averages.
- **Groupings**: Special handling for "Warframe" category to group Prime and Umbra variants into the base frame entry.
- **Trends**: Compares current rank with previous year rank (if data available).
- **Enrichment**: Maps item names to image URLs using `data/urls.json` and a external CDN.

## Tooling (`scripts/`)

- **`solve_weights.ts`**: Script used to derive `MR_WEIGHTS` from the raw dataset.
- **`gen_img_url.ts`**: Utility for maintaining image URL mappings.
