"use client";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuthContext } from "@/hooks/useAuthContext";
import useWindowSize from "@/hooks/useWindowSize";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthBtnProps {
  locale: string;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ locale }) => {
  const [btnName, setBtnName] = useState<string>("");
  const [btn, setBtn] = useState<string>("signUp");

  const windowSize = useWindowSize();

  const params = usePathname();

  const router = useRouter();

  const context = useAuthContext();

  const { isAuth, isLogout, logout } = context;

  const { tb, th } = useAppTranslation();
  useEffect(() => {
    if (
      windowSize &&
      windowSize.width <= 768 &&
      params === `/${locale}/signup`
    ) {
      setBtnName(tb("signIn"));
      setBtn("signIn");
    } else if (!isAuth) {
      setBtnName(tb("signUp"));
      setBtn("signUp");
    } else {
      setBtnName(isLogout ? tb("signIn") : tb("logout"));
      setBtn(isLogout ? "signIn" : "logout");
    }
  }, [isAuth, isLogout, windowSize, params, locale, tb]);

  const handleClick = () => {
    if (isAuth) {
      logout();
    } else {
      router.push(btnName === tb("signUp") ? "/signup" : "/signin");
    }
  };

  if (
    windowSize.width <= 768 ||
    (params !== `/${locale}/signup` && params !== `/${locale}/signin`)
  ) {
    return (
      <button
        onClick={handleClick}
        className="text-left md:mt-0 mt-6 text-amber-100 md:px-4 md:py-1 md:border-amber-50 md:rounded md:shadow md:bg-amber-50 cursor-pointer md:hover:bg-amber-100 md:active:bg-amber-50 md:text-[#856a25]"
      >
        {tb(`${btn}`)}
      </button>
    );
  }
  return (
    <>
      {windowSize.width > 768 && params === `/${locale}/signup` && (
        <p className="uppercase text-white font-bold">{th("registration")}</p>
      )}
      {windowSize.width > 768 && params === `/${locale}/signin` && (
        <p className="uppercase text-white font-bold">{th("login")}</p>
      )}
    </>
  );
};

export default AuthBtn;
