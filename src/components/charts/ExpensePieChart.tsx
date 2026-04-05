import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categories } from "../../data/categories";
import { useTheme } from "../../context/ThemeContext";
import { useTransactions } from "../../context/TransactionsContext";

const palette: Record<string, string> = {
  c1: "#3B82F6",
  c2: "#F59E0B",
  c3: "#8B5CF6",
};

export default function ExpensePieChart() {
  const { theme } = useTheme();
  const { transactions } = useTransactions();
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
  const hasData = data.length > 0;
  const maxExpenseItem = data.reduce<(typeof data)[number] | null>(
    (max, item) => (!max || item.value > max.value ? item : max),
    null,
  );

  const topLabels = data
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-gray-50 dark:border-slate-700 shadow-sm min-h-[400px] flex flex-col">
      <h3 className="text-lg font-black text-gray-800 dark:text-slate-100 mb-2 tracking-tight">
        Spending Breakdown
      </h3>
      <p className="text-xs text-gray-400 dark:text-slate-400 mb-4">
        Category split from mock expenses
      </p>

      <div className="relative flex-1 min-h-[220px] w-full">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
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
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-300 dark:text-slate-500">
                Highest Spend
              </p>
              <p className="mt-2 text-xl font-black text-gray-800 dark:text-slate-100">
                Rs {maxExpenseItem?.value.toLocaleString() || "0"}
              </p>
              <p className="mt-1 text-[11px] font-bold text-gray-400 dark:text-slate-400">
                {maxExpenseItem?.name || "No data"}
              </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-gray-200 bg-gray-50/60 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div>
              <p className="text-sm font-black text-gray-700 dark:text-slate-200">
                No category breakdown available
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-slate-400">
                Add expense transactions to see how spending is split by category.
              </p>
            </div>
          </div>
        )}
      </div>

      {hasData && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {topLabels.map((item) => (
            <div
              key={item.name}
              className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 border ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800"
                  : "bg-gray-50/80 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-[11px] font-bold text-gray-600 dark:text-slate-300">
                  {item.name}
                </span>
              </div>
              <span className="shrink-0 text-[11px] font-black text-gray-800 dark:text-slate-100">
                Rs {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs font-semibold text-gray-500 dark:text-slate-300 mt-4">
        Total Expense: Rs {totalExpense.toLocaleString()}
      </p>
    </div>
  );
}
