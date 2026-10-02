import { formatMoney } from "../../utils/helper";

const CustomTooltip = ({ active, payload, nameKey = "name" }) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  const label = entry.payload?.[nameKey] ?? entry.name;

  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="num mt-0.5 text-sm font-semibold text-slate-900">
        {formatMoney(entry.value)}
      </p>
    </div>
  );
};

export default CustomTooltip;
