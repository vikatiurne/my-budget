import { currentMonthYear } from "./../utils/currentMonthYear";
import { Budget, ErrorResponse } from "@/types/types";
import { getBudget } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const budgetQueryOptions = () => {
  const userId = localStorage.getItem("__budget_isAuth") ?? "";
  const currentdata = currentMonthYear();
  return {
    queryKey: ["budget"],
    queryFn: () => getBudget(userId, currentdata.mounth, currentdata.year),
  };
};

export const useBudgetQuery = () =>
  useQuery<Budget[], AxiosError<ErrorResponse>>(budgetQueryOptions());
