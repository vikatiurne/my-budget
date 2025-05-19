import { useExpenseQuery } from "@/hooks/useExpenseQuery";
import arrow from "../../../public/images/arrow.svg";
import Image from "next/image";
import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import DateRangePicker from "../UI/DateRangePicker";
import { defaultDatePeriod } from "@/utils/defaultDatePeriod";
import { IBudgetUpdate } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface ExpensesListProps {
  budget: IBudgetUpdate;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ budget }) => {
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

  const { data, isPending } = useExpenseQuery(budget._id, startDate, endDate);

  const showExpensesListHandler = () => setShowList((prev) => !prev);

  const { tm, tb } = useAppTranslation();

  if (isPending)
    return <p className="pt-8 text-center text-xl">{tm("loading")}</p>;

  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap-reverse mb-6">
        <button
          className="flex gap-2 mb-2 cursor-pointer"
          onClick={showExpensesListHandler}
        >
          <p className="underline">{tb("yuorExpensesForPeriod")}</p>
          <Image
            src={arrow}
            alt="arrow"
            className={`transition-rotate duration-300 ease-in-out ${
              showList ? "transform rotate-180 " : ""
            }`}
          />
        </button>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            handleDateStart={handleDateStart}
            handleDateEnd={handleDateEnd}
          />
          {(startDate?.getTime() !== new Date(period.start).getTime() ||
            endDate?.getTime() !== new Date(period.end).getTime()) && (
            <button
              onClick={handleResetDate}
              className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
            >
              {tb("resetPeriod")}
            </button>
          )}
        </div>
      </div>

      {data?.length && data.length > 0 ? (
        <ul>
          {data.map((exp) => (
            <li
              key={exp._id}
              className={`mb-2 p-2 flex items-center justify-between shadow  ${
                showList ? "block" : "hidden"
              }`}
            >
              <ExpenseItem exp={exp} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ExpensesList;
