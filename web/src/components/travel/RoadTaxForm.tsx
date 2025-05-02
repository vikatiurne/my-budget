import { IRoadTax, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
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

  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payroad",
  });

  useEffect(() => {
    if (showForm) {
      append({ country: "", price: null, qtypeople: "1" });
    }
  }, [append, showForm]);

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

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          blockName="payroad"
          title={`Road Tax - ${total} ₴`}
          formActive={formActive}
          setSelected={() => setTotalValField([])}
          setShowDetails={handleShowDetails}
        />
        {showDetail &&
          fields.map((item, idx) => (
            <div
              key={item.id}
              className="flex gap-4 mb-4 flex-wrap items-center"
            >
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
                  onTotalValField={handleBlurField}
                />
                <BtnsFialdsArray
                  idx={idx}
                  append={() =>
                    append({ country: "", price: null, qtypeople: "1" })
                  }
                  remove={() => handleRemove(idx)}
                />
              </div>
            </div>
          ))}
      </div>
    )
  );
};

export default RoadTaxForm;
