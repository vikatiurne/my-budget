import React from "react";
import AddBudgetForm from "./AddBudgetForm";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import EditBudget from "./EditBudget";
import IncomesList from "./IncomesList";

const Budget: React.FC = () => {
  const queryBudget = useBudgetQuery();

  const { data, error, isPending } = queryBudget;

  if (isPending) {
    return <p className="mb-8 text-center">Loading...Get budget...</p>;
  } else {
    return (
      <div className="border-b-gray-200 border-b-1 mb-6 mt-6">
        {data && !error?.response ? (
          <div>
            <h4 className="mb-4 text-2xl">
              Mounthly Budget: {data[0].budget} ₴
            </h4>
            <IncomesList />
            <EditBudget sum={data[0].budget} />
          </div>
        ) : (
          <>
            <p className="mb-8 text-center">{error.response?.data.message}</p>
            <AddBudgetForm />
          </>
        )}
      </div>
    );
  }
};

export default Budget;
