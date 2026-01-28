# Data Codemap

**Last Updated:** 2026-01-28
**Source:** `WarframeUsageData2025.json`

## Data Model

The application processes Warframe usage statistics provided in a nested JSON format.

### Schema (`src/types.ts`)

- **`RootData`**: Contains an `ALL` object with category keys.
- **`CategoryData`**: A record of item names and their associated usage.
- **`ItemUsage`**:
  - `ALL`: Total usage float.
  - `"0"..."36"`: Usage float indexed by Mastery Rank.
- **`MRRangeUsage`**: Aggregated groups:
  - `0-10`: Sum of MR 0-10.
  - `11-20`: Sum of MR 11-20.
  - `21+`: Sum of MR 21+.

## Categories

- `Melee`
- `Primary`
- `Secondary`
- `Warframe`

## Transformations

### Warframe Grouping
The `getCombinedWarframeUsage` utility collapses variants into root names:
- Input: `Excalibur`, `Excalibur Prime`, `Excalibur Umbra`
- Output: `Excalibur/Prime/Umbra` (Summed usage)

### MR Aggregation
Granular MR levels (0-36) are bucketed into three main tiers for better visualization density.
