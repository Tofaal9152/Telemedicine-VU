"use client";

import { useInfiniteData } from "@/hooks/useInfiniteData";
import { InfiniteScroller } from "@/lib/InfiniteScroller";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchDoctorItem from "./SearchDoctorItem";
import Searchbar from "./Searchbar";
import { useFetchData } from "@/hooks/useFetchData";

const SearchDoctorsContent = () => {
  const [speciality, setSpeciality] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [debouncedSpeciality] = useDebounce(speciality, 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>(
    `/public/doctors/approved?query=${debouncedQuery}&specialty=${debouncedSpeciality}`,
    ["search-all-doctors", debouncedQuery, debouncedSpeciality]
  );
console.log("Search Doctors Data:", data);
  const { data: specializations } = useFetchData<any>(
    `/public/all-doctors-specialty`,
    ["search-all-doctors-specialty"]
  );

  const doctors = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
        Find a Doctor
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <Searchbar setQuery={setQuery} query={query} />
        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="bg-teal-500 text-white p-2 rounded-md border border-white/20 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Specialization</option>
          {specializations?.map((item: any, idx: number) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <InfiniteScroller
        items={doctors}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={(item) => <SearchDoctorItem key={item.id} item={item} />}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SearchDoctorsContent;
