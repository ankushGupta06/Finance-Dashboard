import Card from "../ui/Card";

export default function BalanceCard({ total }: { total: number }) {
  return (
    <Card>
      <h3 className="text-gray-500 dark:text-slate-400">Total Balance</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">Rs {total}</p>
    </Card>
  );
}
