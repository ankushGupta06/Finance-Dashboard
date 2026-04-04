import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import { User, Bell, Shield, Globe, Moon } from "lucide-react";

export default function SettingsPage() {
  const settingSections = [
    { icon: User, title: "Profile Settings", desc: "Update your name, email, and avatar", color: "text-blue-500 bg-blue-50" },
    { icon: Bell, title: "Notifications", desc: "Manage your alerts and weekly summaries", color: "text-amber-500 bg-amber-50" },
    { icon: Shield, title: "Security & Privacy", desc: "Password, 2FA, and session management", color: "text-green-500 bg-green-50" },
    { icon: Globe, title: "Region & Currency", desc: "Set your local timezone and currency", color: "text-purple-500 bg-purple-50" },
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
            {/* Setting Options List */}
            <div className="space-y-4">
              {settingSections.map((section) => (
                <div key={section.title} className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-100 transition-all">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl ${section.color}`}>
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{section.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-blue-500 transition-colors">
                    &rarr;
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Setting: Appearance */}
            <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Moon className="text-blue-500" size={20} />
                  <h4 className="font-bold text-gray-800">Appearance</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Switch between light and dark modes, or let the app sync with your system settings for the best viewing experience.
                </p>
              </div>

              <div className="flex gap-4 mt-10">
                <button className="flex-1 py-4 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold text-xs">Light Mode</button>
                <button className="flex-1 py-4 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold text-xs hover:bg-gray-50 transition-colors">Dark Mode</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}