import React from 'react'
import{
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {
  console.log("CustomBarChart received data:", data);

  // Function to get bar color - using purple theme to match the design
  const getBarColor = (index) => {
    return "#875cf5"; // Consistent purple color
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '4px',
            margin: 0
          }}>
            {payload[0].payload.category}
          </p>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Amount: <span style={{ fontWeight: '600', color: '#9333ea' }}>${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '350px' }}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            stroke="#e5e7eb"
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            stroke="#e5e7eb"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[8, 8, 0, 0]}
            barSize={40}
          >
            {(data || []).map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
