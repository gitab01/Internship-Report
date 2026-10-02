import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => (
  <div className="card h-full">
    <div className="flex items-center justify-between gap-3">
      <h5 className="card-title">Recent activity</h5>
      <button className="card-btn" onClick={onSeeMore}>
        See all <LuArrowRight className="text-sm" />
      </button>
    </div>

    <div className="mt-2">
      {transactions.length > 0 ? (
        transactions.slice(0, 6).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">
          No transactions yet. Your income and expenses will appear here.
        </p>
      )}
    </div>
  </div>
);

export default RecentTransactions;
