import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputPrice from "./InputPrice";

interface ArrayFormProps {
  idx: number;
  fieldName: string;
  fieldPrice: string;
  fieldQty?: string;
  split?: string;
  isRequired?: boolean;
}

const ArrayForm: React.FC<ArrayFormProps> = ({
  fieldName,
  fieldPrice,
  isRequired = false,
  fieldQty = "",
  split,
}) => {
  const { register } = useFormContext();

  const [splitExp, setSplitExp] = useState<boolean | undefined>(!split);

  const toggleSplit = () => {
    setSplitExp((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <input
        className={`flex-1 p-2 block w-[13rem]  "border-gray-300"
        outline-none rounded shadow-sm  dark:shadow-amber-50`}
        type="text"
        placeholder="name..."
        {...register(fieldName, { required: "field is required" })}
      />
      <div className="flex flex-wrap gap-2">
        <InputPrice
          fieldName={fieldPrice}
          placeholder="price..."
          register={register}
          isRequired={isRequired}
        />
        {splitExp && split && (
          <InputPrice
            fieldName={fieldQty}
            placeholder="qty"
            typeField=" "
            register={register}
            isRequired={isRequired}
          />
        )}
        {split && (
          <button
            onClick={toggleSplit}
            className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
          >
            {!splitExp ? "split by" : "cancel"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ArrayForm;
