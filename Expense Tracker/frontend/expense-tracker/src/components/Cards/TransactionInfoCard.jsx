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
    <div className="group relative -mx-2 flex items-center gap-3 rounded-xl border-b border-line px-2 py-3 transition-colors last:border-0 hover:bg-slate-50">
      <div className="shrink-0 w-10 h-10 grid place-items-center text-lg bg-white border border-line rounded-xl">
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
          className="shrink-0 grid place-items-center w-8 h-8 rounded-lg text-slate-400 transition-colors cursor-pointer hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <LuTrash2 size={16} />
        </button>
      )}

      <div className={`num shrink-0 ${income ? "chip-income" : "chip-expense"}`}>
        {income ? "+" : "−"}
        {formatMoney(amount)}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
