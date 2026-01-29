import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MR_WEIGHTS } from "../constants/mrWeights";
import { MR_COLORS } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isLegendary = data.mr > 30;
    const rankDisplay = isLegendary ? `Legendary ${data.mr - 30}` : data.mr;

    return (
      <div className="bg-surface rounded-lg border border-white/10 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
          Mastery Rank {rankDisplay}
        </p>
        <p className="text-primary font-mono text-lg font-black">
          {(data.weight * 100).toFixed(2)}%
        </p>
        <p className="text-[10px] font-medium tracking-widest text-white/20 uppercase">
          Population Weight
        </p>
      </div>
    );
  }
  return null;
};

export const MRPopulationChart: React.FC = () => {
  const data = useMemo(() => {
    return Object.entries(MR_WEIGHTS)
      .map(([mr, weight]) => ({
        mr: parseInt(mr),
        weight: weight as number,
      }))
      .sort((a, b) => a.mr - b.mr);
  }, []);

  const getBarColor = (mr: number) => {
    if (mr <= 10) return MR_COLORS["0-10"];
    if (mr <= 20) return MR_COLORS["11-20"];
    if (mr <= 30) return MR_COLORS["21+"];
    return MR_COLORS.LR;
  };

  return (
    <div className="glass group relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:border-white/10 sm:p-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">
            Demographic Distribution
          </h3>
          <p className="text-lg font-bold tracking-tight text-white/90">
            MR Population Weights
          </p>
        </div>
        <div className="flex gap-4 rounded-lg border-white/5 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
          {[
            { range: "0-10", color: MR_COLORS["0-10"] },
            { range: "11-20", color: MR_COLORS["11-20"] },
            { range: "21-30", color: MR_COLORS["21+"] },
            { range: "L1-L6", color: MR_COLORS.LR },
          ].map((item) => (
            <div key={item.range} className="flex items-center gap-1.5">
              <div
                className="size-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] font-bold tracking-tighter text-white/40 uppercase">
                {item.range}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-35 w-full **:focus:outline-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="mr"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.2)",
                fontSize: 10,
                fontWeight: 700,
              }}
              interval={4}
              tickFormatter={(val) => (val > 30 ? `L${val - 30}` : val)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.2)",
                fontSize: 10,
                fontWeight: 700,
              }}
              tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              content={<TooltipContent />}
              animationDuration={200}
            />
            <Bar dataKey="weight" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.mr)}
                  className="transition-opacity duration-300 group-hover:opacity-80 hover:opacity-100!"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
