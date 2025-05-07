"use client";
import React, { useEffect, useState } from "react";
import Container from "../containers/Container";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const Header = ({ locale }: { locale: string }) => {
  const params = usePathname();

  const context = useAuthContext();

  const { isAuth, isLogout, userId, logout } = context;

  const [btnName, setBtnName] = useState<string>("");
  const [btn, setBtn] = useState<string>("signUp");

  const { data } = useAuthQuery(userId);

  const router = useRouter();


  const {tb,th} = useAppTranslation()
 

  useEffect(() => {
    if (!isAuth) {
      setBtnName(tb("signUp"));
    } else {
      setBtnName(isLogout ? tb("signIn") : tb("logout"));
    }
  }, [isAuth, isLogout]);

  useEffect(() => {
    if (!isAuth) {
      setBtnName(tb("signUp"));
      setBtn("signUp")
    } else {
      setBtnName(isLogout ? tb("signIn") : tb("logout"));
      setBtn(isLogout ? "signIn":"logout");
    }
  }, [isAuth, isLogout]);

  const handleClick = () => {
    if (isAuth) {
      logout();
    } else {
      router.push(btnName === tb("signUp") ? "/signup" : "/signin");
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = params.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <div className="bg-[#daa520] mb-4 md:mb-10">
      <Container style="flex justify-between items-center">
        <Link href={`/${locale}`} className="uppercase text-white font-bold">
          {th("myBudget")}
        </Link>
        {isAuth ? (
          <p className="uppercase text-white font-bold">{data?.name}</p>
        ) : null}

        {params === `/${locale}` && (
          <button
            onClick={handleClick}
            className="px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50 text-[#856a25] dark:text-black"
          >
            {tb(`${btn}`)}
          </button>
        )}
        {params === `/${locale}/signup` && (
          <p className="uppercase text-white font-bold">{th("registration")}</p>
        )}
        {params === `/${locale}/signin` && (
          <p className="uppercase text-white font-bold">{th("login")}</p>
        )}
        <select
          value={locale}
          onChange={handleLanguageChange}
          className="rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none"
        >
          <option value="en">En</option>
          <option value="uk">Uk</option>
        </select>
      </Container>
    </div>
  );
};

export default Header;
