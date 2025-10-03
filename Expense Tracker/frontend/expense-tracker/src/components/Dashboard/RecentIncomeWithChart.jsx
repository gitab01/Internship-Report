import React, { useMemo } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  // Memoize chart data for performance
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.warn(
        "RecentIncomeWithChart: Expected array for data, got:",
        data
      );
      return [];
    }

    return data
      .map((item, index) => ({
        id: item?.id || index,
        name: item?.source || item?.category || "Unknown",
        amount: Number(item?.amount) || 0,
        percentage:
          totalIncome > 0
            ? (((Number(item?.amount) || 0) / totalIncome) * 100).toFixed(1)
            : 0,
      }))
      .filter((item) => item.amount > 0);
  }, [data, totalIncome]);

  const totalItems = chartData.length;
  const hasData = chartData.length > 0;

  return (
    <div className="card bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Last 60 Days Income
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} {totalItems === 1 ? "source" : "sources"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ETB {totalIncome?.toLocaleString() || "0.00"}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      {hasData ? (
        <div className="chart-container">
          <CustomPieChart
            data={chartData}
            label="Income Sources"
            totalAmount={`ETB ${totalIncome?.toLocaleString() || "0.00"}`}
            showTextAnchor
            colors={COLORS}
            showLegend={true}
            showTooltip={true}
            animationDuration={1000}
          />
        </div>
      ) : (
        <div className="no-data-placeholder">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h6 className="text-gray-500 mb-2">No income data available</h6>
            <p className="text-sm text-gray-400">
              Add your first income source to see the breakdown
            </p>
          </div>
        </div>
      )}

      {/* Income sources list */}
      {hasData && chartData.length > 0 && (
        <div className="income-sources-list mt-4">
          <h6 className="text-sm font-medium text-gray-700 mb-2">
            Income Sources:
          </h6>
          <ul className="space-y-1">
            {chartData.slice(0, 5).map((item, index) => (
              <li
                key={item.id || index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">
                  <span
                    className="w-3 h-3 rounded-full inline-block mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  {item.name}
                </span>
                <span className="text-gray-800 font-medium">
                  ETB {item.amount.toLocaleString()} ({item.percentage}%)
                </span>
              </li>
            ))}
            {chartData.length > 5 && (
              <li className="text-xs text-gray-500 text-center">
                +{chartData.length - 5} more sources
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(RecentIncomeWithChart);
