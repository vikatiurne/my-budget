"use client"
import { useAllBudgetQuery } from "@/hooks/useAllBudgetsQuery";
import React from "react";
import remove from "../../../public/images/remove.svg";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "@/utils/api";
import { IBudgetUpdate } from "@/types/types";
import { useRouter } from "next/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const BudgetsList = () => {
  const query = useAllBudgetQuery();

  const { data, isPending } = query;

  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteBudgetMutation = useMutation({
    mutationFn: (id: string) => deleteBudget(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const prevBudget =
        queryClient.getQueryData<IBudgetUpdate[]>(["budgets"]) ?? [];
      const optimisticBudget = prevBudget.filter((item) => item._id !== id);

      queryClient.setQueryData(["budgets"], optimisticBudget);
      return { prevBudget };
    },
    onError: (err, newBubget, context) => {
      queryClient.setQueryData(["budgets"], context?.prevBudget);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const handleDelete = (budgetId: string) => {
    deleteBudgetMutation.mutate(budgetId);
  };

   const {tm,tbg} = useAppTranslation()

  if (isPending) {
    return <p className="mb-8 text-center">{tm("loading")}{tm("getBudgetList")}</p>;
  } else {
    return (
      <ul className="mb-4 col-start-2 list-disc text-center">
        <h6 className="mb-2 text-xl font-bold underline">{tbg("budgetList")}</h6>
        {data?.map((item) => (
          <button
            onClick={() => router.push(`/budget/${item._id}`)}
            key={item._id}
            className="text-center"
          >
            <li className="w-[21rem] sm:w-[35rem] mx-auto pl-4 flex items-center justify-between  p-2 bordeb-b-gray-100  hover:bg-[#d5e2df] hover:rounded cursor-pointer">
              <div className="flex gap-2">
                <p className="list-item">{item.name}</p>
                <p>-</p>
                <p>{item.budget} ₴</p>
              </div>
              <Image
                src={remove}
                alt="bin"
                className="pl-4 w-8 transition-transform duration-200 transform hover:scale-125 hover:translate hover:translate "
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
              />
            </li>
          </button>
        ))}
      </ul>
    );
  }
};

export default BudgetsList;
