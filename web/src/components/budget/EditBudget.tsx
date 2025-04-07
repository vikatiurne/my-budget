import React from "react";
import { Budget, IExpense, Income } from "@/types/types";
import { updateBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "@/hooks/useAuthContext";
import FormContent from "../UI/FormContent";


interface EditBudgetProps {
  sum: number;
}

const EditBudget: React.FC<EditBudgetProps> = ({ sum }) => {
  const { register, handleSubmit, reset } = useForm<Income | IExpense>();

  const { userId } = useAuthContext();

  const queryClient = useQueryClient();

  const updateBudgetMutation = useMutation({
    mutationFn: (budgetdata: Budget) =>
      updateBudget(
        budgetdata.user_id,
        budgetdata.date,
        budgetdata.income,
        budgetdata.budget
      ),
    onMutate: async (data: Budget) => {
      await queryClient.cancelQueries({ queryKey: ["budget"] });

      const prevBudget = queryClient.getQueryData<Budget[]>(["budget"]) ?? [];

      const newBudgetValue = sum + data.budget;

      const optimisticBudget: Budget[] = prevBudget.map((b) => {
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
      date: currentdate,
      income: [{ incomename: data.incomename, sum: +data.sum }],
      user_id: userId,
      budget: sum,
      _id: data._id,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 flex flex-col gap-4  items-start"
    >
      <FormContent typeForm="incomename" register={register} />
    </form>
  );
};

export default EditBudget;
