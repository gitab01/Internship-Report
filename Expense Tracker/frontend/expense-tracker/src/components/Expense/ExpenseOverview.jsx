import { useEffect, useState, useMemo } from "react";
import CustomLineChart from "../Charts/CustomLineChart";
import moment from "moment";
import { formatMoney } from "../../utils/helper";

const ExpenseOverview = ({ transactions = [], loading = false }) => {
  const [chartData, setChartData] = useState([]);

  const dailyTotals = useMemo(() => {
    const totals = {};
    transactions.forEach((item) => {
      const date = item.date || item.createdAt;
      const amount = Number(item.amount);
      if (!date || !moment(date).isValid() || !Number.isFinite(amount)) return;
      const key = moment(date).format("DD MMM");
      totals[key] = (totals[key] || 0) + amount;
    });
    return Object.entries(totals)
      .map(([name, amount]) => ({
        name,
        amount,
        sort: moment(name, "DD MMM").valueOf(),
      }))
      .sort((a, b) => a.sort - b.sort);
  }, [transactions]);

  useEffect(() => {
    setChartData(dailyTotals);
  }, [dailyTotals]);

  const total = dailyTotals.reduce((s, d) => s + d.amount, 0);
  const biggest = dailyTotals.reduce(
    (max, d) => (d.amount > (max?.amount || 0) ? d : max),
    null
  );

  const cells = [
    { label: "Total spent", value: formatMoney(total), tone: "text-rose-700" },
    { label: "Entries", value: String(transactions.length), tone: "text-slate-900" },
    {
      label: "Heaviest day",
      value: biggest ? `${formatMoney(biggest.amount)} · ${biggest.name}` : "—",
      tone: "text-slate-900",
    },
  ];

  return (
    <div className="card">
      <h5 className="card-title">Expense overview</h5>

      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {cells.map((c) => (
          <div key={c.label} className="stat-tile">
            <dt className="section-label">{c.label}</dt>
            <dd
              className={`num mt-2 text-lg sm:text-xl font-bold truncate ${c.tone}`}
            >
              {c.value}
            </dd>
          </div>
        ))}
      </dl>

      {loading ? (
        <div className="mt-4 h-60 animate-pulse rounded-xl bg-slate-50" />
      ) : (
        <CustomLineChart data={chartData} />
      )}
    </div>
  );
};

export default ExpenseOverview;
