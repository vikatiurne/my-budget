"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IExpense, Income } from "@/types/types";
import { FaCheck } from "react-icons/fa";

interface FormContentProps {
  typeForm: string;
  includeField?: boolean;
  register: UseFormRegister<Income | IExpense>;
}

const FormContent: React.FC<FormContentProps> = ({
  typeForm,
  register,
  includeField = true,
}) => {
  return (
    <div className="flex gap-4 items-center">
      {includeField && (
        <input
          className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
          {...register("title", {
            required: "This field is required",
          })}
          type="text"
          autoComplete="true"
          name="title"
          placeholder={`type the ${typeForm} source...`}
        />
      )}
      <input
        className={`p-2 block ${
          !includeField ? "w-1/2" : "w-1/4"
        } border-gray-300  outline-none rounded shadow-sm  dark:shadow-amber-50`}
        {...register("price", {
          required: "this field is required",
        })}
        type="number"
        name="price"
        placeholder="sum..."
      />
      <button
        className="py-3 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        type="submit"
      >
        <FaCheck />
      </button>
    </div>
  );
};

export default FormContent;
