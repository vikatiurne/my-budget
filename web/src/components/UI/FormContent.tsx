"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IExpense, Income } from "@/types/types";

interface FormContentProps {
  typeForm: "title" | "incomename";
  register: UseFormRegister<Income | IExpense>;
}

const FormContent: React.FC<FormContentProps> = ({ typeForm, register }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <input
          className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm "
          {...register(typeForm === "title" ? "title" : "incomename", {
            required: "This field is required",
          })}
          type="text"
          autoComplete="true"
          name={typeForm}
          placeholder={`type  ${
            typeForm === "title" ? "an expense" : "a income"
          } source...`}
        />
        <input
          className=" p-2 block w-1/4 border-gray-300 outline-none rounded shadow-sm "
          {...register(typeForm === "title" ? "price" : "sum", {
            required: "this field is required",
          })}
          type="number"
          name={typeForm === "title" ? "price" : "sum"}
          placeholder="type a sum..."
        />
      </div>
      <button
        className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        type="submit"
      >
        {typeForm === "title" ? "Add Expense" : "Add income"}
      </button>
    </>
  );
};

export default FormContent;
