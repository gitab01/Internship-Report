import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomLineChart = ({ data = [], height = 260 }) => {
  const points = data
    .map((d) => ({ name: d.name, amount: Number(d.amount) || 0 }))
    .filter((d) => Number.isFinite(d.amount));

  if (points.length < 2) {
    return (
      <div className="grid h-56 place-items-center rounded-xl border border-dashed border-line text-sm text-slate-500">
        Add at least two expenses to see the trend
      </div>
    );
  }

  return (
    <div className="mt-4 w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d48" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#eef1f4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            minTickGap={20}
          />
          <YAxis
            width={64}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v.toLocaleString("en-US")}
          />
          <Tooltip
            cursor={{ stroke: "#cbd5e1" }}
            content={<CustomTooltip nameKey="name" />}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#e11d48"
            fill="url(#expenseFill)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
