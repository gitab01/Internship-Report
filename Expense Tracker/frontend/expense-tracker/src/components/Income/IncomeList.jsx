import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  // Format amount with ETB
  const formatAmount = (amount) => ` ${Number(amount).toLocaleString()}`;

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Income Source</h5>
        <button
          className="card-btn inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onDownload}
        >
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      {/* Income List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id || income.id}
              title={income.source || "Income"}
              icon={income.icon}
              date={
                income.date ? moment(income.date).format("Do MMM YYYY") : "N/A"
              }
              amount={formatAmount(income.amount || 0)} // ✅ ETB formatted
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No income records available.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
