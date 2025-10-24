"use client";

import { Loader } from "lucide-react";
import { useEffect, useRef, useCallback, ReactNode } from "react";

type InfiniteScrollerProps<T> = {
  items: T[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  renderItem: (item: T) => ReactNode;
};

export function InfiniteScroller<T>({
  items,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,

  renderItem,
}: InfiniteScrollerProps<T>) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(renderItem)}
      </div>

      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage && (
          <Loader className="w-8 h-8 animate-spin mx-auto text-gray-500" />
        )}
        {!hasNextPage && <p className="text-white">No more items</p>}
      </div>
    </>
  );
}
