"use client"
import React from "react";
import { IBudgetUpdate, IExpense, Income } from "@/types/types";
import { createIncome, updateBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/hooks/useAuthContext";
import FormContent from "../UI/FormContent";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthProviderWrapper from "@/hoc/AuthProviderWrapper";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface AddIncomeProps {
  sum: number;
  budgetData: IBudgetUpdate;
}

const AddIncome: React.FC<AddIncomeProps> = ({ sum, budgetData }) => {
  const { register, handleSubmit, reset } = useForm<Income | IExpense>();
  const { userId } = useAuthContext();
  const queryClient = useQueryClient();

  const createIncomeMutation = useMutation({
    mutationFn: (incomedata: Income) => createIncome(incomedata),
    onMutate: async (data: Income) => {
      await queryClient.cancelQueries({ queryKey: ["income"] });
      const prevIncome = queryClient.getQueryData<Income[]>(["income"]) ?? [];
      const optimisticIncome: Income[] = [
        ...prevIncome,
        { title: data.title, price: data.price, budget_id: budgetData._id },
      ];
      queryClient.setQueryData(["income"], optimisticIncome);
      return { prevIncome };
    },
    onError: (err, newBubget, context) => {
      queryClient.setQueryData(["income"], context?.prevIncome);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["income"] });
    },
  });

  const updateBudgetMutation = useMutation({
    mutationFn: (budgetdata: IBudgetUpdate) =>
      updateBudget(budgetdata._id, budgetdata.incomesum),
    onMutate: async (data: IBudgetUpdate) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });
      const prevBudget =
        queryClient.getQueryData<IBudgetUpdate>(["budget"]) ??
        ({} as IBudgetUpdate);

      const newBudgetValue = sum + +data.incomesum;
      prevBudget.budget = newBudgetValue;

      queryClient.setQueryData(["budget"], prevBudget);
      return { prevBudget };
    },
    onError: (err, newBubget, context) => {
      queryClient.setQueryData(["budget"], context?.prevBudget);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Partial<Income>
  ) => {
    const currentdate = currentMonthYear();

    await updateBudgetMutation.mutateAsync({
      name: budgetData.name,
      date: currentdate,
      user_id: userId,
      budget: sum,
      incomesum: data.price ?? 0,
      _id: budgetData._id,
    });

    await createIncomeMutation.mutateAsync({
      title: data.title ?? "",
      price: data.price ?? 0,
      budget_id: budgetData._id,
    });

    reset();
  };

    const {ti} = useAppTranslation()

  return (
    <AuthProviderWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col gap-4 items-start"
      >
        <FormContent typeForm={ti("incomesSourse")} register={register} />
      </form>
    </AuthProviderWrapper>
  );
};

export default AddIncome;
