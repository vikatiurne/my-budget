"use client";
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex gap-6 justify-center items-end"
    >
      <div className="flex gap-6 items-end">
        <label className="underline" htmlFor="budget">
          Mounthly Budget:
        </label>
        <input
          className="flex-1 w-full block p-2 border-gray-300 outline-none rounded shadow-sm dark:shadow-amber-50"
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
