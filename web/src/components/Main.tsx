"use client";
import React, { useEffect, useState } from "react";
import Container from "./containers/Container";
import Budget from "./budget/Budget";

import { useAuthContext } from "@/hooks/useAuthContext";

import { useBudgetQuery } from "@/hooks/useBudgetQuery";

import Expense from "./expenses/Expense";
import FullCostsTravel from "./travel/FullCostsTravel";

const Main = () => {
  const [budgetId, setBudgetId] = useState<string>("");

  const { isAuth } = useAuthContext();
  const queryBudget = useBudgetQuery();

  useEffect(() => {
    if (queryBudget.data) {
      const { _id } = queryBudget.data[0];
      setBudgetId(_id);
    }
  }, [queryBudget.data]);

  return (
    <Container>
      <FullCostsTravel />
      {isAuth && (
        <>
          <Budget />
          {budgetId ? <Expense /> : null}
        </>
      )}
      {/* // : (
      //   <p className="text-center text-2xl font-bold">
      //     Let&apos;s enter or registration to use application
      //   </p>
      // )} */}
    </Container>
  );
};

export default Main;
