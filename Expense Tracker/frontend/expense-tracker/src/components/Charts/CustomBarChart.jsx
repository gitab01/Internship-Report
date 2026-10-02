import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const shorten = (v, max = 7) => (v.length > max ? `${v.slice(0, max - 1)}…` : v);

const CustomBarChart = ({ data = [], xKey = "category", height = 260 }) => {
  if (!data.length) {
    return (
      <div className="grid h-56 place-items-center rounded-xl border border-dashed border-line text-sm text-slate-500">
        No data to chart yet
      </div>
    );
  }

  const max = Math.max(...data.map((d) => Number(d.amount) || 0), 0);
  const top = max > 0 ? Math.ceil((max * 1.15) / 100) * 100 : 100;

  return (
    <div className="mt-4 w-full overflow-hidden">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#eef1f4" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickFormatter={(v) => shorten(v, data.length > 6 ? 7 : 12)}
            stroke="#e6e8ec"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, top]}
            width={64}
            tick={{ fontSize: 11, fill: "#64748b" }}
            stroke="#e6e8ec"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v.toLocaleString("en-US")}
          />
          <Tooltip
            cursor={{ fill: "rgba(15,23,42,0.04)" }}
            content={<CustomTooltip nameKey={xKey} />}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={36}>
            {data.map((entry, index) => (
              <Cell key={`${xKey}-${index}`} fill={entry.color || "#0f172a"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
