import { IRoadTax } from "@/types/types";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ArrayForm from "../UI/ArrayForm";
import BtnsFialdsArray from "./BtnsFialdsArray";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface RoadTaxFormProps {
  showForm: boolean;
  formActive: () => void;
}

const RoadTaxForm: React.FC<RoadTaxFormProps> = ({ showForm, formActive }) => {
  const { control } = useFormContext<{ payroad: IRoadTax[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payroad",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ country: "", price: null, qtypeople: 1 });
    }
  }, [append, fields.length]);

  return (showForm&&
    <div className="mb-6">
      <TitleTravelBlock
        blockName="payroad"
        title="Road Tax"
        formActive={formActive}
      />
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label
            htmlFor={`name-${idx}`}
            className="text-sm font-bold text-gray-600"
          >
            Country №{idx + 1}:
          </label>
          <div className="flex gap-2 md:gap-4 items-center">
            <ArrayForm
              idx={idx}
              fieldName={`payroad.${idx}.country`}
              fieldPrice={`payroad.${idx}.price`}
              fieldQty={`payroad.${idx}.qtypeople`}
              split="split"
            />
            <BtnsFialdsArray
              idx={idx}
              append={() => append({ country: "", price: null, qtypeople: 1 })}
              remove={() => remove(idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadTaxForm;
