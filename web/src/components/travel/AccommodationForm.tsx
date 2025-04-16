import { IAccommodation } from "@/types/types";
import React, { useEffect } from "react";
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

  return (
    showForm && (
      <div className="mb-6 ">
        <TitleTravelBlock
          title="Accomodations"
          blockName="accommodation"
          formActive={formActive}
        />

        {fields.map((item, idx) => (
          <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
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
              />
              <div className="flex gap-2 items-center ">
                <BtnsFialdsArray
                  idx={idx}
                  append={() =>
                    append({ nameHotel: "", price: null, qtypeople: "1" })
                  }
                  remove={() => remove(idx)}
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
