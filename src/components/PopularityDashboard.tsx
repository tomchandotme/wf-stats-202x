/* eslint-disable react-hooks/set-state-in-render */
import React, { useState, useMemo, useCallback } from "react";
import { getTopItems, getCategories } from "../utils/dataLoader";
import { PopularityRow } from "./PopularityRow";
import { MR_RANGES } from "../constants";
import type { MRRange } from "../types";

export const PopularityDashboard: React.FC = () => {
  const [category, setCategory] = useState("Warframe");
  const [mrRange, setMrRange] = useState<MRRange>("ALL");
  const [limit] = useState(50);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(), []);

  const { data, isLoading } = useMemo(() => {
    setError(null);
    try {
      const result = getTopItems(category, mrRange, limit);
      return { data: result, isLoading: false };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load data";
      setError(message);
      return { data: [], isLoading: false };
    }
  }, [category, mrRange, limit]);

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    },
    [],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Warframe Usage Stats 2025
        </h1>
        <p className="text-gray-500">
          Most popular items across different Mastery Rank ranges.
        </p>
      </header>

      <div className="flex flex-col items-end gap-4 sm:flex-row">
        <div className="space-y-2">
          <label htmlFor="category-select" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category-select"
            aria-label="Select item category"
            value={category}
            onChange={handleCategoryChange}
            disabled={isLoading}
            className="flex h-10 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">MR Range</span>
          <div
            className="flex rounded-md border border-gray-300 bg-gray-50 p-1"
            role="group"
            aria-label="Select MR Range"
          >
            {MR_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setMrRange(range)}
                aria-pressed={mrRange === range}
                disabled={isLoading}
                className={`w-16 rounded-sm px-3 py-1 text-sm shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : data.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 text-left font-medium text-gray-500">
                  Rank
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
        ) : (
          <div className="p-12 text-center text-gray-500">
            No data available for this selection.
          </div>
        )}
      </div>
    </div>
  );
};
