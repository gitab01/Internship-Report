import { useEffect, useState, useMemo } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData, formatMoney } from "../../utils/helper";

const IncomeOverview = ({ transactions = [], loading = false }) => {
  const [chartData, setChartData] = useState([]);

  const stats = useMemo(() => {
    const total = transactions.reduce(
      (sum, item) => sum + (Number(item?.amount) || 0),
      0
    );
    const count = transactions.length;
    return { total, count, average: count ? total / count : 0 };
  }, [transactions]);

  useEffect(() => {
    if (loading || !transactions.length) return setChartData([]);
    const prepared = prepareIncomeBarChartData(transactions);
    setChartData(
      (prepared?.labels || []).map((month, i) => ({
        month,
        amount: prepared.datasets?.[0]?.data[i] || 0,
        color: "#059669",
      }))
    );
  }, [transactions, loading]);

  const cells = [
    { label: "Total income", value: formatMoney(stats.total), tone: "text-emerald-700" },
    { label: "Entries", value: String(stats.count), tone: "text-slate-900" },
    { label: "Average per entry", value: formatMoney(stats.average), tone: "text-slate-900" },
  ];

  return (
    <div className="card">
      <h5 className="card-title">Income overview</h5>

      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {cells.map((c) => (
          <div key={c.label} className="stat-tile">
            <dt className="section-label">{c.label}</dt>
            <dd className={`num mt-2 text-lg sm:text-xl font-bold ${c.tone}`}>
              {c.value}
            </dd>
          </div>
        ))}
      </dl>

      {loading ? (
        <div className="mt-4 h-60 animate-pulse rounded-xl bg-slate-50" />
      ) : (
        <CustomBarChart data={chartData} xKey="month" />
      )}
    </div>
  );
};

export default IncomeOverview;
