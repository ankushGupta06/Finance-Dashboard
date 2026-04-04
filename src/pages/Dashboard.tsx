import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import AccountCard from "../components/cards/AccountCard";
import SpendingLineChart from "../components/charts/SpendingLineChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import { accounts as initialAccounts } from "../data/accounts";
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Settings, 
  Snowflake,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const [allAccounts] = useState(initialAccounts);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Using the first account as the primary featured card
  const mainAccount = allAccounts[0];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <Container>
        <Header />

        <div className="px-4 pb-20">
          
          {/* --- 1. TOP STATS ROW --- 
              Responsive grid: 1 column on mobile, 3 columns on tablet/desktop
          */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
            {/* Total Balance Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Balance</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                    ₹{mainAccount.balance.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* Income Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <ArrowUpRight size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Income</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">₹15,000</h3>
                </div>
              </div>
            </div>

            {/* Expense Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <ArrowDownLeft size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Expense</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">₹3,500</h3>
                </div>
              </div>
            </div>
          </div>

          {/* --- 2. MAIN CONTENT AREA --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            
            {/* Left Column: Featured Card & Actions */}
            <div className="lg:col-span-2">
               <div className="flex justify-between items-center mb-6 px-2">
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">Primary Card</h2>
                  <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    {isFlipped ? "View Front" : "View Security Code"}
                  </button>
               </div>

               {/* THE GHOST WRAPPER: 
                 This solves the overlapping issue by forcing the container 
                 to match the height of the absolute-positioned card.
               */}
               <div className="perspective-1000 relative w-full group">
                 {/* Invisible Placeholder (Maintains Layout Flow) */}
                 <div className="invisible pointer-events-none w-full">
                    <AccountCard account={mainAccount} />
                 </div>

                 {/* The Animated Flip Card */}
                 <div className={`absolute inset-0 transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front Face */}
                    <div className="absolute inset-0 backface-hidden">
                      <AccountCard account={mainAccount} />
                    </div>

                    {/* Back Face (Security View) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                       <div className="bg-slate-900 w-full h-full rounded-[32px] p-8 flex flex-col justify-center items-center text-white shadow-2xl border border-white/5">
                          <p className="text-[10px] uppercase opacity-40 tracking-[0.4em] mb-6 font-black text-center">Security Verification View</p>
                          <div className="bg-white/5 px-8 py-5 rounded-2xl border border-white/10 backdrop-blur-md">
                             <span className="text-2xl font-mono tracking-[0.5em] text-blue-400">882</span>
                          </div>
                          <p className="text-[9px] mt-6 opacity-30 italic text-center max-w-[200px]">
                            Keep this code private. CloudCash will never ask for your CVV over the phone.
                          </p>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Quick Action Buttons (Always pushed below the card) */}
               <div className="mt-8 grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl font-bold text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all group">
                    <Snowflake size={18} className="group-hover:animate-pulse" />
                    Freeze Card
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                    <Settings size={18} />
                    Card Settings
                  </button>
               </div>
            </div>

            {/* Right Column: Linked Bank Accounts */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest">Linked Banks</h3>
                <button className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {allAccounts.slice(1, 4).map((acc) => (
                  <div 
                    key={acc.id} 
                    className="bg-white p-5 rounded-[28px] border border-gray-50 flex justify-between items-center shadow-sm hover:border-blue-100 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-800">{acc.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{acc.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-gray-800 text-sm">₹{acc.balance.toLocaleString()}</p>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Promotional/Info Section */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[32px] p-6 text-white shadow-lg shadow-blue-100">
                <h4 className="text-sm font-black mb-2">CloudCash Pro</h4>
                <p className="text-[10px] leading-relaxed opacity-80 mb-4 font-medium">
                  Upgrade to Pro to unlock multi-currency wallets and zero-fee international transfers.
                </p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
            <SpendingLineChart />
            <ExpensePieChart />
          </div>
        </div>
      </Container>
    </div>
  );
}
