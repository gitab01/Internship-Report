import { CurrencySeal } from "../Decor/CurrencyWatermark";

const TONES = {
  ink: { tile: "bg-slate-100 text-slate-900", value: "text-slate-900" },
  income: { tile: "bg-emerald-50 text-emerald-700", value: "text-emerald-700" },
  expense: { tile: "bg-rose-50 text-rose-700", value: "text-rose-700" },
  accent: { tile: "bg-blue-50 text-blue-700", value: "text-slate-900" },
};

const InfoCard = ({ icon, label, amount, hint, tone = "ink" }) => {
  const t = TONES[tone] || TONES.ink;
  return (
    <div className="card relative flex items-start justify-between gap-4 overflow-hidden">
      <CurrencySeal
        label={false}
        className="absolute -bottom-14 -right-12 h-36 w-36"
        opacity={0.05}
      />
      <div className="relative min-w-0">
        <p className="section-label">{label}</p>
        <p className={`num mt-2 text-xl sm:text-2xl font-bold ${t.value}`}>
          {amount}
        </p>
        {hint && <p className="text-xs text-slate-500 mt-1.5">{hint}</p>}
      </div>
      <div
        className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 grid place-items-center text-lg sm:text-xl rounded-xl ${t.tile}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default InfoCard;
