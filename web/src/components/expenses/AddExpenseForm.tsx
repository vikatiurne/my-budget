import { IExpense, Income } from "@/types/types";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormContent from "../UI/FormContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/utils/api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";

interface AddExpenseFormProps {
  budgetId: string;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgetId }) => {
  const { register, handleSubmit, reset } = useForm<IExpense | Income>();

  const queryClient = useQueryClient();

  const period = defaultDatePeriod();
  const from = new Date(period.start);
  const till = period.end;

  const { userId } = useAuthContext();

  const addExpenseMutation = useMutation({
    mutationFn: (expensedata: IExpense) => createExpense(expensedata),
    onMutate: (expense: IExpense) => {
      queryClient.cancelQueries({
        queryKey: ["expense"],
      });

      const prevExpenses: IExpense[] =
        queryClient.getQueryData(["expense", userId, budgetId, from, till]) ??
        [];

      const optimisticExpense: IExpense[] = [
        ...prevExpenses,
        { ...expense, _id: expense.budget_id },
      ];

      queryClient.setQueryData(
        ["expense", userId, budgetId, from, till],
        optimisticExpense
      );

      return { prevExpenses };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(["expense"], context?.prevExpenses);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["expense", userId, budgetId, from, till], data);
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    addExpenseMutation.mutate({
      title: data.title,
      price: data.price,
      budget_id: budgetId,
      user_id: userId,
      _id: data._id,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col gap-4  items-center"
    >
      <FormContent typeForm="expense" register={register} />
    </form>
  );
};

export default AddExpenseForm;
