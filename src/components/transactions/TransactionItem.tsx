import { ShoppingBag, Utensils, Car, Banknote, Laptop, CreditCard } from "lucide-react";

const iconMap: Record<string, any> = {
  c1: Utensils,
  c2: Car,
  c3: ShoppingBag,
  c4: Banknote,
  c5: Laptop,
};

export default function TransactionItem({ tx, category }: any) {
  const IconComponent = iconMap[category?.id] || CreditCard;

  return (
    <tr className="group hover:bg-gray-50/50 transition-colors">
      <td className="py-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gray-100 rounded-2xl group-hover:bg-white transition-colors">
            <IconComponent size={18} className="text-gray-500" />
          </div>
          <span className="font-bold text-sm text-gray-800">{tx.note}</span>
        </div>
      </td>

      <td className="py-4 text-sm text-gray-400 font-medium capitalize">
        {category?.name}
      </td>

      <td className="py-4 text-sm text-gray-400 font-medium">
        {tx.date}
      </td>

      <td
        className={`py-4 text-sm font-bold text-right ${
          tx.type === "income" ? "text-green-500" : "text-gray-800"
        }`}
      >
        {tx.type === "income" ? "+" : ""}Rs {tx.amount.toLocaleString()}
      </td>
    </tr>
  );
}
