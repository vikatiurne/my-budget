import { IAccommodation, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import ArrayForm from "../UI/ArrayForm";
import TitleTravelBlock from "../UI/TitleTravelBlock";

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
    if (showForm) {
      append({ nameHotel: "", price: null, qtypeople: "1" });
    }
  }, [append, showForm]);

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

  return (
    showForm && (
      <div className="mb-6 ">
        <TitleTravelBlock
          title={`Accomodations - ${total} ₴`}
          blockName="accommodation"
          formActive={formActive}
          setShowDetails={handleShowDetails}
          setSelected={() => setTotalValField([])}
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
                Accomodation №{idx + 1}:
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
                />
                <div className="flex gap-2 items-center ">
                  <BtnsFialdsArray
                    idx={idx}
                    append={() =>
                      append({ nameHotel: "", price: null, qtypeople: "1" })
                    }
                    remove={() => handleRemove(idx)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  );
};

export default AccommodationForm;
