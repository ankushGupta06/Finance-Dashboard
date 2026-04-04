import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import AccountCard from "../components/cards/AccountCard";
import { accounts as initialAccounts } from "../data/accounts";
import { Plus, Settings2, ShieldCheck, RefreshCw } from "lucide-react";

export default function AccountsPage() {
  const [allAccounts, setAllAccounts] = useState(initialAccounts);
  const [isFlipped, setIsFlipped] = useState(false);

  const addTemporaryCard = () => {
    const newCard = {
      id: `acc-${Date.now()}`,
      name: "New Savings Account",
      balance: 0,
      type: "savings",
      number: "**** " + Math.floor(1000 + Math.random() * 9000),
    };
    setAllAccounts([newCard, ...allAccounts]);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />

      <Container>
        <Header />

        <div className="px-4 pb-10">
          {/* Header Section: Responsive flex-col for mobile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
                My Wallets
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Manage your connected bank accounts
              </p>
            </div>

            <button
              onClick={addTemporaryCard}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add New Card
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Primary Method Section: Reduced padding on mobile */}
              <section className="bg-gray-50/50 rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-gray-100">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="text-[10px] md:text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
                    Primary Method
                  </h3>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="p-2.5 bg-white rounded-xl shadow-sm text-blue-600 hover:scale-110 active:scale-95 transition-all"
                  >
                    <RefreshCw
                      size={18}
                      className={`${isFlipped ? "rotate-180" : ""} transition-transform duration-500`}
                    />
                  </button>
                </div>

                {/* --- RESPONSIVE FLIP WRAPPER --- */}
                <div className="perspective-1000 w-full relative">
                  {/* We use a hidden 'Ghost' card here. 
      This invisible card has the exact same padding/structure as your AccountCard.
      It forces the parent container to be the correct height so the buttons 
      below never overlap.
  */}
                  <div className="invisible pointer-events-none mb-6 md:mb-0">
                    <AccountCard account={allAccounts[0]} />
                  </div>

                  {/* The actual animated container now sits absolute over the 'Ghost' card */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden">
                      <AccountCard account={allAccounts[0]} />
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      {allAccounts[1] ? (
                        <AccountCard account={allAccounts[1]} />
                      ) : (
                        <div className="w-full h-full bg-slate-800 rounded-[32px] flex items-center justify-center text-white/30 border-4 border-dashed border-white/5 p-6 text-center">
                          <p className="text-xs font-bold uppercase tracking-widest">
                            No second card available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* The buttons below will now automatically stay below the card regardless of screen size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-10">
                  <div className="bg-white p-5 md:p-6 rounded-3xl flex items-center gap-4 border border-gray-50 shadow-sm">
                    <div className="p-3 bg-green-50 text-green-500 rounded-2xl shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Card Active
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Secured by CloudCash
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 md:p-6 rounded-3xl flex items-center gap-4 border border-gray-100 opacity-80 sm:opacity-60 hover:opacity-100 transition-opacity shadow-sm">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl shrink-0">
                      <Settings2 size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Limits & Settings
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Monthly cap: ₹50,000
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Section: Horizontal scrolling on mobile might be an option, but stacking is cleaner here */}
            <div className="space-y-6">
              <h3 className="text-[10px] md:text-xs font-black text-gray-300 uppercase tracking-[0.2em] px-2">
                Other Accounts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {allAccounts.slice(1).map((acc) => (
                  <div
                    key={acc.id}
                    className="bg-white p-6 rounded-[32px] border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 bg-gray-50 group-hover:bg-blue-50 group-hover:text-blue-500 rounded-xl flex items-center justify-center text-gray-400 transition-colors">
                        <Plus size={20} />
                      </div>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-wider">
                        {acc.type}
                      </span>
                    </div>
                    <p className="font-bold text-gray-800">{acc.name}</p>
                    <p className="text-xl font-black text-gray-900 mt-1">
                      ₹{acc.balance.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
