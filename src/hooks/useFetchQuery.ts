import { IFetchQueryProps } from "@/lib/types/type";
import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = <T>({
  queryKey,
  queryFn,
}: IFetchQueryProps<T>) => {
  return useQuery({ queryKey, queryFn });
};
