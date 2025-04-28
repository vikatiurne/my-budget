import { IFoodOptions } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface FoodFormProps {
  showForm: boolean;
  formActive: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ showForm, formActive }) => {
  const options = [
    { value: "inside", label: "Inside" },
    { value: "outside", label: "Outside" },
  ];

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const { control, register } = useFormContext<{
    foodOptions: IFoodOptions[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "foodOptions",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ eateries: "", price: null });
      setSelectedPlaces([]);
    } else {
      setSelectedPlaces([...selectedPlaces, ""]);
    }
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
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          blockName="foodOptions"
          title="Food"
          formActive={formActive}
          setSelected={() => setSelectedPlaces([])}
        />
        {fields.map((item, idx) => (
          <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
            <label
              htmlFor={`name-${idx}`}
              className="text-sm font-bold text-gray-600"
            >
              Place for eatting №{idx + 1}
            </label>
            <div className="flex gap-2 md:gap-4 items-center">
              <Controller
                name={`foodOptions.${idx}.eateries`}
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
                <InputPrice
                  fieldName={`foodOptions.${idx}.price`}
                  placeholder="price.."
                  register={register}
                />
              )}

              <BtnsFialdsArray
                idx={idx}
                append={() => append({ eateries: "", price: null })}
                remove={() => handleRemoveEattingPlace(idx)}
              />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default FoodForm;
