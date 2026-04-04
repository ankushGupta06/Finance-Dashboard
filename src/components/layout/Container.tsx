export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-[#F9FAFC] h-screen overflow-hidden flex p-4">
      {/* This main panel provides the huge rounded corners from the image */}
      <div className="flex-1 bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 flex flex-col overflow-hidden border border-gray-100">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}