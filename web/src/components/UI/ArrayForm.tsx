import React from "react";
import { useForm } from "react-hook-form";
import InputPrice from "./InputPrice";

interface ArrayFormProps {
  idx: number;
  fieldName: string;
  fieldPrice: string;
}

const ArrayForm: React.FC<ArrayFormProps> = ({
  idx,
  fieldName,
  fieldPrice,
}) => {
  const { register } = useForm();

  return (
    <>
      <input
        className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
        type="text"
        placeholder="name..."
        {...register(fieldName, {
          required: "this field is required",
        })}
      />
      <InputPrice fieldName={fieldPrice}/>
    </>
  );
};

export default ArrayForm;
