"use client";

import { AuthProvirer } from "@/contexts/authContext";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthProviderWrapperProps {
  children: React.ReactNode;
}

const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({
  children,
}) => {
  const [path, setPath] = useState<"signup" | "signin">("signup");

  const params = usePathname();

  useEffect(() => {
    const pathName = params.replace("/", "") as "signup" | "signin";
    if (pathName === "signup" || pathName === "signin") setPath(pathName);
  }, [params]);

  return <AuthProvirer typeAuth={path}>{children}</AuthProvirer>;
};

export default AuthProviderWrapper;
