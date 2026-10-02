import moment from "moment";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transactions = [], loading, onDelete, onDownload }) => (
  <div className="card">
    <div className="flex items-center justify-between gap-3">
      <div>
        <h5 className="card-title">All expenses</h5>
        <p className="text-xs text-slate-500 mt-0.5">
          {transactions.length}{" "}
          {transactions.length === 1 ? "entry" : "entries"}
        </p>
      </div>
      <button
        className="card-btn"
        onClick={onDownload}
        disabled={!transactions.length}
      >
        <LuDownload size={14} /> Export
      </button>
    </div>

    {loading ? (
      <div className="mt-4 h-40 animate-pulse rounded-xl bg-slate-50" />
    ) : transactions.length ? (
      <div className="mt-2">
        {transactions.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    ) : (
      <p className="py-10 text-center text-sm text-slate-500">
        No expense entries yet.
      </p>
    )}
  </div>
);

export default ExpenseList;
