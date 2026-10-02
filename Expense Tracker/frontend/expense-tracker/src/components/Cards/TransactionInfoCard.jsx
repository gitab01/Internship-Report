import { LuUtensils, LuTrash2 } from "react-icons/lu";
import { formatMoney } from "../../utils/helper";

const isImage = (icon) =>
  typeof icon === "string" && /^(https?:\/\/|\/|\.{0,2}\/)/.test(icon.trim());

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type = "expense",
  hideDeleteBtn,
  onDelete,
}) => {
  const income = type === "income";

  return (
    <div className="group relative flex items-center gap-3 py-3 border-b border-line last:border-0">
      <div className="shrink-0 w-10 h-10 grid place-items-center text-lg bg-slate-50 border border-line rounded-xl">
        {isImage(icon) ? (
          <img
            src={icon}
            alt=""
            className="w-5 h-5 object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : icon ? (
          <span aria-hidden="true">{icon}</span>
        ) : (
          <LuUtensils className="w-4 h-4 text-slate-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{date}</p>
      </div>

      {!hideDeleteBtn && (
        <button
          type="button"
          aria-label="Delete transaction"
          onClick={onDelete}
          className="shrink-0 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
        >
          <LuTrash2 size={16} />
        </button>
      )}

      <div
        className={`num shrink-0 text-sm font-semibold ${
          income ? "text-emerald-700" : "text-rose-700"
        }`}
      >
        {income ? "+" : "−"}
        {formatMoney(amount)}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
