import type {
  RootData,
  ItemUsage,
  MRRangeUsage,
  MRRange,
  DataItem,
} from "../types";
import urls from "../../urls.json";

const dataCache: Record<number, RootData> = {};

/**
 * Loads Warframe usage data for a specific year.
 * Caches the data to avoid redundant fetches.
 *
 * @param year - The year to load data for.
 * @returns A promise that resolves to the RootData for the specified year.
 */
export const loadDataForYear = async (year: number): Promise<RootData> => {
  if (dataCache[year]) {
    return dataCache[year];
  }

  try {
    // In a real Vite app, we might use import.meta.glob or fetch
    // But since this is a local environment, we can assume the files are in the public/root
    const response = await fetch(`/WarframeUsageData${year}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load data for ${year}`);
    }
    const data = await response.json();
    dataCache[year] = data as RootData;
    return dataCache[year];
  } catch (error) {
    console.error(`Error loading data for year ${year}:`, error);
    throw error;
  }
};

/**
 * Gets all available categories from the data.
 *
 * @param data - The RootData to extract categories from.
 * @returns An array of category names.
 */
export const getCategories = (data: RootData) => Object.keys(data.ALL);

/**
 * Aggregates Mastery Rank usage data into predefined ranges.
 * Functional approach to avoid mutation.
 *
 * @param usage - The usage data for an item.
 * @returns An object containing the aggregated usage for each MR range.
 */
export const aggregateMRUsage = (usage: ItemUsage): MRRangeUsage => {
  return Object.entries(usage).reduce(
    (acc, [mr, value]) => {
      if (mr === "ALL") return acc;

      const mrNum = parseInt(mr, 10);
      if (isNaN(mrNum)) return acc;

      if (mrNum <= 10) {
        return { ...acc, "0-10": acc["0-10"] + value };
      } else if (mrNum <= 20) {
        return { ...acc, "11-20": acc["11-20"] + value };
      } else {
        return { ...acc, "21+": acc["21+"] + value };
      }
    },
    { "0-10": 0, "11-20": 0, "21+": 0 } as MRRangeUsage,
  );
};

/**
 * Ranks items within a category based on usage.
 * Special handling for the "Warframe" category to group Prime/Umbra variants.
 *
 * @param data - The RootData to rank items from.
 * @param category - The category to rank.
 * @param mrRange - The MR range to calculate usage for.
 * @returns An array of DataItem objects sorted by usage with rank information.
 */
export const getRankedItems = (
  data: RootData,
  category: string,
  mrRange: MRRange = "ALL",
): DataItem[] => {
  const items = data.ALL[category] || {};

  let result: DataItem[] = [];

  if (category === "Warframe") {
    const groups = Object.entries(items).reduce(
      (acc, [name, usage]) => {
        const targetName = name.replace(/ (Prime|Umbra)$/, "");
        const currentGroup = acc[targetName] || {
          total: 0,
          mrRanges: { "0-10": 0, "11-20": 0, "21+": 0 },
        };

        const aggregated = aggregateMRUsage(usage);

        return {
          ...acc,
          [targetName]: {
            total: currentGroup.total + usage.ALL,
            mrRanges: {
              "0-10": currentGroup.mrRanges["0-10"] + aggregated["0-10"],
              "11-20": currentGroup.mrRanges["11-20"] + aggregated["11-20"],
              "21+": currentGroup.mrRanges["21+"] + aggregated["21+"],
            },
          },
        };
      },
      {} as Record<string, { total: number; mrRanges: MRRangeUsage }>,
    );

    result = Object.entries(groups).map(([name, group]) => ({
      name,
      usage:
        mrRange === "ALL"
          ? group.total
          : group.mrRanges[mrRange as keyof MRRangeUsage],
      mrRanges: group.mrRanges,
    }));
  } else {
    result = Object.entries(items).map(([name, usage]) => {
      const aggregated = aggregateMRUsage(usage);
      return {
        name,
        usage:
          mrRange === "ALL"
            ? usage.ALL
            : aggregated[mrRange as keyof MRRangeUsage],
        mrRanges: aggregated,
      };
    });
  }

  return result
    .sort((a, b) => b.usage - a.usage)
    .map((item, index) => ({ ...item, rank: index + 1 }));
};

/**
 * Gets top items for a category with trend information compared to previous year.
 *
 * @param currentData - Usage data for the current year.
 * @param previousData - Usage data for the previous year (optional).
 * @param category - The category to fetch.
 * @param mrRange - The MR range to filter by.
 * @param limit - Max number of items to return.
 * @returns Array of DataItem objects with trend and image info.
 */
export const getTopItemsWithTrends = (
  currentData: RootData,
  previousData: RootData | null,
  category: string,
  mrRange: MRRange = "ALL",
  limit: number = 50,
): DataItem[] => {
  const currentRanked = getRankedItems(currentData, category, mrRange);

  if (!previousData) {
    return currentRanked.slice(0, limit).map((item) => ({
      ...item,
      imageUrl: (urls as Record<string, string>)[item.name]
        ? `https://warframe.com/static/img/items/${(urls as Record<string, string>)[item.name]}`
        : undefined,
    }));
  }

  const previousRanked = getRankedItems(previousData, category, mrRange);
  const previousRankMap = new Map(
    previousRanked.map((item) => [item.name, item.rank]),
  );

  const slice = currentRanked.slice(0, limit).map((item) => ({
    ...item,
    previousRank: previousRankMap.get(item.name),
    imageUrl: (urls as Record<string, string>)[item.name]
      ? `https://cdn.warframestat.us/img/${(urls as Record<string, string>)[item.name]}`
      : undefined,
  }));

  return slice.map((v) => ({ ...v }));
};
