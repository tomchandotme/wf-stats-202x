# Data Models & Schemas

**Last Updated:** 2026-01-28
**Schemas:** TypeScript Interfaces in `src/types.ts`

## Key Interfaces

### UI Consumption
```typescript
interface DataItem {
  name: string;
  usage: number;
  mrRanges: {
    "0-10": number;
    "11-20": number;
    "21+": number;
  };
  rank?: number;
  previousRank?: number;
  imageUrl?: string;
}
```

### Raw Asset Schema
```typescript
interface RootData {
  ALL: {
    [category: string]: {
      [itemName: string]: {
        ALL: number;
        [mrNumeric: string]: number; // "0" to "36+"
      }
    }
  }
}
```

## Enumerations & Constants

- **Categories**: `Melee`, `Primary`, `Secondary`, `Warframe`.
- **MR Ranges**: `ALL`, `0-10`, `11-20`, `21+`.
- **Colors**:
  - `0-10`: Blue (`#3b82f6`)
  - `11-20`: Green (`#10b981`)
  - `21+`: Amber (`#f59e0b`)

## External References

- **Metadata**: `@wfcd/items` provides the base item database for image names.
- **CDN**: Base URL `https://cdn.warframestat.us/img/` or `https://warframe.com/static/img/items/`.
