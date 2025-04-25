import React from "react";
import { IBudget, IExpense, Income } from "@/types/types";
import { updateBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/hooks/useAuthContext";
import FormContent from "../UI/FormContent";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthProviderWrapper from "@/hoc/AuthProviderWrapper";

interface EditBudgetProps {
  sum: number;
}

const EditBudget: React.FC<EditBudgetProps> = ({ sum }) => {
  const { register, handleSubmit, reset } = useForm<Income | IExpense>();

  const { userId } = useAuthContext();

  const queryClient = useQueryClient();

  const updateBudgetMutation = useMutation({
    mutationFn: (budgetdata: IBudget) =>
      updateBudget(
        budgetdata.user_id,
        budgetdata.date,
        budgetdata.income,
        budgetdata.budget
      ),
    onMutate: async (data: IBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });

      const prevBudget = queryClient.getQueryData<IBudget[]>(["budget"]) ?? [];

      const newBudgetValue = sum + data.budget;

      const optimisticBudget: IBudget[] = prevBudget.map((b) => {
        if (
          b.user_id === userId &&
          b.date.mounth === data.date.mounth &&
          b.date.year === data.date.year
        ) {
          return { ...b, budget: newBudgetValue };
        }
        return b;
      });

      queryClient.setQueryData(["budget"], optimisticBudget);
      return { prevBudget };
    },
    onError: (err, newBubget, context) => {
      console.log(err);
      queryClient.setQueryData(["budget"], context?.prevBudget);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const currentdate = currentMonthYear();
    updateBudgetMutation.mutate({
      name: data.name,
      date: currentdate,
      income: [{ incomename: data.incomename, sum: +data.sum }],
      user_id: userId,
      budget: sum,
      _id: data._id,
    });
    reset();
  };

  return (
    <AuthProviderWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col gap-4  items-start"
      >
        <FormContent typeForm="incomename" register={register} />
      </form>
    </AuthProviderWrapper>
  );
};

export default EditBudget;
