import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import HistoricalSpendingBarChart from "../components/charts/HistoricalSpendingBarChart";
import { useTransactions } from "../context/TransactionsContext";
import { categories } from "../data/categories";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Zap,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export default function InsightsPage() {
  const { transactions } = useTransactions();
  const expenseTx = transactions.filter((t) => t.type === "expense");
  const incomeTx = transactions.filter((t) => t.type === "income");

  const categoryTotals: Record<string, number> = {};
  expenseTx.forEach((t) => {
    categoryTotals[t.categoryId] =
      (categoryTotals[t.categoryId] || 0) + t.amount;
  });

  const topCategoryId =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b,
        )
      : null;

  const topCategory = categories.find((c) => c.id === topCategoryId);
  const topCategoryName = topCategory?.name ?? "top category";
  const income = incomeTx.reduce((acc, t) => acc + t.amount, 0);
  const expense = expenseTx.reduce((acc, t) => acc + t.amount, 0);
  const savings = income - expense;
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const savingsProgress = Math.min(100, Math.max(0, savingsRate));
  const healthLabel =
    savingsRate >= 35 ? "Excellent" : savingsRate >= 20 ? "Healthy" : "Needs Attention";
  const latestExpenseDate = expenseTx.reduce<Date | null>((latest, tx) => {
    const current = new Date(tx.date);
    return !latest || current > latest ? current : latest;
  }, null);
  const historyBaseDate = latestExpenseDate ?? new Date();
  const monthlyHistory = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(
      historyBaseDate.getFullYear(),
      historyBaseDate.getMonth() - (3 - index),
      1,
    );
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const amount = expenseTx
      .filter((tx) => tx.date.slice(0, 7) === key)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      key,
      month: date.toLocaleDateString("en-US", { month: "short" }),
      amount,
    };
  });
  const maxMonthlyExpense = Math.max(...monthlyHistory.map((item) => item.amount), 1);
  const monthlyHistoryWithTrend = monthlyHistory.map((item, index) => {
    const previousAmount = index > 0 ? monthlyHistory[index - 1].amount : 0;
    const rawChangePercent =
      index === 0
        ? 0
        : previousAmount > 0
          ? Math.round(((item.amount - previousAmount) / previousAmount) * 100)
          : item.amount > 0
            ? 100
            : 0;

    return {
      ...item,
      trend: rawChangePercent <= 0 ? "up" : "down",
      changePercent: Math.abs(rawChangePercent),
      barHeight: Math.max(12, Math.round((item.amount / maxMonthlyExpense) * 100)),
    };
  });

  return (
    <div className="flex bg-surface min-h-screen transition-colors">
      <Sidebar />

      <Container>
        <Header />

        <div className="px-4 pb-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Smart Insights
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              AI-driven analysis of your spending habits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1 & 2: Main Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Savings Rate "Hero" Card */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-50/50 -skew-x-12 translate-x-10" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap
                      className="text-amber-500"
                      size={18}
                      fill="currentColor"
                    />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Financial Health
                    </span>
                  </div>
                  <h3 className="text-4xl font-black text-gray-800 mb-6">
                    {healthLabel}
                  </h3>

                  <div className="flex items-end gap-10">
                    <div>
                      <p className="text-5xl font-black text-blue-600">
                        {savingsRate}%
                      </p>
                      <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-tighter">
                        Savings Rate
                      </p>
                    </div>
                    <div className="flex-1 max-w-[200px] mb-2">
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${savingsProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- HISTORICAL SPENDING ANALYSIS (3-4 MONTHS) --- */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <Calendar size={14} />
                    Spending History (Last 4 Months)
                  </div>
                </div>

                {/* Small Month Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {monthlyHistoryWithTrend.map((data) => (
                    <div
                      key={data.key}
                      className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group"
                    >
                      <p className="text-xs md:text-sm font-black text-gray-300 uppercase mb-2">
                        {data.month}
                      </p>
                      <p className="text-xl md:text-2xl font-black text-gray-800">
                        Rs {data.amount.toLocaleString()}
                      </p>
                      <div
                        className={`mt-3 flex items-center gap-1.5 text-xs md:text-sm font-bold ${data.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {data.trend === "up" ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        {data.changePercent > 0 ? "+" : ""}
                        {data.changePercent}%
                      </div>
                    </div>
                  ))}
                </div>

                <HistoricalSpendingBarChart data={monthlyHistoryWithTrend} />
              </div>
            </div>

            {/* Column 3: Observations & Highlights */}
            <div className="space-y-6">
              {/* Top Category Observation */}
              <div className="bg-amber-500 rounded-[32px] p-8 text-white">
                <TrendingUp size={32} className="mb-6 opacity-80" />
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                  Top Spending
                </p>
                <h4 className="text-2xl font-black mb-4 capitalize">
                  {topCategoryName}
                </h4>
                <p className="text-sm leading-relaxed opacity-90">
                  You spent{" "}
                  <span className="font-bold">
                    Rs {categoryTotals[topCategoryId!]?.toLocaleString() ?? 0}
                  </span>{" "}
                  on {topCategoryName} across your recent activity. This is your largest
                  expense area.
                </p>
                <button className="mt-8 flex items-center gap-2 text-xs font-bold group">
                  Optimize Category{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              {/* Quick Summary Cards */}
              <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none mb-1">
                      Savings
                    </p>
                    <p className="text-lg font-black text-gray-800 leading-none">
                      Rs {savings.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="text-amber-400" size={16} />
                    <span className="text-[10px] font-bold text-gray-800 uppercase">
                      Tip of the day
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">
                    "Reducing your {topCategoryName} spending by just 10%
                    could add Rs{" "}
                    {((categoryTotals[topCategoryId!] ?? 0) * 0.1).toFixed(0)} to your{" "}
                    {categories.find((c) => c.id === "c4")?.name || "savings"}."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

