import CustomPieChart from "../Charts/CustomPieChart";
import { formatMoney } from "../../utils/helper";

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
  const data = [
    { name: "Income", amount: Number(totalIncome) || 0, color: "#059669" },
    { name: "Expenses", amount: Number(totalExpense) || 0, color: "#e11d48" },
  ].filter((d) => d.amount > 0);

  const kept =
    totalIncome > 0
      ? Math.max(0, ((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between gap-3">
        <h5 className="card-title">Cash flow</h5>
        <span className="chip bg-slate-100 text-slate-700">
          {kept.toFixed(0)}% kept
        </span>
      </div>

      <CustomPieChart
        data={data}
        centerLabel="Balance"
        centerValue={Number(totalBalance) || 0}
      />

      <dl className="mt-4 grid gap-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-sm text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              {d.name}
            </dt>
            <dd className="num text-sm font-semibold text-slate-900">
              {formatMoney(d.amount)}
            </dd>
          </div>
        ))}
        {!data.length && (
          <p className="text-sm text-slate-500">
            Add an income or expense to see your cash flow.
          </p>
        )}
      </dl>
    </div>
  );
};

export default FinanceOverview;
