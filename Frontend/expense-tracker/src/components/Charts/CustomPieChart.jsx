import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
}) => {
  // ✅ Custom center label with proper spacing
  const renderCenterLabel = () => {
    return (
      <>
        {/* First line - Label */}
        <text
          x="50%"
          y="50%"
          dy={-10} // move label up
          textAnchor="middle"
          dominantBaseline="central"
          fill="#555"
          fontSize="14px"
        >
          {label}
        </text>

        {/* Second line - Amount */}
        <text
          x="50%"
          y="50%"
          dy={15} // move amount down
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000"
          fontSize="22px"
          fontWeight="bold"
        >
          {totalAmount}
        </text>
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={renderCenterLabel} // ✅ Inject custom label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
