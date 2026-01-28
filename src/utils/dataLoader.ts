import type { RootData, ItemUsage, MRRangeUsage } from '../types';
import rawData from '../../WarframeUsageData2025.json';

const data = rawData as RootData;

export const getAllData = () => data.ALL;

export const getCategories = () => Object.keys(data.ALL);

export const getItemUsage = (category: string, itemName: string) => {
  return data.ALL[category]?.[itemName];
};

export interface CombinedUsage {
  name: string;
  totalUsage: number;
  variants: string[];
}

export const getCombinedWarframeUsage = (): CombinedUsage[] => {
  const warframes = data.ALL['Warframe'] || {};
  const groups: Record<string, { total: number; variants: string[] }> = {};

  Object.entries(warframes).forEach(([name, usage]) => {
    // Remove " Prime" or " Umbra" to get the root name
    const rootName = name.replace(/ (Prime|Umbra)$/, '');
    const variant = name.match(/ (Prime|Umbra)$/)?.[1] || 'Base';

    if (!groups[rootName]) {
      groups[rootName] = { total: 0, variants: [] };
    }

    groups[rootName].total += usage.ALL;
    if (!groups[rootName].variants.includes(variant)) {
      groups[rootName].variants.push(variant);
    }
  });

  return Object.entries(groups)
    .map(([rootName, group]) => ({
      name: group.variants.length > 1
        ? `${rootName}/${group.variants.filter(v => v !== 'Base').join('/')}`
        : rootName,
      totalUsage: group.total,
      variants: group.variants,
    }))
    .sort((a, b) => b.totalUsage - a.totalUsage);
};

export const aggregateMRUsage = (usage: ItemUsage): MRRangeUsage => {
  const ranges: MRRangeUsage = {
    '0-10': 0,
    '11-20': 0,
    '21+': 0,
  };

  Object.entries(usage).forEach(([mr, value]) => {
    if (mr === 'ALL') return;

    const mrNum = parseInt(mr, 10);
    if (isNaN(mrNum)) return;

    if (mrNum <= 10) {
      ranges['0-10'] += value;
    } else if (mrNum <= 20) {
      ranges['11-20'] += value;
    } else {
      ranges['21+'] += value;
    }
  });

  return ranges;
};

export const getAggregatedItemUsage = (
  category: string,
  itemName: string
): MRRangeUsage | null => {
  const usage = getItemUsage(category, itemName);
  if (!usage) return null;
  return aggregateMRUsage(usage);
};
