interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-500",
    success: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    info: "bg-blue-50 text-blue-600"
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