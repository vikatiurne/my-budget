import Main from "@/components/Main";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";

const HomePage = () => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Main />;
    </>
  );
};

export default HomePage;
