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
  className?: string;
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
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
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
      <div className="flex items-center justify-center py-16">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-8">
        Error loading data: {(error as Error).message}
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 py-16">
        No items found.
      </p>
    );
  }

  return (
    <>
      <div className={className}>{items.map(renderItem)}</div>

      <div ref={loadMoreRef} className="py-6 text-center">
        {isFetchingNextPage && (
          <Loader className="w-6 h-6 animate-spin mx-auto text-gray-400" />
        )}
        {!hasNextPage && items.length > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-600">— সব দেখা হয়েছে —</p>
        )}
      </div>
    </>
  );
}
