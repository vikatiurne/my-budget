import { useAllBudgetQuery } from "@/hooks/useAllBudgetsQuery";
import Link from "next/link";
import React from "react";

const BudgetsList = () => {
  const query = useAllBudgetQuery();

  const { data, isPending } = query;

  if (isPending) {
    return <p className="mb-8 text-center">Loading...Get budgets list...</p>;
  } else {
    return (
      <ul className="mb-4 col-start-2 list-disc ">
        {data?.map((item) => (
          <Link href={`/budget/${item._id}`} key={item._id}>
            <li className="w-[49rem] mx-auto pl-4 flex items-center gap-2  p-2 bordeb-b-gray-100 hover:bg-gray-100 cursor-pointer">
              <p className="list-item">{item.name}</p>
              <p>-</p>
              <p>{item.budget} ₴</p>
            </li>
          </Link>
        ))}
      </ul>
    );
  }
};

export default BudgetsList;
