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
import { cn } from "../utils/cn";
import { MR_COLORS } from "../constants";
import type { DataItem, ChartDataPoint, MRRange } from "../types";

interface PopularityRowProps {
  item: DataItem;
  index: number;
  activeMrRange: MRRange;
  onClick: (v: string) => void;
}

// Memoized tooltip content to prevent re-renders
const TooltipContent = React.memo(
  (props: Partial<TooltipContentProps<number, string>>) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="rounded border border-gray-200 bg-white p-1.5 text-[10px] shadow-sm">
          <p className="font-bold text-gray-900">{data.name}</p>
          <p className="text-gray-600">
            {Number(payload[0].value).toFixed(2)}%
          </p>
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
      className={cn("opacity-100 transition-opacity", {
        "opacity-40": name !== activeMrRange && activeMrRange !== "ALL",
      })}
    />
  );
};

export const PopularityRow: React.FC<PopularityRowProps> = ({
  item,
  index,
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

  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-4 font-mono text-gray-400">#{index + 1}</td>
      <td className="px-4 py-4 font-semibold text-gray-900">{item.name}</td>
      <td className="px-4 py-4 text-right font-mono text-blue-600">
        {item.usage.toFixed(2)}%
      </td>
      <td className="px-4 py-2 text-right">
        <div className="h-12 w-full min-w-30 **:focus:outline-0">
          <ResponsiveContainer width="100%" height={48}>
            <BarChart data={chartData}>
              <Bar
                dataKey="val"
                radius={[2, 2, 0, 0]}
                onClick={(v) => onClick(v.name as MRRange)}
                shape={(p) => MRDistributionShape({ ...p, activeMrRange })}
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
