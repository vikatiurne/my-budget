import { useBudgetQuery } from "@/hooks/useBudgetQuery";
import { useExpenseQuery } from "@/hooks/useExpenseQuery";
import arrow from "../../../public/arrow.svg";
import Image from "next/image";
import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import DateRangePicker from "../UI/DateRangePicker";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";

const ExpensesList = () => {
  const [showList, setShowList] = useState<boolean>(true);

  const period = defaultDatePeriod();

  const [startDate, setStartDate] = useState<Date>(new Date(period.start));
  const [endDate, setEndDate] = useState<Date>(period.end);

  const handleDateStart = (date: Date) => setStartDate(date);
  const handleDateEnd = (date: Date) => setEndDate(date);

  const handleResetDate = () => {
    setStartDate(new Date(period.start));
    setEndDate(period.end);
  };

  const queryBudget = useBudgetQuery();
  const budgetId = queryBudget.data ? queryBudget.data[0]._id : "";

  const { data, isPending } = useExpenseQuery(budgetId, startDate, endDate);


  const showExpensesListHandler = () => setShowList((prev) => !prev);

  if (isPending) return <p className="pt-8 text-center text-xl">Loading...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap-reverse mb-6">
        <button
          className="flex gap-2 mb-2 cursor-pointer"
          onClick={showExpensesListHandler}
        >
          <p className="underline">Your expenses for the period:</p>
          <Image
            src={arrow}
            alt="arrow"
            className={`transition-rotate duration-300 ease-in-out ${
              showList ? "transform rotate-180 " : ""
            }`}
          />
        </button>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          handleDateStart={handleDateStart}
          handleDateEnd={handleDateEnd}
        />
        <button
          onClick={handleResetDate}
          className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        >
          Reset
        </button>
      </div>

      {data?.length && data.length > 0 ? (
        <ul>
          {data.map((exp) => (
            <li
              key={exp._id}
              className={`mb-2 p-2 flex items-center justify-between shadow  dark:shadow-amber-50 ${
                showList ? "block" : "hidden"
              }`}
            >
              <ExpenseItem exp={exp} />{" "}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ExpensesList;
