"use client";
import React, { useState } from "react";
import Container from "../containers/Container";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import budget from "../../../public/images/budgetlogo.png";
import LanguageSwitcher from "../header/LanguageSwitcher";
import Navbar from "../header/Navbar";

const Header = ({ locale }: { locale: string }) => {
  const params = usePathname();

  const [language, setLanguage] = useState<string>(locale);

  const handleLanguageChange = (newLanguage: "en" | "uk") => {
    if (language !== newLanguage) {
      setLanguage(newLanguage);
      const pathParts = params.split("/");
      const pathWithoutLocale = pathParts.slice(2).join("/");
      router.push(`/${newLanguage}/${pathWithoutLocale}`);
    }
  };

  const router = useRouter();

  return (
    <div className="bg-teal-800 mb-2 md:mb-10">
      <Container style="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href={`/${locale}`} className="uppercase text-white font-bold">
            <Image
              src={budget}
              alt="budgetlogo"
              className="w-10 cursor-pointer"
              title="home"
            />
          </Link>
          <LanguageSwitcher onchange={handleLanguageChange} locale={locale} />
        </div>
        <Navbar locale={locale} />
      </Container>
    </div>
  );
};

export default Header;
