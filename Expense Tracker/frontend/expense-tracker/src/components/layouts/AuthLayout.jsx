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

const AuthLayout = ({ children, title = "Expensia" }) => (
  <div className="min-h-screen w-full bg-white lg:grid lg:grid-cols-[1fr_minmax(0,26rem)]">
    {/* Form panel */}
    <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
      <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">
          E
        </span>
        {title}
      </h2>

      <div className="flex flex-1 items-center py-10">
        <div className="w-full max-w-sm mx-auto lg:mx-0">{children}</div>
      </div>
    </div>

    {/* Preview panel */}
    <aside className="hidden lg:flex flex-col justify-center gap-8 border-l border-line bg-slate-50/60 p-10">
      <div>
        <p className="section-label">Why Expensia</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">
          A calm, accurate view of your money.
        </h3>
      </div>

      <ul className="grid gap-5">
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

