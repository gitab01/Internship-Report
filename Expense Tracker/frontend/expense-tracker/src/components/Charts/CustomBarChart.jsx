import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data, height = 300 }) => {
  // Handle different data formats
  const chartData = Array.isArray(data)
    ? data
    : data?.labels?.map((label, index) => ({
        month: label,
        amount: data.datasets[0]?.data[index] || 0,
      })) || [];

  // Function to alternate colors for bars
  const getBarColor = (index) => {
    const colors = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];
    return colors[index % colors.length];
  };

  // Early return if no data
  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white mt-6 p-4 rounded-lg shadow-md text-center py-12">
        <p className="text-gray-500">No data available for chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#666" }}
            stroke="#e5e7eb"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#666" }}
            stroke="#e5e7eb"
            tickLine={false}
            tickFormatter={(value) => `ETB ${value.toLocaleString()}`}
          />
          <Tooltip
            content={CustomTooltip}
            formatter={(value, name) => [
              `ETB ${value.toLocaleString()}`,
              name === "month" ? "Month" : "Amount",
            ]}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
