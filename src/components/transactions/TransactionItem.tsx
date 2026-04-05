import {
  ShoppingBag,
  Utensils,
  Car,
  Banknote,
  Laptop,
  CreditCard,
  Pencil,
  Trash2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  c1: Utensils,
  c2: Car,
  c3: ShoppingBag,
  c4: Banknote,
  c5: Laptop,
};

export default function TransactionItem({
  tx,
  category,
  role,
  onEdit,
  onDelete,
}: any) {
  const IconComponent = iconMap[category?.id] || CreditCard;
  const isIncome = tx.type === "income";

  return (
    <tr className="group transition-colors">
      <td className="py-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gray-100 dark:bg-slate-700 rounded-2xl transition-colors">
            <IconComponent size={18} className="text-gray-500 dark:text-slate-300" />
          </div>
          <span className="font-bold text-sm text-gray-800 dark:text-slate-100">{tx.note}</span>
        </div>
      </td>

      <td className="py-4 text-sm text-gray-500 dark:text-slate-300 font-medium">
        {category?.name || "Other"}
      </td>

      <td className="py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
            isIncome
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </td>

      <td className="py-4 text-sm text-gray-400 dark:text-slate-400 font-medium capitalize">
        {tx.date}
      </td>

      <td
        className={`py-4 text-sm font-bold text-right ${
          isIncome ? "text-green-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"}Rs {tx.amount.toLocaleString()}
      </td>

      {role === "admin" && (
        <td className="py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => onEdit(tx)}
              className="inline-flex items-center gap-1 rounded-xl border border-blue-600 bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:border-white"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(tx.id)}
              className="inline-flex items-center gap-1 rounded-xl border border-red-600 bg-red-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:border-white"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
