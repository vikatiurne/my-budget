import { ErrorResponse, IBudgetUpdate } from "@/types/types";
import { getBudgetById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useQueryBudgetByIdOptions = (budgetId: string) => {
  return {
    queryKey: ["budgetById", budgetId],
    queryFn: () => getBudgetById(budgetId),
  };
};

export const useQueryBudgetById = (budgetId: string) =>
  useQuery<IBudgetUpdate, AxiosError<ErrorResponse>>(
    useQueryBudgetByIdOptions(budgetId)
  );
