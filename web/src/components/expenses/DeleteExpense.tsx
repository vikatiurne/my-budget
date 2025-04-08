import { IExpense } from "@/types/types";
import { deleteExpense } from "@/utils/api";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import remove from "../../../public/remove.svg";
import Image from "next/image";
import React from "react";

interface DeleteExpenseProps {
  expense: IExpense;
}

const DeleteExpense: React.FC<DeleteExpenseProps> = ({ expense }) => {
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
          expense.user_id,
          expense.budget_id,
          from,
          till,
        ]) ?? [];

      const optimisticExpense = prevExpense.filter(
        (item) => item._id !== expense._id
      );

      queryClient.setQueryData(["expense"], optimisticExpense);

      return { prevExpense };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(["expense"], context?.prevExpense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const handleRemove = () => {
    removeMutation.mutate({ id: expense._id, sum: expense.price });
  };

  return (
    <Image
      src={remove}
      alt="remove"
      className="w-5 cursor-pointer"
      onClick={handleRemove}
    />
  );
};

export default DeleteExpense;
