import { Laptop, Plane, Briefcase, Plus } from "lucide-react";

const iconMap: any = {
  purchase: Laptop,
  travel: Plane,
  savings: Briefcase,
};

export default function GoalCard({ goal }: any) {
  const Icon = iconMap[goal.category] || Briefcase;

  return (
    <div className="bg-white min-w-[150px] p-6 rounded-[32px] shadow-sm border border-gray-50 flex flex-col items-center justify-between transition-all hover:shadow-md hover:-translate-y-1">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-700">₹{goal.targetAmount.toLocaleString()}</p>
        <p className="text-[10px] font-medium text-gray-300 mt-0.5">{goal.targetDate}</p>
      </div>

      <div className="my-6 p-3 bg-blue-50 rounded-2xl text-blue-500">
        <Icon size={24} />
      </div>

      <p className="text-xs font-bold text-gray-500 capitalize">{goal.category}</p>
    </div>
  );
}