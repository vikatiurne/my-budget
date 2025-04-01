"use client";
import React, { useEffect, useState } from "react";
import Container from "../containers/Container";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthQuery } from "@/hooks/useAuthQuery";

const Header: React.FC = () => {
  const params = usePathname();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [btnName, setBtnName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const { data } = useAuthQuery(userId);

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("__budget_isAuth");
    if (auth) setUserId(auth);
    setIsAuth(!!auth);
  }, [params, isLogout]);

  useEffect(() => {
    if (!isAuth) {
      setBtnName("Sign Up");
    } else {
      setBtnName(isLogout ? "Sign In" : "Log out");
    }
  }, [isAuth, isLogout]);

  useEffect(() => {
    if (!isAuth) {
      setBtnName("Sign Up");
    } else {
      setBtnName(isLogout ? "Sign In" : "Log out");
    }
  }, [isAuth, isLogout]);

  const handleClick = () => {
    if (isAuth) {
      setIsLogout(true);
      localStorage.removeItem("__budget_isAuth");
      setIsAuth(false);
    } else {
      router.push(btnName === "Sign Up" ? `/signup` : `/signin`);
    }
  };

  return (
    <div className="bg-[#daa520] mb-10">
      <Container style="flex justify-between items-center">
        <Link href={"/"} className="uppercase text-white font-bold">
          My budget
        </Link>
        {isAuth ? (
          <p className="uppercase text-white font-bold">{data?.name}</p>
        ) : null}

        {params === "/" && (
          <button
            onClick={handleClick}
            className="px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50"
          >
            {btnName}
          </button>
        )}
        {params === "/singup" && (
          <p className="uppercase text-white font-bold">Pegistration Form</p>
        )}
        {params === "/singin" && (
          <p className="uppercase text-white font-bold">Login Form</p>
        )}
      </Container>
    </div>
  );
};

export default Header;
