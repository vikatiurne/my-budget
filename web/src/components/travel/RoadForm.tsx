import { ITransport, ITravelCosts } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";
import { FcCalculator } from "react-icons/fc";
import TitleTravelBlock from "../UI/TitleTravelBlock";

interface RoadFormProps {
  fuelPrice: () => void;
  showForm: boolean;
  formActive: () => void;
}

const RoadForm: React.FC<RoadFormProps> = ({
  fuelPrice,
  showForm,
  formActive,
}) => {
  const options = [
    { value: "car", label: "Car" },
    { value: "train", label: "Train" },
    { value: "fly", label: "Fly" },
    { value: "bus", label: "Bus" },
    { value: "chip", label: "Chip" },
    { value: "rent", label: "Rent Car" },
  ];

  const { control, register } = useFormContext<{
    transport: ITransport[];
  }>();
  const trMethods = useFormContext<ITravelCosts>();

  const [selestedTransportValues, setSelestedTransportValues] = useState<
    string[]
  >([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transport",
  });

  useEffect(() => {
    if (showForm) {
      append({ typeofTransport: "", price: null });
    }
  }, [append, showForm]);

  useEffect(() => {
    if (selestedTransportValues.length === 0) {
      setSelestedTransportValues([...selestedTransportValues, ""]);
    }
  }, [append, selestedTransportValues.length,selestedTransportValues]);

  const handleRemote = (idx: number) => {
    remove(idx);
    const fileted = selestedTransportValues.filter((_, i) => i !== idx);
    setSelestedTransportValues(fileted);
  };

  const handleTransportChange = (
    idx: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedValues = [...selestedTransportValues];
    updatedValues[idx] = selestedTransportValues.length ? e.target.value : "";
    setSelestedTransportValues(updatedValues);
  };

  const getContentForSelectedTransport = (idx: number) => {
    const selectedTrancportValue = selestedTransportValues[idx];

    if (!selectedTrancportValue) return null;

    const components = [];

    if (selectedTrancportValue === "car")
      components.push(
        <button key="fuelCalculator" onClick={() => fuelPrice()}>
          <FcCalculator className="w-8 h-8 cursor-pointer" />
        </button>
      );

    components.unshift(
      <InputPrice
        key={`transport-${idx}-price`}
        fieldName={`transport.${idx}.price`}
        placeholder="price..."
        register={register}
        isRequired={true}
      />
    );
    return <>{components}</>;
  };

  return (
    showForm && (
      <div className="mb-6 ">
        <TitleTravelBlock
          title="Modes of transportation"
          blockName="transport"
          formActive={formActive}
          setSelected={() => setSelestedTransportValues([])}
        />

        {fields.map((item, idx) => (
          <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
            <label
              htmlFor={`name-${idx}`}
              className="text-sm font-bold text-gray-600"
            >
              Transport №{idx + 1}
            </label>

            <div className="flex gap-2 md:gap-4 items-center">
              <Controller
                name={`transport.${idx}.typeofTransport`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomSelect
                    field={field}
                    options={options}
                    handleChange={(e) => handleTransportChange(idx, e)}
                  />
                )}
              />

              {getContentForSelectedTransport(idx)}

              <div className="flex gap-2 items-center ">
                <BtnsFialdsArray
                  idx={idx}
                  append={() => append({ typeofTransport: "", price: null })}
                  remove={() => handleRemote(idx)}
                />
              </div>
            </div>
          </div>
        ))}
        <input type="checkbox" {...trMethods.register("twosides")} />
        <label htmlFor="twosides" className="text-md ml-2 text-gray-600">
          include return trip
        </label>
      </div>
    )
  );
};

export default RoadForm;
