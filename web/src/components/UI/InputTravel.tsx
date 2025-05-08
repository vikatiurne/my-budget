import React, { useEffect, useState } from "react";
import InputPrice from "./InputPrice";
import { useFormContext } from "react-hook-form";
import { TotalValueField } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface InputTravelProps {
  labelText: string;
  fieldName: string;
  split?: string;
  onTotalValField: (val: TotalValueField) => void;
}

const InputTravel: React.FC<InputTravelProps> = ({
  labelText,
  fieldName,
  split,
  onTotalValField,
}) => {
  const [splitExp, setSplitExp] = useState<boolean | undefined>(!split);
  const [localPrice, setLocalPrice] = useState<string | undefined>("");
  const [localQty, setLocalQty] = useState<string>("1");

  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (localPrice && localQty)
      onTotalValField({
        field: fieldName,
        totalField: (+localPrice / +localQty).toString(),
      });
  }, [localPrice, localQty, splitExp]);

  const toggleSplit = () => {
    if (splitExp) {
      setLocalQty("1");
      setValue("qtypeople", "1");
    }
    setSplitExp((prev) => !prev);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalPrice(e.target.value);

  const handleBlurPrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(fieldName, e.target.value);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalQty(e.target.value);

  const handleBlurQty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue("qtypeople", e.target.value);

  const { ti, tb } = useAppTranslation();

  return (
    <div className="flex gap-3 items-center mb-4">
      <label className="text-sm font-bold w-30 md:w-50" htmlFor={fieldName}>
        {labelText}
      </label>
      <InputPrice
        fieldName={fieldName}
        placeholder={ti("price")}
        register={register}
        value={localPrice}
        onChange={(e) => handlePriceChange(e)}
        onBlur={handleBlurPrice}
      />
      {splitExp && split && (
        <InputPrice
          fieldName="qtypeople"
          placeholder={ti("qty")}
          typeField=" "
          register={register}
          value={localQty ?? ""}
          onChange={(e) => handleQtyChange(e)}
          onBlur={handleBlurQty}
        />
      )}
      {split && (
        <button
          onClick={toggleSplit}
          className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white text-sm cursor-pointer"
        >
          {!splitExp ? tb("splitBy") : tb("cancel")}
        </button>
      )}
    </div>
  );
};

export default InputTravel;
