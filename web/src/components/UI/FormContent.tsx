"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IExpense, Income } from "@/types/types";
import { FaCheck } from "react-icons/fa";
import { useAppTranslation } from "@/hooks/useAppTranslation";

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
  const { ti, tm } = useAppTranslation();

  return (
    <div className="flex gap-4 items-center">
      <input
        className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm "
        {...register("title", {
          required: includeField ? tm("required") : false,
        })}
        type="text"
        autoComplete="true"
        name="title"
        placeholder={typeForm}
      />

      <input
        className={`p-2 block w-1/4 border-gray-300  outline-none rounded shadow-sm `}
        {...register("price", {
          required: tm("required"),
        })}
        type="number"
        name="price"
        placeholder={ti("sum")}
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
