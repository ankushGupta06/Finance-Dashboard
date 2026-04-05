import { createContext, useContext, useState } from "react";

type AlertType = "success" | "error" | "info";

type Alert = {
  id: number;
  message: string;
  type: AlertType;
};

const AlertContext = createContext<any>(null);

export const AlertProvider = ({ children }: any) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, type: AlertType = "info") => {
    const id = Date.now();

    setAlerts((prev) => [...prev, { id, message, type }]);

    // auto remove after 3 sec
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}

      {/* 🔔 Toast UI */}
      <div className="fixed top-5 right-5 space-y-4 z-[999]">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            style={{ animationDelay: `${index * 80}ms` }}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.1)]
            backdrop-blur-md transition-all duration-300 ease-out animate-in-smooth
            ${
              alert.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : alert.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {/* ICON */}
            <span className="text-lg">
              {alert.type === "success" }
              {alert.type === "error" }
              {alert.type === "info" }
            </span>

            {/* MESSAGE */}
            <span>{alert.message}</span>

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
              }
              className="ml-auto text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);