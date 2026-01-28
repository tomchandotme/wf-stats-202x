import * as fs from "fs";
import * as path from "path";

const timestamp = new Date().toISOString().split("T")[0];

const architectureMap = `# Overall Architecture Codemap

**Last Updated:** ${timestamp}
**Framework:** React 19 + Vite 7 + Tailwind CSS 4
**Entry Point:** src/main.tsx

## Architecture Overview

This is a single-page application (SPA) focused on visualizing Warframe item usage data from 2025. It processes a large JSON dataset containing usage statistics indexed by Mastery Rank (MR).

\`\`\`
[Data Source: JSON] -> [DataLoader Utility] -> [PopularityDashboard] -> [PopularityRow] -> [Recharts]
\`\`\`

## Key Modules

| Module | Purpose | Location |
|--------|---------|----------|
| \`main.tsx\` | App entry point | \`src/main.tsx\` |
| \`App.tsx\` | Root component | \`src/App.tsx\` |
| \`PopularityDashboard\` | Main dashboard UI and state management | \`src/components/PopularityDashboard.tsx\` |
| \`PopularityRow\` | Table row with Recharts visualization | \`src/components/PopularityRow.tsx\` |
| \`dataLoader.ts\` | Data processing and aggregation logic | \`src/utils/dataLoader.ts\` |

## Technical Stack

- **Frontend:** React 19
- **Tooling:** Vite 7, Bun
- **Styling:** Tailwind CSS 4
- **Visualization:** Recharts
- **Language:** TypeScript 5.9

## Data Flow

1. Static JSON usage data is imported in \`dataLoader.ts\`.
2. \`PopularityDashboard\` fetches filtered/paged data using \`getTopItems\`.
3. \`PopularityRow\` renders individual item stats and MR distribution via \`BarChart\`.
`;

const frontendMap = `# Frontend Codemap

**Last Updated:** ${timestamp}
**Framework:** React 19.2
**Main Component:** src/App.tsx

## UI Structure

The UI is built using React functional components with a focus on data visualization.

### Components

- **\`App\`**: Renders the \`PopularityDashboard\`.
- **\`PopularityDashboard\`**: Manages category and MR range selection state. Use \`useMemo\` for data fetching optimization.
- **\`PopularityRow\`**: Displays item details and a small \`BarChart\` for MR distribution.
- **Icons**: Lucide-react (if used) or standard SVG.

## Design System

- **Styling:** Tailwind CSS 4.
- **Utilities:** \`cn()\` for class merging.
- **Responsiveness:** Tailwind's responsive prefixes (sm, md, lg).

## State Management

- **Local State:** \`useState\` in \`PopularityDashboard\` for filters.
- **Performance:** \`useMemo\` and \`useCallback\` used to prevent unnecessary re-renders in the data table.
`;

const backendMap = `# Backend Logic Codemap (Client-side)

**Last Updated:** ${timestamp}
**Runtime:** Client-side Data Processing

## Overview

Static frontend application where data processing utilities act as the "logic layer".

## Key Utilities (\`src/utils\`)

| Function | Purpose |
|----------|---------|
| \`getTopItems\` | Main entry point for fetching filtered and sorted item lists. |
| \`getCombinedWarframeUsage\` | Merges Warframe variants (base, Prime, Umbra). |
| \`aggregateMRUsage\` | Groups 0-36 MR data into 3 buckets. |
| \`getCategories\` | Returns available categories from the dataset. |

## Data Pipeline

1. **Import**: JSON data imported as \`RootData\`.
2. **Filter**: \`getTopItems\` filters by category.
3. **Aggregate**: MR data is bucketed for visualization.
4. **Sort**: Items are sorted by popularity based on the selected MR range.
`;

const dataMap = `# Data Codemap

**Last Updated:** ${timestamp}
**Source:** \`WarframeUsageData2025.json\`

## Data Models (\`src/types.ts\`)

- **\`DataItem\`**: Flat structure for UI consumption with aggregated MR ranges.
- **\`ItemUsage\`**: Raw usage record (ALL + per-MR stats).
- **\`RootData\`**: The top-level JSON structure.
- **\`MRRange\`**: Union type (\`"0-10" | "11-20" | "21+" | "ALL"\`).

## Constants (\`src/constants.ts\`)

- **\`MR_RANGES\`**: Array of available ranges.
- **\`MR_COLORS\`**: Color mapping for Recharts visualization.

## Transformations

- **Bucketing**: Maps raw MR (0-36) strings to aggregated buckets.
- **Name Normalization**: Used in Warframe grouping to strip " Prime" and " Umbra".
`;

const newMaps: Record<string, string> = {
  "architecture.md": architectureMap,
  "frontend.md": frontendMap,
  "backend.md": backendMap,
  "data.md": dataMap,
};

function calculateDiff(oldStr: string, newStr: string) {
  if (!oldStr) return 100;
  const lengthDiff = Math.abs(oldStr.length - newStr.length);
  const maxLength = Math.max(oldStr.length, newStr.length);
  return (lengthDiff / maxLength) * 100;
}

let totalDiff = 0;
let fileCount = 0;
let report = "Codemap Diff Report\n===================\n";

for (const filename of Object.keys(newMaps)) {
  const content = newMaps[filename];
  const filePath = path.join("docs/CODEMAPS", filename);
  let oldContent = "";
  if (fs.existsSync(filePath)) {
    oldContent = fs.readFileSync(filePath, "utf-8");
  }

  const diff = calculateDiff(oldContent, content);
  totalDiff += diff;
  fileCount++;
  report += `${filename}: ${diff.toFixed(2)}% changed\n`;
}

const avgDiff = totalDiff / fileCount;
report += `\nAverage Diff: ${avgDiff.toFixed(2)}%\n`;

if (!fs.existsSync(".reports")) {
  fs.mkdirSync(".reports");
}

fs.writeFileSync(".reports/codemap-diff.txt", report);
process.stdout.write(avgDiff.toFixed(2));

fs.writeFileSync(".reports/new_architecture.md", architectureMap);
fs.writeFileSync(".reports/new_frontend.md", frontendMap);
fs.writeFileSync(".reports/new_backend.md", backendMap);
fs.writeFileSync(".reports/new_data.md", dataMap);
