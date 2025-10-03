import React, { useEffect, useState, useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({
  transactions = [],
  onAddIncome,
  loading = false,
}) => {
  const [chartData, setChartData] = useState([]);

  // Compute stats
  const stats = useMemo(() => {
    const totalIncome = transactions.reduce(
      (sum, item) => sum + (Number(item?.amount) || 0),
      0
    );
    const transactionCount = transactions.length;
    const averageIncome =
      transactionCount > 0 ? totalIncome / transactionCount : 0;

    return {
      totalIncome,
      transactionCount,
      averageIncome: Number(averageIncome.toFixed(2)),
      hasData: totalIncome > 0 && transactionCount > 0,
    };
  }, [transactions]);

  useEffect(() => {
    if (!loading && Array.isArray(transactions) && transactions.length > 0) {
      try {
        const preparedData = prepareIncomeBarChartData(transactions);
        const chartDataArray = Array.isArray(preparedData)
          ? preparedData
          : preparedData?.labels?.map((label, index) => ({
              month: label,
              amount: preparedData.datasets?.[0]?.data[index] || 0,
            })) || [];
        setChartData(chartDataArray);
      } catch (error) {
        console.error("Error preparing chart data:", error);
        setChartData([]);
      }
    } else {
      setChartData([]);
    }
  }, [transactions, loading]);

  // Format amount with ETB
  const formatCurrency = (amount) => `ETB ${amount}`;

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="card bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h5 className="text-xl font-semibold text-gray-900">
            Income Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time.
          </p>
        </div>
        <button
          onClick={onAddIncome}
          className="add-btn inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <LuPlus />
          Add Income
        </button>
      </div>

      {stats.hasData ? (
        <>
          {/* Stats */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-green-50 rounded-b-xl">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {formatCurrency(stats.totalIncome)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {stats.transactionCount}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Avg per Transaction
              </p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {formatCurrency(stats.averageIncome)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            {chartData.length > 0 ? (
              <CustomBarChart data={chartData} height={300} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No chart data available yet.
                </p>
                <p className="text-sm text-gray-400">
                  Add more transactions to see trends
                </p>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 rounded-b-xl">
              <h6 className="text-sm font-medium text-gray-700 mb-2">
                Recent Transactions
              </h6>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {transactions.slice(0, 3).map((transaction, index) => (
                  <div
                    key={transaction.id || index}
                    className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.source || transaction.category || "Income"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          transaction.date ||
                            transaction.createdAt ||
                            transaction.transactionDate ||
                            Date.now()
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-green-600 font-semibold">
                      {formatCurrency(Number(transaction.amount || 0))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-12">
          <div className="text-gray-500 mb-4">
            <p className="text-lg">No income data available.</p>
          </div>
          <button
            onClick={onAddIncome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <LuPlus />
            Add Your First Income
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(IncomeOverview);
