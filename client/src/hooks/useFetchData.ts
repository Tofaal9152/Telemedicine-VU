import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export function useFetchData<T>(
  url: string,
  queryKey: string | readonly unknown[]
): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetcher<T>(url),
  });
}
