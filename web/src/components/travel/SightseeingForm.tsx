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
  onUpdateTotal?: (payload: { sightseeing: string }) => void;
}

const SightseeingForm: React.FC<SightseeingFormProps> = ({
  showForm,
  formActive,
  onUpdateTotal,
}) => {
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("0");

  const { control, watch } = useFormContext<{ sightseeing: ISightseeing[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sightseeing",
  });

  useEffect(() => {
    if (showForm && !fields.length) append({ landmark: "", price: "" });
  }, [append, showForm, fields.length]);

  useEffect(() => {
    const sumforfield = totalValField.reduce(
      (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),
      0
    );
    setTotal(sumforfield.toString());
  }, [totalValField]);

  useEffect(() => {
    if (onUpdateTotal) {
      onUpdateTotal({ sightseeing: total });
    }
  }, [total]);

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

  const { tt } = useAppTranslation();

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          title={`${tt("sightseeing")} - ${total} ₴`}
          blockName="sightseeing"
          formActive={formActive}
          setSelected={() => setTotalValField([])}
          // setShowDetails={handleShowDetails}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            title={`${tt("sightseeing")} - ${total} ₴`}
            blockName="sightseeing"
            formActive={formActive}
            setSelected={() => setTotalValField([])}
            // setShowDetails={handleShowDetails}
          />
        )
      )}

      {showForm && (
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
                  value={{
                    price: watch(`sightseeing.${idx}.price`) as
                      | string
                      | undefined,
                  }}
                />
                <BtnsFialdsArray
                  idx={idx}
                  append={() => append({ landmark: "", price: "" })}
                  remove={() => handleRemove(idx)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SightseeingForm;
