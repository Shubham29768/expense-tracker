import React, { useState, useEffect } from 'react';
import { prepareIncomePieChartData } from '../../utils/helper';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("RecentIncomeWithChart - Raw data received:", data);
    console.log("RecentIncomeWithChart - Data type:", typeof data);
    console.log("RecentIncomeWithChart - Data length:", data?.length);
    console.log("RecentIncomeWithChart - First item:", data?.[0]);
    
    const result = prepareIncomePieChartData(data);
    console.log("RecentIncomeWithChart - Processed chart data:", result);
    console.log("RecentIncomeWithChart - Result length:", result?.length);
    
    setChartData(result);
    
    return () => {};
  }, [data]);

  
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
          See All →
        </button>
      </div>
      <div className="flex-grow min-h-[400px] h-[400px]">
        {chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
          />
        ) : (
          <p>No income data available for the last 60 days.</p>
        )}
      </div>
    </div>
  );
}; 

export default RecentIncomeWithChart;