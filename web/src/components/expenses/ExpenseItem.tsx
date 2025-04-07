import { IExpense } from "@/types/types";
import React from "react";
import edit from "../../../public/edit.svg";
import remove from "../../../public/remove.svg";
import Image from "next/image";

interface ExpenseItemProps {
  exp: IExpense;
}

const ExpenseItem:React.FC<ExpenseItemProps> = ({ exp }) => {
  return (
    <>
      <p>
        {exp.title} - <span>{exp.price} ₴</span>
      </p>
      <div className="flex gap-4">
        <Image src={edit} alt="edit" className="w-5" />
        <Image src={remove} alt="remove" className="w-5" />
      </div>
    </>
  );
};

export default ExpenseItem;
