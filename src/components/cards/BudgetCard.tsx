import { ShoppingCart, Truck, Plane } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

const iconMap: any = {
  c3: { icon: ShoppingCart, color: "bg-orange-50 text-orange-500" },
  c2: { icon: Truck, color: "bg-green-50 text-green-500" },
  c1: { icon: Plane, color: "bg-blue-50 text-blue-500" },
};

export default function BudgetCard({ budget, category }: any) {
  const percent = Math.round((budget.spent / budget.limit) * 100);
  const theme = iconMap[category.id] || { icon: ShoppingCart, color: "bg-gray-50 text-gray-500" };
  const Icon = theme.icon;

  return (
    <div className="flex items-center gap-4 group">
      <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${theme.color}`}>
        <Icon size={20} />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 capitalize tracking-wide">{category.name}</span>
          <span className="text-xs font-bold text-gray-800">{percent}%</span>
        </div>
        <ProgressBar value={percent} variant={category.id} />
      </div>
    </div>
  );
}