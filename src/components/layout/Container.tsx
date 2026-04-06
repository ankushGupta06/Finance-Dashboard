export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-surface h-screen overflow-hidden flex p-4 transition-colors">
      {/* Main content shell */}
      <div className="flex-1 bg-card-bg rounded-[48px] shadow-2xl shadow-gray-200/50 flex flex-col overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
