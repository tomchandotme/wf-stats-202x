export interface MRRangeUsage {
  '0-10': number;
  '11-20': number;
  '21+': number;
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

export type CategoryType = 'Melee' | 'Primary' | 'Secondary' | 'Warframe';

export interface ChartDataPoint {
  mr: string;
  percentage: number;
}
