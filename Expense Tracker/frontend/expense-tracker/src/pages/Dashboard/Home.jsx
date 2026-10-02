import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuRefreshCw } from "react-icons/lu";
import BalanceHero from "../../components/Dashboard/BalanceHero";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import IncomeSources from "../../components/Dashboard/IncomeSources";

const Skeleton = () => (
  <div className="grid gap-4 sm:gap-6">
    <div className="hero animate-pulse">
      <div className="h-3 w-24 rounded bg-white/10" />
      <div className="mt-3 h-9 w-48 rounded bg-white/10" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-6 rounded bg-white/10" />
        <div className="h-6 rounded bg-white/10" />
      </div>
    </div>
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
      <div className="card h-72 animate-pulse lg:col-span-2">
        <div className="h-4 w-40 rounded bg-slate-100" />
      </div>
      <div className="card h-72 animate-pulse" />
    </div>
  </div>
);

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("We couldn't load your dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const income = dashboardData?.totalIncome || 0;
  const expense = dashboardData?.totalExpense || 0;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="grid gap-4 sm:gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Where your money came in and went out.
          </p>
        </div>

        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="card grid place-items-center gap-3 py-16 text-center">
            <p className="text-sm text-rose-600">{error}</p>
            <button className="btn-ghost" onClick={fetchData}>
              <LuRefreshCw size={14} /> Try again
            </button>
          </div>
        ) : (
          <>
            <BalanceHero
              balance={dashboardData?.totalBalance || 0}
              income={income}
              expense={expense}
              savingsRate={savingsRate}
            />

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentTransactions
                  transactions={dashboardData?.recentTransactions || []}
                  onSeeMore={() => navigate("/expense")}
                />
              </div>
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={income}
                totalExpense={expense}
              />
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || []}
              />
              <IncomeSources
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
