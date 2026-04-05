import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { 
  LayoutDashboard, 
  ListOrdered, 
  CreditCard, 
  Receipt, 
  Target, 
  Settings, 
  Cloud, 
  ChevronLeft, 
  Menu, 
  X,
  TrendingUp
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { role } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: ListOrdered },
    { name: "Cards", path: "/accounts", icon: CreditCard },
    { name: "Invoices", path: "/invoices", icon: Receipt },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Insights", path: "/insights", icon: TrendingUp }, // New Section Added
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobile}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Aside */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          bg-white dark:bg-slate-900 flex flex-col justify-between p-6 border-r border-gray-100 dark:border-slate-700
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "w-24" : "w-72"}
        `}
      >
        <div className="relative">
          {/* Top Section: Logo + Collapse Button */}
          <div className={`flex items-center justify-between mb-12 px-1`}>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-2xl flex-shrink-0">
                <Cloud className="text-white h-5 w-5" />
              </div>
              {!isCollapsed && (
                <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight whitespace-nowrap">
                  zorvyn
                </h1>
              )}
            </div>

            {/* Desktop Collapse Icon (Top Right) */}
            <button 
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center h-8 w-8 text-gray-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <ChevronLeft 
                className={`transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} 
                size={20} 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                    ${isCollapsed ? "justify-center px-0" : ""}
                    ${isActive 
                      ? "bg-blue-600 text-white font-bold" 
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"}
                  `}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-[13px] font-bold tracking-tight whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Premium Promo */}
        <div className="flex flex-col gap-4">
          {role === "viewer" && !isCollapsed ? (
            <div className="bg-amber-400 rounded-[32px] p-6 text-white text-center flex flex-col items-center gap-4 relative overflow-hidden">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <Cloud size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest opacity-80">Premium Account</p>
                <p className="text-[12px] font-medium leading-tight">
                  Give your money awesome space in cloud
                </p>
              </div>
              <button className="bg-white dark:bg-slate-100 text-amber-500 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                Upgrade Now &rarr;
              </button>
            </div>
          ) : role === "viewer" ? (
             <div className="flex justify-center">
                <div className="h-10 w-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 cursor-help">
                  <Cloud size={20} />
                </div>
             </div>
          ) : null}
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={toggleMobile}
          className="lg:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-md z-30 transition-opacity"
        />
      )}
    </>
  );
}
