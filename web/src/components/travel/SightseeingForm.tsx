import { ISightseeing, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ArrayForm from "../UI/ArrayForm";
import BtnsFialdsArray from "./BtnsFialdsArray";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface SightseeingFormProps {
  showForm: boolean;
  formActive: () => void;
}

const SightseeingForm: React.FC<SightseeingFormProps> = ({
  showForm,
  formActive,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");

  const { control } = useFormContext<{ sightseeing: ISightseeing[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sightseeing",
  });

  useEffect(() => {
    if (fields.length === 0) append({ landmark: "", price: null });
  }, [append, fields.length]);

  useEffect(() => {
    const sumforfield = totalValField.reduce(
      (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),
      0
    );
    setTotal(sumforfield.toString());
  }, [totalValField]);

  const handleBlurField = (newTotalVal: TotalValueField) => {
    const filtered = totalValField.filter(
      (item) => item.field !== newTotalVal.field
    );
    setTotalValField([...filtered, newTotalVal]);
  };

  const handleRemove = (idx: number) => {
    remove(idx);
    const filtered = totalValField.filter((_, i) => i !== idx);
    setTotalValField(filtered);
  };

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const { tt } = useAppTranslation();

  return (
    showForm && (
      <div>
        <TitleTravelBlock
          title={`${tt("sightseeing")} - ${total} ₴`}
          blockName="sightseeing"
          formActive={formActive}
          setSelected={() => setTotalValField([])}
          setShowDetails={handleShowDetails}
        />

        {showDetail && (
          <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
            {fields.map((item, idx) => (
              <div
                key={item.id}
                className="flex gap-4 mb-4 flex-wrap items-center"
              >
                <label
                  htmlFor={`name-${idx}`}
                  className="text-sm font-bold text-gray-600 capitalize"
                >
                  {tt("landmark")} №{idx + 1}:
                </label>
                <div className="flex gap-2 md:gap-4 items-center">
                  <ArrayForm
                    idx={idx}
                    fieldName={`sightseeing.${idx}.landmark`}
                    fieldPrice={`sightseeing.${idx}.price`}
                    onTotalValField={handleBlurField}
                  />
                  <BtnsFialdsArray
                    idx={idx}
                    append={() => append({ landmark: "", price: null })}
                    remove={() => handleRemove(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default SightseeingForm;
