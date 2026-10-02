import BrandMark from "../Decor/BrandMark";
import { CurrencyPattern, CurrencySeal } from "../Decor/CurrencyWatermark";

const FEATURES = [
  {
    title: "Income and expenses in one place",
    body: "Record what you earn and what you spend, in Ethiopian Birr.",
  },
  {
    title: "See where money goes",
    body: "Spending is grouped by category and ranked by size.",
  },
  {
    title: "Export whenever you need",
    body: "Download your income and expense records as a spreadsheet.",
  },
];

const Bar = ({ label, amount, width, fill }) => (
  <div>
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs text-slate-300">{label}</span>
      <span className="num text-sm font-semibold">{amount}</span>
    </div>
    <div className="mt-1.5 h-1.5 rounded-full bg-white/15">
      <div className={`h-full rounded-full ${fill}`} style={{ width }} />
    </div>
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="min-h-screen w-full bg-white lg:grid lg:grid-cols-[1fr_minmax(0,30rem)]">
    {/* Form panel */}
    <div className="relative flex flex-col overflow-hidden px-6 py-8 sm:px-12 lg:px-16">
      <CurrencySeal
        label={false}
        className="absolute -bottom-20 -right-16 h-56 w-56 lg:hidden"
        opacity={0.07}
      />
      <BrandMark size="md" />

      <div className="flex flex-1 items-center py-10">
        <div className="w-full max-w-sm mx-auto">{children}</div>
      </div>

      <p className="mx-auto w-full max-w-sm border-t border-line pt-5 text-xs text-slate-500">
        Every record belongs to the account that created it.
      </p>
    </div>

    {/* Preview panel */}
    <aside className="relative hidden lg:flex flex-col justify-center gap-6 overflow-hidden border-l border-line bg-white p-10">
      <CurrencyPattern tileId="auth-aside-tiles" opacity={0.04} />
      <CurrencySeal
        className="absolute -bottom-28 -right-24 h-[24rem] w-[24rem]"
        opacity={0.06}
      />

      <div className="relative">
        <p className="section-label">Expense Tracker</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">
          A calm, accurate view of your money.
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">
        <CurrencySeal
          label={false}
          color="#ffffff"
          opacity={0.1}
          className="absolute -bottom-20 -right-16 h-48 w-48"
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Total balance
          </p>
          <p className="num mt-1.5 text-2xl font-bold tracking-tight">
            ETB 110,370
          </p>
          <div className="mt-5 grid gap-3.5">
            <Bar label="Income received" amount="ETB 179,700" width="100%" fill="bg-emerald-400" />
            <Bar label="Expenses spent" amount="ETB 69,330" width="39%" fill="bg-rose-400" />
          </div>
        </div>
      </div>

      <p className="relative -mt-2 text-xs text-slate-500">
        Sample figures — your own numbers appear once you add entries.
      </p>

      <ul className="relative grid gap-4 border-t border-line pt-6">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{f.title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-slate-600">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  </div>
);

export default AuthLayout;
