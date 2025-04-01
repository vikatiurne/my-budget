import Budget from "@/components/budget/Budget";
import Container from "@/components/containers/Container";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";
import Expense from "@/components/expenses/Expense";
import React from "react";

const HomePage = () => {
  return (
    <ReactQueryProvider>
      <Container>
        <div>
          <Budget />
          <Expense />
        </div>
      </Container>
    </ReactQueryProvider>
  );
};

export default HomePage;
