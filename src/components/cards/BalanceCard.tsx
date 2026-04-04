import Card from "../ui/Card";

export default function BalanceCard({ total }: { total: number }) {
  return (
    <Card>
      <h3 className="text-gray-500">Total Balance</h3>
      <p className="text-2xl font-bold">₹{total}</p>
    </Card>
  );
}