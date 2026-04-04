import { useState, useEffect } from "react";
import { useRole } from "../../context/RoleContext";
import {
  Mail,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { role, setRole } = useRole();
  const { theme, toggleTheme } = useTheme(); // ✅ global theme

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 px-4 gap-6 animate-in fade-in slide-in-from-top duration-500">
      {/* --- Title Section --- */}
      <div className="w-full lg:w-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white tracking-tight">
          Weekly sumup
        </h2>
        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">
          Get summary of your weekly online transactions here.
        </p>
      </div>

      {/* --- Controls & Profile Container --- */}
      <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 md:gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications & Action Icons */}
        <div className="flex items-center gap-2 text-gray-400">
          <button className="p-2.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
            <Mail size={20} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          </button>
          <button className="relative p-2.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 group-hover:animate-ping"></span>
          </button>
        </div>

        {/* --- Custom Enhanced User Dropdown --- */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all border ${
              isProfileOpen
                ? "bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900 shadow-md"
                : "bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
              <img
                src={`https://ui-avatars.com/api/?name=Ankush+Gupta&background=3B82F6&color=fff&bold=true`}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-gray-800 dark:text-white leading-none">
                Ankush Gupta
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${role === "admin" ? "bg-green-500" : "bg-blue-500"}`}
                ></span>
                <p className="text-[10px] text-gray-400 font-bold capitalize">
                  {role} Account
                </p>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-xl z-20 p-2 animate-in zoom-in-95 duration-200">
                <div className="px-3 py-2 mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Switch Role
                  </p>
                </div>

                <button
                  onClick={() => {
                    setRole("viewer");
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${role === "viewer" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"}`}
                >
                  <User size={16} />
                  Viewer Mode
                </button>

                <button
                  onClick={() => {
                    setRole("admin");
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${role === "admin" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"}`}
                >
                  <ShieldCheck size={16} />
                  Admin Mode
                </button>

                <div className="h-px bg-gray-100 dark:bg-slate-700 my-2 mx-2"></div>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
