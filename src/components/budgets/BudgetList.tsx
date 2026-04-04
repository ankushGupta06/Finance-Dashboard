import BudgetCard from "../cards/BudgetCard";

interface BudgetListProps {
  budgets: any[];
  categories: any[];
}

export default function BudgetList({ budgets, categories }: BudgetListProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Section Header matches the "Outcome Statistics" label in the image */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-800 tracking-tight">
          Outcome Statistics
        </h2>
      </div>

      <div className="space-y-7">
        {budgets.map((b: any) => {
          const cat = categories.find((c: any) => c.id === b.categoryId);
          if (!cat) return null;

          return (
            <div key={b.id} className="transition-all duration-300 hover:translate-x-1">
              <BudgetCard 
                budget={b} 
                category={cat} 
              />
            </div>
          );
        })}
      </div>

      {/* Optional "View More" link as seen in high-end dashboards */}
      {budgets.length > 3 && (
        <button className="text-xs font-bold text-blue-500 uppercase tracking-widest text-left mt-2 hover:text-blue-600 transition-colors">
          Show all categories &rarr;
        </button>
      )}
    </div>
  );
}