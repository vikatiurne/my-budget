"use client";

import Container from "@/components/containers/Container";
import React, { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 50 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    const auth = localStorage.getItem("__budget_isAuth");
    setIsAuth(!!auth);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <AuthForm isAuth={isAuth} />
      </Container>
    </QueryClientProvider>
  );
};

export default AuthPage;
