import type { RootData, ItemUsage, MRRangeUsage, MRRange } from "../types";
import rawData from "../../WarframeUsageData2025.json";

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
  const warframes = data.ALL["Warframe"] || {};
  const groups: Record<string, { total: number; variants: string[] }> = {};

  Object.entries(warframes).forEach(([name, usage]) => {
    // Remove " Prime" or " Umbra" to get the root name
    const rootName = name.replace(/ (Prime|Umbra)$/, "");
    const variant = name.match(/ (Prime|Umbra)$/)?.[1] || "Base";

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
      name:
        group.variants.length > 1
          ? `${rootName}/${group.variants.filter((v) => v !== "Base").join("/")}`
          : rootName,
      totalUsage: group.total,
      variants: group.variants,
    }))
    .sort((a, b) => b.totalUsage - a.totalUsage);
};

export const aggregateMRUsage = (usage: ItemUsage): MRRangeUsage => {
  const ranges: MRRangeUsage = {
    "0-10": 0,
    "11-20": 0,
    "21+": 0,
  };

  Object.entries(usage).forEach(([mr, value]) => {
    if (mr === "ALL") return;

    const mrNum = parseInt(mr, 10);
    if (isNaN(mrNum)) return;

    if (mrNum <= 10) {
      ranges["0-10"] += value;
    } else if (mrNum <= 20) {
      ranges["11-20"] += value;
    } else {
      ranges["21+"] += value;
    }
  });

  return ranges;
};

export const getTopItems = (
  category: string,
  mrRange: MRRange = "ALL",
  limit: number = 50,
) => {
  const items = data.ALL[category] || {};

  if (category === "Warframe") {
    const groups: Record<string, { total: number; mrRanges: MRRangeUsage }> =
      {};

    Object.entries(items).forEach(([name, usage]) => {
      const warframeRootName = name.replace(/ (Prime|Umbra)$/, "");

      const targetName = warframeRootName;

      if (!groups[targetName]) {
        groups[targetName] = {
          total: 0,
          mrRanges: { "0-10": 0, "11-20": 0, "21+": 0 },
        };
      }

      const aggregated = aggregateMRUsage(usage);
      groups[targetName].total += usage.ALL;
      groups[targetName].mrRanges["0-10"] += aggregated["0-10"];
      groups[targetName].mrRanges["11-20"] += aggregated["11-20"];
      groups[targetName].mrRanges["21+"] += aggregated["21+"];
    });

    return Object.entries(groups)
      .map(([name, group]) => ({
        name,
        usage:
          mrRange === "ALL"
            ? group.total
            : group.mrRanges[mrRange as keyof MRRangeUsage],
        mrRanges: group.mrRanges,
        totalUsage: group.total,
      }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, limit);
  }

  return Object.entries(items)
    .map(([name, usage]) => {
      const aggregated = aggregateMRUsage(usage);
      return {
        name,
        usage:
          mrRange === "ALL"
            ? usage.ALL
            : aggregated[mrRange as keyof MRRangeUsage],
        mrRanges: aggregated,
        totalUsage: usage.ALL,
      };
    })
    .sort((a, b) => b.usage - a.usage)
    .slice(0, limit);
};
