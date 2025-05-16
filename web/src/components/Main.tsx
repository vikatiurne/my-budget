"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import AddBudgetForm from "./budget/AddBudgetForm";
import Container from "./containers/Container";
import FullCostsTravel from "./travel/FullCostsTravel";

const Main = () => {
  const { isAuth } = useAuthContext();
  return (
    <Container>
      <FullCostsTravel />
      {isAuth && <AddBudgetForm />}
    </Container>
  );
};

export default Main;
