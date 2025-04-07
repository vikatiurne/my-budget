import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used with AuthProvider");
  }
  return context;
};
