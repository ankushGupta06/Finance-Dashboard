import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import BudgetList from "../components/budgets/BudgetList";
import { budgets } from "../data/budgets";
import { categories } from "../data/categories";
import { PieChart, Wallet, ArrowUpRight, Plus } from "lucide-react";

export default function BudgetsPage() {
  // Calculate total budget stats
  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalPercent = Math.round((totalSpent / totalLimit) * 100);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />

      <Container>
        <Header />

        <div className="px-4">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Budget Planner</h2>
              <p className="text-gray-400 text-sm mt-1">April 2026 Monthly Spending</p>
            </div>
            <button className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-amber-100 transition-all flex items-center gap-2">
              <Plus size={18} />
              Set New Limit
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT: Overall Monthly Health */}
            <div className="flex-1 space-y-8">
              <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
                {/* Decorative Icon Background */}
                <PieChart size={180} className="absolute -right-10 -bottom-10 opacity-10" />
                
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Monthly Overview</span>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-5xl font-black">₹{totalSpent.toLocaleString()}</h3>
                    <p className="text-blue-100 text-sm font-medium">Spent out of ₹{totalLimit.toLocaleString()}</p>
                  </div>

                  {/* Large Progress Bar */}
                  <div className="mt-10">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>Monthly Progress</span>
                      <span>{totalPercent}%</span>
                    </div>
                    <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${totalPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl w-fit mb-4">
                    <Wallet size={20} />
                  </div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Remaining</p>
                  <p className="text-xl font-black text-gray-800 mt-1">₹{(totalLimit - totalSpent).toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                  <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl w-fit mb-4">
                    <ArrowUpRight size={20} />
                  </div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Daily Average</p>
                  <p className="text-xl font-black text-gray-800 mt-1">₹{(totalSpent / 30).toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Detailed Breakdown */}
            <div className="flex-[1.2] bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm">
               <BudgetList budgets={budgets} categories={categories} />
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}