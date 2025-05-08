"use client";
import React, { useState } from "react";
import Container from "./containers/Container";
import FullCostsTravel from "./travel/FullCostsTravel";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const Main = () => {
  const [showCalculate, setShowCalculate] = useState<boolean>(true);

  const { tb } = useAppTranslation();

  return (
    <Container>
      <div className="max-w-[49rem] mx-auto mb-6 grid grid-rows-2 gap-4 grid-cols-2">
        <button
          className="col-span-2 px-4 py-1 border-amber-50 rounded shadow bg-amber-50 cursor-pointer hover:bg-amber-100 active:bg-amber-50 text-[#856a25] dark:text-black"
          onClick={() => setShowCalculate((prev) => !prev)}
        >
          {!showCalculate ? tb("show") : tb("hide")} {tb("budgetCalculation")}
        </button>
      </div>
      {showCalculate && <FullCostsTravel />}
    </Container>
  );
};

export default Main;
