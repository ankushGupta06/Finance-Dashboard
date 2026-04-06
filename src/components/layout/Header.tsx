import { useState } from "react";
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
import { notifications } from "../../data/notifications";
import { user } from "../../data/users";

export default function Header() {
  const { role, setRole } = useRole();
  const { theme, toggleTheme } = useTheme();

  // Track the two interactive popovers in the header.
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="mb-6 px-1 sm:px-2 md:px-4 animate-in fade-in slide-in-from-top duration-500">
      <div
        className={`flex flex-col gap-4 rounded-[28px] px-4 py-4 sm:px-5 sm:py-5 ${
          theme === "dark"
            ? "border border-slate-800 bg-slate-900 backdrop-blur-none"
            : "border border-gray-100 bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title block */}
          <div className="min-w-0">
            <h2 className="text-xl font-black leading-tight tracking-tight text-gray-800 dark:text-white sm:text-2xl md:text-3xl">
              Financial Dashboard
            </h2>
            <p className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500 sm:text-sm">
              Your financial activity at a glance.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end">
            {/* Global quick actions */}
            <div className="flex items-center justify-between gap-2 text-gray-400 sm:justify-start sm:gap-3 md:gap-4">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400">
                  <Mail size={18} />
                  <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 scale-0 rounded-full bg-blue-500 transition-transform group-hover:scale-100"></span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <Bell size={18} />
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900 group-hover:animate-ping"></span>
                  </button>

                  {/* Notifications panel */}
                  {isNotificationsOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsNotificationsOpen(false)}
                      ></div>
                      <div className="absolute right-0 top-full z-20 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-gray-100 bg-white p-3 shadow-xl animate-in zoom-in-95 duration-200 dark:border-slate-700 dark:bg-slate-800 sm:w-80">
                        <div className="mb-3 px-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
                            Notifications
                          </p>
                        </div>

                        <div className="space-y-2">
                          {/* Render notification items from the local dataset. */}
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`rounded-2xl border p-3 transition-colors ${
                                notification.unread
                                  ? "border-blue-100 bg-white shadow-sm dark:border-blue-900/70 dark:bg-slate-900"
                                  : "border-gray-100 bg-gray-100/70 dark:border-slate-700 dark:bg-slate-700/60"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-black text-gray-800 dark:text-white">
                                      {notification.title}
                                    </p>
                                    {notification.unread && (
                                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                                    )}
                                  </div>
                                  <p className="mt-1 text-[11px] leading-relaxed text-gray-500 dark:text-gray-300">
                                    {notification.message}
                                  </p>
                                </div>
                                <span className="shrink-0 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              {/* Profile and role switcher */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-1.5 pr-3 transition-all sm:w-auto sm:pr-4 ${
                  isProfileOpen
                    ? "bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900 shadow-md"
                    : "bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-sm dark:border-slate-700">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.avatarName)}&background=3B82F6&color=fff&bold=true`}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate text-xs font-black leading-none text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${role === "admin" ? "bg-green-500" : "bg-blue-500"}`}
                      ></span>
                      <p className="truncate text-[10px] font-bold capitalize text-gray-400">
                        {role} Account
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  className={`shrink-0 text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Profile menu */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 z-20 mt-3 w-full rounded-2xl border border-gray-100 bg-white p-2 shadow-xl animate-in zoom-in-95 duration-200 dark:border-slate-700 dark:bg-slate-800 sm:w-56">
                    <div className="mb-2 px-3 py-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
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

                    {/* Destructive account action */}
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
      </div>
    </div>
  );
}
