interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300",
    success: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300",
    warning: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
    info: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
  };

  return (
    <span className={`
      text-[10px] 
      font-bold 
      uppercase 
      tracking-wider 
      px-2.5 
      py-1 
      rounded-full 
      ${variants[variant]}
    `}>
      {text}
    </span>
  );
}
