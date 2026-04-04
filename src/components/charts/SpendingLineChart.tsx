import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"; // Removed 'Gradient' from here

// Mocking weekly trend data based on your April 2026 timeline
const data = [
  { day: "Mon", amount: 2400 },
  { day: "Tue", amount: 1398 },
  { day: "Wed", amount: 9800 },
  { day: "Thu", amount: 3908 },
  { day: "Fri", amount: 4800 },
  { day: "Sat", amount: 3800 },
  { day: "Sun", amount: 4300 },
];

export default function SpendingLineChart() {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-black text-gray-800 mb-6 tracking-tight">Spending Trend</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {/* This is the standard SVG way Recharts handles gradients */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94A3B8', fontSize: 12}}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#3B82F6" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}