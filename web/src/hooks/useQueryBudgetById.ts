import { IBudget, ErrorResponse } from "@/types/types";
import { getBudgetById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

const useQueryBudgetByIdOptions = (budgetId: string) => {
  const { userId } = useAuthContext();

  return {
    queryKey: ["budgetById", userId, budgetId],
    queryFn: () => getBudgetById(userId, budgetId),
  };
};

export const useQueryBudgetById = (budgetId: string) =>
  useQuery<IBudget[], AxiosError<ErrorResponse>>(
    useQueryBudgetByIdOptions(budgetId)
  );
