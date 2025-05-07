"use client"
import { useQueryBudgetById } from "@/hooks/useQueryBudgetById";
import React from "react";
import Container from "../containers/Container";
import BudgetInfo from "./BudgetInfo";

interface BudgetIdProps {
  budgetId: string;
}

const BudgetId: React.FC<BudgetIdProps> = ({ budgetId }) => {
  const queryBudget = useQueryBudgetById(budgetId);

  const { data, error, isPending } = queryBudget;


  if (isPending) {
    return <p className="mb-8 text-center">Loading...Get budget...</p>;
  } else {
    return (
      <Container>
        <div className="border-b-gray-200 dark:border-b-gray-50 border-b-1 mb-6 mt-6">
          {data && <BudgetInfo data={data} error={error} />}
        </div>
      </Container>
    );
  }
};

export default BudgetId;
