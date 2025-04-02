import { Budget,  Income } from "@/types/types";
import { updateBudget } from "@/utils/api";
import { currentMonthYear } from "@/utils/currentMonthYear";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface EditBudgetProps {
  userId: string;
  sum: number;
}

const EditBudget: React.FC<EditBudgetProps> = ({ userId, sum }) => {
  console.log(+sum)
  const { register, handleSubmit, reset } = useForm<Income>();

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
    console.log(data);
    const currentdate = currentMonthYear();
    updateBudgetMutation.mutate({
      date: currentdate,
      income: [{ incomename: data.incomename, sum: +data.sum }],
      user_id: userId,
      budget: sum,
    });
    reset();
  };

  return (
    <div>
      <h4 className="mb-10 text-2xl">Mounthly Budget: {sum} ₴</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 flex flex-col gap-4  items-start"
      >
        <label className="underline" htmlFor="income">
          Additional income:
        </label>
        <div className="flex gap-4 items-center">
          <input
            className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm "
            {...register("incomename", { required: "this field is required" })}
            type="text"
            name="incomename"
            placeholder="type a income source..."
          />
          <input
            className=" p-2 block w-1/4 border-gray-300 outline-none rounded shadow-sm "
            {...register("sum", { required: "this field is required" })}
            type="number"
            name="sum"
            placeholder="type a sum..."
          />
        </div>
        <button
          className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default EditBudget;
