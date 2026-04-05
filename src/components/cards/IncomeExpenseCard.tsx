import Card from "../ui/Card";

export default function IncomeExpenseCard({ income, expense }: any) {
  return (
    <Card>
      <p className="text-gray-700 dark:text-slate-200">Income: Rs {income}</p>
      <p className="text-gray-700 dark:text-slate-200">Expense: Rs {expense}</p>
    </Card>
  );
}
