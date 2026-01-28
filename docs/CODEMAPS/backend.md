# Backend Logic Codemap (Client-side)

**Last Updated:** 2026-01-28
**Runtime:** Client-side Data Processing

## Overview

Static frontend application where data processing utilities act as the "logic layer".

## Key Utilities (`src/utils`)

| Function | Purpose |
|----------|---------|
| `getTopItems` | Main entry point for fetching filtered and sorted item lists. |
| `getCombinedWarframeUsage` | Merges Warframe variants (base, Prime, Umbra). |
| `aggregateMRUsage` | Groups 0-36 MR data into 3 buckets. |
| `getCategories` | Returns available categories from the dataset. |

## Data Pipeline

1. **Import**: JSON data imported as `RootData`.
2. **Filter**: `getTopItems` filters by category.
3. **Aggregate**: MR data is bucketed for visualization.
4. **Sort**: Items are sorted by popularity based on the selected MR range.
