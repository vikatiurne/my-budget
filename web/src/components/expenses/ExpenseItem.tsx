import { IExpense } from "@/types/types";
import React from "react";

import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";

interface ExpenseItemProps {
  exp: IExpense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ exp }) => {
  return (
    <>
      <p>
        {exp.title} - <span>{exp.price} ₴</span>
      </p>
      <div className="flex gap-4">
        <EditExpense expense={exp} />
        <DeleteExpense expense={exp} />
      </div>
    </>
  );
};

export default ExpenseItem;
