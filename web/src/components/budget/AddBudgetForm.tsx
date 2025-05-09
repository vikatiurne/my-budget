"use client";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { IBudget } from "@/types/types";
import { createBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddBudgetForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IBudget>();

  const { userId } = useAuthContext();

  const queryClient = useQueryClient();

  const budgetMutation = useMutation({
    mutationFn: (budgetdata: IBudget) => createBudget(budgetdata),
    onMutate: async (data: IBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });
      const prevBudget: IBudget[] = queryClient.getQueryData(["budget"]) ?? [];
      const optimisticBudget: IBudget[] = [
        ...prevBudget,
        {
          name: data.name,
          budget: data.budget,
          user_id: userId,
          date: currentMonthYear(),
        },
      ];
      queryClient.setQueryData(["budget"], optimisticBudget);
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
      name: `monthly budget:${date.mounth}_${date.year}`,
      budget: data.budget,
      date: date,
      user_id: userId,
    });
  };

  const { tbg,tm,ti,tb } = useAppTranslation();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col md:flex-row gap-6 justify-center items-center"
    >
      <div className="flex gap-6 items-end">
        <label className="underline" htmlFor="budget">
          {tbg("monthlyBudget")}
        </label>
        <input
          className="flex-1 w-full block p-2 border-gray-300 outline-none rounded shadow-sm"
          {...register("budget", { required: tm("required") })}
          type="number"
          name="budget"
          placeholder={ti("sum")}
        />
      </div>
      <button
        className="py-2.5 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        type="submit"
      >
        {tb("apply")}
      </button>
    </form>
  );
};

export default AddBudgetForm;
