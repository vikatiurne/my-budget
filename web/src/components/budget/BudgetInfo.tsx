import { ErrorResponse, IBudgetUpdate } from "@/types/types";
import { AxiosError } from "axios";
import React, { useState } from "react";

import IncomesList from "../incomes/IncomesList";
import AddBudgetForm from "./AddBudgetForm";
import AddIncome from "../incomes/AddIncome";

interface BudgetInfoProps {
  data: IBudgetUpdate | null;
  error: AxiosError<ErrorResponse> | null;
}

const BudgetInfo: React.FC<BudgetInfoProps> = ({ data, error }) => {
  const [showExpenses, setShowExpenses] = useState<boolean>(true);

  if (error) {
    return (
      <>
        <p className="mb-8 text-center">{error?.response?.data?.message}</p>
        <AddBudgetForm />
      </>
    );
  }
  if (data) {
    return (
      <>
        <div>
          <h4 className="mb-4 text-2xl text-center">
            Mounthly Budget: {data.budget} ₴
          </h4>
          <div className="mb-6 flex justify-around items-center gap-4">
            <button
              onClick={() => setShowExpenses(false)}
              className={`py-1 px-6 rounded-b-md uppercase bg-[#856a25] text-amber-50 hover:bg-[#88784f] cursor-pointer ${
                !showExpenses && "underline"
              }`}
            >
              Incomes
            </button>
            <button
              onClick={() => setShowExpenses(true)}
              className={`py-1 px-4 rounded-b-md uppercase bg-[#d1ab4b] text-amber-50 hover:bg-[#88784f] cursor-pointer ${
                showExpenses && "underline"
              }`}
            >
              Expenses
            </button>
          </div>
        </div>
        {!showExpenses ? (
          <>
            <AddIncome sum={data.budget} budgetData={data} />
            <IncomesList budgetData={data} />
          </>
        ) : (
          <p>пусто</p>
        )}
      </>
    );
  }
};

export default BudgetInfo;
