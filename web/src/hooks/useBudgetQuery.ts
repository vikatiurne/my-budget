import { Budget, ErrorResponse } from "@/types/types";
import { getBudget } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const budgetQueryOptions = (userId: string, mounth: string, year: string) => {
  return {
    queryKey: ["budget"],
    queryFn: () => getBudget(userId, mounth, year),
  };
};

export const useBudgetQuery = (userId: string, mounth: string, year: string) =>
  useQuery<Budget[], AxiosError<ErrorResponse>>(
    budgetQueryOptions(userId, mounth, year)
  );
