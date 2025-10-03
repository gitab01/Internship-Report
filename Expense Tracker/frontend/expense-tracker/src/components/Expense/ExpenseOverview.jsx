import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import moment from "moment";

// Prepare expense data for Recharts
const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const validData = data
    .filter(
      (item) =>
        (item.date || item.createdAt || item.transactionDate) &&
        !isNaN(Number(item.amount))
    )
    .sort(
      (a, b) =>
        new Date(a.date || a.createdAt || a.transactionDate) -
        new Date(b.date || b.createdAt || b.transactionDate)
    );

  return validData.map((item) => ({
    name: moment(item.date || item.createdAt || item.transactionDate).format(
      "DD MMM"
    ),
    amount: Number(item.amount),
  }));
};

// Format amounts with ETB
const formatCurrency = (amount) =>
  `ETB ${Number(amount || 0).toLocaleString()}`;

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const preparedData = prepareExpenseLineChartData(transactions);
    setChartData(preparedData);
  }, [transactions]);

  return (
    <div className="card p-4 shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-1">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          onClick={onAddExpense}
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="mt-6">
        {chartData.length > 0 ? (
          <CustomLineChart
            data={chartData.map((item) => ({
              ...item,
              amount: formatCurrency(item.amount),
            }))}
          />
        ) : (
          <p className="text-gray-400 text-sm">No expense data to display.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
