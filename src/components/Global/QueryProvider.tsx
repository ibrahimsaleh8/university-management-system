"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
