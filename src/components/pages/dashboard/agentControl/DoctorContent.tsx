"use client";

import { useInfiniteData } from "@/hooks/useInfiniteData";
import { InfiniteScroller } from "@/lib/InfiniteScroller";
import DoctorItem from "./DoctorItem";

const DoctorContent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>("/admin/doctors", "admin-all-doctors");

  const doctors = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <InfiniteScroller
      items={doctors}
      isLoading={isLoading}
      isError={isError}
      error={error}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={(item) => <DoctorItem key={item.id} item={item} />}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    />
  );
};

export default DoctorContent;
