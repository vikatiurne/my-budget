import React from "react";
import { useForm } from "react-hook-form";

interface InputPriceProps {
  fieldName: string;
}

const InputPrice: React.FC<InputPriceProps> = ({ fieldName }) => {
    const { register } = useForm();
    
  return (
    <div className="flex gap-4 items-center">
      <input
        className="p-2 block w-20 border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
        type="number"
        placeholder="price..."
        {...register(fieldName)}
      />
      <p>₴</p>
    </div>
  );
};

export default InputPrice;
