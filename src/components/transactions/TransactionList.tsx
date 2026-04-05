import TransactionItem from "./TransactionItem";

export default function TransactionList({
  transactions,
  categories,
  role,
  onEdit,
  onDelete,
}: any) {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Transaction history</h2>
        {/* Optional: Add a "View all" or Filter button here later */}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.1em] text-gray-300 dark:text-slate-400 font-bold border-b border-gray-50 dark:border-slate-700">
              <th className="pb-4 font-bold">Receiver</th>
              <th className="pb-4 font-bold">Category</th>
              <th className="pb-4 font-bold">Type</th>
              <th className="pb-4 font-bold">Date</th>
              <th className="pb-4 font-bold text-right">Amount</th>
              {role === "admin" && (
                <th className="pb-4 font-bold text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50 dark:divide-slate-700/60">
            {transactions.map((tx: any) => {
              const category = categories.find((c: any) => c.id === tx.categoryId);
              return (
                <TransactionItem 
                  key={tx.id} 
                  tx={tx} 
                  category={category} 
                  role={role}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 dark:text-slate-400 text-sm">No transactions found for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
}
