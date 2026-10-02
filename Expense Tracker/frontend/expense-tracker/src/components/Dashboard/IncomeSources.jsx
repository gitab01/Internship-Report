import { useMemo } from "react";
import { LuArrowRight } from "react-icons/lu";
import { formatMoney } from "../../utils/helper";

const IncomeSources = ({ transactions = [], onSeeMore }) => {
  const { rows, total } = useMemo(() => {
    const totals = {};
    transactions.forEach((t) => {
      const source = t?.source || "Other";
      totals[source] = (totals[source] || 0) + (Number(t?.amount) || 0);
    });
    const list = Object.entries(totals)
      .map(([name, amount]) => ({ name, amount }))
      .filter((r) => r.amount > 0)
      .sort((a, b) => b.amount - a.amount);
    return {
      rows: list,
      total: list.reduce((s, r) => s + r.amount, 0),
    };
  }, [transactions]);

  const max = rows[0]?.amount || 1;

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h5 className="card-title">Income sources</h5>
          <p className="text-xs text-slate-500 mt-0.5">Last 60 days</p>
        </div>
        <button className="card-btn" onClick={onSeeMore}>
          See all <LuArrowRight className="text-sm" />
        </button>
      </div>

      {rows.length ? (
        <ul className="mt-5 grid gap-4">
          {rows.slice(0, 5).map((row) => (
            <li key={row.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-medium text-slate-800">
                  {row.name}
                </span>
                <span className="num shrink-0 text-sm font-semibold text-slate-900">
                  {formatMoney(row.amount)}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.round((row.amount / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">
          No income recorded in the last 60 days.
        </p>
      )}

      <p className="num mt-5 border-t border-line pt-3 text-sm text-slate-600">
        Total <span className="font-semibold text-slate-900">{formatMoney(total)}</span>
      </p>
    </div>
  );
};

export default IncomeSources;
