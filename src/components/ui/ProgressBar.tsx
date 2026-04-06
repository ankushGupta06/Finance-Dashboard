export default function ProgressBar({ value, variant }: { value: number, variant?: string }) {
  // Select the fill color based on the category variant.
  const colors: any = {
    c1: "bg-blue-400",
    c2: "bg-green-400",
    c3: "bg-orange-400",
    default: "bg-blue-500"
  };

  const barColor = colors[variant || "default"];

  return (
    <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
      <div 
        className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
