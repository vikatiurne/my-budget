import { IExpense, Income } from "@/types/types";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormContent from "../UI/FormContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/utils/api";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface AddExpenseFormProps {
  budgetId: string;
  includeField: boolean;
  category: string;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  budgetId,
  includeField,
  category,
}) => {
  const { register, handleSubmit, reset } = useForm<IExpense | Income>();

  const queryClient = useQueryClient();

  const period = defaultDatePeriod();
  const from = new Date(period.start);
  const till = period.end;

  const addExpenseMutation = useMutation({
    mutationFn: (expensedata: IExpense) => createExpense(expensedata),
    onMutate: (expense: IExpense) => {
      queryClient.cancelQueries({
        queryKey: ["expense"],
      });

      const prevExpenses: IExpense[] =
        queryClient.getQueryData(["expense", budgetId, from, till]) ?? [];

      const optimisticExpense: IExpense[] = [
        ...prevExpenses,
        { ...expense, _id: expense.budget_id },
      ];

      queryClient.setQueryData(
        ["expense", budgetId, from, till],
        optimisticExpense
      );

      return { prevExpenses };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(["expense"], context?.prevExpenses);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["expense", budgetId, from, till], data);
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const title = data.title?`${category} (${data.title})`:category
    addExpenseMutation.mutate({
      title: title,
      price: data.price,
      budget_id: budgetId,
      _id: data._id,
    });
    reset();
  };

  const { ti } = useAppTranslation();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col gap-4  items-center"
    >
      <FormContent
        typeForm={ti("expenseSourse")}
        register={register}
        includeField={includeField}
      />
    </form>
  );
};

export default AddExpenseForm;
