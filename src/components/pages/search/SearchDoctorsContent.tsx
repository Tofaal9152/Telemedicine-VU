"use client";

import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { useFetchData } from "@/hooks/useFetchData";
import SearchDoctorItem from "./SearchDoctorItem";
import Searchbar from "./Searchbar";

const PAGE_SIZE = 10; // tweak for mobile perf

const SearchDoctorsContent = () => {
  const [speciality, setSpeciality] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedQuery] = useDebounce(query, 500);
  const [debouncedSpeciality] = useDebounce(speciality, 500);

  // Reset to first page when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedQuery, debouncedSpeciality]);

  // Doctors request with classic pagination
  const { data, isLoading, isError, error } = useFetchData<any>(
    `/public/doctors/approved?query=${debouncedQuery}&specialty=${debouncedSpeciality}&page=${page}&limit=${PAGE_SIZE}`,
    ["search-all-doctors", debouncedQuery, debouncedSpeciality, page]
  );

  const doctors = data?.results ?? [];

  // Depending on your API, adjust this:
  // - If you have `totalPages` in the response, use that directly.
  // - If you have `total`, compute from PAGE_SIZE.
  const totalPages: number = useMemo(() => {
    if (data?.totalPages) return data.totalPages;
    if (data?.total) return Math.ceil(data.total / PAGE_SIZE);
    return 1;
  }, [data]);

  // Specializations
  const { data: specializations } = useFetchData<any>(
    `/public/all-doctors-specialty`,
    ["search-all-doctors-specialty"]
  );

  const gotoPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    // Scroll to top of section on mobile to avoid "hang" feel
    if (typeof window !== "undefined") {
      const section = document.getElementById("search-doctors-section");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Simple array of page numbers (for large totals you can add ellipsis logic)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <section
      id="search-doctors-section"
      className="
        bg-white/10 
        md:backdrop-blur-md 
        rounded-2xl 
        shadow-2xl 
        p-4 
        md:p-10 
        text-white 
        border 
        border-white/20 
        hover:bg-white/15 
        transition-all 
        duration-500 
        hover:shadow-3xl
      "
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
        Find a Doctor
      </h1>

      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
        <Searchbar setQuery={setQuery} query={query} />
        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="bg-teal-500 text-white p-2 rounded-md border border-white/20 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="">Select Specialization</option>
          {specializations?.map((item: any, idx: number) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Content area */}
      <div className="space-y-3 md:space-y-4">
        {isLoading && (
          <p className="text-sm md:text-base text-white/80">
            Loading doctors...
          </p>
        )}

        {isError && (
          <p className="text-sm md:text-base text-red-300">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading doctors."}
          </p>
        )}

        {!isLoading && !isError && doctors.length === 0 && (
          <p className="text-sm md:text-base text-white/80">
            No doctors found for this search.
          </p>
        )}

        {!isLoading &&
          !isError &&
          doctors.map((item: any) => (
            <SearchDoctorItem key={item.id} item={item} />
          ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(page - 1)}
              disabled={page === 1}
              className="
                px-3 py-1 rounded-md text-sm md:text-base 
                border border-white/30 
                disabled:opacity-40 disabled:cursor-not-allowed 
                hover:bg-white/10 transition
              "
            >
              Previous
            </button>
            <button
              onClick={() => gotoPage(page + 1)}
              disabled={page === totalPages}
              className="
                px-3 py-1 rounded-md text-sm md:text-base
                border border-white/30 
                disabled:opacity-40 disabled:cursor-not-allowed 
                hover:bg-white/10 transition
              "
            >
              Next
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1">
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => gotoPage(num)}
                className={`
                  w-8 h-8 md:w-9 md:h-9 rounded-full text-xs md:text-sm 
                  border border-white/30 
                  flex items-center justify-center 
                  transition
                  ${
                    num === page
                      ? "bg-white text-slate-900 font-semibold"
                      : "bg-transparent text-white hover:bg-white/10"
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchDoctorsContent;
