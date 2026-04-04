import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import { User, Bell, Shield, Mail, Smartphone, KeyRound } from "lucide-react";

type SettingsTab = "profile" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const settingSections: Array<{
    id: SettingsTab;
    icon: typeof User;
    title: string;
    desc: string;
    color: string;
  }> = [
    {
      id: "profile",
      icon: User,
      title: "Profile Settings",
      desc: "Update your name, email, and avatar",
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      desc: "Manage your alerts and weekly summaries",
      color: "text-amber-500 bg-amber-50",
    },
    {
      id: "security",
      icon: Shield,
      title: "Security & Privacy",
      desc: "Password, 2FA, and session management",
      color: "text-green-500 bg-green-50",
    },
  ];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <Container>
        <Header />
        <div className="px-4 pb-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Settings</h2>
            <p className="text-gray-400 text-sm mt-1">Personalize your cloudcash experience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {settingSections.map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full text-left bg-white p-6 rounded-[32px] border shadow-sm flex items-center justify-between group cursor-pointer transition-all ${
                      isActive
                        ? "border-blue-300 ring-2 ring-blue-100"
                        : "border-gray-50 hover:border-blue-100"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl ${section.color}`}>
                        <section.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{section.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{section.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-500"
                          : "bg-gray-50 text-gray-300 group-hover:text-blue-500"
                      }`}
                    >
                      &rarr;
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm flex flex-col gap-8">
              {activeTab === "profile" && (
                <>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Profile Settings</h4>
                    <p className="text-sm text-gray-400">
                      Update your personal details shown in your account.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                      <input
                        defaultValue="Ankush Gupta"
                        className="mt-2 w-full bg-gray-50 rounded-2xl px-4 py-3 outline-none border border-transparent focus:border-blue-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <div className="mt-2 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          defaultValue="ankush@cloudcash.app"
                          className="w-full bg-gray-50 rounded-2xl pl-10 pr-4 py-3 outline-none border border-transparent focus:border-blue-200"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="self-start px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors">
                    Save Profile
                  </button>
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Notifications</h4>
                    <p className="text-sm text-gray-400">
                      Choose when and how you want to receive updates.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Transaction Alerts</p>
                        <p className="text-xs text-gray-400">Get notified for every credit/debit event</p>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">ON</span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Weekly Summary</p>
                        <p className="text-xs text-gray-400">Receive weekly spending digest by email</p>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">ON</span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Promotional Updates</p>
                        <p className="text-xs text-gray-400">Product offers and new feature announcements</p>
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">OFF</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Security & Privacy</h4>
                    <p className="text-sm text-gray-400">
                      Strengthen account protection with password and 2FA options.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                      <KeyRound className="text-blue-600" size={18} />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Change Password</p>
                        <p className="text-xs text-gray-400">Last changed 21 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                      <Smartphone className="text-green-600" size={18} />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-400">Enabled via mobile OTP</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-red-50 rounded-2xl p-4">
                      <div>
                        <p className="font-bold text-red-700 text-sm">Sign out of all devices</p>
                        <p className="text-xs text-red-400">This will end all active sessions</p>
                      </div>
                      <button className="text-xs font-bold text-red-600 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-100">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
