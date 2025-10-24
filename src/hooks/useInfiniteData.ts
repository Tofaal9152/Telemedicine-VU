import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function useInfiniteData<T>(
  initialUrl: string,
  queryKey: string | readonly unknown[]
) {
  return useInfiniteQuery<PaginatedResponse<T>>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: ({ pageParam = initialUrl }) =>
      fetcher<PaginatedResponse<T>>(pageParam as string),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: initialUrl,
  });
}
