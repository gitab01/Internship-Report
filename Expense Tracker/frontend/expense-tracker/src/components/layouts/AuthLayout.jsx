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

const AuthLayout = ({ children }) => (
  <div className="min-h-screen w-full bg-white lg:grid lg:grid-cols-[1fr_minmax(0,26rem)]">
    {/* Form panel */}
    <div className="relative flex flex-col overflow-hidden px-6 py-8 sm:px-12 lg:px-16">
      <CurrencySeal
        label={false}
        className="absolute -bottom-20 -right-16 h-56 w-56 lg:hidden"
        opacity={0.07}
      />
      <BrandMark size="md" />

      <div className="flex flex-1 items-center py-10">
        <div className="w-full max-w-sm mx-auto lg:mx-0">{children}</div>
      </div>
    </div>

    {/* Preview panel */}
    <aside className="relative hidden lg:flex flex-col justify-center gap-8 overflow-hidden border-l border-line bg-white p-10">
      <CurrencyPattern tileId="auth-aside-tiles" opacity={0.045} />
      <CurrencySeal
        className="absolute -bottom-32 -right-24 h-[26rem] w-[26rem]"
        opacity={0.07}
      />

      <div className="relative">
        <p className="section-label">Why track here</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">
          A calm, accurate view of your money.
        </h3>
      </div>

      <ul className="relative grid gap-5">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{f.title}</p>
              <p className="mt-0.5 text-sm text-slate-600">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  </div>
);

export default AuthLayout;
