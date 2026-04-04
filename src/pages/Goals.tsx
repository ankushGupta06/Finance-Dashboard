import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import GoalCard from "../components/cards/GoalCard";
import { goals } from "../data/goals";
import { Target, Trophy, TrendingUp, Plus } from "lucide-react";

export default function GoalsPage() {
  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  
  // Calculate aggregate progress
  const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const overallProgress = Math.round((totalSaved / totalTarget) * 100);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />

      <Container>
        <Header />

        <div className="px-4">
          {/* Hero Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Financial Goals</h2>
              <p className="text-gray-400 text-sm mt-1">Track your dreams and milestones</p>
            </div>
            
            {/* Quick Summary Badge */}
            <div className="bg-white px-6 py-4 rounded-[32px] border border-gray-100 flex items-center gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Total Saved</p>
                  <p className="text-sm font-black text-gray-800">₹{totalSaved.toLocaleString()}</p>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-gray-100" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Overall</p>
                  <p className="text-sm font-black text-gray-800">{overallProgress}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            
            {/* Main Goals Grid (Takes 3/4 width) */}
            <div className="lg:col-span-3 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Active Pursuits</h3>
                  <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {activeGoals.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeGoals.map((g) => (
                    <div key={g.id} className="transition-transform hover:-translate-y-1">
                      <GoalCard goal={g} />
                    </div>
                  ))}
                  
                  {/* Add New Goal Placeholder */}
                  <button className="border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center p-8 text-gray-300 hover:text-blue-500 hover:border-blue-100 hover:bg-blue-50/30 transition-all min-h-[220px]">
                    <div className="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-white">
                      <Plus size={32} />
                    </div>
                    <span className="font-bold text-sm">Add New Goal</span>
                  </button>
                </div>
              </section>

              {/* Completed Section */}
              {completedGoals.length > 0 && (
                <section className="opacity-60">
                   <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-bold text-gray-400">Accomplished</h3>
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      {completedGoals.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {completedGoals.map((g) => (
                      <GoalCard key={g.id} goal={g} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar: Insights & Milestones (Takes 1/4 width) */}
            <div className="space-y-8">
              <div className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500 text-white rounded-xl">
                    <Target size={20} />
                  </div>
                  <h4 className="font-bold text-gray-800">Next Milestone</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  You're only <span className="text-gray-800 font-bold">₹30,000</span> away from completing your 
                  <span className="text-blue-500 font-bold"> Emergency Fund</span>! At your current rate, you'll reach it in 2 months.
                </p>
                <button className="w-full py-3 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-gray-800 transition-colors">
                  View Projection
                </button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}