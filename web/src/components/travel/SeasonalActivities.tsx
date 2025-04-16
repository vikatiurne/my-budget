import { IActivities } from "@/types/types";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface SeasonalActivitiesProps {
  showForm: boolean;
  formActive: () => void;
}

const SeasonalActivities: React.FC<SeasonalActivitiesProps> = ({
  showForm,
  formActive,
}) => {
  const options = [
    { value: "lift", label: "Ski lift" },
    { value: "beach", label: "Beach access" },
  ];

  const [selectedActivity, setSelectedActivity] = useState<string>("");

  const { control, register } = useFormContext<IActivities>();

  const handleChangeActivity = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedActivity(e.target.value);

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          title="Seasonal activities"
          formActive={formActive}
          setSelected={() => setSelectedActivity("")}
        />
        <div className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor="activity" className="text-sm font-bold text-gray-600">
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
          <div className="flex gap-2 md:gap-4 items-center">
            {selectedActivity !== "" && (
              <>
                <InputPrice
                  fieldName="price"
                  placeholder="price..."
                  register={register}
                />
                <InputPrice
                  fieldName="qty"
                  placeholder="days"
                  register={register}
                  typeField="ds."
                />
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SeasonalActivities;
