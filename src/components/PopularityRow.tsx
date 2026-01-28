import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  Rectangle,
  type BarShapeProps,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../utils/cn";
import { MR_COLORS } from "../constants";
import type { DataItem, MRRange } from "../types";

interface PopularityRowProps {
  item: DataItem;
  index: number;
  activeMrRange: MRRange;
  onClick: (v: string) => void;
}

const TooltipContent = React.memo(
  (props: Partial<TooltipContentProps<number, string>>) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload as { name: string; val: number };
      return (
        <div className="rounded border border-gray-200 bg-white p-1.5 text-[10px] shadow-sm">
          <p className="font-bold text-gray-900">{data.name}</p>
          <p className="text-gray-600">{Number(data.val).toFixed(4)}%</p>
        </div>
      );
    }
    return null;
  },
);

TooltipContent.displayName = "TooltipContent";

const MRDistributionShape = ({
  activeMrRange,
  name,
  ...props
}: BarShapeProps & { activeMrRange: MRRange }) => {
  return (
    <Rectangle
      {...props}
      className={cn("cursor-pointer opacity-100 transition-opacity", {
        "opacity-40": name !== activeMrRange && activeMrRange !== "ALL",
      })}
    />
  );
};

export const PopularityRow: React.FC<PopularityRowProps> = ({
  item,
  activeMrRange,
  onClick,
}) => {
  const chartData = useMemo(
    () => [
      { name: "0-10", val: item.mrRanges["0-10"], fill: MR_COLORS["0-10"] },
      { name: "11-20", val: item.mrRanges["11-20"], fill: MR_COLORS["11-20"] },
      { name: "21+", val: item.mrRanges["21+"], fill: MR_COLORS["21+"] },
    ],
    [item.mrRanges],
  );

  const trendContent = useMemo(() => {
    if (item.previousRank === undefined) {
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
          NEW
        </span>
      );
    }

    const diff = item.previousRank - (item.rank || 0);

    if (diff > 0) {
      return (
        <span className="flex items-center gap-1 font-medium text-green-600">
          <TrendingUp className="h-3 w-3" />
          {diff}
        </span>
      );
    }

    if (diff < 0) {
      return (
        <span className="flex items-center gap-1 font-medium text-red-600">
          <TrendingDown className="h-3 w-3" />
          {Math.abs(diff)}
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center text-gray-400">
        <Minus className="h-3 w-3" />
      </span>
    );
  }, [item.rank, item.previousRank]);

  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-4 font-mono text-gray-400">#{item.rank}</td>
      <td className="px-4 py-4 text-center">{trendContent}</td>
      <td className="px-4 py-4 font-semibold text-gray-900">
        <div className="flex items-center justify-start gap-2 pr-2">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              width={32}
              height={32}
              className="size-8"
              alt={item.name}
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
              {item.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>{item.name}</div>
        </div>
      </td>
      <td className="px-4 py-4 text-right font-mono text-blue-600">
        {item.usage.toFixed(4)}%
      </td>
      <td className="px-4 py-2 text-right">
        <div className="h-12 w-full min-w-30 **:focus:outline-0">
          <ResponsiveContainer width="100%" height={54}>
            <BarChart data={chartData}>
              <Bar
                dataKey="val"
                radius={[2, 2, 0, 0]}
                onClick={(v) => onClick(v.name as MRRange)}
                shape={(p: BarShapeProps) =>
                  MRDistributionShape({ ...p, activeMrRange })
                }
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<TooltipContent />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </td>
    </tr>
  );
};
