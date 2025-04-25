import { ISightseeing } from "@/types/types";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ArrayForm from "../UI/ArrayForm";
import BtnsFialdsArray from "./BtnsFialdsArray";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface SightseeingFormProps {
  showForm: boolean;
  formActive: () => void;
}

const SightseeingForm: React.FC<SightseeingFormProps> = ({
  showForm,
  formActive,
}) => {
  const { control } = useFormContext<{ sightseeing: ISightseeing[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sightseeing",
  });

  useEffect(() => {
    if (fields.length === 0) append({ landmark: "", price: null });
  }, [append, fields.length]);

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          title="Sightseeing"
          blockName="sightseeing"
          formActive={formActive}
        />

        {fields.map((item, idx) => (
          <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
            <label
              htmlFor={`name-${idx}`}
              className="text-sm font-bold text-gray-600"
            >
              Landmark №{idx + 1}:
            </label>
            <div className="flex gap-2 md:gap-4 items-center">
              <ArrayForm
                idx={idx}
                fieldName={`sightseeing.${idx}.landmark`}
                fieldPrice={`sightseeing.${idx}.price`}
              />
              <BtnsFialdsArray
                idx={idx}
                append={() => append({ landmark: "", price: null })}
                remove={() => remove(idx)}
              />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default SightseeingForm;
