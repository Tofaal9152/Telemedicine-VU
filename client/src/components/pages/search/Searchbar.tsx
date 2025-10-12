"use client"

import { Input } from "@/components/ui/input"

const Searchbar = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (value: string) => void
}) => {
  return (
    <Input
      aria-label="Search doctors"
      placeholder="Search by name or email..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="bg-white/5 text-white  border border-white/10 rounded-xl p-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 transition placeholder:text-white"
    />
  )
}

export default Searchbar
