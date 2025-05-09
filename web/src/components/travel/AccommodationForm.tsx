import { IAccommodation, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import ArrayForm from "../UI/ArrayForm";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface AccommodationFormProps {
  showForm: boolean;
  formActive: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({
  showForm,
  formActive,
}) => {
  const [totalValField, setTotalValField] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");
  const [showDetail, setShowDetail] = useState<boolean>(true);

  const methods = useFormContext<{ accommodation: IAccommodation[] }>();
  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accommodation",
  });

  useEffect(() => {
    if (showForm && !fields.length) {
      append({ nameHotel: "", price: "", qtypeople: "" });
    }
  }, [append, showForm, fields.length]);

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

  useEffect(() => {
    const sumforfield = totalValField.reduce(
      (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),
      0
    );
    setTotal(sumforfield.toString());
  }, [totalValField]);

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const { tt } = useAppTranslation();

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          title={`${tt("accomodation")} - ${total} ₴`}
          blockName="accommodation"
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setTotalValField([])}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            title={`${tt("accomodation")} - ${total} ₴`}
            blockName="accommodation"
            formActive={formActive}
            setShowDetails={handleShowDetails}
            setSelected={() => setTotalValField([])}
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
                {tt("accomodation")} №{idx + 1}:
              </label>
              <div className="flex gap-2 md:gap-4 items-center">
                <ArrayForm
                  idx={idx}
                  fieldName={`accommodation.${idx}.nameHotel`}
                  fieldPrice={`accommodation.${idx}.price`}
                  fieldQty={`accommodation.${idx}.qtypeople`}
                  split="split"
                  isRequired={true}
                  onTotalValField={handleBlurField}
                  value={{
                    price: methods.watch(`accommodation.${idx}.price`) as
                      | string
                      | undefined,
                    qty: methods.watch(`accommodation.${idx}.qtypeople`) as
                      | string
                      | undefined,
                  }}
                />
                <div className="flex gap-2 items-center ">
                  <BtnsFialdsArray
                    idx={idx}
                    append={() =>
                      append({ nameHotel: "", price: "", qtypeople: "" })
                    }
                    remove={() => handleRemove(idx)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccommodationForm;
