import { useState } from "react";
import { Cloud, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useTransactions } from "../../context/TransactionsContext";
import { user } from "../../data/users";

type AccountCardProps = {
  account: any;
  isActive?: boolean;
  onToggleActive?: () => void;
};

export default function AccountCard({
  account,
  isActive = true,
  onToggleActive,
}: AccountCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { transactions } = useTransactions();
  const accountTransactions = transactions.filter((tx) => tx.accountId === account.id);
  const income = accountTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expense = accountTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-8 md:gap-12 w-full max-w-full overflow-hidden px-2">
      <div className="relative perspective-1000 w-full max-w-[380px] aspect-[1.72/1]">
        <div
          className={`relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute inset-0 backface-hidden">
            <div className="bg-blue-600 w-full h-full rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-white overflow-hidden relative">
              <Cloud className="absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 h-32 w-32 md:h-48 md:w-48 opacity-10" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-black tracking-tight text-white">zorvyn</h3>
                  <p className="text-[9px] md:text-[10px] font-bold opacity-60 uppercase tracking-widest">Primary Account</p>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-base md:text-xl tracking-[0.2em] md:tracking-[0.3em] font-bold text-white/90">
                    {account.number || "5789 **** **** 2847"}
                  </p>
                  <div className="flex gap-6 md:gap-10">
                    <div>
                      <p className="text-[8px] md:text-[9px] uppercase opacity-50 mb-0.5 md:mb-1 font-bold">Card Holder</p>
                      <p className="text-xs md:text-sm font-bold tracking-wide">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[9px] uppercase opacity-50 mb-0.5 md:mb-1 font-bold">Expiry Date</p>
                      <p className="text-xs md:text-sm font-bold tracking-wide">06/29</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="bg-slate-800 w-full h-full rounded-[24px] md:rounded-[32px] text-white overflow-hidden relative flex flex-col justify-between py-6 md:py-8">
              <div className="bg-black w-full h-10 md:h-12 mt-2 md:mt-4 opacity-80" />
              <div className="px-6 md:px-8 flex justify-between items-end">
                <div className="flex-1">
                  <div className="bg-white/10 h-8 md:h-10 w-full rounded-lg flex items-center justify-end px-4">
                    <span className="text-black bg-white px-2 py-0.5 italic font-bold rounded text-[10px] md:text-xs">882</span>
                  </div>
                  <p className="text-[7px] md:text-[8px] uppercase opacity-40 mt-2 font-bold tracking-widest">Security Code / CVV</p>
                </div>
                <div className="flex-1 flex justify-end">
                  <Lock size={30} className="md:w-10 md:h-10 opacity-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(false);
          }}
          className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_30px_rgba(2,6,23,0.45)] p-2 rounded-full text-blue-600 dark:text-blue-300 hover:scale-110 transition-all z-20 hidden md:flex ${!isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(true);
          }}
          className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_30px_rgba(2,6,23,0.45)] p-2 rounded-full text-blue-600 dark:text-blue-300 hover:scale-110 transition-all z-20 hidden md:flex ${isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start justify-center gap-6 md:gap-8 w-full lg:w-auto">
        <div className="text-center sm:text-left">
          <div className="flex items-baseline justify-center sm:justify-start gap-1">
            <span className="text-blue-500 font-black text-xl">Rs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-slate-100 tracking-tighter">
              {account.balance.toLocaleString()}
            </h2>
          </div>
          <p className="text-[10px] font-black text-gray-300 dark:text-slate-400 uppercase tracking-widest mt-1 md:mt-2">Current Balance</p>
        </div>

        <div className="flex flex-row lg:flex-col gap-6 md:gap-5">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500 dark:text-green-300 font-black text-xs md:text-base">Rs</div>
            <div>
              <p className="text-xs md:text-sm font-black text-green-500 dark:text-green-300 leading-none">{income.toLocaleString()}</p>
              <p className="text-[9px] md:text-[10px] font-black text-gray-300 dark:text-slate-400 uppercase mt-1">Income</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-300 font-black text-xs md:text-base">Rs</div>
            <div>
              <p className="text-xs md:text-sm font-black text-red-500 dark:text-red-300 leading-none">{expense.toLocaleString()}</p>
              <p className="text-[9px] md:text-[10px] font-black text-gray-300 dark:text-slate-400 uppercase mt-1">Outcome</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-700 w-full justify-center sm:justify-start">
          <button
            onClick={onToggleActive}
            className={`w-10 h-6 rounded-full relative p-1 transition-colors ${
              isActive ? "bg-blue-600" : "bg-gray-300 dark:bg-slate-600"
            }`}
          >
            <div
              className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow-sm transition-all ${
                isActive ? "right-1" : "left-1"
              }`}
            ></div>
          </button>
          <span className="text-[10px] font-black text-gray-400 dark:text-slate-300 uppercase tracking-wider">
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}
