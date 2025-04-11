import { IRoadTax } from "@/types/types";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ArrayForm from "../UI/ArrayForm";
import BtnsFialdsArray from "./BtnsFialdsArray";

const RoadTaxForm = () => {
  const { control } = useForm<{ payroad: IRoadTax[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payroad",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ country: "", price: null });
    }
  }, [append, fields.length]);

  return (
    <div className="mb-6">
      <h4 className="mb-4 text-xl text-[#daa520]">Road Tax</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor={`name-${idx}`} className="text-sm font-bold">
            Country №{idx + 1}:
          </label>
          <div className="flex gap-4 items-center">
            <ArrayForm
              idx={idx}
              fieldName={`payroad.${idx}.country`}
              fieldPrice={`payroad.${idx}.price`}
            />
            <BtnsFialdsArray
              idx={idx}
              append={() => append({ country: "", price: null })}
              remove={() => remove(idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadTaxForm;
