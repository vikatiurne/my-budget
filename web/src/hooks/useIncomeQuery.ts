import { ErrorResponse, Income } from "@/types/types";
import { getIncomes } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const incomeQueryOptions = (budgetId: string) => {
  return {
    queryKey: ["income", budgetId],
    queryFn: () => getIncomes(budgetId),
  };
};

export const useIncomeQuery = (budgetId: string) =>
  useQuery<Income[], AxiosError<ErrorResponse>>(incomeQueryOptions(budgetId));
