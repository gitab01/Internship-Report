import { CurrencySeal } from "../Decor/CurrencyWatermark";
import { formatMoney } from "../../utils/helper";

const Bar = ({ label, amount, width, fill }) => (
  <div>
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <span className="num text-sm font-semibold">{formatMoney(amount)}</span>
    </div>
    <div className="mt-2 h-1.5 rounded-full bg-white/15">
      <div
        className={`h-full rounded-full ${fill}`}
        style={{ width: `${width}%` }}
      />
    </div>
  </div>
);

const BalanceHero = ({ balance, income, expense, savingsRate }) => {
  const spent = income > 0 ? Math.min((expense / income) * 100, 100) : 0;

  return (
    <section className="hero">
      <CurrencySeal
        label={false}
        color="#ffffff"
        opacity={0.1}
        className="absolute -bottom-24 -right-20 h-72 w-72"
      />

      <div className="relative grid gap-7 sm:grid-cols-2 sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Total balance
          </p>
          <p className="num mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            {formatMoney(balance)}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
            {savingsRate.toFixed(0)}% of income kept
          </span>
        </div>

        <div className="grid gap-4">
          <Bar label="Income received" amount={income} width={100} fill="bg-emerald-400" />
          <Bar label="Expenses spent" amount={expense} width={spent} fill="bg-rose-400" />
        </div>
      </div>
    </section>
  );
};

export default BalanceHero;
