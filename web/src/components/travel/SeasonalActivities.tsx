import { IActivities } from "@/types/types";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";

const SeasonalActivities = () => {
  const options = [
    { value: "lift", label: "Ski lift" },
    { value: "beach", label: "Beach access" },
  ];

  const [selectedActivity, setSelectedActivity] = useState<string>("");

  const { control } = useForm<IActivities>();

  const handleChangeActivity = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedActivity(e.target.value);

  return (
    <div className="mb-6">
      <h4 className="mb-4 text-xl text-[#daa520]">Seasonal activities</h4>
      <div className="flex gap-4 mb-4 flex-wrap items-center">
        <label htmlFor="activity" className="text-sm font-bold">
          Activity:
        </label>
        <Controller
          name="typeofActivities"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <CustomSelect
              options={options}
              field={field}
              handleChange={(e) => {
                handleChangeActivity(e);
              }}
            />
          )}
        />
        {selectedActivity !== "" && <InputPrice fieldName="price" />}
      </div>
    </div>
  );
};

export default SeasonalActivities;
