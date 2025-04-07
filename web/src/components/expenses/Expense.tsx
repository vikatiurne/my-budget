import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpensesList from "./ExpensesList";

const Expense = () => {
  const [budgetId, setBudgetId] = useState<string>("");

  const { data } = useBudgetQuery();

  useEffect(() => {
    if (data) {
      setBudgetId(data[0]._id);
    }
  }, [data]);

  return (
    <div>
      <AddExpenseForm budgetId={budgetId} />
      <ExpensesList/>
    </div>
  );
};

export default Expense;
