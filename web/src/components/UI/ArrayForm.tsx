import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputPrice from "./InputPrice";
import { TotalValueField } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface ArrayFormProps {
  idx: number;
  fieldName: string;
  fieldPrice: string;
  fieldQty?: string;
  split?: string;
  isRequired?: boolean;
  onTotalValField: (val: TotalValueField) => void;
  value?: { price?: string; qty?: string };
}

const ArrayForm: React.FC<ArrayFormProps> = ({
  fieldName,
  fieldPrice,
  isRequired = false,
  fieldQty = "",
  split,
  value,
  onTotalValField,
}) => {
  const { register, setValue } = useFormContext();

  const [splitExp, setSplitExp] = useState<boolean | undefined>(!split);
  const [localQty, setLocalQty] = useState<string | undefined>(value?.qty);
  const [localPrice, setLocalPrice] = useState<string | undefined>(
    value?.price
  );
  const [isSightseeing, setIsSightseeing] = useState<boolean>(false);

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
    if (localPrice && localQty) {
      onTotalValField({
        field: fieldName,
        totalField: (+localPrice / +localQty).toString(),
      });
    } else if (localPrice && !localQty) {
      onTotalValField({
        field: fieldName,
        totalField: (+localPrice).toString(),
      });
    }
  }, [localPrice, localQty, splitExp]);

  const { ti, tb } = useAppTranslation();

  useEffect(() => {
    const fieldNameArr = fieldName.split(".");
    if (fieldNameArr.includes("sightseeing")) setIsSightseeing(true);
  }, [fieldName]);

  return (
    <div className="flex flex-wrap gap-2">
      <input
        className={`flex-1 p-2 block ${
          !isSightseeing ? "w-[13rem]" : "w-16"
        }   border-gray-300 text-sm
        outline-none rounded shadow-sm`}
        type="text"
        placeholder={ti("name")}
        {...register(fieldName, { required: "field is required" })}
      />
      <div className="flex flex-wrap gap-2">
        <InputPrice
          fieldName={fieldPrice}
          placeholder={ti("price")}
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
            placeholder={ti("qty")}
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
            className="py-2 px-4 shadow-md rounded bg-[#daa520] text-white text-sm cursor-pointer"
          >
            {!splitExp ? tb("splitBy") : tb("cancel")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ArrayForm;
