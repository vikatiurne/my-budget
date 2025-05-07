import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import TitleTravelBlock from "../UI/TitleTravelBlock";
import { IActivities } from "@/types/types";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface SeasonalActivityProps {
  showForm: boolean;
  formActive: () => void;
}

const SeasonalActivity: React.FC<SeasonalActivityProps> = ({
  showForm,
  formActive,
}) => {
  const { tt, ti } = useAppTranslation();

  const options = [
    { value: "lift", label: tt("skiLift") },
    { value: "beach", label: tt("beachAccess") },
  ];

  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [localPrice, setLocalPrice] = useState<string | undefined>("");
  const [localQty, setLocalQty] = useState<string | null>(null);
  const [total, setTotal] = useState<string>("0");
  const [showDetail, setShowDetail] = useState<boolean>(true);

  const { control, register, setValue } = useFormContext<IActivities>();

  useEffect(() => {
    if (localPrice && localQty) {
      const total = parseInt(localPrice) * parseInt(localQty);
      setTotal(total.toString());
    }
  }, [localPrice, localQty]);

  const handleChangeActivity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(e.target.value);
    setLocalPrice("");
    setLocalQty(null);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrice(e.target.value);
    setLocalQty("1");
  };
  const handleBlurPrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue("price", e.target.value);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalQty(e.target.value);

  const handleBlurQty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue("qty", e.target.value);

  const handleShowDetails = () => setShowDetail((prev) => !prev);

  const reset = () => {
    setTotal("0");
    setSelectedActivity("");
    setValue("typeofActivities", "");
    setValue("price", "");
    setValue("qty", "");
    setLocalPrice("");
    setLocalQty(null);
  };

  return (
    showForm && (
      <div className="mb-6">
        <TitleTravelBlock
          title={`${tt("seasonalActivity")} - ${total} ₴`}
          formActive={formActive}
          setSelected={reset}
          setShowDetails={handleShowDetails}
        />
        {showDetail && (
          <div className="flex gap-4 mb-4 flex-wrap items-center">
            <label
              htmlFor="activity"
              className="text-sm font-bold text-gray-600"
            >
              {tt("activities")}:
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
              {selectedActivity !== "" && selectedActivity !== null && (
                <>
                  <InputPrice
                    fieldName="price"
                    placeholder={ti("price")}
                    register={register}
                    value={localPrice}
                    onChange={(e) => handlePriceChange(e)}
                    onBlur={handleBlurPrice}
                  />
                  <InputPrice
                    fieldName="qty"
                    placeholder={ti("days")}
                    register={register}
                    typeField={ti("days")}
                    value={localQty ?? ""}
                    onChange={(e) => handleQtyChange(e)}
                    onBlur={handleBlurQty}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SeasonalActivity;
