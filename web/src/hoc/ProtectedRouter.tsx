"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return isAuth ? null : children;
};

export default ProtectedRouter;
