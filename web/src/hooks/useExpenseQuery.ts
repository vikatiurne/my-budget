import { getExpenses } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ErrorResponse, IExpense } from "@/types/types";
import { AxiosError } from "axios";

const useExpenseQueryOptions = (
  budgetId: string,
  fromDate: Date,
  tillDate: Date
) => {
  const from = fromDate.toISOString();
  const till = tillDate.toISOString();

  return {
    queryKey: ["expense",  budgetId, from, till],
    queryFn: () => getExpenses( budgetId, from, till),
  };
};

export const useExpenseQuery = (
  budget_id: string,
  fromDate: Date,
  tillDate: Date
) =>
  useQuery<IExpense[], AxiosError<ErrorResponse>>(
    useExpenseQueryOptions(budget_id, fromDate, tillDate)
  );
