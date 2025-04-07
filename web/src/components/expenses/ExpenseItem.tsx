import { Budget, IExpense } from "@/types/types";
import React from "react";
import edit from "../../../public/edit.svg";
import remove from "../../../public/remove.svg";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "@/utils/api";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";

interface ExpenseItemProps {
  exp: IExpense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ exp }) => {
  const queryClient = useQueryClient();

  const period = defaultDatePeriod();
  const from = new Date(period.start);
  const till = period.end;

  const removeMutation = useMutation({
    mutationFn: ({ id, sum }: { id: string; sum: number }) =>
      deleteExpense(id, sum),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["expense"] });

      const prevExpense =
        queryClient.getQueryData<IExpense[]>([
          "expense",
          exp.user_id,
          exp.budget_id,
          from,
          till,
        ]) ?? [];

      const optimisticExpense = prevExpense.filter(
        (item) => item._id !== exp._id
      );

      queryClient.setQueryData(["expense"], optimisticExpense);

      return { prevExpense };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const handleEdit = () => {};
  const handleRemove = () => {
    removeMutation.mutate({ id: exp._id, sum: exp.price });
  };

  return (
    <>
      <p>
        {exp.title} - <span>{exp.price} ₴</span>
      </p>
      <div className="flex gap-4">
        <Image
          src={edit}
          alt="edit"
          className="w-5 cursor-pointer"
          onClick={handleEdit}
        />
        <Image
          src={remove}
          alt="remove"
          className="w-5 cursor-pointer"
          onClick={handleRemove}
        />
      </div>
    </>
  );
};

export default ExpenseItem;
