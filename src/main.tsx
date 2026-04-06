import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoleProvider } from "./context/RoleContext";
import { AlertProvider } from "./context/AlertContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <RoleProvider>
          <TransactionsProvider>
            <App />
          </TransactionsProvider>
        </RoleProvider>
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
