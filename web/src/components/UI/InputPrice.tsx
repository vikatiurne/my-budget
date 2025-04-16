import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputPriceProps<T extends FieldValues> {
  fieldName: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  typeField?: string;
  isRequired?: boolean;
}

const InputPrice = <T extends FieldValues>({
  typeField,
  fieldName,
  placeholder,
  isRequired = false,
  register,
}: InputPriceProps<T>) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        className={`p-2 block ${
          !typeField ? "w-20" : "max-w-32"
        } "border-gray-300" outline-none rounded shadow-sm  dark:shadow-amber-50 bg-white text-black`}
        type="number"
        step="0.01"
        placeholder={placeholder}
        {...register(fieldName, {
          required: isRequired ? "this field is required" : false,
        })}
      />
      <p>{!typeField ? "₴" : typeField}</p>
    </div>
  );
};

export default InputPrice;
