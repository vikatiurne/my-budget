"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow from "../../../public/arrow.svg";
import { useQueryBudgetById } from "@/hooks/useQueryBudgetById";

interface IncomesListProps{
  budgetId:string
}

const IncomesList:React.FC<IncomesListProps> = ({budgetId}) => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(true);

  const query = useQueryBudgetById(budgetId);

  const { data, isPending } = query;

  useEffect(() => {
    if (data) {
      const total = data[0].income.reduce((acc, item) => {
        acc = item.sum + acc;
        return acc;
      }, 0);

      setTotalIncome(total);
    }
  }, [data]);

  const showIncomeListHandler = () => setShowList((prev) => !prev);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      totalIncome !== 0 && (
        <div className="mb-4">
          <button
            className="flex gap-2 mb-2 cursor-pointer"
            onClick={showIncomeListHandler}
          >
            <p className="underline">Additional income:</p>
            <Image
              src={arrow}
              alt="arrow"
              className={`transition-rotate duration-300 ease-in-out  dark:fill-amber-50 ${
                showList ? "transform rotate-180 " : ""
              }`}
            />
          </button>
          <ul
            className={`list-disc pl-5 mb-2 ${showList ? "block" : "hidden"}`}
          >
            {data[0].income.map((item) => (
              <li className="list-disc flex gap-4 text-gray-500" key={item._id}>
                <p>{item.incomename}</p>
                <p>{item.sum}₴</p>
              </li>
            ))}
          </ul>
          <p>Total income: {totalIncome} ₴</p>
        </div>
      )
    );
  }
};

export default IncomesList;
