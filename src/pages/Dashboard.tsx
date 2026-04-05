import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import { useRole } from "../context/RoleContext";
import { useTheme } from "../context/ThemeContext";
import { useTransactions } from "../context/TransactionsContext";
import AccountCard from "../components/cards/AccountCard";
import SpendingLineChart from "../components/charts/SpendingLineChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import { accounts as initialAccounts } from "../data/accounts";
import { categories } from "../data/categories";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Settings,
  Snowflake,
  ChevronRight,
  TrendingUp,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const [allAccounts] = useState(initialAccounts);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [isCardActive, setIsCardActive] = useState(true);
  const { role } = useRole();
  const { theme } = useTheme();
  const { transactions } = useTransactions();

  const mainAccount = allAccounts[0];
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const isCardBlurred = isCardFrozen || !isCardActive;
  const recentTransactions = transactions
    .slice()
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
  const expenseByCategory = transactions
    .filter((tx) => tx.type === "expense")
    .reduce<Record<string, number>>((acc, tx) => {
      acc[tx.categoryId] = (acc[tx.categoryId] || 0) + tx.amount;
      return acc;
    }, {});
  const topExpenseCategoryId = Object.keys(expenseByCategory).reduce<string | null>(
    (topId, currentId) => {
      if (!topId) return currentId;
      return expenseByCategory[currentId] > expenseByCategory[topId]
        ? currentId
        : topId;
    },
    null,
  );
  const topExpenseCategory = categories.find((cat) => cat.id === topExpenseCategoryId);
  const netFlow = totalIncome - totalExpense;

  return (
    <div className="flex bg-surface min-h-screen transition-colors">
      <Sidebar />
      <Container>
        <Header />

        <div className="px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Balance</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                    Rs {mainAccount.balance.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <ArrowUpRight size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Income</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">Rs {totalIncome.toLocaleString()}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <ArrowDownLeft size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Expense</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">Rs {totalExpense.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-xl font-black text-gray-800 tracking-tight">Primary Card</h2>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  {isFlipped ? "View Front" : "View Security Code"}
                </button>
              </div>

              <div
                className={`perspective-1000 relative w-full group transition-all duration-300 ${
                  isCardBlurred ? "blur-sm opacity-70" : ""
                }`}
              >
                <div className="invisible pointer-events-none w-full">
                  <AccountCard account={mainAccount} isActive={isCardActive} />
                </div>

                <div className={`absolute inset-0 transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                  <div className="absolute inset-0 backface-hidden">
                    <AccountCard
                      account={mainAccount}
                      isActive={isCardActive}
                      onToggleActive={() => setIsCardActive((prev) => !prev)}
                    />
                  </div>

                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="bg-slate-900 w-full h-full rounded-[32px] p-8 flex flex-col justify-center items-center text-white shadow-2xl border border-white/5">
                      <p className="text-[10px] uppercase opacity-40 tracking-[0.4em] mb-6 font-black text-center">Security Verification View</p>
                      <div className="bg-white/5 px-8 py-5 rounded-2xl border border-white/10 backdrop-blur-md">
                        <span className="text-2xl font-mono tracking-[0.5em] text-blue-400">882</span>
                      </div>
                      <p className="text-[9px] mt-6 opacity-30 italic text-center max-w-[200px]">
                        Keep this code private. Zorvyn will never ask for your CVV over the phone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsCardFrozen((prev) => !prev)}
                  className={`flex items-center justify-center gap-3 bg-white border py-4 rounded-2xl font-bold text-sm transition-all group ${
                    isCardFrozen
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100"
                  }`}
                >
                  <Snowflake size={18} className="group-hover:animate-pulse" />
                  {isCardFrozen ? "Unfreeze Card" : "Freeze Card"}
                </button>
                <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  <Settings size={18} />
                  Card Settings
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest">Linked Banks</h3>
                <button className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {allAccounts.slice(1, 4).map((acc) => (
                  <div
                    key={acc.id}
                    className="bg-white p-5 rounded-[28px] border border-gray-50 flex justify-between items-center shadow-sm hover:border-blue-100 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-800">{acc.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{acc.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-gray-800 text-sm">Rs {acc.balance.toLocaleString()}</p>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              {role === "viewer" && (
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[32px] p-6 text-white shadow-lg shadow-blue-100">
                  <h4 className="text-sm font-black mb-2">Zorvyn Pro</h4>
                  <p className="text-[10px] leading-relaxed opacity-80 mb-4 font-medium">
                    Upgrade to Pro to unlock multi-currency wallets and zero-fee international transfers.
                  </p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
            <SpendingLineChart />
            <ExpensePieChart />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.9fr] gap-6 mt-10">
            <div className="bg-white dark:bg-slate-800 rounded-[36px] p-8 border border-gray-50 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-black text-gray-300 dark:text-slate-400 uppercase tracking-[0.2em]">
                    Recent Activity
                  </p>
                  <h3 className="text-xl font-black text-gray-800 dark:text-slate-100 mt-2 tracking-tight">
                    Latest Transactions
                  </h3>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                  <Clock3 size={20} />
                </div>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((tx) => {
                  const category = categories.find((cat) => cat.id === tx.categoryId);
                  const isIncome = tx.type === "income";

                  return (
                    <div
                      key={tx.id}
                      className={`flex items-center justify-between gap-4 rounded-[24px] px-4 py-4 ${
                        theme === "dark"
                          ? "border border-transparent bg-transparent"
                          : "border border-gray-100 bg-gray-50/60"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-black text-gray-800 dark:text-slate-100 truncate">
                          {tx.note}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-slate-400">
                          {category?.name || "Other"} • {tx.date}
                        </p>
                      </div>
                      <p
                        className={`shrink-0 text-sm font-black ${
                          isIncome ? "text-green-500 dark:text-green-300" : "text-red-500 dark:text-red-300"
                        }`}
                      >
                        {isIncome ? "+" : "-"}Rs {tx.amount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-[36px] p-8 border border-gray-50 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-300 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-300 dark:text-slate-400 uppercase tracking-[0.2em]">
                      Smart Note
                    </p>
                    <h3 className="text-lg font-black text-gray-800 dark:text-slate-100 mt-1 tracking-tight">
                      Snapshot
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className={`rounded-[24px] p-4 ${
                      theme === "dark"
                        ? "border border-transparent bg-transparent"
                        : "border border-transparent bg-gray-50/70"
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-slate-400 mb-2">
                      Net Flow
                    </p>
                    <p
                      className={`text-2xl font-black ${
                        netFlow >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      Rs {Math.abs(netFlow).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-400 mt-2">
                      {netFlow >= 0 ? "You are cash-flow positive this cycle." : "Spending is ahead of income right now."}
                    </p>
                  </div>

                  <div className="rounded-[24px] bg-blue-600 text-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} />
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                        Top Category
                      </p>
                    </div>
                    <p className="text-lg font-black">
                      {topExpenseCategory?.name || "No category"}
                    </p>
                    <p className="text-xs opacity-80 mt-2">
                      Rs {(topExpenseCategoryId ? expenseByCategory[topExpenseCategoryId] : 0).toLocaleString()} spent in your biggest expense bucket.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
