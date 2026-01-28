export type MRRange = "0-10" | "11-20" | "21+" | "ALL";

export interface DataItem {
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

export interface MRRangeUsage {
  "0-10": number;
  "11-20": number;
  "21+": number;
}

export interface ItemUsage {
  ALL: number;
  [mr: string]: number;
}

export type CategoryData = Record<string, ItemUsage>;

export interface UsageReport {
  [category: string]: CategoryData;
}

export interface RootData {
  ALL: UsageReport;
}

export type CategoryType = "Melee" | "Primary" | "Secondary" | "Warframe";

export interface ChartDataPoint {
  mr: string;
  percentage: number;
}

export interface YearTrend {
  name: string;
  rank: number;
  usage: number;
}
