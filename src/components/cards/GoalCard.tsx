import { Laptop, Plane, Briefcase } from "lucide-react";

const iconMap: any = {
  purchase: Laptop,
  travel: Plane,
  savings: Briefcase,
};

export default function GoalCard({ goal }: any) {
  const Icon = iconMap[goal.category] || Briefcase;

  return (
    <div className="bg-white dark:bg-slate-800 min-w-[150px] p-6 rounded-[32px] shadow-sm border border-gray-50 dark:border-slate-700 flex flex-col items-center justify-between transition-all hover:shadow-md hover:-translate-y-1">
      {/* Goal amount and target date */}
      <div className="text-center">
        <p className="text-sm font-bold text-gray-700 dark:text-slate-200">
          Rs {goal.targetAmount.toLocaleString()}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-gray-300 dark:text-slate-400">
          {goal.targetDate}
        </p>
      </div>

      {/* Category icon */}
      <div className="my-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-500 dark:text-blue-300">
        <Icon size={24} />
      </div>

      {/* Goal category label */}
      <p className="text-xs font-bold text-gray-500 dark:text-slate-300 capitalize">
        {goal.category}
      </p>
    </div>
  );
}
