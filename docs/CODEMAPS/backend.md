# Backend/Server Codemap

**Last Updated:** 2026-01-28
**Runtime:** Static Client-side Rendering (Vite)

## Overview

This project does not have a traditional server-side backend. It is a static frontend application where the "backend" logic resides in client-side data processing utilities.

## Data Processing API (Internal)

| Function | Purpose |
|----------|---------|
| `getAllData` | Returns the entire `ALL` category from the dataset. |
| `getCombinedWarframeUsage` | Aggregates base and variant (Prime/Umbra) Warframe usage. |
| `aggregateMRUsage` | Groups granular MR data into ranges: 0-10, 11-20, 21+. |
| `getAggregatedItemUsage` | Combines item lookup with MR aggregation. |

## Build and Deployment

- **Build Tool:** Vite
- **Static Assets:** The production build generates a static `dist/` folder.
- **Data Bundle:** The 2025 usage JSON is bundled into the client-side assets during build.
