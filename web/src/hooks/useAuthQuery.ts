import { getUser } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const authQueryOptions = (userId: string) => {
  return {
    queryKey: ["auth", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  };
};

export const useAuthQuery = (userId: string) =>
  useQuery(authQueryOptions(userId));
