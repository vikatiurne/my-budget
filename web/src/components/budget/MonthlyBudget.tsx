"use client";
import React, { useEffect, useState } from "react";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import Container from "../containers/Container";
import BudgetInfo from "./BudgetInfo";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { IBudgetUpdate } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const MonthlyBudget: React.FC = () => {
  const [monthlybudgetdata, setMonthlybudgetdata] = useState<
    IBudgetUpdate[] | null
  >(null);

  const queryBudget = useBudgetQuery();

  const { data, error, isPending } = queryBudget;


  useEffect(() => {
    const currentdate = currentMonthYear();
    if (data) {
      const monthlybudjet = data.filter(
        (item) =>
          item.name ===
          `monthly budget:${currentdate.mounth}_${currentdate.year}`
      );
      setMonthlybudgetdata(monthlybudjet);
    }
  }, [data]);

  const {tm}=useAppTranslation()

  if (isPending) {
    return <p className="mb-8 text-center">{tm("loading")}{tm("getBudget")}</p>;
  } else {
    return (
      <Container>
        <div className="border-b-gray-200 border-b-1 mb-6 mt-6">
          <BudgetInfo
            data={monthlybudgetdata ? monthlybudgetdata[0] : null}
            error={error}
          />
        </div>
      </Container>
    );
  }
};

export default MonthlyBudget;
