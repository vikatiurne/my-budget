import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputPrice from "./InputPrice";
import { TotalValueField } from "@/types/types";

interface ArrayFormProps {
  idx: number;
  fieldName: string;
  fieldPrice: string;
  fieldQty?: string;
  split?: string;
  isRequired?: boolean;
  onTotalValField: (val: TotalValueField) => void;
}

const ArrayForm: React.FC<ArrayFormProps> = ({
  fieldName,
  fieldPrice,
  isRequired = false,
  fieldQty = "",
  split,
  onTotalValField,
}) => {
  const { register, setValue } = useFormContext();

  const [splitExp, setSplitExp] = useState<boolean | undefined>(!split);
  const [localQty, setLocalQty] = useState<string>("1");
  const [localPrice, setLocalPrice] = useState<string | undefined>("");

  const toggleSplit = () => {
    if (splitExp) {
      setLocalQty("1");
      setValue(fieldQty, "1");
    }
    setSplitExp((prev) => !prev);
  };

  const handleBlurPrice = () => setValue(fieldPrice, localPrice);

  const handleBlurQty = () => setValue(fieldQty, localQty);

  useEffect(() => {
    if (localPrice && localQty)
      onTotalValField({
        field: fieldName,
        totalField: (+localPrice / +localQty).toString(),
      });
  }, [localPrice, localQty, splitExp]);

  return (
    <div className="flex flex-wrap gap-2">
      <input
        className="flex-1 p-2 block w-[13rem]  border-gray-300
        outline-none rounded shadow-sm  dark:shadow-amber-50"
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
          value={localPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalPrice(e.target.value)
          }
          onBlur={handleBlurPrice}
        />
        {splitExp && split && (
          <InputPrice
            fieldName={fieldQty}
            placeholder="qty"
            typeField=" "
            register={register}
            isRequired={isRequired}
            value={localQty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalQty(e.target.value)
            }
            onBlur={handleBlurQty}
          />
        )}
        {split && (
          <button
            onClick={toggleSplit}
            title="split expenses for people"
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
