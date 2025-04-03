"use client";
import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import React, { useEffect, useState } from "react";

const IncomesList = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const query = useBudgetQuery();

  const { data, isPending } = query;

  console.log(data);

  useEffect(() => {
    if (data) {
      const total = data[0].income.reduce((acc, item) => {
        acc = item.sum + acc;
        return acc;
      }, 0);

      setTotalIncome(total);
    }
  }, [data]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      totalIncome !== 0 && (
        <div>
          <ul className="list-disc pl-5 mb-4">
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
