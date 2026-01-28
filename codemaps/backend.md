# Data Logic Codemap (Client-side)

**Last Updated:** 2026-01-28
**Runtime:** Browser / Dynamic JSON Fetching

## Data Pipeline (`src/utils/dataLoader.ts`)

The application processes raw hierarchical usage data on the client side.

| Process         | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Loading**     | Fetches `/WarframeUsageData{year}.json`. Uses `fetch()` to load static assets.           |
| **Aggregation** | `aggregateMRUsage` compresses 37+ MR entries into 3 buckets: "0-10", "11-20", and "21+". |
| **Grouping**    | For Warframes, base and Prime/Umbra variants are merged into a single root entry.        |
| **Ranking**     | Sorts items by usage percentage after aggregation.                                       |
| **Trends**      | Compares `currentData` rank vs `previousData` rank to determine movement.                |

## Data Mapping

- **`urls.json`**: Generated mapping from item name to image filename. Used to construct CDN URLs for assets.
- **Mastery Rank**: Raw numeric string keys in JSON are parsed into integers for bucketing.

## Scripts

- **`scripts/gen_img_url.ts`**: Uses `@wfcd/items` to generate the `urls.json` index file. Run via `bun` or `tsx`.
