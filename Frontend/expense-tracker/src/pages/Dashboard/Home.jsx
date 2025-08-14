import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";

import { LuWallet, LuCoins } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransaction"
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses.jsx";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart.jsx";
import RecentIncome from "../../components/Dashboard/RecentIncome.jsx";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {  
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log("Home - Dashboard data:", dashboardData);
    console.log("Home - Last 60 days income data:", dashboardData?.last60DaysIncome);
  }, [dashboardData]); 

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWallet />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
          className="h-full"
        />

        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
          className="h-full"
        />

        {(() => {
          // Prefer last 30 days expenses; if empty, fall back to recent expense transactions
          const last30DaysExpenses = dashboardData?.last30daysExpenses?.transactions || [];
          const fallbackRecentExpenses = (dashboardData?.recentTransactions || []).filter(
            (txn) => txn?.type === "expense"
          );
          const expensesForWidget = last30DaysExpenses.length > 0 ? last30DaysExpenses : fallbackRecentExpenses;

          return (
            <ExpenseTransaction
              transactions={expensesForWidget}
              onSeeMore={() => navigate("/expense")}
            />
          );
        })()}

        <Last30DaysExpenses
         data={dashboardData?.last30daysExpenses?.transactions || []}
         />

        <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.length > 0 
            ? dashboardData?.last60DaysIncome?.transactions 
            : dashboardData?.recentTransactions?.filter(txn => txn?.type === "income") || []
          }
          totalIncome={dashboardData?.last60DaysIncome?.total || dashboardData?.totalIncome || 0}
        />

        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />

        
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;