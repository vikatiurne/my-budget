"use client";

import { Budget } from "@/types/types";
import { createBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface AddBudgetFormProps {
  userId: string;
}

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({ userId }) => {
  const { register, handleSubmit } = useForm<Budget>();

  const queryClient = useQueryClient();

  const budgetMutation = useMutation({
    mutationFn: (budgetdata: Budget) => createBudget(budgetdata),
    onMutate: async (data: Budget) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });
      const prevBudget: Budget[] = queryClient.getQueryData(["budget"]) ?? [];
      const optimisticBudget: Budget[] = [
        ...prevBudget,
        {
          budget: data.budget,
          user_id: userId,
          date: currentMonthYear(),
          income: data.income,
        },
      ];
      queryClient.setQueryData(["bidget"], optimisticBudget);
      return { prevBudget };
    },
    onError: (err, newBudget, context) => {
      queryClient.setQueryData(["budget"], context?.prevBudget);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const date = currentMonthYear();
    budgetMutation.mutate({
      budget: data.budget,
      date: date,
      user_id: userId,
      income: [{ incomename: "", sum: 0 }],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-6 justify-center items-end"
    >
      <div className="flex gap-6 items-end">
        <label className="underline" htmlFor="budget">
          Mounthly Budget:
        </label>
        <input
          className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm "
          {...register("budget", { required: "this field is required" })}
          type="number"
          name="budget"
          placeholder="type a sum..."
        />
      </div>
      <button
        className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
};

export default AddBudgetForm;
