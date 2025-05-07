"use client";
import React, { useState } from "react";
import Container from "./containers/Container";
import { useAuthContext } from "@/hooks/useAuthContext";
import FullCostsTravel from "./travel/FullCostsTravel";
import Link from "next/link";
import BudgetsList from "./budget/BudgetsList";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const Main = () => {
  const [showCalculate, setShowCalculate] = useState<boolean>(true);
  const [showBudgetList, setShowBudgetList] = useState<boolean>(true);

  const { isAuth } = useAuthContext();

  const {tb} = useAppTranslation()

  return (
    <Container>
      <div className="max-w-[49rem] mx-auto mb-6 grid grid-rows-2 gap-4 grid-cols-2">
        <button
          className="col-span-2 px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50 text-[#856a25] dark:text-black"
          onClick={() => setShowCalculate((prev) => !prev)}
        >
          {!showCalculate ? tb("show") : tb("hide")} {tb("budgetCalculation")}
        </button>
        {isAuth && (
          <>
            <button
              onClick={() => setShowBudgetList((prev) => !prev)}
              className="px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50 text-[#856a25] dark:text-black"
            >
              {tb("budgetsList")}
            </button>
            <Link
              href={`/budget`}
              className="px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50 text-[#856a25] dark:text-black"
            >
              {tb("monthlyBudget")}
            </Link>
          </>
        )}
      </div>
      {showBudgetList && isAuth && <BudgetsList />}
      {showCalculate && <FullCostsTravel />}
    </Container>
  );
};

export default Main;
