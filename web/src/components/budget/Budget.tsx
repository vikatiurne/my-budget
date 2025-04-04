import React from "react";
import AddBudgetForm from "./AddBudgetForm";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import EditBudget from "./EditBudget";


interface BudgetProps {
  userId: string;
}

const Budget: React.FC<BudgetProps> = ({ userId }) => {
  const query = useBudgetQuery();

  const { data, error, isPending } = query;

  if (isPending) {
    return <p className="mb-8 text-center">Loading...Get budget...</p>;
  } else {
    return (
      <div>
        {data ? (
          <EditBudget userId={userId} sum={data[0].budget} />
        ) : (
          <>
            <p className="mb-8 text-center">{error.response?.data.message}</p>
            <AddBudgetForm userId={userId} />
          </>
        )}
      </div>
    );
  }
};

export default Budget;
