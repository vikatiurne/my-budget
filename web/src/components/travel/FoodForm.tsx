import { IFoodOptions, TotalValueField } from "@/types/types";
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

  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [selectedPlaces, setSelectedPlaces] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("");

  const { control, register, setValue } = useFormContext<{
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
      setSelectedPlaces([...selectedPlaces]);
    }
  }, [append, fields.length]);

  useEffect(() => {
    const sumforfield = selectedPlaces
      .filter((item) => item.totalField !== null && item.totalField !== "")
      .reduce(
        (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),

        0
      );
    setTotal(sumforfield.toString());
  }, [selectedPlaces]);

  const handleChangeEattingPlace = (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const updatedPlaces = [...selectedPlaces];
    updatedPlaces[idx] = { field: e.target.name, totalField: "" };
    setSelectedPlaces(updatedPlaces);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const updatedPlaces = [...selectedPlaces];
    if (updatedPlaces[idx]) {
      updatedPlaces[idx].totalField = e.target.value;
      setSelectedPlaces(updatedPlaces);
    }
  };

  const handleRemoveEattingPlace = (idx: number) => {
    remove(idx);
    const filtered = selectedPlaces.filter((_, i) => i !== idx);
    setSelectedPlaces(filtered);
  };

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const handleBlurPrice = (idx: number) => {
    setValue(`foodOptions.${idx}.price`, selectedPlaces[idx].totalField);
  };

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          blockName="foodOptions"
          title={`Food - ${total} ₴`}
          formActive={formActive}
          setSelected={() => setSelectedPlaces([])}
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
                        handleChangeEattingPlace(e, idx);
                      }}
                    />
                  )}
                />
                {selectedPlaces[idx] && selectedPlaces[idx].field !== "" && (
                  <InputPrice
                    fieldName={`foodOptions.${idx}.price`}
                    placeholder="price.."
                    register={register}
                    onBlur={() => handleBlurPrice(idx)}
                    value={selectedPlaces[idx].totalField}
                    onChange={(e) => handlePriceChange(e, idx)}
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
