import { ITransport } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import BtnsFialdsArray from "./BtnsFialdsArray";
import CustomSelect from "../UI/CustomSelect";
import InputPrice from "../UI/InputPrice";

const RoadForm = () => {
  const options = [
    { value: "car", label: "Car" },
    { value: "train", label: "Train" },
    { value: "fly", label: "Fly" },
    { value: "bus", label: "Bus" },
    { value: "chip", label: "Chip" },
    { value: "rent", label: "Rent Car" },
  ];

  const { control } = useForm<{ transport: ITransport[] }>();

  const [selestedTransportValues, setSelestedTransportValues] = useState<
    string[]
  >([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transport",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ typeofTransport: "", price: null });
      setSelestedTransportValues([...selestedTransportValues, ""]);
    }
  }, [append, fields.length]);

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

    if (selectedTrancportValue !== "car") {
      return <InputPrice fieldName={`transport.${idx}.price`} />;
    } else {
      return <p>car</p>;
    }
  };

  return (
    <div className="mb-6 ">
      <h4 className="mb-4 text-xl text-[#daa520]">Modes of transportation</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-4 mb-4 flex-wrap items-center">
          <label htmlFor={`name-${idx}`} className="text-sm font-bold">
            Transport №{idx + 1}
          </label>
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
      ))}
    </div>
  );
};

export default RoadForm;
