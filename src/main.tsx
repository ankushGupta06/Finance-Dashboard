import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoleProvider } from "./context/RoleContext";
import { AlertProvider } from "./context/AlertContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css"; // <--- ADD THIS LINE!

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* You only need RoleProvider once, so I've kept it here and removed it from App.tsx */}
    <ThemeProvider>
      <AlertProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
