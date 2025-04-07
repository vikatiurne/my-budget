import { getExpenses } from "@/utils/api";
import { useAuthContext } from "./useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { ErrorResponse, IExpense } from "@/types/types";
import { AxiosError } from "axios";

const expenseQueryOptions = (
  budgetId: string,
  fromDate: Date,
  tillDate: Date
) => {
  const { userId } = useAuthContext();
  const from = fromDate.toISOString();
  const till = tillDate.toISOString();



  return {
    queryKey: ["expense", userId, budgetId, from, till],
    queryFn: () => getExpenses(userId, budgetId, from, till),
  };
};

export const useExpenseQuery = (
  budget_id: string,
  fromDate: Date,
  tillDate: Date
) =>
  useQuery<IExpense[], AxiosError<ErrorResponse>>(
    expenseQueryOptions(budget_id, fromDate, tillDate)
  );
