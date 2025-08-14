import React from 'react';
import { LuDownload, LuTrash2, LuBuilding, LuTrendingUp } from 'react-icons/lu';

const IncomeSources = ({ incomeData, onDeleteIncome, onDownload }) => {
  // Sample data - replace with actual data from props
  const sampleData = [
    {
      _id: '507f1f77bcf86cd799439011', // Using MongoDB ObjectId format
      id: '507f1f77bcf86cd799439011',
      source: 'Business Income',
      date: '2nd Feb 2025',
      amount: 6500,
      icon: 'business'
    },
    {
      _id: '507f1f77bcf86cd799439012', // Using MongoDB ObjectId format
      id: '507f1f77bcf86cd799439012',
      source: 'Interest From Saving Account',
      date: '1st Feb 2025',
      amount: 4300,
      icon: 'bank'
    }
  ];

  const data = incomeData && incomeData.length > 0 ? incomeData : sampleData;

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'business':
        return <LuBuilding className="text-2xl text-gray-600" />;
      case 'bank':
        return <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">$</span>
        </div>;
      default:
        return <LuBuilding className="text-2xl text-gray-600" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg">Income Sources</h5>
        <button 
          onClick={onDownload}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <LuDownload className="text-lg" />
          Download
        </button>
      </div>

      <div className="space-y-4">
        {data.map((income) => (
          <div key={income._id || income.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {getIcon(income.icon)}
              </div>
              <div>
                <h6 className="font-medium text-gray-800">{income.source}</h6>
                <p className="text-sm text-gray-500">{income.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-green-600 font-semibold">+ ${income.amount.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <LuTrendingUp className="text-xs" />
                  <span>Income</span>
                </div>
              </div>
              <button 
                onClick={() => onDeleteIncome(income)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete income"
              >
                <LuTrash2 className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeSources;
