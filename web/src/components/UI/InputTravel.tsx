import React, { useState } from "react";
import InputPrice from "./InputPrice";
import { useFormContext } from "react-hook-form";

interface InputTravelProps {
  labelText: string;
  fieldName: string;
  split?: string;
}

const InputTravel: React.FC<InputTravelProps> = ({
  labelText,
  fieldName,
  split,
}) => {
  const [splitExp, setSplitExp] = useState<boolean | undefined>(!split);

  const { register } = useFormContext();

  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="text-sm font-bold w-36" htmlFor={fieldName}>
        {labelText}
      </label>
      <InputPrice
        fieldName={fieldName}
        placeholder="price..."
        register={register}
      />
      {splitExp && split && (
        <InputPrice
          fieldName="qtypeople"
          placeholder="qty"
          typeField=" "
          register={register}
        />
      )}
      {split && (
        <button
          onClick={() => setSplitExp((prev) => !prev)}
          className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white uppercase text-sm cursor-pointer"
        >
          {!splitExp ? "split by" : "cancel"}
        </button>
      )}
    </div>
  );
};

export default InputTravel;
