import React from "react";
import { FiArrowRight } from "react-icons/fi";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDollarSign, LuUtensils } from "react-icons/lu";
import { FaHome } from "react-icons/fa"; // Valid home icon from FontAwesome

// Map categories to icons
const categoryIcons = {
  Salary: <LuDollarSign />,
  Rent: <FaHome />,
  Food: <LuUtensils />,
};

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card w-full max-h-[300px] overflow-y-auto rounded-xl shadow-sm p-4 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button
          className="card-btn flex items-center gap-1 text-gray-500 hover:text-black"
          onClick={onSeeMore}
        >
          See All <FiArrowRight className="text-base" />
        </button>
      </div>

      {/* Transactions list */}
      <div className="mt-6 space-y-2">
        {transactions?.slice(0, 5)?.map((item, index) => (
          <TransactionInfoCard
            key={`${item._id || "no-id"}-${index}`} // Prevent duplicate key warning
            title={item.type === "expense" ? item.category : item.source}
            icon={categoryIcons[item.category] || categoryIcons["Salary"]} // Fallback icon
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}

        {/* No transactions */}
        {(!transactions || transactions.length === 0) && (
          <p className="text-sm text-gray-400">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
