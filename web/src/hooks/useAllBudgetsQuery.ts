import { getBudgets } from "@/utils/api";
import { useAuthContext } from "./useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { IBudget, ErrorResponse } from "@/types/types";
import { AxiosError } from "axios";

const allBudgetsQueryOptions = () => {
  const { userId } = useAuthContext();

  return {
    queryKey: ["budgets", userId],
    queryFn: () => getBudgets(userId),
  };
};

export const useAllBudgetQuery = () =>
  useQuery<IBudget[], AxiosError<ErrorResponse>>(allBudgetsQueryOptions());
