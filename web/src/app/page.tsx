"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const HomePage = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 50 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div>HomePage</div>
    </QueryClientProvider>
  );
};

export default HomePage;
