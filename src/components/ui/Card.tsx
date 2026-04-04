interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Card({ children, className = "", noPadding = false }: CardProps) {
  return (
    <div 
      className={`
        bg-white 
        rounded-[32px] 
        ${noPadding ? 'p-0' : 'p-6'} 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        border border-gray-50/50
        transition-all 
        duration-300 
        hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}