import { IRoadTax, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ArrayForm from "../UI/ArrayForm";
import BtnsFialdsArray from "./BtnsFialdsArray";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface RoadTaxFormProps {
  showForm: boolean;
  formActive: () => void;
}

const RoadTaxForm: React.FC<RoadTaxFormProps> = ({ showForm, formActive }) => {
  const { control, watch } = useFormContext<{ payroad: IRoadTax[] }>();

  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payroad",
  });

  useEffect(() => {
    if (showForm && !fields.length) {
      append({ country: "", price: "", qtypeople: "" });
    }
  }, [append, showForm, fields.length]);

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

  const { tr } = useAppTranslation();

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          blockName="payroad"
          title={`${tr("roadTax")} - ${total} ₴`}
          formActive={formActive}
          setSelected={() => setTotalValField([])}
          setShowDetails={handleShowDetails}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            blockName="payroad"
            title={`${tr("roadTax")} - ${total} ₴`}
            formActive={formActive}
            setSelected={() => setTotalValField([])}
            setShowDetails={handleShowDetails}
          />
        )
      )}
      {showForm && showDetail && (
        <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
          {fields.map((item, idx) => (
            <div
              key={item.id}
              className="flex gap-4 mb-4 flex-wrap items-center"
            >
              <label
                htmlFor={`name-${idx}`}
                className="text-sm font-bold text-gray-600"
              >
                {tr("country")} №{idx + 1}:
              </label>
              <div className="flex gap-2 md:gap-4 items-center">
                <ArrayForm
                  idx={idx}
                  fieldName={`payroad.${idx}.country`}
                  fieldPrice={`payroad.${idx}.price`}
                  fieldQty={`payroad.${idx}.qtypeople`}
                  split="split"
                  onTotalValField={handleBlurField}
                  value={{
                    price: watch(`payroad.${idx}.price`) as string | undefined,
                    qty: watch(`payroad.${idx}.qtypeople`) as
                      | string
                      | undefined,
                  }}
                />
                <BtnsFialdsArray
                  idx={idx}
                  append={() =>
                    append({ country: "", price: "", qtypeople: "" })
                  }
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

export default RoadTaxForm;
