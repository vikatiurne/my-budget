import { ErrorResponse, User } from "@/types/types";
import { login, registration } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  userId: string;
  textErr: string;
  auth: (data: User) => void;
  logout: () => void;
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

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("__budget_isAuth");
    setIsAuth(!!id);
    if (id) {
      setUserId(id);
    }
  }, []);

  const authMutation = useMutation({
    mutationFn: (userdata: User) =>
      typeAuth === "signup"
        ? registration(userdata)
        : login(userdata.email, userdata.password),
    onError: (err: AxiosError<ErrorResponse>) => {
      const errPlace = typeAuth === "signup" ? "registration" : "login";
      err.response
        ? setTextErr(`Error ${errPlace}: ${err.response.data.message}`)
        : setTextErr(`Unknown error ${errPlace}`);
    },
    onSuccess: (user) => {
      localStorage.setItem("__budget_isAuth", user._id);
      router.push("/");
    },
  });

  const auth = (userdata: User) => {
    authMutation.mutate(userdata);
  };

  const logout = () => {
    localStorage.removeItem("__budget_isAuth");
    setIsAuth(false);
    setUserId("");
  };

  const value = useMemo(
    () => ({
      isAuth,
      userId,
      textErr,
      auth,
      logout,
    }),
    [isAuth, userId, textErr]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
