import { currentMonthYear } from "./../utils/currentMonthYear";
import { Budget, ErrorResponse } from "@/types/types";
import { getBudget } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

const useBudgetQueryOptions = () => {
  const { userId } = useAuthContext();
  const currentdata = currentMonthYear();

  return {
    queryKey: ["budget", userId, currentdata],
    queryFn: () => getBudget(userId, currentdata.mounth, currentdata.year),
  };
};

export const useBudgetQuery = () =>
  useQuery<Budget[], AxiosError<ErrorResponse>>(useBudgetQueryOptions());
