import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { formatMoney } from "../../utils/helper";

const CustomPieChart = ({
  data = [],
  colors = ["#0f172a", "#e11d48", "#059669"],
  centerLabel,
  centerValue,
  height = 220,
}) => {
  if (!data.length) {
    return (
      <div className="grid h-56 place-items-center rounded-xl border border-dashed border-line text-sm text-slate-500">
        No data to chart yet
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="92%"
            innerRadius="66%"
            paddingAngle={1}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`${entry.name}-${index}`}
                fill={entry.color || colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <p className="text-[11px] font-medium text-slate-500">
              {centerLabel}
            </p>
          )}
          {centerValue && (
            <p className="num mt-0.5 text-base sm:text-lg font-bold text-slate-900">
              {typeof centerValue === "number"
                ? formatMoney(centerValue)
                : centerValue}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
