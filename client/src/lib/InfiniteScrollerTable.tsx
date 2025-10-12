"use client";

import { Loader } from "lucide-react";
import { useEffect, useRef, useCallback, ReactNode } from "react";
import { Table, TableBody } from "@/components/ui/table";

type InfiniteScrollerTableProps<T> = {
  items: T[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  renderHeader: () => ReactNode;
  renderRow: (item: T, index: number) => ReactNode;
};

export function InfiniteScrollerTable<T>({
  items,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
  renderHeader,
  renderRow,
}: InfiniteScrollerTableProps<T>) {
  const loadMoreRef = useRef<HTMLTableRowElement>(null);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: "100px",
    });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onIntersect]);

  if (isLoading) {
    return (
      <Loader className="w-8 h-8 animate-spin mx-auto my-4 text-gray-500" />
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error loading data: {(error as Error).message}
      </p>
    );
  }

  return (
    <Table>
      {renderHeader()}
      <TableBody>
        {items.map((item, index) => renderRow(item, index))}
        <tr ref={loadMoreRef}>
          <td colSpan={100} className="text-center py-4">
            {isFetchingNextPage ? (
              <Loader className="w-6 h-6 animate-spin mx-auto text-gray-500" />
            ) : (
              !hasNextPage && (
                <span className="text-gray-500">No more items</span>
              )
            )}
          </td>
        </tr>
      </TableBody>
    </Table>
  );
}
