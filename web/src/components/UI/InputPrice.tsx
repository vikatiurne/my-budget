import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputPriceProps<T extends FieldValues> {
  fieldName: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  typeField?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputPrice = <T extends FieldValues>({
  typeField,
  value,
  fieldName,
  placeholder,
  isRequired = false,
  register,
  onChange,
  onBlur,
}: InputPriceProps<T>) => {

  return (
    <div className="flex gap-2 items-center">
      <input
        className={`p-2 block text-sm bg-[#f5f3f2] text-gray-800 ${
          typeField===" " ? "w-14 md:w-20" : "max-w-17 md:max-w-32"
        } "border-gray-300" outline-none rounded shadow-sm `}
        type="number"
        step="0.01"
        placeholder={placeholder}
        {...register(fieldName, {
          required: isRequired ? "this field is required" : false,
        })}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        {...(onBlur ? { onBlur } : {})}
      />
      <p>{!typeField ? "₴" : typeField}</p>
    </div>
  );
};

export default InputPrice;
