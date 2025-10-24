"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export default function TanstackProvider({ children }: { children: ReactNode }) {
  // Avoid re-creating the client on every render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}