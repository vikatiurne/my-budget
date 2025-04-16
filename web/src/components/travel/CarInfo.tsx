import React, { useState } from "react";
import InputPrice from "../UI/InputPrice";
import { useForm } from "react-hook-form";
import { IMetrics } from "@/types/types";
import Popap from "../UI/Popap";

interface CarInfoProps {
  active: boolean;
  setActive: () => void;
}

const CarInfo: React.FC<CarInfoProps> = ({ active, setActive }) => {
  const [fuelPrice, setFuelPrice] = useState<number>(0);

  const { handleSubmit, register } = useForm<IMetrics>();

  const handleCostCalculation = (data: IMetrics) => {
    const price = ((+data.distance * +data.mileage) / 100) * +data.price;
    setFuelPrice(+price.toFixed(2) / data.qtypeople);
  };

  const styles = {
    label: "text-sm lg:text-lg",
  };

  return (
    <Popap active={active} setActive={setActive}>
      <div className="w-48 text-yellow-50">
        <form onSubmit={handleSubmit(handleCostCalculation)}>
          <div className="mb-4 flex flex-col gap-4">
            <label htmlFor="distance" className={styles.label}>
              Distance
              <InputPrice
                fieldName="distance"
                placeholder="km"
                typeField="km"
                register={register}
              />
            </label>
            <label htmlFor="mileage" className={styles.label}>
              Mileage
              <InputPrice
                fieldName="mileage"
                placeholder="litr/100km"
                typeField="litrs"
                register={register}
              />
            </label>
            <label htmlFor="price" className={styles.label}>
              Fuel Price
              <InputPrice
                fieldName="price"
                placeholder="price"
                register={register}
              />
            </label>
            <label htmlFor="qtypeople" className={styles.label}>
              Quentety people
              <InputPrice
                fieldName="qtypeople"
                placeholder="qty"
                typeField=" "
                register={register}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mb-4 block mx-auto py-2 px-2.5 shadow text-sm lg:text-lg rounded cursor-pointer bg-yellow-200 text-[#6e5514] hover:bg-yellow-300 hover:text-white active:border-none"
          >
            Calculate
          </button>
        </form>

        {!!fuelPrice && (
          <h6 className="font-bold">
            Fuel price:{" "}
            <span className="font-bold text-black">{fuelPrice} ₴</span>
          </h6>
        )}
      </div>
    </Popap>
  );
};

export default CarInfo;
