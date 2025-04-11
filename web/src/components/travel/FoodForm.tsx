import { IFoodOptions } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";

const FoodForm = () => {
  const options = [
    { value: "inside", label: "Inside" },
    { value: "outside", label: "Outside" },
  ];

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const { control } = useForm<{ food: IFoodOptions[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "food",
  });

  useEffect(() => {
    if (fields.length === 0) append({ eateries: "", price: null });
    setSelectedPlaces([...selectedPlaces, ""]);
  }, [append, fields.length]);

  const handleChangeEattingPlace = (
    idx: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedPlaces = [...selectedPlaces];
    updatedPlaces[idx] = selectedPlaces.length ? e.target.value : "";
    setSelectedPlaces(updatedPlaces);
  };

  const handleRemoveEattingPlace = (idx: number) => {
    remove(idx);
    const filtered = selectedPlaces.filter((_, i) => i !== idx);
    setSelectedPlaces(filtered);
  };

  return (
    <div className="mb-6">
      <h4 className="mb-4 text-xl text-[#daa520]">Food</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor={`name-${idx}`} className="text-sm font-bold">
            Place for eatting №{idx + 1}
          </label>
          <Controller
            name={`food.${idx}.eateries`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect
                options={options}
                field={field}
                handleChange={(e) => {
                  handleChangeEattingPlace(idx, e);
                }}
              />
            )}
          />

          {selectedPlaces[idx] !== "" && (
            <InputPrice fieldName={`food.${idx}.price`} />
          )}

          <BtnsFialdsArray
            idx={idx}
            append={() => append({ eateries: "", price: null })}
            remove={() => handleRemoveEattingPlace(idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default FoodForm;
