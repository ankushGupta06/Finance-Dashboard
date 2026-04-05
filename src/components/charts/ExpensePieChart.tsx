import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { categories } from "../../data/categories";
import { transactions } from "../../data/transactions";

const palette: Record<string, string> = {
  c1: "#3B82F6",
  c2: "#F59E0B",
  c3: "#8B5CF6",
};

export default function ExpensePieChart() {
  const data = categories
    .filter((cat) => cat.type === "expense")
    .map((cat) => ({
      name: cat.name,
      value: transactions
        .filter((t) => t.categoryId === cat.id && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
      color: palette[cat.id] || "#94A3B8",
    }))
    .filter((item) => item.value > 0);

  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-gray-50 dark:border-slate-700 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-black text-gray-800 dark:text-slate-100 mb-2 tracking-tight">Spending Breakdown</h3>
      <p className="text-xs text-gray-400 dark:text-slate-400 mb-5">Category split from mock expenses</p>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={78}
              outerRadius={108}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => {
                const numericValue =
                  typeof value === "number" ? value : Number(value || 0);
                return [`Rs ${numericValue.toLocaleString()}`, "Amount"];
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Legend verticalAlign="bottom" iconType="circle" height={28} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs font-semibold text-gray-500 dark:text-slate-300 mt-3">
        Total Expense: Rs {totalExpense.toLocaleString()}
      </p>
    </div>
  );
}
