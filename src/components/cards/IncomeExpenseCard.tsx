import Card from "../ui/Card";

export default function IncomeExpenseCard({ income, expense }: any) {
  return (
    <Card>
      <p>Income: ₹{income}</p>
      <p>Expense: ₹{expense}</p>
    </Card>
  );
}