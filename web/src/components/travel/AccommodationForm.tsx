import { IAccommodation } from "@/types/types";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";

const AccommodationForm = () => {
  const methods = useForm<{ hotels: IAccommodation[] }>();
  const { register, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hotels",
  });

  console.log(fields)

  useEffect(() => {
    if (fields.length === 0) {
      append({ nameHotel: "", price: null });
    }
  }, [append, fields.length]);

  return (
    <div className="mb-6">
      <h4 className="mb-4 text-xl text-[#daa520]">Your accomodation</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor={`name-${idx}`} className="text-sm font-bold">
            Accomodation №{idx + 1}:
          </label>
          <div className="flex gap-4 items-center">
            <input
              className="flex-1 p-2 block w-full border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
              type="text"
              placeholder="name..."
              {...register(`hotels.${idx}.nameHotel`, {
                required: "this field is required",
              })}
            />
            <input
              className="flex-1 p-2 block w-1/2 border-gray-300 outline-none rounded shadow-sm  dark:shadow-amber-50"
              type="number"
              placeholder="price..."
              {...register(`hotels.${idx}.price`, {
                required: "this field is required",
              })}
            />

            <div className="flex gap-2 items-center ">
              <BtnsFialdsArray
                idx={idx}
                fields={fields}
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
