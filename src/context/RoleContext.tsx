import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";

type Role = "admin" | "viewer";

const STORAGE_KEY = "zorvyn-role";
const RoleContext = createContext<any>(null);

export const RoleProvider = ({ children }: any) => {
  const [role, _setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEY);

    return savedRole === "admin" || savedRole === "viewer"
      ? savedRole
      : "admin";
  });
  const { addAlert } = useAlert();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, role);
  }, [role]);

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
