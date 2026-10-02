import { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  const chartData = useMemo(() => prepareExpenseBarChartData(data), [data]);

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between gap-3">
        <h5 className="card-title">Spending by category</h5>
        <span className="text-xs text-slate-500">Last 30 days</span>
      </div>
      <CustomBarChart data={chartData.slice(0, 7)} xKey="category" />
    </div>
  );
};

export default Last30DaysExpenses;
