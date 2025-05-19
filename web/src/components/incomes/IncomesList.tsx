"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow from "../../../public/images/arrow.svg";
import { IBudgetUpdate } from "@/types/types";
import { useIncomeQuery } from "@/hooks/useIncomeQuery";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface IncomesListProps {
  budgetData: IBudgetUpdate;
}

const IncomesList: React.FC<IncomesListProps> = ({ budgetData }) => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(true);

  const query = useIncomeQuery(budgetData._id);

  const { data, isPending } = query;

  useEffect(() => {
    if (data) {
      const total = data?.reduce((acc, item) => acc + item.price, 0);
      setTotalIncome(total);
    }
  }, [data]);

  const showIncomeListHandler = () => setShowList((prev) => !prev);

  const { tm,tincome } = useAppTranslation();

  if (isPending) {
    return <p>{tm("loading")}</p>;
  }

  if (data) {
    return (
      totalIncome !== 0 && (
        <div className="mb-4">
          <button
            className="flex gap-2 mb-2 cursor-pointer"
            onClick={showIncomeListHandler}
          >
            <p className="underline">{tincome("additional")}</p>
            <Image
              src={arrow}
              alt="arrow"
              className={`transition-rotate duration-300 ease-in-out  ${
                showList ? "transform rotate-180 " : ""
              }`}
            />
          </button>
          <ul
            className={`list-disc pl-5 mb-2 ${showList ? "block" : "hidden"}`}
          >
            {data.map((item) => (
              <li className="list-disc flex gap-4 text-gray-500" key={item._id}>
                <p>{item.title}</p>
                <p>{item.price}₴</p>
              </li>
            ))}
          </ul>
          <p>{tincome("total")} {totalIncome} ₴</p>
        </div>
      )
    );
  }
};

export default IncomesList;
