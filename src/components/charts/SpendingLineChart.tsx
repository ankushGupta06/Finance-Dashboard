import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../context/TransactionsContext";

export default function SpendingLineChart() {
  const { transactions } = useTransactions();
  const byDate = transactions.reduce<Record<string, number>>((acc, tx) => {
    if (tx.type === "expense") {
      acc[tx.date] = (acc[tx.date] || 0) + tx.amount;
    }
    return acc;
  }, {});

  const lineData = Object.entries(byDate)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-10)
    .map(([date, expense]) => ({
      date,
      label: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      expense,
    }));
  const hasData = lineData.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-gray-50 dark:border-slate-700 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-black text-gray-800 dark:text-slate-100 mb-2 tracking-tight">Expense Trend</h3>
      <p className="text-xs text-gray-400 dark:text-slate-400 mb-5">Last 10 days from mock data</p>
      <div className="flex-1 w-full">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ left: 4, right: 12, top: 8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                minTickGap={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickFormatter={(value) => `Rs ${value}`}
                width={58}
              />
              <Tooltip
                formatter={(value) => {
                  const numericValue =
                    typeof value === "number" ? value : Number(value || 0);
                  return [`Rs ${numericValue.toLocaleString()}`, "Expense"];
                }}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-gray-200 bg-gray-50/60 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div>
              <p className="text-sm font-black text-gray-700 dark:text-slate-200">
                No expense trend available
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-slate-400">
                Add a few expense transactions to see the time-based chart here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
