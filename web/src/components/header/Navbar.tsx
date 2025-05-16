"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { usePathname } from "next/navigation";

interface NavbarProps {
  locale: string;
}

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { tbg } = useAppTranslation();

  const links = [
    { href: `/${locale}`, label: tbg("home") },
    { href: `/${locale}/budgetlist`, label: tbg("budgetList") },
    { href: `/${locale}/budget`, label: tbg("monthlyBudget") },
  ];

  const context = useAuthContext();

  const { isAuth } = context;

  const pathname = usePathname();

  const getLinkClass = (href: string) =>
    pathname === href
      ? "text-[#daa520] font-bold underline"
      : "text-white hover:text-gray-300";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center text-white">
      <div className="">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`hidden md:flex  space-x-4`}>
          {isAuth &&
            links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`py-1 ${getLinkClass(link.href)}`}
              >
                {link.label}
              </a>
            ))}

          <AuthBtn locale={locale} />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-20"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
        >
          <div className="md:hidden bg-teal-700 py-2 px-4 flex flex-col absolute top-1 right-0 h-full">
            <Link
              href={`/${locale}`}
              onClick={() => setIsMenuOpen(false)}
              className="mb-2"
            >
              {tbg("home")}
            </Link>

            {isAuth && (
              <>
                <Link
                  className="mb-2"
                  href={`/${locale}/budgetlist`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tbg("budgetList")}
                </Link>
                <Link
                  className="mb-2"
                  href={`/${locale}/budget`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tbg("monthlyBudget")}
                </Link>
              </>
            )}

            <AuthBtn locale={locale} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
