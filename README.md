# Warframe Usage Stats

A modern data visualization dashboard for Warframe usage statistics, built with React 19, TypeScript, and Vite 7.

## Screenshot

<img src="screenshot.png" alt="Screenshot of Warframe Usage Stats" />

## Features

- **Multi-Year Support**: Compare usage stats across different years.
- **Trend Analysis**: Visual indicators for rank changes between years.
- **Interactive Charts**: Detailed Mastery Rank distribution powered by Recharts.
- **Responsive UI**: Modern, accessible dashboard styled with Tailwind CSS 4.
- **Smart Grouping**: Automatic grouping of Prime and Umbra variants for Warframes.
- **Type Safety**: Full TypeScript support throughout the application.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/).

### Installation

```bash
bun install
```

### Development

Start the development server on port 3579:

```bash
bun run dev
```

### Build

Build for production:

```bash
bun run build
```

## Project Structure

- `src/components/`: React components. `PopularityDashboard.tsx` is the main entry point.
- `src/utils/`: Data processing and aggregation logic (`dataLoader.ts`).
- `src/types.ts`: TypeScript interfaces for usage data.
- `scripts/`: TypeScript scripts for data generation and enrichment.
- `public/data/`: JSON data source files (e.g., `WarframeUsageData2025.json`).
- `docs/CODEMAPS/`: Architectural documentation and system maps.

## Utility Scripts

The project includes scripts for data processing, located in the `scripts/` directory. Run them using `tsx`:

```bash
bun scripts/gen_img_url.ts
```

## License

MIT
