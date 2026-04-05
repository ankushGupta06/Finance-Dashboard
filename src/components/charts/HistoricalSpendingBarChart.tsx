type HistoricalSpendingItem = {
  key: string;
  month: string;
  amount: number;
  barHeight: number;
};

type HistoricalSpendingBarChartProps = {
  data: HistoricalSpendingItem[];
};

export default function HistoricalSpendingBarChart({
  data,
}: HistoricalSpendingBarChartProps) {
  const maxAmount = Math.max(...data.map((item) => item.amount), 1);
  const axisTicks = [1, 0.75, 0.5, 0.25].map((ratio) => ({
    ratio,
    value: Math.round(maxAmount * ratio),
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black text-gray-800">
            Monthly Expense Trend
          </p>
          <p className="text-xs text-gray-400">
            Y-axis shows rupee amount and X-axis shows month.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-100" />
            Earlier month
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            Latest month
          </span>
        </div>
      </div>

      <div className="rounded-[32px] border border-dashed border-gray-200 bg-gray-50/50 p-6">
        <div className="mb-3 pl-16 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
          Amount Spent (Rs)
        </div>

        <div className="flex gap-4">
          <div className="relative hidden h-64 w-12 shrink-0 sm:block">
            {axisTicks.map((tick) => (
              <span
                key={tick.ratio}
                className="absolute right-0 -translate-y-1/2 text-[10px] font-bold text-gray-400"
                style={{ bottom: `calc(${tick.ratio * 100}% - 1px)` }}
              >
                {tick.value.toLocaleString()}
              </span>
            ))}
            <span className="absolute bottom-0 right-0 text-[10px] font-bold text-gray-300">
              0
            </span>
          </div>

          <div className="relative h-64 flex-1">
            {axisTicks.map((tick) => (
              <div
                key={tick.ratio}
                className="absolute inset-x-0 border-t border-dashed border-gray-200"
                style={{ bottom: `calc(${tick.ratio * 100}% - 1px)` }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 border-t border-gray-300" />

            <div className="relative flex h-full items-end justify-between gap-4 px-2 pt-6">
              {data.map((bar, index) => (
                <div
                  key={bar.key}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-3 text-[10px] font-bold text-gray-500">
                    Rs {bar.amount.toLocaleString()}
                  </span>

                  <div
                    className={`w-full max-w-[52px] rounded-t-2xl transition-all duration-1000 ease-out shadow-sm ${
                      index === data.length - 1
                        ? "bg-blue-600 shadow-blue-100"
                        : "bg-blue-100"
                    }`}
                    style={{
                      height: `${bar.barHeight}%`,
                      minHeight: "4px",
                    }}
                  />

                  <span
                    className={`mt-4 mb-2 text-[11px] font-black ${
                      index === data.length - 1
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pl-16 text-center text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
          Month
        </div>
      </div>
    </div>
  );
}
