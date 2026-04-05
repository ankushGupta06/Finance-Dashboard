import { ShoppingCart, Truck, Plane } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

const iconMap: any = {
  c3: { icon: ShoppingCart, color: "bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-300" },
  c2: { icon: Truck, color: "bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-300" },
  c1: { icon: Plane, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300" },
};

export default function BudgetCard({ budget, category }: any) {
  const percent = Math.round((budget.spent / budget.limit) * 100);
  const theme = iconMap[category.id] || { icon: ShoppingCart, color: "bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-300" };
  const Icon = theme.icon;

  return (
    <div className="flex items-center gap-4 group">
      <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${theme.color}`}>
        <Icon size={20} />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 dark:text-slate-400 capitalize tracking-wide">{category.name}</span>
          <span className="text-xs font-bold text-gray-800 dark:text-slate-100">{percent}%</span>
        </div>
        <ProgressBar value={percent} variant={category.id} />
      </div>
    </div>
  );
}
