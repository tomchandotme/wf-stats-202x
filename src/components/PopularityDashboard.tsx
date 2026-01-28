import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  getCategories,
  loadDataForYear,
  getTopItemsWithTrends,
} from "../utils/dataLoader";
import { PopularityRow } from "./PopularityRow";
import { MR_RANGES } from "../constants";
import type { MRRange, RootData } from "../types";

const CUSTOM_CATAGORY_ORDER = ["Warframe", "Primary", "Secondary", "Melee"];

/**
 * The main dashboard component for displaying Warframe popularity statistics.
 * Allows users to filter by year, category, and Mastery Rank (MR) range.
 *
 * @returns A React functional component.
 */
export const PopularityDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [category, setCategory] = useState("Warframe");
  const [mrRange, setMrRange] = useState<MRRange>("ALL");
  const [limit] = useState(50);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentYearData, setCurrentYearData] = useState<RootData | null>(null);
  const [previousYearData, setPreviousYearData] = useState<RootData | null>(
    null,
  );

  const years = [2022, 2023, 2024, 2025];

  const categories = useMemo(() => {
    if (!currentYearData) return ["Warframe"];
    return getCategories(currentYearData).sort((a, b) => {
      return (
        CUSTOM_CATAGORY_ORDER.indexOf(a) - CUSTOM_CATAGORY_ORDER.indexOf(b)
      );
    });
  }, [currentYearData]);

  const loadData = useCallback(async (year: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const current = await loadDataForYear(year);
      setCurrentYearData(current);

      if (year > 2022) {
        const previous = await loadDataForYear(year - 1);
        setPreviousYearData(previous);
      } else {
        setPreviousYearData(null);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(selectedYear);
  }, [selectedYear, loadData]);

  const data = useMemo(() => {
    if (!currentYearData) return [];
    return getTopItemsWithTrends(
      currentYearData,
      previousYearData,
      category,
      mrRange,
      limit,
    );
  }, [currentYearData, previousYearData, category, mrRange, limit]);

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    },
    [],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-6">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Warframe Usage Stats {selectedYear}
        </h1>
        <p className="text-sm text-gray-500 md:text-base">
          Most popular items across different Mastery Rank ranges.
        </p>
      </header>

      <div className="flex flex-wrap items-end gap-4">
        <div className="w-full space-y-2 sm:w-auto">
          <label htmlFor="year-select" className="text-sm font-medium">
            Year
          </label>
          <div
            className="flex w-full rounded-md border border-gray-300 bg-gray-50 p-1 sm:w-auto"
            role="group"
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                aria-pressed={selectedYear === year}
                disabled={isLoading}
                className={`flex-1 rounded-sm px-3 py-1 text-sm shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-16 sm:flex-none ${
                  selectedYear === year
                    ? "bg-white font-medium text-blue-600"
                    : "text-gray-600 shadow-transparent hover:text-gray-900"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full space-y-2 sm:w-auto">
          <label htmlFor="category-select" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category-select"
            aria-label="Select item category"
            value={category}
            onChange={handleCategoryChange}
            disabled={isLoading}
            className="flex h-10 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full space-y-2 sm:w-auto">
          <span className="text-sm font-medium">MR Range</span>
          <div
            className="flex w-full rounded-md border border-gray-300 bg-gray-50 p-1 sm:w-auto"
            role="group"
            aria-label="Select MR Range"
          >
            {MR_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setMrRange(range)}
                aria-pressed={mrRange === range}
                disabled={isLoading}
                className={`flex-1 rounded-sm px-3 py-1 text-sm shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-16 sm:flex-none ${
                  mrRange === range
                    ? "bg-white font-medium text-blue-600"
                    : "text-gray-600 shadow-transparent hover:text-gray-900"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="mr-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            Loading...
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="mb-2 text-red-600">Error loading data</p>
            <p className="text-sm text-gray-500">{error}</p>
            <button
              onClick={() => loadData(selectedYear)}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="w-16 px-4 py-3 text-left font-medium text-gray-500">
                    Rank
                  </th>
                  <th className="w-20 px-4 py-3 text-center font-medium text-gray-500">
                    Trend
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Name
                  </th>
                  <th className="w-24 px-4 py-3 text-right font-medium text-gray-500">
                    Usage
                  </th>
                  <th className="w-48 px-4 py-3 text-right font-medium text-gray-500">
                    MR Distribution
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <PopularityRow
                    key={`${category}-${item.name}`}
                    item={item}
                    index={index}
                    activeMrRange={mrRange}
                    onClick={(v) => setMrRange(v as MRRange)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            No data available for this selection.
          </div>
        )}
      </div>
    </div>
  );
};
