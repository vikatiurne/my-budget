import { IFoodOptions, TotalValueField } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface FoodFormProps {
  showForm: boolean;
  formActive: () => void;
  onUpdateTotal?: (payload: { food: string }) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({
  showForm,
  formActive,
  onUpdateTotal,
}) => {
  const { tt, ti } = useAppTranslation();

  const options = [
    { value: "inside", label: tt("inside") },
    { value: "outside", label: tt("outside") },
  ];

  const [selectedPlaces, setSelectedPlaces] = useState<TotalValueField[]>([]);
  const [total, setTotal] = useState<string>("0");

  const { control, register, setValue } = useFormContext<{
    foodOptions: IFoodOptions[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "foodOptions",
  });

  useEffect(() => {
    if (showForm && !fields.length) {
      append({ eateries: "", price: "" });
    }
  }, [append, showForm, fields.length]);

  useEffect(() => {
    const sumforfield = selectedPlaces
      .filter((item) => item.totalField !== "")
      .reduce(
        (acc: number, item: TotalValueField) => acc + parseInt(item.totalField),

        0
      );
    setTotal(sumforfield.toString());
  }, [selectedPlaces]);

  useEffect(() => {
    if (onUpdateTotal) {
      onUpdateTotal({ food: total });
    }
  }, [total]);

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

  const handleBlurPrice = (idx: number) => {
    setValue(`foodOptions.${idx}.price`, selectedPlaces[idx].totalField);
  };

  return (
    <div>
      {showForm ? (
        <TitleTravelBlock
          blockName="foodOptions"
          title={`${tt("foodPlaces")} - ${total} ₴`}
          formActive={formActive}
          setSelected={() => setSelectedPlaces([])}
        />
      ) : (
        total !== "0" && (
          <TitleTravelBlock
            blockName="foodOptions"
            title={`${tt("foodPlaces")} - ${total} ₴`}
            formActive={formActive}
            setSelected={() => setSelectedPlaces([])}
          />
        )
      )}
      {showForm && (
        <div className="mb-4 shadow pt-4 pb-1 px-2 bg-[#f5f3f2]">
          {fields.map((item, idx) => (
            <div key={item.id} className="flex gap-4 flex-wrap items-center">
              <label
                htmlFor={`name-${idx}`}
                className="text-sm font-bold text-gray-600"
              >
                {tt("placeForEatting")} №{idx + 1}
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
                    placeholder={ti("price")}
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
      )}
    </div>
  );
};

export default FoodForm;
