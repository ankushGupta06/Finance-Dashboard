import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { categories } from "../../data/categories";
import { transactions } from "../../data/transactions";

export default function ExpensePieChart() {
  // Aggregate data from transactions
  const data = categories
    .filter(cat => cat.type === 'expense')
    .map(cat => ({
      name: cat.name,
      value: transactions
        .filter(t => t.categoryId === cat.id)
        .reduce((sum, t) => sum + t.amount, 0),
      color: cat.id === 'c1' ? '#3B82F6' : cat.id === 'c2' ? '#F59E0B' : '#8B5CF6'
    }))
    .filter(item => item.value > 0);

  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-black text-gray-800 mb-6 tracking-tight">Spending Breakdown</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}