"use client";
import Budget from "@/components/budget/Budget";
import Container from "@/components/containers/Container";
import ReactQueryProvider from "@/components/containers/ReactQueryProvider";
import Expense from "@/components/expenses/Expense";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("__budget_isAuth");
    setIsAuth(!!id);
    if (id) setUserId(id);
  }, []);

  return (
    <ReactQueryProvider>
      <Container>
        {isAuth ? (
          <>
            <Budget userId={userId} />
            <Expense />
          </>
        ) : (
          <p className="text-center text-2xl font-bold">
            Let's enter or registration to use application
          </p>
        )}
      </Container>
    </ReactQueryProvider>
  );
};

export default HomePage;
