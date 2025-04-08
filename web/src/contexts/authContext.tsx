"use client";
import { ErrorResponse, User } from "@/types/types";
import { login, registration } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  userId: string;
  textErr: string;
  isLogout: boolean;
  auth: (data: User) => Promise<void>;
  logout: () => void;
  setErr: (err: string) => void;
}

interface AuthProvirerProps {
  children: React.ReactNode;
  typeAuth: "signin" | "signup";
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvirer: React.FC<AuthProvirerProps> = ({
  children,
  typeAuth,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [textErr, setTextErr] = useState<string>("");
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const router = useRouter();
  const params = usePathname();

  useEffect(() => {
    if (!isLogout) {
      const id = localStorage.getItem("__budget_isAuth");
      if (id) {
        setIsAuth(true);
        setUserId(id);
      } else {
        setIsAuth(false);
        setUserId("");
      }
    } else {
      setIsAuth(false);
      setUserId("");
    }
  }, [params, isLogout]);

  const authMutation = useMutation({
    mutationFn: async (userdata: User) =>
      typeAuth === "signup"
        ? await registration(userdata)
        : await login(userdata.email, userdata.password),
    onError: (err: AxiosError<ErrorResponse>) => {
      const errPlace = typeAuth === "signup" ? "registration" : "login";
      return err.response
        ? setTextErr(`Error ${errPlace}: ${err.response.data.message}`)
        : setTextErr(`Unknown error ${errPlace}`);
    },
    onSuccess: (user) => {
      localStorage.setItem("__budget_isAuth", user._id);
      setIsAuth(true);
      setIsLogout(false);
      router.push("/");
    },
  });

  const auth = async (userdata: User) => {
    await authMutation.mutateAsync(userdata);
  };

  const logout = () => {
    setIsLogout(true);
    localStorage.removeItem("__budget_isAuth");
  };

  const setErr = (err: string) => setTextErr(err);

  const value = useMemo(
    () => ({
      isAuth,
      userId,
      textErr,
      isLogout,
      auth,
      logout,
      setErr,
    }),
    [isAuth, userId, textErr]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
