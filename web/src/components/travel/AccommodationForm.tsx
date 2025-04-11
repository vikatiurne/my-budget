import { IAccommodation } from "@/types/types";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import ArrayForm from "../UI/ArrayForm";

const AccommodationForm = () => {
  const methods = useForm<{ hotels: IAccommodation[] }>();
  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hotels",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ nameHotel: "", price: null });
    }
  }, [append, fields.length]);

  return (
    <div className="mb-6 ">
      <h4 className="mb-4 text-xl text-[#daa520]">Accomodations</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor={`name-${idx}`} className="text-sm font-bold">
            Accomodation №{idx + 1}:
          </label>
          <div className="flex gap-4 items-center">
            <ArrayForm
              idx={idx}
              fieldName={`hotels.${idx}.nameHotel`}
              fieldPrice={`hotels.${idx}.price`}
            />
            <div className="flex gap-2 items-center ">
              <BtnsFialdsArray
                idx={idx}
                append={() => append({ nameHotel: "", price: null })}
                remove={() => remove(idx)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationForm;
