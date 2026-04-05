import { createContext, useContext, useState } from "react";
import { useAlert } from "./AlertContext";

type Role = "admin" | "viewer";

const RoleContext = createContext<any>(null);

export const RoleProvider = ({ children }: any) => {
  const [role, _setRole] = useState<Role>("admin");
  const { addAlert } = useAlert();

  // ✅ Override setRole
  const setRole = (newRole: Role) => {
    _setRole(newRole);

    addAlert(
      `Switched to ${
        newRole === "admin" ? "Admin" : "Viewer"
      } mode`,
      "info"
    );
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
};