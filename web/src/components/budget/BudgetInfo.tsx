import { ErrorResponse, IBudget } from "@/types/types";
import { AxiosError } from "axios";
import React, { useState } from "react";
import EditBudget from "./EditBudget";
import IncomesList from "./IncomesList";
import AddBudgetForm from "./AddBudgetForm";


interface BudgetInfoProps {
  data: IBudget[];
  error: AxiosError<ErrorResponse> | null;
}

const BudgetInfo: React.FC<BudgetInfoProps> = ({ data, error }) => {
  const [showExpenses, setShowExpenses] = useState<boolean>(true);

  return data && !error ? (
    <>
      <div>
        <h4 className="mb-4 text-2xl text-center">
          Mounthly Budget: {data[0].budget} ₴
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
          <EditBudget sum={data[0].budget} />
          <IncomesList />
        </>
      ) : (
        <p>пусто</p>
      )}
    </>
  ) : (
    <>
      <p className="mb-8 text-center">{error?.response?.data?.message}</p>
      <AddBudgetForm />
    </>
  );
};

export default BudgetInfo;
