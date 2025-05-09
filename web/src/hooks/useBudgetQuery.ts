import { currentMonthYear } from "../utils/currentMonthYear";
import { ErrorResponse, IBudgetUpdate } from "@/types/types";
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
  useQuery<IBudgetUpdate[], AxiosError<ErrorResponse>>(useBudgetQueryOptions());
