import GoalCard from "../cards/GoalCard";
import { Plus, ChevronRight } from "lucide-react";

export default function GoalList({ goals }: any) {
  return (
    <div className="relative group mb-10">
      {/* Header with the orange 'Add' button from the image */}
      <div className="flex items-center justify-between mb-6 pr-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-gray-800 dark:text-slate-100 tracking-tight">Goals</h2>
          <button className="bg-amber-500 hover:bg-amber-600 transition-colors h-6 w-6 rounded-full flex items-center justify-center text-white shadow-sm shadow-amber-200">
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
        
        {/* Navigation arrow as seen on the right side of the goals list */}
        <button className="text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors bg-white dark:bg-slate-800 shadow-sm border border-gray-50 dark:border-slate-700">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {goals.map((g: any) => (
          <div key={g.id} className="min-w-[140px] flex-shrink-0">
            <GoalCard goal={g} />
          </div>
        ))}
        
        {/* Optional: Add a "See All" card at the end of the scroll */}
        <div className="min-w-[100px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-[32px] text-gray-300 dark:text-slate-500 hover:text-gray-400 dark:hover:text-slate-300 hover:border-gray-200 dark:hover:border-slate-600 cursor-pointer transition-all">
          <Plus size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-2">New</span>
        </div>
      </div>
    </div>
  );
}
